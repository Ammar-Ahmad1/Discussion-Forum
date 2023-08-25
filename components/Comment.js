import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {
  // const { account } = useContext(DataContext)
  const { data: session } = useSession();
  const removeComment = async () => {
    //    await API.deleteComment(comment._id);
    try {
      const res = await fetch(`/api/comments/${comment._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Comment Deleted Successfully");
      } else if (res.status === 500) {
        toast.error("Error Deleting Comment");
      }

      setToggle((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Component>
      <ToastContainer />
      <Container>
        <div className="flex flex-row">
          <img
            src={comment.userID.image||"https://static.thenounproject.com/png/12017-200.png"}
            width="50px"
            height="50px"
            style={{ borderRadius: "50%", marginRight: "5px" }}
          />
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Name>{comment.name}</Name>
              <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>

              {comment.userID === session?.user.id && 
              <DeleteIcon onClick={() => removeComment()} />
}  
            
            </div>
            <Typography>{comment.comments}</Typography>
          </div>
        </div>
      </Container>
    </Component>
  );
};

export default Comment;
