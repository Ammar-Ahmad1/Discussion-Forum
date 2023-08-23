import Post from "@models/Post";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const Posts = await Post.find({}).populate("createdBy","username").exec();

        return new Response(JSON.stringify(Posts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Posts", { status: 500 })
    }
} 