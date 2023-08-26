import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const post = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const addEllipsis = (str, limit) => {
    //removes the html tags from the string
    str = str.replace(/(<([^>]+)>)/gi, "");

    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };
  const handlePostClick = () => {
    console.log(post);
    router.push(`/detail/${post._id}?name=${post.createdBy.username}`);
  };
  return (
    <div
      className="flex flex-row justify-between items-center rounded-md shadow-md p-4 my-4 w-full shadow-md"
      onClick={handlePostClick}
      // style={{
      //   display: "flex",
      //   flexDirection: "row",
      //   boxShadow: "0 0 10px #674188",
      //   margin: "1rem",
      //   width: "100%",
      // }}
    >
      <div className="flex" style={{ width: "20%" }}>
        <img
          src={post.picture}
          alt="post"
          style={{
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              color: "black",
              fontSize: "1rem",
              fontWeight: "bold",
              marginLeft: "1rem",
            }}
          >
            {addEllipsis(post.title, 30)}
          </h2>
          <p
            style={{
              color: "black",
              fontSize: "0.5rem",
              marginLeft: "1rem",
              display: "flex",
            }}
          >
            {addEllipsis(post.description, 50)}
          </p>
        </div>

        <div className="flex-column">
          <p className="text-gray-500 text-sm ">
            Created on: {new Date(post.createdDate).toLocaleDateString()}
          </p>
          <p className="text-gray-500 text-sm ">
            Created by: {post.createdBy.username}
            country: {post.country}
          </p>
          <p className="text-gray-500 text-sm ">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-blue-500 cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default post;
