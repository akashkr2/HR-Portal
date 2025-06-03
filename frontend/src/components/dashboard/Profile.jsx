import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../config/api";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaBirthdayCake,
  FaUniversity,
  FaBriefcase,
  FaCalendarAlt,
  FaMoneyBill,
  FaHome,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";

const Detail = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 bg-base-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
    <div className="text-primary text-xl mt-[1.5px]">{icon}</div>
    <div>
      <p className="font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  </div>
);

const Profile = () => {
  //

  const dummyData = {
    fullName: "Akash Kumar Singh",
    email: "akash@example.com",
    phone: "9876543210",
    password: "SecurePassword123!",
    gender: "Male",
    dob: "2002-05-10",
    qualification: "B.Tech",
    department: "Engineering",
    position: "Full Stack Developer",
    hiredDate: "2024-06-01",
    salary: "60000",
    address: "Bhopal, India",
    shiftStartTime: "10:00",
    shiftEndTime: "18:00",
    weekOff: "Sunday",
  };

  const [user, setUser] = useState(dummyData);

  const fetchEmpData = async () => {
    try {
      const res = await axios.get("/api/user/profile");
      console.log(res.data.userData);
      setUser(res.data.userData);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchEmpData();
  }, []);

  const profileFields = [
    {
      icon: <FaUser />,
      label: "Full Name",
      value: user.fullName,
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: user.email,
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: user.phone,
    },
    {
      icon: <FaVenusMars />,
      label: "Gender",
      value: user.gender,
    },
    {
      icon: <FaBirthdayCake />,
      label: "Date of Birth",
      value: user.dob,
    },
    {
      icon: <FaUniversity />,
      label: "Qualification",
      value: user.qualification,
    },
    {
      icon: <FaBriefcase />,
      label: "Department",
      value: user.department,
    },
    {
      icon: <FaBriefcase />,
      label: "Position",
      value: user.position,
    },
    {
      icon: <FaCalendarAlt />,
      label: "Hired Date",
      value: user.hiredDate,
    },
    {
      icon: <FaMoneyBill />,
      label: "Salary",
      value: user.salary ? `₹${user.salary.toLocaleString()}` : "N/A",
    },
    {
      icon: <FaUniversity />,
      label: "Address",
      value: user.address,
    },
    {
      icon: <FaCalendarAlt />,
      label: "Shift Start Time",
      value: user.shiftStartTime,
    },
    {
      icon: <FaCalendarAlt />,
      label: "Shift End Time",
      value: user.shiftEndTime,
    },
    {
      icon: <FaCalendarCheck />,
      label: "Week Off",
      value: user.weekOff,
    },
  ];

  return (
    <div className="p-8 bg-base-100 rounded-2xl shadow-xl w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">
        Employee Profile
      </h2>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        <img
          src={
            user.profilePic ||
            `https://placehold.co/150x150.png?text=${
              user.fullName?.[0] || "User"
            }`
          }
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover shadow-md"
        />
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-semibold text-primary">
            {user.fullName || "N/A"}
          </h3>
          <p className="text-base-content">
            {user.position || "Position not set"} -{" "}
            {user.department || "Department not set"}
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-base-content">
        {profileFields.map(
          (field, idx) =>
            field.value && (
              <Detail
                key={idx}
                icon={field.icon}
                label={field.label}
                value={field.value}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Profile;
