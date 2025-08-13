const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadoncloud = async (localfile) => {
  try {
    if (!localfile) return null;

    const result = await cloudinary.uploader.upload(localfile, {
      resource_type: "any"
    });

    console.log("File has been uploaded to cloud:", result.format);
    return result;
  } catch (error) {
    fs.unlinkSync(localfile);
    throw error;
  }
};

module.exports = { uploadoncloud };
