import Link from "next/link";

export const metadata = {
  title: "Not-Found ",
};

const NotFound = () => {
  return (
    <>
      {/* Error/404 Section Area */}
      <section className="our-error py-4 m-0">
        <div className="container">
          <div className="row align-items-center">

            {/* End .col-6 */}

            <div
              className="col-12  wow fadeInLeft"
              data-aos="fade-right"
            >
              <div className="error_page_content text-center">
                <div className="erro_code">
                  <span className="text-thm">40</span>4
                </div>
                <div className="h2 error_title">
                  Oops! It looks like you&apos;re lost.
                </div>
                <p className="text fz15 ">
                  The page you&apos;re looking for isn&apos;t available. Try to
                  search again <br className="d-none d-lg-block" /> or use the
                  go to.
                </p>
                <Link href="/" className="ud-btn btn-dark">
                  Go Back To Homepage
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
            {/* End .col-6 */}
          </div>
        </div>
      </section>
      {/* End Error/404 Section Area */}
    </>
  );
};

export default NotFound;
