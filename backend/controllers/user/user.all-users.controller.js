// const User = require("../../models/user.model");
// const Company = require("../../models/company.model");

// const AllUsersLen = async (req, res) => {
//   try {
//     // Basic user counts
//     const [studentUsers, tpoUsers, managementUsers, superUsers] =
//       await Promise.all([
//         User.find({ role: "student" }).lean(),
//         User.countDocuments({ role: "tpo_admin" }),
//         User.countDocuments({ role: "management_admin" }),
//         User.countDocuments({ role: "superuser" }),
//       ]);

//     // Student statistics
//     const studentApprovalPendingUsers = studentUsers.filter(
//       (student) => !student.studentProfile?.isApproved
//     ).length;

//     // Department-wise counts
//     const departmentWiseCounts = {};
//     studentUsers.forEach((student) => {
//       const dept = student.studentProfile?.department || "Unknown";
//       departmentWiseCounts[dept] = (departmentWiseCounts[dept] || 0) + 1;
//     });

//     // Placement statistics
//     const placedStudents = studentUsers.filter((student) =>
//       student.studentProfile?.appliedJobs?.some((job) => job.status === "hired")
//     );
//     const totalStudentsPlaced = placedStudents.length;
//     const totalUnplacedStudents = studentUsers.length - totalStudentsPlaced;

//     // Highest package info
//     let highestPackage = 0;
//     let highestPackageStudent = null;
//     placedStudents.forEach((student) => {
//       student.studentProfile?.appliedJobs?.forEach((job) => {
//         if (job.status === "hired" && job.package > highestPackage) {
//           highestPackage = job.package;
//           highestPackageStudent = {
//             name: `${student.first_name} ${student.last_name}`,
//             email: student.email,
//             package: job.package,
//           };
//         }
//       });
//     });

//     // Average package calculation
//     const packages = placedStudents.flatMap(
//       (student) =>
//         student.studentProfile?.appliedJobs
//           ?.filter((job) => job.status === "hired" && job.package)
//           .map((job) => job.package) || []
//     );
//     const avgPackage =
//       packages.length > 0
//         ? (
//             packages.reduce((sum, pkg) => sum + pkg, 0) / packages.length
//           ).toFixed(2)
//         : 0;

//     // Total companies
//     const totalCompanies = await Company.countDocuments();

//     return res.json({
//       // Basic user counts
//       studentUsers: studentUsers.length,
//       studentApprovalPendingUsers,
//       tpoUsers,
//       managementUsers,
//       superUsers,

//       // New placement stats
//       totalStudents: studentUsers.length,
//       totalStudentsDeptWise: departmentWiseCounts,
//       totalStudentsPlaced,
//       totalUnplacedStudents,
//       highestPackage,
//       highestPackageStudent,
//       avgPackage,
//       totalCompanies,
//     });
//   } catch (error) {
//     console.log("user.route.js => ", error);
//     return res.status(500).json({ msg: "Internal Server Error!" });
//   }
// };

// module.exports = AllUsersLen;

const User = require("../../models/user.model");
const Company = require("../../models/company.model");

const AllUsersLen = async (req, res) => {
  try {
    // Basic user counts
    const [studentUsers, tpoUsers, managementUsers, superUsers] =
      await Promise.all([
        User.find({ role: "student" }).lean(),
        User.countDocuments({ role: "tpo_admin" }),
        User.countDocuments({ role: "management_admin" }),
        User.countDocuments({ role: "superuser" }),
      ]);

    // Student approval status counts
    const approvedStudents = studentUsers.filter(
      (student) => student.studentProfile?.isApproved
    ).length;
    const pendingApprovalStudents = studentUsers.filter(
      (student) => !student.studentProfile?.isApproved
    ).length;

    // Department-wise counts
    const departmentWiseCounts = {};
    studentUsers.forEach((student) => {
      const dept = student.studentProfile?.department || "Unknown";
      departmentWiseCounts[dept] = (departmentWiseCounts[dept] || 0) + 1;
    });

    // Placement statistics
    const placedStudents = studentUsers.filter((student) =>
      student.studentProfile?.appliedJobs?.some((job) => job.status === "hired")
    );
    const totalStudentsPlaced = placedStudents.length;
    const totalUnplacedStudents = studentUsers.length - totalStudentsPlaced;

    // Highest package info
    let highestPackage = 0;
    let highestPackageStudent = null;
    placedStudents.forEach((student) => {
      student.studentProfile?.appliedJobs?.forEach((job) => {
        if (job.status === "hired" && job.package > highestPackage) {
          highestPackage = job.package;
          highestPackageStudent = {
            name: `${student.first_name} ${student.last_name}`,
            email: student.email,
            package: job.package,
          };
        }
      });
    });

    // Average package calculation
    const packages = placedStudents.flatMap(
      (student) =>
        student.studentProfile?.appliedJobs
          ?.filter((job) => job.status === "hired" && job.package)
          .map((job) => job.package) || []
    );
    const avgPackage =
      packages.length > 0
        ? (
            packages.reduce((sum, pkg) => sum + pkg, 0) / packages.length
          ).toFixed(2)
        : 0;

    // Total companies
    const totalCompanies = await Company.countDocuments();

    return res.json({
      // Basic user counts
      studentUsers: studentUsers.length,
      approvedStudents,
      studentApprovalPendingUsers: pendingApprovalStudents,
      tpoUsers,
      managementUsers,
      superUsers,

      // Placement stats
      totalStudents: studentUsers.length,
      totalStudentsDeptWise: departmentWiseCounts,
      totalStudentsPlaced,
      totalUnplacedStudents,
      highestPackage,
      highestPackageStudent,
      avgPackage,
      totalCompanies,
    });
  } catch (error) {
    console.log("user.route.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = AllUsersLen;
