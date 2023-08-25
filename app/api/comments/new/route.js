import { connectToDB } from "@utils/database"; // You need to create this file to establish the MongoDB connection
import Comment from '@models/comments'; // Adjust the path based on your file structure

export const POST= async (req, res)=> {
    
  if (req.method === 'POST') {
    try {
      await connectToDB(); // Connect to the database
      
      const { name, userId,postId, comments} = await req.json();
    // console.log(name, postId, comments)
    const date = new Date();
    console.log(userId,"user ID:");
    console.log(postId,"post ID:");
      // Create a new comment
      const newComment = Comment.create({
        name,
        userID: userId,
        postId,
        comments,    
        date
        });
        // console.log(newComment);

      
    //   await newComment.save(); // Save the comment
      
      return new Response("Comment added successfully", { status: 201 });
    //   res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        return new Response("An error occurred while adding the comment", { status: 500 });
    //   res.status(500).json({ error: 'An error occurred while adding the comment' });
    }
  } else {
    return new Response("Method not allowed", { status: 405 });
    // res.status(405).json({ error: 'Method not allowed' });
  }
}
