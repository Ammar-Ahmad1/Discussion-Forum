import multer from "multer";
import cloudinary from "@utils/cloudinary"; // Update this path
import { writeFile, unlink } from "fs/promises";
import Post from "@models/post"; // Update this path

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req,res) => {
  const { userId, title, description, country, tags, file } = await req.json();

  const base64Data = file.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const tempFilePath = "/uploads"; // Update this path
  await writeFile(tempFilePath, buffer);

  try {
    // // // Upload file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath);
    // // // // Access public URL of the uploaded image
    const imageUrl = cloudinaryResponse.secure_url;

    const newPost = await Post.create({
      title,
      description,
      tags,
      country,
      createdBy: userId,
      picture: imageUrl,
    });

    // // // // Delete the temporary file from the server
    await unlink(tempFilePath);
    return new Response("Post created succesfully", { status: 200});
    // return res.status(200).json({
    //     message: "Post created successfully",
    //     post: newPost,
    //   });
  } catch (error) {
    console.error("Error:", error);
    console.log("eeeee");
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
