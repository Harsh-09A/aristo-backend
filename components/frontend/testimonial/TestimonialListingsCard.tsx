// 1. Interface define karein
export interface Testimonial {
  id: number;
  title: string;
  quote: string;
  stars: number;
  name: string;
  company: string;
}

// 2. Component ke Props define karein
interface TestimonialCardProps {
  testimonial: Testimonial;
}


const TestimonialListingsCard = ({ testimonial }:TestimonialCardProps) => {
  return (
    <>
      <div className="item">
        <div className="testimonial-style1 position-relative">
          <div className="testimonial-content">
            <h5 className="title">{testimonial.title}</h5>
            <span className="icon fas fa-quote-left" />
            <p className="text">{testimonial.quote}</p>
            <div className="testimonial-review">
              {Array.from({ length: testimonial.stars }, (_, index) => (
                <a className="me-1" href="#" key={index}>
                  <i className="fas fa-star" />
                </a>
              ))}
            </div>
          </div>
          <div className="thumb d-flex align-items-center">
            <div className="flex-grow-1 ms-3">
              <h6 className="mb-0">{testimonial.name}</h6>
              <p className="mb-0">{testimonial.company}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialListingsCard;
