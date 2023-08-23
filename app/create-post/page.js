"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Link } from "next/link";
import { toast, ToastContainer } from "react-toastify";
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import MultiSelectDropdown from "@components/MultiSelectDropdown";
import dynamic from "next/dynamic";
// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
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

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  createdBy: "",
  tags: [],
  country: "",
  createdBy: "",
};

const CreatePost = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const router = useRouter();
  const { data: session } = useSession();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [tags, setTags] = useState([]);
  const [fileBase64, setFileBase64] = useState(null);
  // const { account } = useContext(DataContext);

  const url = file
    ? URL.createObjectURL(file)
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";


  const savePost = async (e) => {
    post.description = content;
    post.country = selectedLocation.label;
    if(!post.title || !post.description || !post.country || !fileBase64 || !post.tags){
      toast.error("Please fill all the fields");
      return;
    }


    
    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          description: post.description,
          tags: post.tags,
          userId: session?.user.id,
          country: post.country,
          file: fileBase64,
        }),
      });
      if (response.ok) {
        toast.success("Post created successfully");
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const base64File = fileReader.result.split(",")[1]; // Extract the base64 portion
      setFileBase64(base64File);
      // You can also set other file-related states if needed
    };

    fileReader.readAsDataURL(selectedFile);
  };
  return (
    <Container>
      <ToastContainer />
      <Image src={url} alt="post" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add
            fontSize="large"
            color="action"
            style={{
              marginTop: "10px",
            }}
          />
        </label>

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
        <input
          className="form_input"
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
        />
        <label
          style={{
            padding: "10px",
          }}
        >
          <MultiSelectDropdown
            check={false}
            setSelectedValues={setSelectedLocation}
          />
        </label>
      </StyledFormControl>
      <div style={{ margin: "10px" }}>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tags
        </span>
        <input
          className="form_input"
          type="text"
          name="tags"
          placeholder="#tags"
          onChange={(e) => handleChange(e)}
        />
      </label>

      <div className="flex-center mx-3 mb-5 gap-4 py-3">
        <button className="text-gray-500 text-sm">Cancel</button>

        <button
          type="submit"
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          onClick={() => savePost()}
        >
          Publish
        </button>
      </div>
    </Container>
  );
};

export default CreatePost;
