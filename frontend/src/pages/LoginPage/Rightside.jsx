import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useLoginMutation } from "../../slices/usersApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";

const inputfieldstyle =
  "w-full px-3 py-2 border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-orange-500";

const Rightside = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/filebrowse";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Successully Login..", { autoClose: 2000 });
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error, { autoClose: 2000 });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-center w-full p-8 md:p-12 lg:w-1/2 lg:p-16 bg-[#C95C34]">
      <div className="rounded-[26px] px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-16 shadow-md bg-[#F7F2EC]">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-0 tracking-widest">
          INDEPENDENTS
        </h2>
        <h4 className="text-sm md:text-base text-center -mt-1 tracking-widest font-light mb-6">
          BY SODEXO
        </h4>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <input
              type="email"
              className={inputfieldstyle}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={inputfieldstyle}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700 text-sm">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-black text-white py-2 px-6 rounded-[6px] hover:bg-gray-800"
              disabled={isLoading}
            >
              Login
            </button>
            {isLoading && <Loader />}
          </div>

          <div className="flex justify-center sm:justify-end mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rightside;
