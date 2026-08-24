const Mission = () => {
  const missionData = [
    {
      icon: "flaticon-garden",
      title: "25+ Years",
      description: "Of Market Presence in Navi Mumbai",
    },
    {
      icon: "flaticon-secure-payment",
      title: "2500+ Clients",
      description: "Successful Transactions",
    },
    {
      icon: "flaticon-secure-payment",
      title: "Residential + Commercial",
      description: "Property Advisor",
    },
    {
      icon: "flaticon-secure-payment",
      title: "Trusted by HNIs",
      description: "Corporates & NRI Investors",
    },
  ];

  return (
    <>
      {missionData.map((item, index) => (
        <div className="col-sm-3" key={index}>
          <div className="why-chose-list style3">
            <div className="list-one mb30">
              <span className={`list-icon flex-shrink-0 ${item.icon} mb20`} />
              <div className="list-content flex-grow-1">
                <h6 className="mb-1">{item.title}</h6>
                <p className="text mb-0 fz14">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Mission;
