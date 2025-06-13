// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pencil, Trash2, EyeOff, CheckCircle } from "lucide-react";

// const CouponManager = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [formData, setFormData] = useState({
//     couponName: "",
//     discount: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [editId, setEditId] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetchCoupons();
//   }, [filter]);

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   const fetchCoupons = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4545/coupon/getallcoupon",
//         getAuthHeaders()
//       );
//       setCoupons(res.data.showallcoupon);
//     } catch (err) {
//       console.error("Error fetching coupons:", err);
//     }
//   };

//   console.log(`>>>>coupons>>>`, coupons)

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let res;
//       if (editId) {
//         res = await axios.put(
//           `http://localhost:4545/coupon/updatecoupon/${editId}`,
//           formData,
//           getAuthHeaders()
//         );
//         alert(res.data.message);
//         setEditId(null);
//       } else {
//         res = await axios.post(
//           "http://localhost:4545/coupon/addcoupon",
//           { ...formData, isActive: true },
//           getAuthHeaders()
//         );
//         alert(res.data.message);
//       }
//       setFormData({ couponName: "", discount: "", startDate: "", endDate: "" });
//       fetchCoupons();
//     } catch (err) {
//       alert("Something went wrong");
//     }
//   };

//   const handleAction = async (id, action) => {
//     try {
//       if (action === "softdelete") {
//         await axios.patch(
//           `http://localhost:4545/coupon/softdelete/${id}`,
//           {},
//           getAuthHeaders()
//         );
//       }
//       if (action === "delete") {
//         await axios.delete(
//           `http://localhost:4545/coupon/harddelete/${id}`,
//           getAuthHeaders()
//         );
//       }
//       if (action === "activate") {
//         await axios.patch(
//           `http://localhost:4545/coupon/activatecoupon/${id}`,
//           {},
//           getAuthHeaders()
//         );
//       }
//       fetchCoupons();
//     } catch (err) {
//       console.error("Error performing action:", err);
//     }
//   };

//   const handleEdit = (coupon) => {
//     setFormData({
//       couponName: coupon.couponName,
//       discount: coupon.discount,
//       startDate: coupon.startDate,
//       endDate: coupon.endDate,
//     });
//     setEditId(coupon._id);
//   };

//   const filteredCoupons = coupons
//     .filter((c) => {
//       if (filter === "active") return c.isActive;
//       if (filter === "inactive") return !c.isActive;
//       return true;
//     })
//     .filter((c) =>
//       c.couponName.toLowerCase().includes(searchQuery.toLowerCase())
//     );

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, EyeOff, CheckCircle } from "lucide-react";
import baseurl from "../BaseUrl"; // <-- Add this import

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    couponName: "",
    discount: "",
    startDate: "",
    endDate: "",
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, [filter]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(
        `${baseurl}coupon/getallcoupon`,
        getAuthHeaders()
      );
      setCoupons(res.data.showallcoupon);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  console.log(`>>>>coupons>>>`, coupons)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editId) {
        res = await axios.put(
          `${baseurl}coupon/updatecoupon/${editId}`,
          formData,
          getAuthHeaders()
        );
        alert(res.data.message);
        setEditId(null);
      } else {
        res = await axios.post(
          `${baseurl}coupon/addcoupon`,
          { ...formData, isActive: true },
          getAuthHeaders()
        );
        alert(res.data.message);
      }
      setFormData({ couponName: "", discount: "", startDate: "", endDate: "" });
      fetchCoupons();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === "softdelete") {
        await axios.patch(
          `${baseurl}coupon/softdelete/${id}`,
          {},
          getAuthHeaders()
        );
      }
      if (action === "delete") {
        await axios.delete(
          `${baseurl}coupon/harddelete/${id}`,
          getAuthHeaders()
        );
      }
      if (action === "activate") {
        await axios.patch(
          `${baseurl}coupon/activatecoupon/${id}`,
          {},
          getAuthHeaders()
        );
      }
      fetchCoupons();
    } catch (err) {
      console.error("Error performing action:", err);
    }
  };

  const handleEdit = (coupon) => {
    setFormData({
      couponName: coupon.couponName,
      discount: coupon.discount,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
    });
    setEditId(coupon._id);
  };

  const filteredCoupons = coupons
    .filter((c) => {
      if (filter === "active") return c.isActive;
      if (filter === "inactive") return !c.isActive;
      return true;
    })
    .filter((c) =>
      c.couponName.toLowerCase().includes(searchQuery.toLowerCase())
    );


  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-white via-gray-50 to-white">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Coupon Manager
      </h1>

      {/* Filter and Search */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {["all", "active", "inactive"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full font-semibold shadow-md transition-transform hover:scale-105 ${
              filter === f
                ? f === "active"
                  ? "bg-green-500 text-white"
                  : f === "inactive"
                  ? "bg-red-500 text-white"
                  : "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search coupon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 border border-gray-200 max-w-6xl mx-auto mb-8"
      >
        <input
          type="text"
          name="couponName"
          placeholder="Coupon Name"
          value={formData.couponName}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={formData.discount}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 shadow-md"
        >
          {editId ? "Update Coupon" : "Create Coupon"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredCoupons.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No coupons found.
          </p>
        ) : (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {coupon.couponName}
              </h2>
              <p className="text-gray-600 mt-1">Discount: {coupon.discount}%</p>
              <p className="text-gray-600">
                Valid: {coupon.startDate?.slice(0, 10)} to{" "}
                {coupon.endDate?.slice(0, 10)}
              </p>
              <p
                className={`mt-1 text-sm font-medium ${
                  coupon.isActive ? "text-green-600" : "text-red-500"
                }`}
              >
                Status: {coupon.isActive ? "Active" : "Inactive"}
              </p>

              <div className="flex gap-3 mt-4 flex-wrap">
                {coupon.isActive ? (
                  <>
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-full transition-transform hover:scale-105 shadow"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      //   onClick={() => handleSoftDelete(coupon._id)}
                      onClick={() => handleAction(coupon._id, "softdelete")}
                      className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white py-2 px-4 rounded-full transition-transform hover:scale-105 shadow"
                    >
                      <EyeOff size={18} /> Deactivate
                    </button>

                    <button
                      onClick={() => handleAction(coupon._id, "delete")}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white py-2 px-4 rounded-full transition-transform hover:scale-105 shadow"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleAction(coupon._id, "activate")}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-4 rounded-full transition-transform hover:scale-105 shadow"
                  >
                    <CheckCircle size={18} /> Activate
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponManager;
