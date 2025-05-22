import React from "react";
import TermsModal from "../components/TermsModal";

const Signup = () => {
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-base-200 text-neutral-content rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Employee Registration
        </h2>
        <form className="flex flex-col gap-6">
          <div className="relative w-full">
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" "
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="name"
              className="
      absolute left-3 top-2 text-base text-gray-500
      transition-all duration-200
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
      peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
    "
            >
              Full Name
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="email"
              className="
      absolute left-3 top-2 text-base text-gray-500
      transition-all duration-200
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
      peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
    "
            >
              Email
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder=" "
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="phone"
              className="
      absolute left-3 top-2 text-base text-gray-500
      transition-all duration-200
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
      peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
    "
            >
              Phone Number
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="password"
              className="
      absolute left-3 top-2 text-base text-gray-500
      transition-all duration-200
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
      peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
    "
            >
              Password
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" "
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="confirmPassword"
              className="
      absolute left-3 top-2 text-base text-gray-500
      transition-all duration-200
      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
      peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
    "
            >
              Confirm Password
            </label>
          </div>

          <div className="w-full">
            <label className="block mb-1 text-gray-500">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="radio radio-primary peer"
                />{" "}
                <span className="peer-checked:text-primary">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="radio radio-primary peer"
                />{" "}
                <span className="peer-checked:text-primary">Female</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="radio radio-primary peer"
                />{" "}
                <span className="peer-checked:text-primary">Other</span>
              </label>
            </div>
          </div>

          <div className="relative w-full">
            <input
              type="date"
              id="dob"
              name="dob"
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="dob"
              className="absolute left-3 -top-6 opacity-0 text-base text-gray-500 transition-all duration-200 peer-focus:opacity-100 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200"
            >
              Date of Birth
            </label>
          </div>

          <div className="relative w-full">
            <select
              id="qualification"
              name="qualification"
              defaultValue={""}
              required
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              <option value="btech">B.Tech</option>
              <option value="mtech">M.Tech</option>
              <option value="mba">MBA</option>
              <option value="phd">PhD</option>
            </select>
            <label
              htmlFor="qualification"
              className="absolute left-3 top-2 text-base text-gray-500 transition-all duration-200 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200"
            >
              Qualification
            </label>
          </div>

          <div className="relative w-full">
            <select
              id="department"
              name="department"
              required
              defaultValue={""}
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              <option value="hr">HR</option>
              <option value="engineering">Engineering</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
            </select>
            <label
              htmlFor="department"
              className="absolute left-3 top-2 text-base text-gray-500 transition-all duration-200 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200"
            >
              Department
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              id="position"
              name="position"
              required
              placeholder=" "
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="position"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Position
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="date"
              id="hiringDate"
              name="hiringDate"
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="hiringDate"
              className="absolute left-3 -top-6 opacity-0 text-base text-gray-500 transition-all duration-200 peer-focus:opacity-100 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200"
            >
              Hiring Date
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="number"
              id="salary"
              name="salary"
              required
              placeholder=" "
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="salary"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Salary
            </label>
          </div>

          <div className="text-gray-500">
            <TermsModal />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
