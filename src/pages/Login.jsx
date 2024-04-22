import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(Context);
  const inputRef = useRef();

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = { username, password };
    axios
      .post(`${API_BASE_URL}/auth/login`, requestData)
      .then((result) => {
        if (result.status == 200) {
          setLoading(false);

          console.log(result);
          localStorage.setItem("token", result.data.result.token);
          localStorage.setItem("user", JSON.stringify(result.data.result.user));

          console.log(result.data.result);
          setUser(result.data.result.user);
          console.log(user);

          setLoading(false);
          toast.success(`User successfully logged in`);
          navigate("/");
        }
      })
      .catch((error) => {
        setUsername("");
        setPassword("");
        setLoading(false);
        toast.error(`${error.response.status}: ${error.response.statusText}`);
        console.log("login error", error);
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
            Welcome back to{" "}
            <span className="logoName text-blue-400">Tweet Kar</span>
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-4" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-bold leading-6 text-blue-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  ref={inputRef}
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  autoComplete="username"
                  placeholder="enter username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bold-600 sm:text-md sm:leading-6 pl-2"
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
                className={`flex w-full justify-center items-center rounded-md bg-blue-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-md duration-150 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 gap-2 ${
                  loading && "bg-blue-700"
                }`}
              >
                <span>
                  {loading ? <ClipLoader color="#fff" size={18} /> : "Login"}
                </span>
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 mt-5">
            <span>Don't have an account? </span>
            <Link
              to={"/register"}
              className="w-[200px] text-md text-blue-900 font-semibold w-fullgap-2 rounded-md cursor-pointer mr-2"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
