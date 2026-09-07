import SectionHeading from "@/components/frontend/common/sections/SectionHeading";
import TeamBioText from "@/components/frontend/static-pages/team/TeamBioText";
import Image from "next/image";

const teamMembers = [
  {
    id: "gurnomal-rochani",
    name: "Mr. Gurnomal T. Rochani",
    designation: "Founder",
    image: "/assets/images/innerpages/teams/gurnomal.jpg",
    bio: [
      "More than forty years ago, in the picturesque town of Ulhasnagar near Thane, Mr. Gurnomal T. Rochani laid the foundation of Aristo Real Estate Consultants. His deep-rooted expertise in the real estate development sector has been instrumental in shaping the company's journey towards remarkable success. Over the years, his unwavering commitment to excellence has propelled Aristo Real Estate Consultants to the forefront of the industry, earning it a distinguished reputation as one of the premier Property Advisors in Navi Mumbai.",
      "Mr. Rochani's visionary leadership has been the driving force behind the company's growth and evolution. With a clear focus on delivering exceptional service, he has steered Aristo Real Estate Consultants on a path of continuous improvement and innovation. Under his guidance, the company has become synonymous with integrity, professionalism, and client satisfaction.",
      "Right from its inception, Mr. Rochani envisioned Aristo Real Estate Consultants as more than just a business entity. His aim has always been to create a well-structured and professional platform that prioritizes the diverse needs of its clients. This client-centric approach has not only shaped the company's culture but has also laid the foundation for its enduring success and progressive growth trajectory.",
    ],
  },
  {
    id: "navin-rochani",
    name: "Mr. Navin G. Rochani",
    designation: "Director - Project Development",
    image: "/assets/images/innerpages/teams/navin.jpg",
    bio: [
      "In 1993, Mr. Navin G. Rochani, eldest son of Mr. Gurnomal T. Rochani, joined the company, infusing it with fresh perspectives and initiatives. Recognizing the potential for expansion, he diversified the business into construction and founded Aristo Builders & Developers. Under his leadership, the company has successfully completed four notable projects: Aristo Avenue, Aristo Bliss, Aristo Classic, and Aristo Divine.",
      "With a passion for excellence, Mr. Navin's primary focus within Aristo Builders & Developers lies in project development. He meticulously oversees each stage of construction, ensuring that both architectural integrity and aesthetic appeal are seamlessly integrated into every project. Through his vision and dedication, Aristo Builders & Developers has earned a reputation for delivering high-quality developments that exceed expectations.",
    ],
  },
  {
    id: "haresh-rochani",
    name: "Mr. Haresh G. Rochani",
    designation: "Director - Sales & Marketing",
    image: "/assets/images/innerpages/teams/haresh.jpg",
    bio: [
      "In 1999, Mr. Haresh G. Rochani, the younger son of Mr. Gurnomal T. Rochani, became an integral part of the company. Since joining, he has spearheaded the Sales & Marketing department, demonstrating exceptional leadership and strategic acumen. Leading a team of Managers and Executives, Mr. Haresh oversees all aspects of sales operations, ensuring efficiency and effectiveness in achieving organizational goals.",
      "His role extends beyond sales and marketing, encompassing a wide range of business activities. From financial closures and investment decisions to navigating legal complexities and managing permissions, Mr. Haresh is involved in every facet of the company's operations. Additionally, he plays a pivotal role in marketing and branding initiatives, driving the company's visibility and reputation in the market.",
      "Mr. Haresh G. Rochani's involvement in large-scale land acquisition transactions underscores his keen business acumen and strategic foresight. He thrives on building relationships, tackling complex challenges, and leading teams to success. His unwavering dedication, coupled with his passion for excellence, has been instrumental in shaping the company's trajectory and solidifying its position as a leading organization in the industry.",
    ],
  },
  {
    id: "satish-gangwani",
    name: "Mr. Satish Gangwani",
    designation: "Regional Head - Vashi to Belapur",
    image: "/assets/images/innerpages/teams/satish.jpg",
    bio: [
      "After a successful tenure in Johannesburg, South Africa, Mr. Satish A. Gangwani brought his expertise to Aristo Real Estate in 2013. Initially focusing on Ulwe, he has since ascended to lead the dynamic Vashi to Belapur region with precision and vision. With a proven track record of strategic leadership and brilliant market insight, Mr. Satish Gangwani has played an instrumental role in expanding Aristo Real Estate's presence in the vibrant real estate landscape.",
      "His dedication to excellence and commitment to client satisfaction have solidified his reputation as a trusted industry leader. Under his guidance, the Vashi to Belapur region has flourished, offering unparalleled opportunities for investors and homeowners alike. Mr. Gangwani's visionary approach and unwavering dedication continue to drive Aristo Real Estate towards new heights of success and innovation.",
    ],
  },
];

const TeamPage = () => {
  return (
    <>
      {/* Breadcrumb Section */}
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
                <h2 className="title text-white">Our Executive Team</h2>
                <div className="breadcumb-list text-white fs-5">
                  <a href="#" className="text-white">
                    Home
                  </a>
                  <a href="#" className="text-white">
                    Our Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Section */}

      {/* Intro Area */}
      <section className="team-intro pt90 pb40">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-8">
              <SectionHeading
                heading={"Leadership"}
                title={"Meet Our "}
                highlight={"Executive Team"}
                subtitle={
                  " Four decades of trust, vision and leadership behind Aristo's success."
                }
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Intro Area */}

      {/* Team Members Area */}
      <section className="team-members pb90">
        <div className="container">
          {teamMembers.map((member, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={member.id}
                className={`row align-items-center team-member-row ${
                  index !== teamMembers.length - 1 ? "mb60" : ""
                }`}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {/* Image column */}
                <div
                  className={`col-lg-5 order-1 ${
                    isReversed ? "order-lg-2" : "order-lg-1"
                  } mb30-md`}
                >
                  <div className="team-photo-wrap position-relative rounded-4 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={500}
                      height={600}
                      className="w-100 cover"
                      style={{ objectFit: "cover", aspectRatio: "5 / 6" }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
                      }}
                    >
                      <h6 className="text-white mb-0">{member.designation}</h6>
                    </div>
                  </div>
                </div>

                {/* Text column */}
                <div
                  className={`col-lg-7 order-2 ${
                    isReversed ? "order-lg-1" : "order-lg-2"
                  } ${isReversed ? "ps-lg-0 pe-lg-5" : "ps-lg-5"}`}
                >
                  <span
                    className="d-inline-block mb-2 fw-semibold color-primary"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    {member.designation}
                  </span>
                  <h3 className="title mb20">{member.name}</h3>

                  {/* Ab bio + read more logic isolated client component mein hai */}
                  <TeamBioText
                    firstParagraph={member.bio[0]}
                    restParagraphs={member.bio.slice(1)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* End Team Members Area */}
    </>
  );
};

export default TeamPage;
