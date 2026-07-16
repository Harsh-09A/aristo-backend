import { getFeaturedBlogs } from "@/services/blogs-service";
import React from "react";
import BlogsListingsCard from "./BlogsListingsCard";

const BlogsListings = async () => {
  const fetchedBlogs = await getFeaturedBlogs(3);
  return (
    <>
      {fetchedBlogs.map((blog) => (
        <BlogsListingsCard blog={blog} key={blog.id} />
      ))}
    </>
  );
};

export default BlogsListings;
