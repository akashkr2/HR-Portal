import React, { useState } from "react";

const TermsModal = ({ text = "I agree to" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = (e) => {
    if (e.target.id === "modal") setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          className="checkbox checkbox-primary"
          required
          checked={agree}
          onClick={() => {
            setAgree((prev) => !prev);
          }}
        />
        <span className="">
          {text}{" "}
          <button
            type="button"
            onClick={openModal}
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Terms and Conditions
          </button>
        </span>
      </div>

      {isOpen && (
        <div
          id="modal"
          className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center overflow-y-auto"
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full m-4">
            <div className="">
              <div className=" p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Terms & Conditions</h3>
                <button
                  type="button"
                  className="btn btn-text btn-circle btn-sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>

              <div className=" p-4 max-h-[400px] overflow-y-auto text-sm text-gray-700 text-justify">
                <p>
                  Welcome to our application. By accessing or using our service,
                  you agree to be bound by these terms and conditions. Please
                  read them carefully.
                </p>
                <br />
                <p>
                  1. Use of Service: You must use the service in compliance with
                  all applicable laws and not for any unlawful purpose.
                </p>
                <p>
                  2. Privacy: We respect your privacy. Please read our Privacy
                  Policy for more details on how we collect and use information.
                </p>
                <p>
                  3. Intellectual Property: All content, trademarks, and data on
                  this site are the property of the company unless otherwise
                  stated.
                </p>
                <p>
                  4. Limitation of Liability: We are not responsible for any
                  damages resulting from the use or inability to use the
                  service.
                </p>
                <p>
                  5. Changes: We may update these terms at any time. Continued
                  use of the service indicates acceptance of the new terms.
                </p>
                <br />
                <p>
                  If you have questions about these terms, please contact us at
                  support@example.com.
                </p>
              </div>

              <div className=" p-4 border-t flex justify-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setIsOpen(false);
                    setAgree(true);
                  }}
                >
                  I Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsModal;
