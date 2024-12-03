import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

import { useGenerateLinkMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import { useDispatch } from "react-redux";
import useUserData from "../../hooks/useUserData.js";

const inputfieldstyle =
  "w-full px-3 py-2 border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-orange-500";

const Register = () => {
  const { data, error:dataError } = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataError) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate,dataError,data,dispatch]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // const [generatedLink, setGeneratedLink] = useState("");

  const [generateLink, { isLoading, isError, error }] =
    useGenerateLinkMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdmin(true);
      const response = await generateLink({ name, email, isAdmin }).unwrap();
      // setGeneratedLink(response.link);
      toast.success("User registered successfully!", { autoClose: 2000 });
    } catch (err) {
      toast.error("Failed to register user!", { autoClose: 2000 });
    }
  };

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(generatedLink);
  //   toast.success("Link copied to clipboard!", { autoClose: 2000 });
  // };

  return (
    <div className="flex h-screen overflow-hidden font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={"User"} />

      {/* Main Content */}
      <main className="flex-grow bg-gray-200 py-6 px-12">
        <div
          style={{ backgroundColor: "rgba(247, 242, 236, 1)" }}
          className="rounded-lg px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-16 shadow-md"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-0 tracking-widest">
            REGISTER
          </h2>

          <h4 className="text-sm md:text-base text-center -mt-1 tracking-widest font-light mb-6">
            CREATE USER ACCOUNT
          </h4>

          <form className="space-y-4" onSubmit={submitHandler}>
            {/* Name Field */}
            <div>
              <input
                type="text"
                className={inputfieldstyle}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Email Field */}
            <div>
              <input
                type="email"
                className={inputfieldstyle}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Role Dropdown */}
            <div>
              <select
                className={inputfieldstyle}
                value={isAdmin ? "admin" : "user"}
                onChange={(e) =>
                  setIsAdmin(e.target.value === "admin" ? true : false)
                }
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <button
                type="submit"
                className="w-full sm:w-auto bg-black text-white py-2 px-6 rounded-[6px] hover:bg-gray-800"
                disabled={isLoading}
              >
                Register
              </button>
            </div>
          </form>

          {/* Display Generated Link */}
          {/* {generatedLink && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="w-full px-3 py-2 border rounded-[6px] bg-gray-100 focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-[6px] hover:bg-orange-600"
                >
                  Copy
                </button>
              </div>
            </div>
          )} */}
        </div>
      </main>
    </div>
  );
};

export default Register;
