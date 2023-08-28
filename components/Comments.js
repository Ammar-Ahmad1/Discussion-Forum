"use client"
import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import {useSession} from 'next-auth/react';
import {toast, ToastContainer} from 'react-toastify';
//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { data: session } = useSession();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`/api/post/${post._id}/comments`);
            const data = await response.json();
            if (response.ok) {
                setComments(data);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: session?.user?.name || "Anonymous",
            userId: session?.user?.id,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        if(!session?.user.id){
            toast.error('Please login to comment');
            return;
        }

        if(!comment.comments) {
            toast.error('Please enter a comment');
            return;
        }

        await fetch('/api/comments/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });


        setComment(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <ToastContainer />
            <Container>
                <Image src={session?.user.image || url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    className="black_btn"
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;