import React, { useEffect, useState } from "react";
import {
  FaCalendarPlus,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Leave = () => {
  const leaveData = [
    {
      type: "Casual Leave",
      from: "2025-05-01",
      to: "2025-05-02",
      status: "Approved",
    },
    {
      type: "Sick Leave",
      from: "2025-04-10",
      to: "2025-04-12",
      status: "Rejected",
    },
    {
      type: "Earned Leave",
      from: "2025-03-15",
      to: "2025-03-18",
      status: "Pending",
    },
  ];

  const [leaveBalance, setLeaveBalance] = useState({
    casual: 0,
    sick: 0,
    earned: 0,
  });

  const [formData, setFormData] = useState({
    type: "Casual",
    from: "",
    to: "",
    reason: "",
  });

  useEffect(() => {
    // Calculate balance based on "Approved" leaves
    const counts = { casual: 0, sick: 0, earned: 0 };

    leaveData.forEach((leave) => {
      if (leave.status === "Approved") {
        const key = leave.type.toLowerCase().split(" ")[0]; // casual, sick, earned
        if (counts[key] !== undefined) counts[key]++;
      }
    });

    setLeaveBalance(counts);
  }, [leaveData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave Request Submitted:", formData);
    // Here you can trigger an API call to submit the form
  };

  return (
    <div className="p-8 bg-base-100 rounded-2xl shadow-xl w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2 flex items-center gap-3">
        <FaCalendarPlus /> Leave Management
      </h2>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {Object.entries(leaveBalance).map(([type, value], idx) => (
          <div
            key={idx}
            className="bg-base-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <p className="text-lg font-semibold capitalize">{type} Leave</p>
            <p className="text-3xl text-primary font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Leave History */}
      <div className="bg-base-200 rounded-xl p-6 shadow-sm hover:shadow-md transition mb-10">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          Leave History
        </h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave, idx) => (
                <tr key={idx}>
                  <td>{leave.type}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {leave.status === "Approved" && <FaCheckCircle />}
                      {leave.status === "Rejected" && <FaTimesCircle />}
                      {leave.status === "Pending" && <FaClock />}
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Leave */}
      <div className="bg-base-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          Request Leave
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="label font-semibold">Leave Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Casual</option>
              <option>Sick</option>
              <option>Earned</option>
            </select>
          </div>
          <div>
            <label className="label font-semibold">From</label>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-semibold">To</label>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:col-span-3">
            <label className="label font-semibold">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows="3"
            />
          </div>
          <div className="md:col-span-3 text-right">
            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Leave;
