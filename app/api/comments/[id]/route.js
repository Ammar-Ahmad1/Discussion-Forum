import Comment from "@models/comments";
import { connectToDB } from "@utils/database";
export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
      // Find the Post by ID and remove it
      await Comment.findByIdAndRemove(params.id);
  
      return new Response("Comment Deleted Successfully", { status: 200 });
    } catch (error) {
      return new Response("Error deleting Post", { status: 500 });
    }
  };