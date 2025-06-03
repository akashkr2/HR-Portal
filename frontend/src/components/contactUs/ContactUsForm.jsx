import React from "react";

const ContactUsForm = () => {
  return (
    <>
      <div className="bg-base-200 p-8 rounded-xl shadow-lg h-full flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-6 text-primary">Send a Message</h2>
        <form className="h-full flex flex-col justify-center gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            name="name"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            name="email"
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Your Message"
            rows="9"
            name="message"
          ></textarea>
          <button className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ContactUsForm;
