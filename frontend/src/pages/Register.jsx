import React, { useState } from "react";
import TermsModal from "../components/TermsModal";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    createPassword: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    qualification: "",
    department: "",
    position: "",
    hiredDate: "",
    salary: "",
  });

  const [error, setError] = useState({});

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(name, value, type);
    setData((prev) => ({
      ...prev,
      [name]:
        // type === "checkBox" ? checked :
        value,
    }));
  };

  const validate = (data) => {
    let tempErrors = {};

    //fullName
    if (data.fullName.length === 0) {
      tempErrors.fullName = "Name cannot be empty";
    } else if (data.fullName.length < 3) {
      tempErrors.fullName = "Name too short";
    } else if (!/^[A-Za-z\s]+$/.test(data.fullName)) {
      tempErrors.fullName = "Please enter a valid name";
    }

    //email
    const emailDomains = [
      "ricr.in",
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "aol.com",
      "mail.com",
      "zoho.com",
      "protonmail.com",
      "gmx.com",
      "yandex.com",
      "mail.ru",
      "fastmail.com",
      "tutanota.com",
      "hushmail.com",
      "rediffmail.com",
      "inbox.com",
      "att.net",
      "verizon.net",
      "comcast.net",
    ];
    const pattern = emailDomains.toString().replaceAll(",", "|");
    const regexp = new RegExp(`^[a-z\d._]+@(${pattern})$`);
    if (data.email.trim().length === 0) {
      tempErrors.email = "Email cannot be empty";
    } else if (!regexp.test(data.email.trim().toLowerCase())) {
      tempErrors.email = "Please enter a valid email address";
    }

    //phone
    if (data.phone.trim().length === 0) {
      tempErrors.phone = "Email cannot be empty";
    } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
      tempErrors.phone = "Please enter a valid 10-digit Mobile Number";
    }

    //dob

    //confirm password
    if(data.createPassword !== data.confirmPassword){
      tempErrors.confirmPassword = "Passwords does not match"
    }

    setError(tempErrors);
    console.log(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(data)) {
      return;
    }
    // console.log(data);

    try {
      const res = await axios.post("http://localhost:4500/api/auth/register", {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.confirmPassword,
        gender: data.gender,
        dob: data.dob,
        qualification: data.qualification,
        department: data.department,
        position: data.position,
        hiredDate: data.hiredDate,
        salary: data.salary,
      });

      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-base-200 text-neutral-content rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Employee Registration
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="relative w-full">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder=" "
              value={data.fullName}
              onChange={handleChange}
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="fullName"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:left-3 peer-focus:text-primary peer-focus:bg-base-200
                        peer-not-placeholder-shown:-top-7 peer-not-placeholder-shown:bg-base-200
                        "
            >
              Full Name
            </label>
            {error.fullName && (
              <p className="text-sm text-red-600">{error.fullName}</p>
            )}
          </div>

          <div className="relative w-full">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={data.email}
              onChange={handleChange}
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="email"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-7 peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Email
            </label>
            {error.email && (
              <p className="text-sm text-red-600">{error.email}</p>
            )}
          </div>

          <div className="relative w-full">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder=" "
              value={data.phone}
              onChange={handleChange}
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="phone"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-7 peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Phone Number
            </label>
            {error.phone && (
              <p className="text-sm text-red-600">{error.phone}</p>
            )}
          </div>

          <div className="relative w-full">
            <input
              type="password"
              id="createPassword"
              name="createPassword"
              placeholder=" "
              value={data.createPassword}
              onChange={handleChange}
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="createPassword"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Create Password
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" "
              value={data.confirmPassword}
              onChange={handleChange}
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="confirmPassword"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Confirm Password
            </label>
            {error.confirmPassword && (
              <p className="text-sm text-red-600">{error.confirmPassword}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-1 text-gray-500">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={data.gender === "Male"}
                  onChange={handleChange}
                  className="radio radio-primary peer"
                />{" "}
                <span className="peer-checked:text-primary">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={data.gender === "Female"}
                  onChange={handleChange}
                  className="radio radio-primary peer"
                />{" "}
                <span className="peer-checked:text-primary">Female</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={data.gender === "Other"}
                  onChange={handleChange}
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
              value={data.dob}
              onChange={handleChange}
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
              value={data.qualification}
              onChange={handleChange}
              required
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="PHD">PhD</option>
            </select>
            <label
              htmlFor="qualification"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-focus:-top-7 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-valid:-top-7 peer-valid:text-sm peer-valid:text-primary peer-valid:bg-base-200 peer-valid:px-1
                        "
            >
              Qualification
            </label>
          </div>

          <div className="relative w-full">
            <select
              id="department"
              name="department"
              required
              value={data.department}
              onChange={handleChange}
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
            <label
              htmlFor="department"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-focus:-top-7 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-valid:-top-7 peer-valid:text-sm peer-valid:text-primary peer-valid:bg-base-200 peer-valid:px-1
                        "
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
              value={data.position}
              onChange={handleChange}
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="position"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Position
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="date"
              id="hiredDate"
              name="hiredDate"
              value={data.hiredDate}
              onChange={handleChange}
              required
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="hiredDate"
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
              value={data.salary}
              onChange={handleChange}
              className="peer input input-bordered w-full"
            />
            <label
              htmlFor="salary"
              className="
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        "
            >
              Salary
            </label>
          </div>

          <div className="text-base-content">
            {/* const {agree} =  */}
            <TermsModal />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
          <p className="text-base-content text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
