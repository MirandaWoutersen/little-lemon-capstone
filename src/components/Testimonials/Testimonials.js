import React from "react";
import "./Testimonials.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

const testimonials = [
  {
    id: 1,
    author: "Emma Caldwell",
    description: "Really high quality food, I really recommend this nice restaurant!",
    image: "https://picsum.photos/55/55.jpg",
    rating: 5,
  },
  {
    id: 2,
    author: "Alice Well",
    description: "Really high quality food, I really recommend this nice restaurant!",
    image: "https://picsum.photos/55/55.jpg",
    rating: 5,
  },
  {
    id: 3,
    author: "Bianca Hill",
    description: "Really high quality food, I really recommend this nice restaurant!",
    image: "https://picsum.photos/55/55.jpg",
    rating: 4,
  },
  {
    id: 3,
    author: "Ginger Smith",
    description: "Really high quality food, I really recommend this nice restaurant!",
    image: "https://picsum.photos/55/55.jpg",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonial-background">
      <div className="testimonials">
        <div className="testimonials-container">
          <h1 className="testimonial-title">Our customers love us!</h1>
        </div>

        <div className="testimonials-list">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              author={testimonial.author}
              description={testimonial.description}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
