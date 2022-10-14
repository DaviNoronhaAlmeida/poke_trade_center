import path from "path";
import dotenv from "dotenv";
dotenv.config();

export async function getImageByName(req, res) {
    const { name: image } = req.params;
    const __dirname = process.env.DIR_NAME;

    const options = {
        root: path.join(__dirname),
    };

    res.status(200).sendFile(image, options, function (err) {
        if (err) {
            console.log(err);
        }
    });
}
