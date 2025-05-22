import React from "react";

const ContactUsForm = () => {
  return (
    <>
      <div className="bg-base-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-primary">Send a Message</h2>
        <form className="flex flex-col gap-4">
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
            rows="5"
            name="message"
          ></textarea>
          <button className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ContactUsForm;
