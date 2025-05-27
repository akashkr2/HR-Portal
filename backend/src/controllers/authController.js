//
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const userRegister = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      gender,
      dob,
      qualification,
      department,
      position,
      hiredDate,
      salary,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !qualification ||
      !department ||
      !position ||
      !hiredDate ||
      !salary
    ) {
      console.log("all fields required");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      gender,
      dob,
      qualification,
      department,
      position,
      hiredDate,
      salary,
      status: "Active",
      profilePic: "",
    });

    res.status(200).json({ message: "User Created", user: newUser });
  } catch (e) {
    console.log(e.message);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "all fields required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid) {
    res.status(401).json({ message: "incorrect password" });
  }

//   console.log(user);

  res
    .status(200)
    .json({ message: `Welcome back ${user.fullName}`, userData: user });
};
