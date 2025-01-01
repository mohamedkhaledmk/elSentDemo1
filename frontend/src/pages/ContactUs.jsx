import { Link } from "react-router-dom";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = {
      name: form.current["from_name"].value,
      email: form.current["user_email"].value,
      message: form.current["message"].value,
    };

    try {
      const response = await axios.post(
        "https://el-sent-demo1-backend.vercel.app//api/v1/contact",
        formData
      );
      if (response.status === 200) {
        toast.success("Message sent successfully.", {
          autoClose: 1000,
        });
        // Reset the form inputs
        form.current.reset();
      } else {
        toast.error("Failed to send the message.");
      }
    } catch (error) {
      //console.error("Error sending message:", error);
      toast.error("Error sending the message. Please try again.");
    }
  };

  return (
    <>
      <div className="text-white flex items-center justify-center flex-col h-[280px] bg-hero-img bg-cover">
        <h1 className="text-center font-bold text-3xl">Contact Us</h1>
        <div className="flex gap-2 font-medium pt-2">
          <Link
            to={"/"}
            className=" no-underline hover:text-theme-color transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-theme-color">Contact Us</span>
        </div>
      </div>
      <div className="max-w-[1000px] m-auto px-5 py-20 flex flex-col gap-20">
        <div className="grid grid-cols-1 m-auto gap-5 w-full max-w-[1000px] md:grid-cols-3">
          <div className="text-pretty text-white flex flex-col gap-4 items-center justify-start p-8 rounded-2xl bg-theme-bg text-center w-full">
            <div className="bg-theme-color rounded-full p-3">
              <IoLocationOutline size={38} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Address</h2>
              <a
                href="https://maps.app.goo.gl/pEvmTH76xGtj6nGL8?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5F5DC]"
              >
                View on Google Maps
              </a>
            </div>
          </div>
          <div className="text-white flex flex-col gap-4 items-center justify-start p-8 rounded-2xl bg-theme-bg text-center w-full">
            <div className="bg-theme-color rounded-full p-3">
              <IoCallOutline size={38} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Call Us</h2>
              <p>0550745599</p>
            </div>
          </div>
          <div className="text-white flex flex-col gap-4 items-center justify-start p-8 rounded-2xl bg-theme-bg text-center w-full">
            <div className="bg-theme-color rounded-full p-3">
              <IoMailOutline size={38} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Email Us</h2>
              <p>mazadjewelry@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-10 bg-theme-bg text-slate-300 rounded-2xl">
          <h2 className="text-white font-bold text-3xl pb-3 mb-5">
            Contact Form
          </h2>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col gap-4 inputs:outline-none inputs:px-3 inputs:py-4 inputs:rounded-xl inputs:bg-theme-bg2 [&_input[type=submit]]:bg-theme-color [&_input:hover[type=submit]]:bg-color-danger inputs:border inputs:border-border-info-color inputs:placeholder-body-text-color focus:inputs:border-theme-color [&_*]:transition-all"
          >
            <input type="text" name="from_name" placeholder="Full Name" />
            <input type="email" name="user_email" placeholder="Email" />
            <textarea
              name="message"
              placeholder="Write your Message"
              className="outline-none bg-theme-bg2 rounded-xl px-3 py-4 border border-border-info-color focus:border-theme-color placeholder-body-text-color min-h-[200px]"
            />
            <input
              type="submit"
              value="Send Message"
              className="text-white cursor-pointer font-bold tracking-wide border-none"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
