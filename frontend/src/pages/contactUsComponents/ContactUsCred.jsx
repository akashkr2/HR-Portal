import React from "react";

const ContactUsCred = () => {
  return (
    <>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-primary">Reach Us</h3>
          <p>
            123 Corporate Avenue, Suite 456
            <br />
            Bhopal, MP, India
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-primary">Email</h3>
          <p>support@hrportal.com</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-primary">Phone</h3>
          <p>+91 98765 43210</p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://placehold.co/500x300?text=Map+or+Visual"
            alt="Location Placeholder"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default ContactUsCred;
