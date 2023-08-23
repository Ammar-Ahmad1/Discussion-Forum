"use client";
import {useEffect, useState} from 'react'
import Post from '@components/Post'
import Feed from '@components/Feed'
const Home = () => {
//  const [allPosts, setAllPosts] = useState([]);


//   const fetchPosts = async () => {
//     const response = await fetch("/api/post");
//     const data = await response.json();

//     setAllPosts(data);
//     console.log(data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);
  return (
    <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
    ZindaBhag Community
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Find Solutions</span>
    </h1>
      <Feed />
  </section>
  )
}

export default Home