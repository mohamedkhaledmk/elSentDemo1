import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register, reset } from "../../store/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    // const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    
    if (isSuccess) {
      toast.success("Registration successful", {
        autoClose: 1000
      });
      dispatch(reset())

      navigate("/auth");
    } else if (isError) {
      toast.error(message, {
        autoClose: 1000
      })
      dispatch(reset())
    }
   
  }, [isSuccess, isError, isLoading]);

  // Submit the form data to the server
  const handleRegister = async (e) => {
    e.preventDefault();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(formData.email)) {
    toast.error("Email format is invalid",{
      autoClose: 1000
    });
    return false;
  } else if (!passwordRegex.test(formData.password)) {
    toast.error(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",{
      autoClose: 1000
      }
    );
    return false;
  } else{
    dispatch(reset())

    dispatch(register(formData))
    
     
      
    }

  
  
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-theme-bg2 text-[#7386a8]">
      <div className="flex w-[90%]  flex-col items-center justify-center rounded-xl bg-body-bg py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-white">
          <span className="uppercase text-theme-color">M</span>z
          <span className="uppercase text-theme-color">B</span>id
        </h1>
        <p className="m-2 text-xl text-theme-color">Create your new account</p>
        <p className="my-3 h-[1px] w-[80%] bg-color-dark"></p>
        <form
          className="overflow-hidden flex w-[90%] flex-col sm:w-[90%] "
          onSubmit={handleRegister}
        >
          <label className="my-1 text-lg text-body-text-color">Full Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className=" w-full pl-5 py-3 rounded text-white bg-border-info-color placeholder-body-text-color outline-none mb-3 border border-border-info-color focus:border-theme-color"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
            // add validation here
            minLength={5}
          />
          <label className="my-1 text-lg text-body-text-color">Email Address</label>
          <input
            type="email"
            placeholder="Your Email"
            className=" w-full pl-5 py-3 rounded text-white bg-border-info-color placeholder-body-text-color outline-none mb-3 border border-border-info-color focus:border-theme-color"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label className="my-1 text-lg text-body-text-color">Password</label>
          <div className=" pr-3 overflow-hidden flex justify-between items-center w-full rounded bg-color-dark outline-none mb-4 border border-border-info-color ">
            <input
              type="password"
              placeholder="Your Password"
              className=" w-full pl-5 py-3 bg-border-info-color text-white placeholder-body-text-color outline-none"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {/* <button
              className=" p-2 hover:bg-theme-bg rounded-full h-fit active:scale-90 hover: transition-all"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEye size={18} />
              ) : (
                <FaRegEyeSlash size={18} className=" text-gray-400 " />
              )}
            </button> */}
          </div>
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-theme-bg-light px-4 py-3 font-bold hover:bg-color-danger  text-[#ffffff]"
            disabled={isLoading ? true : false}
          >
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#29B6F6] hover:text-color-danger"
          >
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
