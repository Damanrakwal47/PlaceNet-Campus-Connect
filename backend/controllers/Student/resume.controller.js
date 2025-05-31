// // // const User = require("../../models/user.model.js");
// // // const cloudinary = require("../../config/Cloudinary.js");
// // // const path = require("path");

// // // const UploadResume = async (req, res) => {
// // //   try {
// // //     if (!req.file) {
// // //       return res.status(400).json({ msg: "No resume uploaded" });
// // //     }

// // //     // Allow only PDF files
// // //     if (req.file.mimetype !== "application/pdf") {
// // //       return res.status(400).json({ msg: "Only PDF files are allowed" });
// // //     }

// // //     const user = await User.findById(req.body.userId);
// // //     if (!user) {
// // //       return res.status(404).json({ msg: "Student not found!" });
// // //     }

// // //     // Delete old resume if exists
// // //     if (
// // //       user.studentProfile &&
// // //       user.studentProfile.resume &&
// // //       user.studentProfile.resume.public_id
// // //     ) {
// // //       await cloudinary.uploader.destroy(user.studentProfile.resume.public_id, {
// // //         resource_type: "raw",
// // //       });
// // //     }

// // //     // Unique filename for Cloudinary
// // //     const originalName = path.parse(req.file.originalname).name;
// // //     const uniqueFilename = `${originalName}_${Date.now()}_${req.body.userId}`;

// // //     // Upload new resume to Cloudinary (resource_type: raw for non-image)
// // //     const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
// // //       folder: "CPMS/Resume",
// // //       public_id: uniqueFilename,
// // //       resource_type: "raw",
// // //     });

// // //     // Save resume info as an object with URL and public_id
// // //     user.studentProfile.resume = {
// // //       filename: req.file.originalname,
// // //       filepath: cloudinaryResponse.secure_url,
// // //       contentType: req.file.mimetype,
// // //       public_id: cloudinaryResponse.public_id,
// // //     };

// // //     await user.save();

// // //     return res.status(200).json({
// // //       msg: "Resume uploaded successfully!",
// // //       url: cloudinaryResponse.secure_url,
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({ msg: "Server error", error });
// // //   }
// // // };

// // // module.exports = UploadResume;

// // const User = require("../../models/user.model.js");
// // const cloudinary = require("../../config/Cloudinary.js");
// // const path = require("path");
// // const fs = require("fs");
// // const { promisify } = require("util");
// // const unlinkAsync = promisify(fs.unlink);

// // const UploadResume = async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ msg: "No resume uploaded" });
// //     }

// //     // Verify it's a PDF
// //     if (req.file.mimetype !== "application/pdf") {
// //       await unlinkAsync(req.file.path);
// //       return res.status(400).json({ msg: "Only PDF files are allowed" });
// //     }

// //     const user = await User.findById(req.body.userId);
// //     if (!user) {
// //       await unlinkAsync(req.file.path);
// //       return res.status(404).json({ msg: "Student not found!" });
// //     }

// //     // Delete old resume if exists
// //     if (user.studentProfile?.resume?.public_id) {
// //       await cloudinary.uploader
// //         .destroy(user.studentProfile.resume.public_id, {
// //           resource_type: "raw",
// //         })
// //         .catch((err) => console.error("Error deleting old resume:", err));
// //     }

// //     // Generate unique filename with .pdf extension
// //     const originalName = path.parse(req.file.originalname).name;
// //     const uniqueFilename = `resume_${originalName}_${Date.now()}_${
// //       req.body.userId
// //     }.pdf`;

// //     // Upload options to force PDF format
// //     const uploadOptions = {
// //       folder: "CPMS/Resume",
// //       public_id: uniqueFilename,
// //       resource_type: "auto",
// //       format: "pdf", // Explicitly set format
// //       transformation: [
// //         { flags: "attachment" }, // Ensures PDF is served as download
// //       ],
// //     };

// //     // Upload to Cloudinary
// //     const cloudinaryResponse = await cloudinary.uploader.upload(
// //       req.file.path,
// //       uploadOptions
// //     );

// //     // Ensure URL has .pdf extension
// //     let secureUrl = cloudinaryResponse.secure_url;
// //     if (!secureUrl.endsWith(".pdf")) {
// //       secureUrl = `${secureUrl}.pdf`;
// //     }

// //     // Update user record
// //     user.studentProfile.resume = {
// //       filename: req.file.originalname,
// //       filepath: secureUrl,
// //       contentType: "application/pdf",
// //       public_id: cloudinaryResponse.public_id,
// //     };

// //     await user.save();
// //     await unlinkAsync(req.file.path); // Clean up temp file

// //     return res.status(200).json({
// //       msg: "Resume uploaded successfully!",
// //       url: secureUrl,
// //     });
// //   } catch (error) {
// //     // Clean up temp file if exists
// //     if (req.file?.path) {
// //       await unlinkAsync(req.file.path).catch((cleanupError) => {
// //         console.error("Error cleaning up file:", cleanupError);
// //       });
// //     }

// //     console.error("Resume upload error:", error);
// //     return res.status(500).json({
// //       msg: "Server error during resume upload",
// //       error: error.message,
// //     });
// //   }
// // };

// // module.exports = UploadResume;

const User = require("../../models/user.model.js");
const cloudinary = require("../../config/Cloudinary.js");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const UploadResume = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ msg: "No resume uploaded" });
    }

    // Validate PDF file type
    if (req.file.mimetype !== "application/pdf") {
      await unlinkAsync(req.file.path);
      return res.status(400).json({ msg: "Only PDF files are allowed" });
    }

    // Find the user by ID
    const user = await User.findById(req.body.userId);
    if (!user) {
      await unlinkAsync(req.file.path);
      return res.status(404).json({ msg: "Student not found!" });
    }

    // Delete old resume from Cloudinary if exists
    if (user.studentProfile?.resume?.public_id) {
      await cloudinary.uploader
        .destroy(user.studentProfile.resume.public_id, { resource_type: "raw" })
        .catch((err) => console.error("Error deleting old resume:", err));
    }

    // Create unique public_id WITHOUT file extension
    const originalName = path.parse(req.file.originalname).name;
    const uniquePublicId = `resume_${originalName}_${Date.now()}_${
      req.body.userId
    }`;

    // Upload PDF to Cloudinary with resource_type raw
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "CPMS/Resume",
      public_id: uniquePublicId,
      resource_type: "auto",
      // Optional: transformation: [{ flags: "attachment" }] to force download in browser
    });

    // Get secure URL from Cloudinary response (already ends with .pdf)
    const secureUrl = cloudinaryResponse.secure_url;

    // Save resume info in user profile
    user.studentProfile.resume = {
      filename: req.file.originalname,
      filepath: secureUrl,
      contentType: "application/pdf",
      public_id: cloudinaryResponse.public_id,
    };

    await user.save();

    // Remove temp file after upload
    await unlinkAsync(req.file.path);

    return res.status(200).json({
      msg: "Resume uploaded successfully!",
      url: secureUrl,
    });
  } catch (error) {
    // Cleanup temp file if exists on error
    if (req.file?.path) {
      await unlinkAsync(req.file.path).catch((e) =>
        console.error("Error cleaning up file:", e)
      );
    }

    console.error("Resume upload error:", error);
    return res.status(500).json({
      msg: "Server error during resume upload",
      error: error.message,
    });
  }
};

module.exports = UploadResume;
