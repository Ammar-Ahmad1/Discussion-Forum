import Comment from "@models/comments";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const comments = await Comment.find({ postId: params.id }).populate("userID", "image")

        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch comments created for post", { status: 500 })
    }
} 