import React from "react";
import ContactUsForm from "./contactUsComponents/ContactUsForm";
import ContactUsCred from "./contactUsComponents/ContactUsCred";

const ContactUs = () => {
  return (
    <>
      <div className="bg-base-100 text-base-content">
        {/* Header */}
        <section className="hero min-h-[40vh] bg-base-200 text-center">
          <div className="hero-content flex-col">
            <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
            <p className="text-base-content mt-4">
              We'd love to hear from you. Reach out with questions, suggestions,
              or feedback!
            </p>
          </div>
        </section>

        {/* Main Contact Section */}
        <section>
          <div className="py-16 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Contact Form (Visual Only) */}
            <ContactUsForm />
            {/* Right: Contact Info & Map/Visual */}
            <ContactUsCred />
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
