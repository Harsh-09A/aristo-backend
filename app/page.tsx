import Link from "next/link";

const Home = async () => {
  return (
    <>
      {/* Home Banner Style V1 */}
      <section
        className="home-banner-style1 p0"
        style={{
          backgroundImage: "url(/assets/images/banners/navi-mumbai-bg-600.jpeg)",
        }}
      >
        <div className="home-style1">
          <div className="container">
            <div className="row">
              <div className="col-xl-11 mx-auto">
                {/* <Hero /> */}
              </div>
            </div>
          </div>
          {/* End .container */}
        </div>
      </section>
      {/* End Home Banner Style V1 */}
    </>
  );
};

export default Home;
