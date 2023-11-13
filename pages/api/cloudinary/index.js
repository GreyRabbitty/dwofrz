const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export default async function handler(req, res) {


    const image = req.body;
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "ragnarok",
            width: 1920,
            crop: "scale"
        });
        res.status(200).json(result);
    } catch(error) {   
        res.status(500).json({ error });
    }

}