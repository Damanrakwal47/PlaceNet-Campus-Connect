const User = require("../../models/user.model");
const JobSchema = require("../../models/job.model");
const cloudinary = require("../../config/Cloudinary.js");

const UploadOfferLetter = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No offer letter uploaded" });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ msg: "Only PDF, DOC, and DOCX files are allowed" });
    }

    const job = await JobSchema.findById(req.body.jobId);
    if (!job) return res.status(404).json({ msg: "Job not found!" });

    // Finding the applicant
    const applicant = job.applicants.find(
      (app) => app.studentId.toString() === req.body.studentId
    );
    if (!applicant) {
      return res
        .status(400)
        .json({ msg: "Student has not applied to this job!" });
    }

    // Delete previous offer letter if exists
    if (applicant.offerLetter) {
      try {
        const publicId = applicant.offerLetter
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "auto", // Changed from "raw" to "auto"
        });
      } catch (cloudinaryErr) {
        console.error("Error deleting old offer letter:", cloudinaryErr);
        // Continue even if deletion fails
      }
    }

    // Upload new offer letter to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "CPMS/Offer Letter",
      resource_type: "auto", // Changed from "raw" to "auto"
      allowed_formats: ["pdf", "doc", "docx"],
    });

    // Update offer letter URL in MongoDB
    applicant.offerLetter = cloudinaryResponse.secure_url;
    await job.save();

    return res.json({
      msg: "Offer Letter Uploaded Successfully!",
      url: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const DeleteOfferLetter = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;
    if (!jobId || !studentId) {
      return res.status(400).json({ msg: "Missing jobId or studentId" });
    }

    const job = await JobSchema.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found!" });

    const applicant = job.applicants.find(
      (app) => app.studentId.toString() === studentId
    );

    if (!applicant || !applicant.offerLetter) {
      return res
        .status(400)
        .json({ msg: "No offer letter found for this student!" });
    }

    try {
      const publicId = applicant.offerLetter
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw", // Changed from "raw" to "auto"
      });
    } catch (cloudinaryErr) {
      console.error("Error deleting from Cloudinary:", cloudinaryErr);
      // Continue to remove the reference even if Cloudinary deletion fails
    }

    // Remove offer letter from MongoDB
    applicant.offerLetter = null;
    await job.save();

    return res.json({ msg: "Offer Letter Deleted Successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  UploadOfferLetter,
  DeleteOfferLetter,
};
