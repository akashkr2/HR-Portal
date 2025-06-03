import React, { useState } from "react";
import TermsModal from "../components/TermsModal";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/api";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  //
  const navigate = useNavigate();
  const initialData = {
    fullName: "",
    email: "",
    phone: "",
    createPassword: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    otherBloodGroup: "",
    qualification: "",
    department: "",
    position: "",
    hiredDate: "",
    salary: "",
    address: "",
    shiftStart: "",
    shiftEnd: "",
    weekOff: "",
  };
  const [data, setData] = useState(initialData);

  const [error, setError] = useState({});

  const [agree, setAgree] = useState(false);

  const [required, setRequired] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const bloodTypes = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "checkBox" ? checked : value,
    }));

    if (error[name]) validateField({ name });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validateField({ name });
  };

  const toRegExp = (string) => {
    const escapedChars = Array.from(string)
      .map((char) => char.replace(/[-\/\\^$.*+?()[\]{}|]/g, "\\$&"))
      .join("");
    return new RegExp(`[${escapedChars}]`);
  };

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

  const calculateTime = (start, end) => {
    if (!start || !end) return "";

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const startDate = new Date(0, 0, 0, startH, startM);
    const endDate = new Date(0, 0, 0, endH, endM);

    // Handle overnight case
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffMs = endDate - startDate;

    // const diffH = Math.floor(diffMs / 1000 / 60 / 60);
    // const diffM = Math.floor((diffMs / 1000 / 60) % 60);

    // const pad = (n) => String(n).padStart(2, "0");
    // return `${pad(diffH)}:${pad(diffM)}`;

    const totalMin = Math.floor(diffMs / 1000 / 60);

    return totalMin;
  };

  const validate = () => {
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
    const pattern = emailDomains.join("|").replaceAll(".", "\\.");
    const regexp = new RegExp(
      `^(?!.*\\.\\.)(?!.*\\.$)[a-zA-Z0-9._%+-]+@(${pattern})$`
    );
    if (data.email.trim().length === 0) {
      tempErrors.email = "Email cannot be empty";
    } else if (!regexp.test(data.email.trim().toLowerCase())) {
      tempErrors.email = "Please enter a valid email address";
    }

    //phone
    if (!/^[6-9]\d{9}$/.test(data.phone)) {
      tempErrors.phone = "Please enter a valid 10-digit Mobile Number";
    }

    //create password
    const passErrors = [];
    const allowedChar = `!@#$%^&*()_+,<.>/?;:'"`;

    if (!data.createPassword.trim()) {
      passErrors.push("Password cannot be empty");
    } else {
      if (!/[A-Z]/.test(data.createPassword)) {
        passErrors.push("Password must have at least one uppercase letter");
      }
      if (!/[a-z]/.test(data.createPassword)) {
        passErrors.push("Password must have at least one lowercase letter");
      }
      if (!/\d/.test(data.createPassword)) {
        passErrors.push("Password must have at least one number");
      }
      if (!toRegExp(allowedChar).test(data.createPassword)) {
        passErrors.push("Password must have at least one special character");
      }
      if (!/^[^\s]{8,15}$/.test(data.createPassword)) {
        passErrors.push("Password length must be between 8 and 15 characters");
      }
    }
    if (passErrors.length !== 0) {
      tempErrors.createPassword = passErrors;
    }

    //confirm password
    if (!data.confirmPassword.trim()) {
      tempErrors.confirmPassword = "This field cannot be empty";
    } else if (data.createPassword !== data.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    //gender
    if (!data.gender) {
      tempErrors.gender = "Please select a gender";
    }

    //dob
    if (!data.dob) {
      tempErrors.dob = "Please provide your date of birth";
    } else if (calculateAge(data.dob) < 18) {
      tempErrors.dob = "You must be at least 18 years old";
    }

    //blood group
    if (!data.bloodGroup) {
      tempErrors.bloodGroup = "Please select blood group";
    }

    //other blood group
    if (data.bloodGroup === "Other" && !data.otherBloodGroup.trim()) {
      tempErrors.otherBloodGroup = "Please specify your blood group";
    }

    //qualification
    if (!data.qualification) {
      tempErrors.qualification = "Please select your qualification";
    }

    //department
    if (!data.department) {
      tempErrors.department = "Please select department";
    }

    //position
    if (!data.position.trim()) {
      tempErrors.position = "Please enter your position";
    }

    //hired date
    if (!data.hiredDate) {
      tempErrors.hiredDate = "Please provide hiring date";
    }

    //salary
    if (!data.salary || isNaN(data.salary) || Number(data.salary) <= 0) {
      tempErrors.salary = "Please enter a valid salary amount";
    }

    //address
    if (!data.address.trim()) {
      tempErrors.address = "Please provide your address";
    } else if (data.address.length < 10) {
      tempErrors.address = "Address is too short";
    } else if (data.address.length > 300) {
      tempErrors.address = "Address is too long";
    }

    //shift start time
    if (!data.shiftStart) {
      tempErrors.shiftStart = "Shift start time cannot be empty";
    }

    //shift end time
    if (!data.shiftEnd) {
      tempErrors.shiftEnd = "Shift end time cannot be empty";
    } else {
      const shiftHours = calculateTime(data.shiftStart, data.shiftEnd);
      if (shiftHours < 6 * 60) tempErrors.shiftHours = "Minimum 6 hours";
      else if (shiftHours > 10 * 60) tempErrors.shiftHours = "Maximum 10 hours";
    }

    //work hours (shift start - shift end)

    //weekoff
    if (!data.weekOff) {
      tempErrors.weekOff = "Select a week off";
    }

    //terms and conditions
    if (!agree) {
      tempErrors.agree = "Must agree to Terms and Conditions";
    }

    setError(tempErrors);
    // console.log("errors", tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const validateField = ({ name }) => {
    const allowedChar = `!@#$%^&*()_+,<.>/?;:'"`;
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

    const validators = {
      fullName: () => {
        const val = data.fullName.trim();
        return val.length === 0
          ? "Name cannot be empty"
          : val.length < 3
          ? "Name too short"
          : !/^[A-Za-z\s]+$/.test(val)
          ? "Please enter a valid name"
          : "";
      },
      email: () => {
        const val = data.email.trim().toLowerCase();
        const pattern = emailDomains.join("|").replaceAll(".", "\\.");
        const regexp = new RegExp(
          `^(?!.*\\.\\.)(?!.*\\.$)[a-zA-Z0-9._%+-]+@(${pattern})$`
        );
        return val.length === 0
          ? "Email cannot be empty"
          : !regexp.test(val)
          ? "Please enter a valid email address"
          : "";
      },
      phone: () =>
        /^[6-9]\d{9}$/.test(data.phone)
          ? ""
          : "Please enter a valid 10-digit Mobile Number",

      createPassword: () => {
        const pass = data.createPassword.trim();
        const passErrors = [];
        if (!pass) passErrors.push("Password cannot be empty");
        else {
          if (!/[A-Z]/.test(pass))
            passErrors.push("At least one uppercase letter");
          if (!/[a-z]/.test(pass))
            passErrors.push("At least one lowercase letter");
          if (!/\d/.test(pass)) passErrors.push("At least one number");
          if (
            !new RegExp(
              `[${allowedChar
                .split("")
                .map((c) => "\\" + c)
                .join("")}]`
            ).test(pass)
          )
            passErrors.push("At least one special character");
          if (!/^[^\s]{8,15}$/.test(pass))
            passErrors.push("Length must be 8-15 characters with no spaces");
        }

        if (data.confirmPassword)
          setError((prev) => ({
            ...prev,
            confirmPassword:
              data.confirmPassword === data.createPassword
                ? ""
                : "Passwords do not match",
          }));

        return passErrors;
      },

      confirmPassword: () =>
        !data.confirmPassword.trim()
          ? "This field cannot be empty"
          : data.confirmPassword !== data.createPassword
          ? "Passwords do not match"
          : "",

      gender: () => (!data.gender ? "Please select a gender" : ""),

      dob: () =>
        !data.dob
          ? "Please provide your date of birth"
          : calculateAge(data.dob) < 18
          ? "You must be at least 18 years old"
          : "",

      bloodGroup: () => (!data.bloodGroup ? "Please select blood group" : ""),

      otherBloodGroup: () =>
        data.bloodGroup === "Other" && !data.otherBloodGroup.trim()
          ? "Please specify your blood group"
          : "",

      qualification: () =>
        !data.qualification ? "Please select your qualification" : "",

      department: () => (!data.department ? "Please select department" : ""),

      position: () =>
        !data.position.trim() ? "Please enter your position" : "",

      hiredDate: () => (!data.hiredDate ? "Please provide hiring date" : ""),

      salary: () =>
        !data.salary || isNaN(data.salary) || Number(data.salary) <= 0
          ? "Please enter a valid salary amount"
          : "",

      address: () => {
        const val = data.address.trim();
        return !val
          ? "Please provide your address"
          : val.length < 10
          ? "Address is too short"
          : val.length > 300
          ? "Address is too long"
          : "";
      },

      shiftStart: () => {
        const err = !data.shiftStart ? "Shift start time cannot be empty" : "";
        if (data.shiftEnd) {
          const shiftHours = calculateTime(data.shiftStart, data.shiftEnd);
          setError((prev) => ({
            ...prev,
            shiftHours:
              shiftHours < 360
                ? "Minimum 6 hours"
                : shiftHours > 600
                ? "Maximum 10 hours"
                : "",
          }));
        }
        return err;
      },

      shiftEnd: () => {
        const err = !data.shiftEnd ? "Shift end time cannot be empty" : "";
        if (data.shiftStart) {
          const shiftHours = calculateTime(data.shiftStart, data.shiftEnd);
          setError((prev) => ({
            ...prev,
            shiftHours:
              shiftHours < 360
                ? "Minimum 6 hours"
                : shiftHours > 600
                ? "Maximum 10 hours"
                : "",
          }));
        }
        return err;
      },

      weekOff: () => (!data.weekOff ? "Select a week off" : ""),
    };

    const validator = validators[name];
    // if (!validator) return "";

    //in case of createPassword, it returns an array
    const errorText = validator();

    setError((prev) => ({ ...prev, [name]: errorText }));

    // return errorText;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(data);

    if (!validate()) {
      return;
    }
    // console.log(data);

    const registerPromise = axios.post("/api/auth/employee/register", {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.confirmPassword,
      gender: data.gender,
      dob: data.dob,
      bloodGroup: data.bloodGroup,
      otherBloodGroup: data.otherBloodGroup,
      qualification: data.qualification,
      department: data.department,
      position: data.position,
      hiredDate: data.hiredDate,
      salary: data.salary,
      address: data.address,
      shiftStart: data.shiftStart,
      shiftEnd: data.shiftEnd,
      weekOff: data.weekOff,
    });

    toast.promise(registerPromise, {
      loading: "Creating account...",
      success: (res) => res?.data?.message || "Account created successfully",
      error: (err) =>
        err?.response?.data?.message || err.message || "Server Error",
    });

    try {
      const res = await registerPromise;

      console.log(res.data);
      // toast.success(res.data.message);

      const id = toast.loading("Redirecting to login page...");
      navigate("/login", {
        replace: true,
        state: { fromRegister: true, toastId: id },
      });
    } catch (error) {
      console.error(error);
      // toast.error("Server Error");
    }
  };

  const textLabel = `
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-focus:-top-7 peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-not-placeholder-shown:-top-7 peer-not-placeholder-shown:text-primary peer-not-placeholder-shown:bg-base-200 peer-not-placeholder-shown:px-1
                        `;
  //

  const selectLabel = `
                        absolute left-3 top-2 text-base text-gray-500
                        transition-all duration-200
                        peer-focus:-top-7 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-base-200 peer-focus:px-1
                        peer-valid:-top-7 peer-valid:text-sm peer-valid:text-primary peer-valid:bg-base-200 peer-valid:px-1
                        `;
  //

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-base-200 text-neutral-content rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Employee Registration
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Full Name */}
          <div className="relative w-full">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder=" "
              value={data.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            />
            <label htmlFor="fullName" className={textLabel}>
              Full Name
            </label>
            {error.fullName && (
              <p className="text-sm text-red-600">{error.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              value={data.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            />
            <label htmlFor="email" className={textLabel}>
              Email
            </label>
            {error.email && (
              <p className="text-sm text-red-600">{error.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative w-full">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder=" "
              value={data.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            />
            <label htmlFor="phone" className={textLabel}>
              Phone Number
            </label>
            {error.phone && (
              <p className="text-sm text-red-600">{error.phone}</p>
            )}
          </div>

          {/* Create Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="createPassword"
              name="createPassword"
              placeholder=" "
              value={data.createPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            />
            <label htmlFor="createPassword" className={textLabel}>
              Create Password
            </label>
            <span
              className="absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              // onMouseDown={() => setShowPassword(true)}
              // onMouseUp={() => setShowPassword(false)}
              // onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
            {/* {error.createPassword && (
              <p className="text-sm text-red-600">{error.createPassword}</p>
            )} */}
            {error.createPassword && error.createPassword.length > 0 && (
              <ul className="mt-2 text-sm text-red-500 space-y-1">
                {error.createPassword.map((err, idx) => (
                  <li key={idx}>• {err}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" "
              value={data.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            />
            <label htmlFor="confirmPassword" className={textLabel}>
              Confirm Password
            </label>
            {error.confirmPassword && (
              <p className="text-sm text-red-600">{error.confirmPassword}</p>
            )}
          </div>

          {/* Gender */}
          <div
            className={`w-full input input-bordered flex flex-col gap-2 ${
              error.gender ? "h-25" : "h-20"
            } transition-all`}
          >
            <label className="block mt-2 text-gray-500">Gender</label>
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
            {error.gender && (
              <p className="text-sm text-red-600">{error.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="w-full input input-bordered flex flex-col h-20">
            <label htmlFor="dob" className="text-base mt-2 text-gray-500">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className=""
            />
            {error.dob && <p className="text-sm text-red-600">{error.dob}</p>}
          </div>

          {/* Blood Group */}
          <div className="relative w-full">
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={data.bloodGroup}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              {bloodTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label htmlFor="bloodGroup" className={selectLabel}>
              Blood Group
            </label>
            {error.bloodGroup && (
              <p className="text-sm text-red-600">{error.bloodGroup}</p>
            )}
          </div>
          {data.bloodGroup === "Other" && (
            <div className="relative w-full">
              <input
                id="otherBloodGroup"
                name="otherBloodGroup"
                type="text"
                placeholder=""
                value={data.otherBloodGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                // required={data.bloodGroup==="Other"}
                required={required}
                className="peer input input-bordered w-full"
              />
              <label htmlFor="otherBloodGroup" className={textLabel}>
                Specify Other Blood Type
              </label>
              {error.otherBloodGroup && (
                <p className="text-sm text-red-600">{error.otherBloodGroup}</p>
              )}
            </div>
          )}

          {/* Qualifications */}
          <div className="relative w-full">
            <select
              id="qualification"
              name="qualification"
              value={data.qualification}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="PHD">PhD</option>
            </select>
            <label htmlFor="qualification" className={selectLabel}>
              Qualification
            </label>
            {error.qualification && (
              <p className="text-sm text-red-600">{error.qualification}</p>
            )}
          </div>

          {/* Department */}
          <div className="relative w-full">
            <select
              id="department"
              name="department"
              required={required}
              value={data.department}
              onChange={handleChange}
              onBlur={handleBlur}
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
            <label htmlFor="department" className={selectLabel}>
              Department
            </label>
            {error.department && (
              <p className="text-sm text-red-600">{error.department}</p>
            )}
          </div>

          {/* Position */}
          <div className="relative w-full">
            <input
              type="text"
              id="position"
              name="position"
              required={required}
              placeholder=" "
              value={data.position}
              onChange={handleChange}
              onBlur={handleBlur}
              className="peer input input-bordered w-full"
            />
            <label htmlFor="position" className={textLabel}>
              Position
            </label>
            {error.position && (
              <p className="text-sm text-red-600">{error.position}</p>
            )}
          </div>

          {/* Hiring Date */}
          <div className="w-full input input-bordered flex flex-col h-20">
            <label htmlFor="hiredDate" className="text-base mt-2 text-gray-500">
              Hiring Date
            </label>
            <input
              type="date"
              id="hiredDate"
              name="hiredDate"
              value={data.hiredDate}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className=""
            />
            {error.hiredDate && (
              <p className="text-sm text-red-600">{error.hiredDate}</p>
            )}
          </div>

          {/* Salary */}
          <div className="relative w-full">
            <input
              type="number"
              id="salary"
              name="salary"
              required={required}
              placeholder=" "
              value={data.salary}
              onChange={handleChange}
              onBlur={handleBlur}
              className="peer input input-bordered w-full"
            />
            <label htmlFor="salary" className={textLabel}>
              Salary
            </label>
            {error.salary && (
              <p className="text-sm text-red-600">{error.salary}</p>
            )}
          </div>

          {/* Address */}
          <div className="relative w-full">
            <textarea
              id="address"
              name="address"
              placeholder=" "
              value={data.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer textarea textarea-bordered w-full min-h-[100px]"
            />
            <label htmlFor="address" className={textLabel}>
              Address
            </label>
            {error.address && (
              <p className="text-sm text-red-600">{error.address}</p>
            )}
          </div>

          {/* Shift hours */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-5">
              {/* Shift Start Time */}
              <div className="w-full input input-bordered flex flex-col h-20">
                <label
                  htmlFor="shiftStart"
                  className="text-base mt-2 text-gray-500"
                >
                  Shift Start Time
                </label>
                <input
                  type="time"
                  id="shiftStart"
                  name="shiftStart"
                  value={data.shiftStart}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={required}
                  className=""
                />
                {error.shiftStart && (
                  <p className="text-sm text-red-600">{error.shiftStart}</p>
                )}
              </div>

              {/* Shift End Time */}
              <div className="w-full input input-bordered flex flex-col h-20">
                <label
                  htmlFor="shiftEnd"
                  className="text-base mt-2 text-gray-500"
                >
                  Shift End Time
                </label>
                <input
                  type="time"
                  id="shiftEnd"
                  name="shiftEnd"
                  value={data.shiftEnd}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={required}
                  className=""
                />
                {error.shiftEnd && (
                  <p className="text-sm text-red-600">{error.shiftEnd}</p>
                )}
              </div>
            </div>
            {error.shiftHours && (
              <p className="text-sm text-red-600">{error.shiftHours}</p>
            )}
          </div>

          {/* Week Off */}
          <div className="relative w-full">
            <select
              id="weekOff"
              name="weekOff"
              value={data.weekOff}
              onChange={handleChange}
              onBlur={handleBlur}
              required={required}
              className="peer input input-bordered w-full"
            >
              <option value="" disabled></option>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <label htmlFor="weekOff" className={selectLabel}>
              Week Off
            </label>
            {error.weekOff && (
              <p className="text-sm text-red-600">{error.weekOff}</p>
            )}
          </div>

          <div className="text-base-content">
            {/* const {agree} =  */}
            <TermsModal agree={agree} setAgree={setAgree} />
            {error.agree && (
              <p className="text-sm text-red-600 mt-1">{error.agree}</p>
            )}
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
