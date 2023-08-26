"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Post from "./Post";

const PostList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16">
      {data.map((post) => (
        <Post key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try{
    const response = await fetch("/api/post");
    const data = await response.json();
    setAllPosts(data);
    }catch(err){
      console.log(err)
    }
  };
  const filterPosts = () => {
    if (currentUser && currentUser.interestedCountries) {
      const filteredPosts = allPosts.filter((post) => {
        return currentUser.interestedCountries.includes(post.country);
      });
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts([]);
    }
  };
  const fetchUser = async () => {
    try{
    const response = await fetch(`/api/users/${session?.user.id}`);
    const data = await response.json();
    // console.log(data[0],"data in feed")
    setCurrentUser(data[0]);
    }catch(err){
      console.log(err)
    }

  };

  useEffect(() => {
    fetchPosts();
    if (session?.user) {
      fetchUser();
    }
  }, [session]); // Fetch user posts when session data is available

  useEffect(() => {
    if (currentUser && allPosts.length > 0) {
      filterPosts();
    }
  }, [currentUser, allPosts, searchText]); // Include allPosts as a dependency

  useEffect(() => {
    if (session?.user) {
      filterPosts();
    }
  }, [session, allPosts]);
  
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
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a country"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {/* {searchText ? (
        <PostList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PostList data={allPosts} handleTagClick={handleTagClick} />
      )} */}
      {session?.user.id ?
        <PostList
      data={searchText ? searchedResults : filteredPosts}
      handleTagClick={handleTagClick}
    /> : <PostList
      data={searchText ? searchedResults : allPosts}
      handleTagClick={handleTagClick}
    />

    }
      
    </section>
  );
};

export default Feed;
