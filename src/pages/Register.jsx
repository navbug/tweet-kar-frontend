import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    setLoading(true);
    const requestData = { name, email, username, password };
    axios
      .post(`${API_BASE_URL}/auth/register`, requestData)
      .then((result) => {
        if (result.status == 201) {
          setLoading(false);
          toast.success(`User successfully registered`);
          console.log("register success", result.data);
        }
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");

        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`Error: ${error.message}`);
        console.log("Register error", error);
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">
            Register to <span className="logoName text-blue-400">Tweet Kar</span>
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-4" onSubmit={registerUser}>

            <div>
              <label
                htmlFor="name"
                className="block font-bold leading-6 text-blue-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  ref={inputRef}
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="enter fullname"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-md sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-md font-bold leading-6 text-blue-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="enter email id"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bold-600 sm:text-md sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block font-bold leading-6 text-blue-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="enter username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-md sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-md font-bold leading-6 text-blue-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="enter your password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-md sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center items-center rounded-md bg-blue-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-md duration-150 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 gap-2 ${loading && "bg-blue-700"}`}
              >
                <span>{loading ? <ClipLoader color="#fff" size={18} /> : "Register"}</span>
              </button>
            </div>
          </form>

          {/* <div className="my-3 text-center font-bold text-gray-600">OR</div> */}
          <div className="flex items-center gap-3 mt-5">
              <span>Already registered? </span>
              <Link to={"/login"}
                className="w-[200px] text-md text-blue-900 font-semibold w-fullgap-2 rounded-md cursor-pointer mr-2"
              >
                Login here
              </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default Register;
