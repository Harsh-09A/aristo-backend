const Features = () => {
  // Define an array of feature objects
  const features = [
    {
      icon: "flaticon-security",
      title: "Deep Local Market Knowledge",
      description:
        "In-depth understanding of Navi Mumbai’s micro-markets and trends.",
    },
    {
      icon: "flaticon-keywording",
      title: "Verified Property Opportunities",
      description:
        "Access to genuine and legally verified properties only.",
    },
    {
      icon: "flaticon-investment",
      title: "Strong Negotiation Expertise",
      description:
        "We negotiate the best value for you.",
    },
    {
      icon: "flaticon-investment",
      title: "Long-Term Client Relationships",
      description:
        "We believe in relationships that go beyond transactions.",
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div className="list-one d-flex align-items-start mb30" key={index}>
          <span className={`list-icon flex-shrink-0 ${feature.icon}`} />
          <div className="list-content flex-grow-1 ml20">
            <h6 className="mb-1">{feature.title}</h6>
            <p className="text mb-0 fz15">{feature.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
