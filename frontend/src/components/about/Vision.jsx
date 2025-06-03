import React from "react";

const Vision = () => {
  return (
    <>
      <div className="py-20 px-6 md:px-20 bg-base-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Our Mission
            </h2>
            <p>
              To automate and streamline HR processes so businesses can focus on
              people, not paperwork.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Our Vision
            </h2>
            <p>
              To become the go-to HR solution for growing companies by
              delivering simplicity, clarity, and efficiency.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vision;
