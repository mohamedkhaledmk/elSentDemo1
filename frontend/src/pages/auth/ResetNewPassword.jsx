import { useNavigate, useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { reset, resetNewPassword } from "../../store/auth/authSlice";



const ResetNewPassword = () => {
    const { id, token } = useParams();
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isSuccess, isError, message} = useSelector((state) => state.auth);
    const navigate= useNavigate()


    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
            setPassword("");
            navigate("/login");

        }
        if (isError) {
            toast.error(message);
        }

        return () => {
            dispatch(reset());
        }

    }, [isSuccess, isError]);



    const resetnewPassword = (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("Password is required");
            return false;
        } 
        
        let data = {
            password: password,
             id,
             token,
        };

        dispatch(resetNewPassword(data));
       

    }



  return (
 <div className="flex h-screen w-full items-center justify-center bg-theme-bg2 text-[#7386a8]">
      <div className="flex w-[90%] flex-col items-center rounded-xl bg-body-bg py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-white">
        <span className="uppercase text-theme-color">M</span>z
        <span className="uppercase text-theme-color">B</span>id
        </h1>
        <p className="my-3 h-[1px] w-[80%] bg-[#747d9340]"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={resetnewPassword}
        >
          <label className="my-1 text-lg text-body-text-color">Enter New Password</label>
          <input
            type="password"
            placeholder="Your new Password"
            className="w-full pl-5 py-3 bg-border-info-color text-white placeholder-body-text-color outline-none"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            required
          />

          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-theme-bg-light px-4 py-3 font-bold hover:bg-color-danger  text-[#ffffff]"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>  )
}

export default ResetNewPassword