import React from "react";
import { Link } from "react-router-dom";
import About1 from "../components/about/About1";

const Homepage = () => {
  return (
    <>
      <div className="bg-base-100 text-base-content">
        {/* Hero Section */}
        <section className="hero min-h-[80vh] bg-base-200 flex flex-col items-center py-5">
          <div className="hero-content flex-col lg:flex-row-reverse gap-10">
            <img
              src="https://placehold.co/500x300?text=HR+Illustration"
              className="max-w-md rounded-lg shadow-2xl"
              alt="Hero"
            />
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-5xl font-bold text-primary text-center">
                Streamline HR, Effortlessly
              </h1>
              <p className="py-6 text-base-content text-center">
                Manage your employees, onboarding, payroll, and more—all in one
                place.
              </p>
              <Link to="/signup" className="">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 md:px-20 bg-base-100">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">
            Why HrPortal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center">Easy Onboarding</h3>
                <p>
                  Digitally onboard new hires and automate their paperwork with
                  ease.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center">
                  Payroll Integration
                </h3>
                <p>
                  Track attendance, leaves, and automate monthly salaries
                  accurately.
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center">
                  Analytics & Reports
                </h3>
                <p>
                  Gain insights into your workforce with beautiful dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-base-200 py-16 px-6 md:px-20">
          <About1/>
        </section>
      </div>
    </>
  );
};

export default Homepage;
