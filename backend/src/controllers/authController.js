//
import bcrypt from "bcrypt";
import Employee from "../models/empModel.js";
import generateToken from "../config/jwtToken.js";
import getNextSeq from "../utils/getNextSequence.js";
import decrementSeq from "../utils/decrementSeq.js";

const generateEmpId = async ({ department, position, gender, hiredDate }) => {
  // console.log(department, position, gender, hiredDate);
  let key = "";
  try {
    const prefix = "Emp";
    const dateObj = new Date(hiredDate);
    const dept = department
      .substring(0, 3)
      .split("")
      .map((letter, index) =>
        index === 0 ? letter.toUpperCase() : letter.toLowerCase()
      )
      .join("");
    const pos = position
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    // console.log(pos);
    const yy = String(dateObj.getFullYear()).slice(-2);
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const genInit = gender?.[0].toUpperCase() || "X";

    key = `${dept}-${pos}`;
    const sequence = await getNextSeq(key);

    const empId = `${prefix}${dept}${pos}${yy}${mm}${sequence}${genInit}`;

    // console.log(empId);
    return empId;
  } catch (error) {
    console.log(error);
    if (key) await decrementSeq(key);
    throw error;
  }
};

export const empRegister = async (req, res, next) => {
  try {
    const data = req.body;

    // console.log(data);

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "password",
      "gender",
      "dob",
      "bloodGroup",
      "qualification",
      "department",
      "position",
      "hiredDate",
      "salary",
      "address",
      "shiftStart",
      "shiftEnd",
      "weekOff",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      const err = new Error("All fields are required");
      err.statusCode = 400;
      throw err;
    }

    const email = data.email;

    const existingEmp = await Employee.findOne({ email });

    if (existingEmp) {
      // console.log("existing", existingEmp);
      const err = new Error("User already exists");
      err.statusCode = 409;
      throw err;
    }

    const empId = await generateEmpId({
      department: data.department,
      position: data.position,
      gender: data.gender,
      hiredDate: data.hiredDate,
    });
    console.log("empId:", empId);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newEmp = await Employee.create({
      ...data,
      empId,
      password: hashedPassword,
      status: "Active",
      profilePic: "",
    });

    // res.status(200).json({ message: "User Created", user: newEmp });
    setTimeout(() => {
      res.status(200).json({ message: "User Created", user: newEmp });
    }, 3000);
  } catch (e) {
    // console.log(e.message);
    next(e);
  }
};

export const empLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "all fields required" });
  }
  const emp = await Employee.findOne({ email });
  if (!emp) {
    res.status(404).json({ message: "user not found" });
  }
  const isPassValid = await bcrypt.compare(password, emp.password);
  if (!isPassValid) {
    res.status(401).json({ message: "incorrect password" });
  }

  generateToken(emp._id, res);

  res
    .status(200)
    .json({ message: `Welcome back ${emp.fullName}`, userData: emp });
};
