import BlogsListingsCard from "@/components/frontend/blogs/BlogsListingsCard";
import Pagination from "@/components/frontend/common/pagination/Pagination";
import { getBlogs } from "@/services/blogs-service";

type Props = {
  searchParams: Promise<{ page?: string }>; 
};

export default async function BlogsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) > 0 ? Number(params.page) : 1;

  const { blogs, totalPages } = await getBlogs(currentPage);

  return (
    <>
      {/* Breadcrumb Sections */}
      <section
        className="breadcumb-section2 p-0"
        style={{
          backgroundImage: 'url("/assets/images/innerpages/about-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title text-white">Blogs</h2>
                <div className="breadcumb-list ">
                  <a href="#">Home</a>
                  <a href="#">Blogs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}

      <section className="blog-page-section">
        <div className="container">
          <div className="row">
            {blogs.length === 0 ? (
              <p>No Blogs Added.</p>
            ) : (
              blogs.map((blog) => (
                <BlogsListingsCard key={blog.id} blog={blog} />
              ))
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={params}
            basePath="/blog"
          />
        </div>
      </section>
    </>
  );
}
