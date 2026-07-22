import { formatIndianFullDateParts } from "@/utils/helper-functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// const fetchedBlogs: {
//  id: string;
//  title: string;
//  slug: string;
//  body: string;
//  images: string[];
//  publishStatus: PublishStatus;
//  createdAt: Date;
//  updatedAt: Date;
// }[]
const BlogsListingsCard = ({ blog }: any) => {
  const {day,month} = formatIndianFullDateParts(blog.createdAt)
  // console.log(day)
  return (
    <>
      <div className="col-sm-6 col-lg-4" key={blog.id}>
        <div className="blog-style1">
          <div className="blog-img">
            <Image
              width={386}
              height={271}
              className="w-100 h-100 cover"
              src={blog.images[0]}
              alt="blog"
            />
          </div>
          <div className="blog-content">
            <div className="date">
              <span className="month">
                {month}
              </span>
              <span className="day">
                {day}
              </span>
            </div>
            <a className="tag" href="#">
              {/* {blog.tag} */}
              Real Estate
            </a>
            <h6 className="title mt-1">
              <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsListingsCard;
