import { formatIndianFullDateParts } from "@/utils/helper-functions";
import Image from "next/image";
import Link from "next/link";

// Sirf wahi fields jo ye card actually use karta hai — poora Prisma
// Blog model import nahi kiya, taaki Date-vs-string jaisi type
// mismatch problems na aayein jab server component se prop pass hoga.
type BlogCardData = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  images: string[];
  createdAt: Date | string; // Prisma se Date aata hai, JSON serialize hone par string ban sakta hai — dono allow kar liya
};

type Props = {
  blog: BlogCardData;
};

const BlogsListingsCard = ({ blog }: Props) => {
  const { day, month } = formatIndianFullDateParts(blog.createdAt);

  // Guard: agar kisi blog ka images array khaali ho (admin ne upload
  // nahi kiya), toh <Image src={undefined}> crash na ho isliye fallback
  const coverImage = blog.images[0] || "/assets/images/placeholder/placeholder-image.jpg";

  return (
    <div className="col-sm-6 col-lg-4" key={blog.id}>
      <div className="blog-style1">
        <div
          className="blog-img"
          style={{ position: "relative", aspectRatio: "386 / 271" }}
        >
          <Image
            fill
            className="cover"
            style={{ objectFit: "cover" }}
            src={coverImage}
            alt={blog.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="blog-content">
          <div className="date">
            <span className="month">{month}</span>
            <span className="day">{day}</span>
          </div>
          <a className="tag" href="#">
            {blog.category ||"Real Estate"}
          </a>
          <h6 className="title mt-1">
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default BlogsListingsCard;
