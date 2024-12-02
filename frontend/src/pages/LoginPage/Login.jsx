import Logo from "../../assets/Layer_1.png";
import Leftside from "../../components/Leftside";
import Rightside from "./Rightside";

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen font-poppins relative">
      {/* Left Side*/}
      <Leftside />

      {/* Right Side*/}
      <Rightside />

      {/* Logo */}
      <div className="absolute inset-0 flex justify-center mt-3 pointer-events-none z-10">
        <img
          src={Logo}
          alt="Logo"
          className="w-[130px] h-[130px] md:w-30 md:h-30 object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
