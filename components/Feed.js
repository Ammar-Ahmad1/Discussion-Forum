"use client";

import { useState, useEffect } from "react";

import Post from "./Post";

const PostList = ({ data, handleTagClick }) => {

    return (
    <div className='mt-16'
    
    >
      {data.map((post) => (
        <Post
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
  
    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
  
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
        console.log(data)
      setAllPosts(data);
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const filterPrompts = (searchtext) => {
      const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
      return allPosts.filter(
        (item) =>
          regex.test(item.country) ||
          regex.test(item.tags) ||
          regex.test(item.title)
      );
    };
  
    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
      // debounce method
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterPrompts(e.target.value);
          setSearchedResults(searchResult);
        }, 500)
      );
    };
  
    const handleTagClick = (tagName) => {
      setSearchText(tagName);
  
      const searchResult = filterPrompts(tagName);
      setSearchedResults(searchResult);
    };
  
    return (
      <section className='feed'>
        <form className='relative w-full flex-center'>
          <input
            type='text'
            placeholder='Search for a tag or a country'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </form>
  
        {/* All Prompts */}
        {searchText ? (
          <PostList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PostList data={allPosts} handleTagClick={handleTagClick} />
        )}
      </section>
    );
  };
  
  export default Feed;