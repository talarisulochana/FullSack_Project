// cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dhejnlbky',        // replace with your Cloudinary cloud name
  api_key: '956346876938236',              // replace with your Cloudinary API key
  api_secret: 'xLnRDxrnYuUX7e-4AaIo5AYhSRg',        // replace with your Cloudinary API secret
});

module.exports = cloudinary;