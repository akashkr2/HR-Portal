import mongoose from "mongoose";

const empSchema = mongoose.Schema(
  {
    empId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    dob: { type: String, required: true },
    qualification: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Other"],
      required: true,
    },
    otherBloodGroup: {
      type: String, // only filled when bloodGroup === "Other"
      default: "",
    },
    department: { type: String, required: true },
    position: { type: String, required: true },
    hiredDate: { type: String, required: true }, // Date of Hiring
    salary: { type: String, required: true },
    address: { type: String, required: true },
    shiftStart: { type: String, required: true },
    shiftEnd: { type: String, required: true },
    weekOff: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Terminated", "Retired", "Resigned"],
      required: true,
      default: "Active",
    },
    profilePic: { type: String },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", empSchema);

export default Employee;
