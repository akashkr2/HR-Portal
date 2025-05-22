import React from "react";
import About1 from "./aboutComponents/About1";
import Vision from "./aboutComponents/Vision";
import Team from "./aboutComponents/Team";

const About = () => {
  return (
    <>
      <div className="bg-base-100 text-base-content">
        {/* Hero Section */}
        <section>
          <About1 />
        </section>

        {/* Mission & Vision */}
        <section>
          <Vision />
        </section>

        {/* Team Section */}
        <section>
          <Team />
        </section>
      </div>
    </>
  );
};

export default About;
