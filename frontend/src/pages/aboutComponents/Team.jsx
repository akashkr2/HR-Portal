import React from "react";

const Team = () => {
  return (
    <>
      <div className="bg-base-200 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card w-72 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={`https://placehold.co/200x200?text=Member+${i}`}
                  alt={`Team Member ${i}`}
                  className="rounded-full"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">Team Member {i}</h3>
                <p>Role or Responsibility</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
