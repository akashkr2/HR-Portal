import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* <div className="navbar bg-base-200 w-full flex gap-5 items-center">
        <div className="logo text-2xl w-1/8 flex items-center justify-center">
          HrPortal.com
        </div>
        <div className="navMenu flex justify-end items-center gap-15 w-5/8">
          <Link to="/">
            <div className="navItems cursor-pointer text-base-content hover:text-primary">
              Home
            </div>
          </Link>
          <Link to="/about">
            <div className="navItems cursor-pointer text-base-content hover:text-primary">
              About
            </div>
          </Link>
          <Link to="/contactUs">
            <div className="navItems cursor-pointer text-base-content hover:text-primary">
              Contact Us
            </div>
          </Link>
        </div>
        <div className="navButtons w-2/8 flex items-center justify-end">
          <div className="auth">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="navbar bg-primary text-primary-content px-6 py-2 space-x-5">
        {/* Logo Section */}
        <div className="flex-1 text-xl font-bold">
          <Link to="/" className="hover:opacity-90">
            HrPortal.com
          </Link>
        </div>

        {/* Nav Links Section */}
        <div className="hidden md:flex gap-6 flex-1">
          <Link to="/">
            <span className="cursor-pointer hover:text-accent">Home</span>
          </Link>
          <Link to="/about">
            <span className="cursor-pointer hover:text-accent">About</span>
          </Link>
          <Link to="/contactUs">
            <span className="cursor-pointer hover:text-accent">Contact Us</span>
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          <Link to="/login">
            <button className="btn btn-accent btn-sm">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
