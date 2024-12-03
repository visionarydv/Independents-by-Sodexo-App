import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useLogoutMutation,
  useProfileMutation,
  useTokenUserProfileMutation,
} from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUserInfo from "../../hooks/useUserInfo";
import useUserData from "../../hooks/useUserData";

const Info = () => {
  // State for editable fields
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const userInfo = useUserInfo();
  const { data, error } = useUserData();
  const [profilePic, setProfilePic] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate,error,data,dispatch]);

  const [logoutApiCall] = useLogoutMutation();
  const [updateUser, { isLoading: isUpdating }] = useProfileMutation();
  const [updateTokenUser, { isLoading: isUpdatingUser }] =
    useTokenUserProfileMutation();

  useEffect(() => {
    if (data) {
      setName(data.username);
      setPassword(data.password ? "" : undefined);
      setEmail(data.email);
      setProfilePic(data.profilePicture);
    } else if (error) {
      toast.error("Error fetching user data", { autoClose: 2000 });
    }
  }, [data, error]);

  // Function to handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (userInfo) {
      try {
        await updateUser({
          name,
          email,
          password: password !== "******" ? password : undefined,
          profilePic,
        }).unwrap();

        toast.success("Information Updated Successfully", { autoClose: 2000 });
        setPassword("");
      } catch (err) {
        toast.error("An error occurred while saving changes.", {
          autoClose: 2000,
        });
      }
    } else {
      try {
        await updateTokenUser({
          name,
          email,
          password: password !== "******" ? password : undefined,
        }).unwrap();
        navigate("/");
      } catch (err) {
        toast.error("An error occurred while saving changes for token user.", {
          autoClose: 2000,
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen overflow-hidden font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={""} />

      {/* Main Content */}
      <main className="flex-grow bg-gray-200 py-4 px-10">
        <div
          style={{ backgroundColor: "rgba(247, 242, 236, 1)" }}
          className="rounded-lg px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-16 shadow-md"
        >
          <div className="flex flex-col items-center gap-3">
            {/* Profile Picture */}
            <div className="relative border-4 border-white rounded-full">
              <img
                src={profilePic ? profilePic : "default-profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfilePicChange}
              />
            </div>

            {/* Name */}
            <div className="w-full max-w-sm">
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="w-full max-w-sm">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div className="w-full max-w-sm relative">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[53px] transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={isUpdating || isUpdatingUser}
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Save
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Info;
