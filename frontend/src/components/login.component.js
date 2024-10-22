import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/config";

export default function LoginUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const next = searchParams.get("next");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "api/user/login/", {
        username: username,
        password: password,
      })
      .then(function (response) {
        const res = response.data;
        console.log(res);
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem("username", res.user.username);
        window.localStorage.setItem("user_id", res.user.id);
        window.localStorage.setItem("profile_image", res.user.image);

        if (next) {
          navigate(`/${next}`);
        } else {
          navigate("/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const handleClick = () => navigate(next ? `/user/register?next=${next}` : "/user/register")

  return (
    <>
      <section className="bg-gradient-to-br from-lime-200 to-teal-500 h-[100vh]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                    placeholder="Your username"
                    required
                  />{" "}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                    placeholder="••••••••"
                    required
                  />{" "}
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?{" "}
                  <button
                    onClick={handleClick}
                    className=" cursor-pointer font-medium text-green-600 hover:underline"
                  >
                    Register
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
