const User = require("../../models/user.model");
const asyncHandler = require("express-async-handler");

const getStudentsForReport = asyncHandler(async (req, res) => {
  try {
    const { department, status, sortPackage, batchYear } = req.query;

    // Base query
    let query = {
      role: "student",
      "studentProfile.isApproved": true,
    };

    // Apply filters
    if (department) query["studentProfile.department"] = department;
    if (batchYear) query["studentProfile.addmissionYear"] = parseInt(batchYear);

    // Fetch and transform data
    let students = await User.find(query)
      .select("first_name last_name studentProfile")
      .populate({
        path: "studentProfile.appliedJobs.jobId",
        select: "company salary",
        populate: { path: "company", select: "companyName" },
      })
      .lean();

    students = students.map((student) => {
      const hiredJob = student.studentProfile?.appliedJobs?.find(
        (j) => j.status === "hired"
      );
      return {
        ...student,
        name: `${student.first_name} ${student.last_name}`,
        placementStatus: hiredJob ? "placed" : "unplaced",
        package: hiredJob?.package || hiredJob?.jobId?.salary || 0,
        companyName: hiredJob?.jobId?.company?.companyName || null,
      };
    });

    // Apply filters
    if (status === "placed")
      students = students.filter((s) => s.placementStatus === "placed");
    if (status === "unplaced")
      students = students.filter((s) => s.placementStatus === "unplaced");

    // Apply sorting
    if (sortPackage) {
      students.sort((a, b) =>
        sortPackage === "asc" ? a.package - b.package : b.package - a.package
      );
    }

    res.json({ success: true, count: students.length, students });
  } catch (error) {
    console.error("Report generation error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error generating report" });
  }
});

const getDepartments = asyncHandler(async (req, res) => {
  try {
    const departmentPath = User.schema.path("studentProfile.department");
    res.json(departmentPath.enumValues || []);
  } catch (error) {
    console.error("Department fetch error:", error);
    res.status(500).json({ message: "Error fetching departments" });
  }
});

module.exports = { getStudentsForReport, getDepartments };
