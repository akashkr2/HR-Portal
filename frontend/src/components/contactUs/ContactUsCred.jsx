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
          {/* <img
            src="https://placehold.co/500x300?text=Map+or+Visual"
            alt="Location Placeholder"
            className="w-full h-auto"
          /> */}
          <iframe
            title="Google Map - RICR"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.2884171043165!2d77.45477337442388!3d23.268967607090044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c6967f58e0dbf%3A0x65d0724cf8368e2d!2sRICR%20-%20Raj%20Institute%20of%20Coding%20%26%20Robotics%20%7C%20Best%20Java%20Coding%20Classes%20In%20Bhopal!5e0!3m2!1sen!2sin!4v1748013611456!5m2!1sen!2sin"
            width="500"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            // className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default ContactUsCred;
