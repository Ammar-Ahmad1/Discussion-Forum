"use client";
import { useState, useEffect, useContext } from "react";

import { Box, Typography, styled } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
// components
// import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const DetailView = ({ params }) => {
  const router = useRouter();
  console.log(params.id, "detail");
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [post, setPost] = useState({});
  // const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/post/${params?.id}`);
      const data = await response.json();

      setPost(data);
    };

    if (params?.id) fetchData();
  }, [params.id]);

  const deleteBlog = async () => {
    try {
      const res = await fetch(`/api/post/${params?.id}`, {
        method: "DELETE",
      });

      toast.success("Post Deleted Successfully");
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Image src={post.picture || url} alt="post" />
      <Box style={{ float: "right" }}>
        {session?.user.id === post.createdBy && (
          <>
            <Link href={`/update-post/${post._id}?name=${userName}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={() => deleteBlog()} color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        {/* <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}> */}
        <Typography>
          Author: <span style={{ fontWeight: 600 }}>{userName}</span>
        </Typography>
        {/* </Link> */}
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <div
        style={{
          backgroundColor: "transparent",
          padding: 0,
        }}
      >
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </div>
      {/* <Comments post={post} /> */}
    </Container>
  );
};

export default DetailView;
