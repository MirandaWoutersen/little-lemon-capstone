import React from "react";
import Hero from "../../Hero/Hero";
import Specials from "../../Specials/Specials";
import Testimonials from "../../Testimonials/Testimonials";
import AboutSection from "../../AboutSection/AboutSection";

const Home = () => {
  return (
    <>
        <Hero />
        <Specials />
        <Testimonials />
        <AboutSection />
    </>
  );
};

export default Home;
