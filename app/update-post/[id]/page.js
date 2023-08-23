"use client"
import React, { useState, useEffect, useRef} from 'react';
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import MultiSelectDropdown from "@components/MultiSelectDropdown";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
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

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    createdBy: '',
    tags: '',
    createdDate: new Date()
}

const UpdatePost = ({params}) => {
    // const navigate = useNavigate();
    
    
    const { data: session } = useSession();
    const editor = useRef(null);
    const [check, setCheck] = useState(false);
    const [post, setPost] = useState({});
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [content, setContent] = useState(initialPost.description);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
    const postId = searchParams.get("id");
    const [submitting, setIsSubmitting] = useState(false);

    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/post/${params?.id}`);
            const data = await response.json();
      
            setPost(data);
            console.log(post)
            // setCheck(true);
          };
      
          fetchData();
    }, [params.id]);


    const updateBlogPost = async () => {
      post.description = content;
      post.country = selectedLocation.label;
        // if (!postId) return alert("Missing PostId!");
    
        try {
          const response = await fetch(`/api/post/${params?.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: post.title,
                description: post.description,
                tags: post.tags,
                country: post.country,
            }),
          });
    
          if (response.ok) {  
            router.push(`/detail/${params?.id}?name=${userName}`);
          }
          else {
            toast.error("Error updating post");
          }
        } catch (error) {
          console.log(error);
          toast.error("Error updating post");
        } finally {
          setIsSubmitting(false);
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    return (
        <Container>
        <ToastContainer />

            
           <Image src={url} alt="post" />
     
           <StyledFormControl>
             <input
               className="form_input"
               onChange={(e) => handleChange(e)}
               name="title"
               placeholder="Title"
               value={post.title}
             />
             <label
               style={{padding: "10px" }}
             >
               <MultiSelectDropdown
                 check={false}
                 setSelectedValues={setSelectedLocation}
                 value={post.country}
               />
             </label>
           </StyledFormControl>
           
           <div style={{ margin: "10px" }}>
             <JoditEditor
               ref={editor}
               value={post.description}
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
               value={post.tags}
               placeholder="#tags"
               onChange={(e) => handleChange(e)}
             />
           </label>
     
           <div className="flex-center mx-3 mb-5 gap-4 py-3">
             <button className="text-gray-500 text-sm">Cancel</button>
     
             <button
               type="submit"
               className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
               onClick={() => updateBlogPost()}
             >
               Update
             </button>
           </div>
               
            </Container> 
    )
}

export default UpdatePost;