
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../utils/config";


export default function RegisterUser() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState('')
    const searchParams = new URLSearchParams(window.location.search);
    const next = searchParams.get('next');

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('image', image)
        axios.post(BASE_URL + 'api/user/register/', formData)
            .then(function (response) {
                console.log(response)
                if (next) return navigate(`/user/login?next=${next}`)

                navigate('/user/login')

            })
            .catch(function (error) {
                console.log(error);

            });
    };



    const handleImage = (e) => {
        const img = e.target.files[0]
        setImage(img);
    };
    const handleClick = () => navigate(next ? `/user/login?next=${next}` : "/user/login")
  
    return (
        <>
            <section className="bg-gradient-to-br from-lime-200 to-teal-500  h-[100vh] ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  h-[100vh]  lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div className="avatar flex justify-center items-center">
                                    <div className="w-32 rounded-full">
                                        {image == '' ? (
                                            <label htmlFor="image" className="cursor-pointer">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    onChange={handleImage}
                                                    className="w-32"
                                                    hidden
                                                />
                                                {/* upload */}
                                                <svg
                                                    className="text-gray-300"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </label>
                                        ) : (
                                            <img src={URL.createObjectURL(image)} alt="User" />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                                        placeholder="Your username"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                                        placeholder="••••••••"
                                        required
                                    />                                </div>
                               
                                <button onClick={handleSubmit} type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have a account? <button onClick={handleClick} className=" cursor-pointer font-medium text-green-600 hover:underline">Log in</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}