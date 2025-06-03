import React from "react";
import ContactUsForm from "../components/contactUs/ContactUsForm";
import ContactUsCred from "../components/contactUs/ContactUsCred";

const ContactUs = () => {
  return (
    <>
      <div className="bg-base-100 text-base-content">
        {/* Header */}
        <section className="min-h-[40vh] bg-base-200 text-center flex items-center justify-center">
          <div className=" flex-col">
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
