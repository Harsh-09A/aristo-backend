import { getBlogBySlug, getSimilarBlogs } from "@/services/blogs-service";
import { formatIndianFullDateParts } from "@/utils/helper-functions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogsListingsCard from "@/components/frontend/blogs/BlogsListingsCard";

type Props = {
  params: Promise<{ slug: string }>; // Next.js 15+/16 mein params bhi Promise hoti hai
};

// -----------------------------------------------------------------------
// generateMetadata — dynamic <title> aur meta description har blog ke
// liye alag set karta hai (SEO ke liye zaroori). Ye function Next.js
// khud call karta hai, humein kahin se call karne ki zaroorat nahi.
// -----------------------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.title,
    description: blog.body?.slice(0, 160), // pehle 160 characters — meta description ke liye standard length
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  // Agar slug galat hai ya blog draft/deleted hai, 404 page dikhao
  if (!blog) {
    notFound();
  }

  const { day, month, year } = formatIndianFullDateParts(blog.createdAt);

  const relatedBlogs = await getSimilarBlogs(blog.id, 3);

  return (
    <section className="blog-detail-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 pb-5">
            {/* Cover image — fill + aspect-ratio pattern, same as listing card */}
            <div
              className="blog-detail-img mb-4"
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                borderRadius: "10px",
              }}
            >
              <Image
                fill
                src={blog.images[0] || "/assets/images/blog/placeholder.jpg"}
                alt={blog.title}
                style={{ objectFit: "cover", borderRadius: "10px" }}
                sizes="(max-width: 768px) 100vw, 800px"
                priority // above-the-fold hero image — LCP ke liye priority load
              />
            </div>

            <div className="blog-meta mb-3">
              <span className="date text-muted">
                {day} {month} {year}
              </span>
            </div>

            <h1 className="blog-title mb-4">{blog.title}</h1>

            {/* NOTE: agar blog.body HTML string hai (rich text editor se aaya),
                dangerouslySetInnerHTML use karna padega. Agar plain text/markdown
                hai, seedha render kar sakte ho. Neeche dono options diye hain. */}

            {/* Option A: agar body plain text hai */}
            {/* <div className="blog-body">{blog.body}</div> */}

            {/* Option B: agar body HTML hai (rich text editor se), Option A hata
                ke ye use karo — LEKIN sirf tab jab admin trusted hai, kyunki ye
                XSS risk create karta hai agar untrusted input aaye: */}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </div>

          {/* <div className="col-lg-12 mt-2 pt-2">
            <Link
              className="ud-btn btn-white2"
              href={`/blog`}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                width: "max-content",
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
              Back to Blogs
            </Link>
          </div> */}
        </div>

        {/* Related blogs section */}
        {relatedBlogs.length > 0 && (
          <div className="related-blogs mt-5 pt-5 border-top">
            <h3 className="mb-4">Related Posts</h3>
            <div className="row">
              {relatedBlogs.map((related) => (
                <BlogsListingsCard blog={related} key={related.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// <div className="col-sm-6 col-lg-4" key={related.id}>
//   <Link href={`/blogs/${related.slug}`}>
//     <div
//       style={{ position: "relative", aspectRatio: "386 / 271" }}
//     >
//       <Image
//         fill
//         src={related.images[0] || "/assets/images/blog/placeholder.jpg"}
//         alt={related.title}
//         style={{ objectFit: "cover" }}
//         sizes="33vw"
//       />
//     </div>
//     <h6 className="mt-2">{related.title}</h6>
//   </Link>
// </div>
