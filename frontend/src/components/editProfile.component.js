import { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const variants = {
  open: { scale: 1, opacity: 1 },
  closed: { scale: 0, opacity: 0 },
};

const EditProfileModal = ({ show, setShow }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(window.localStorage.getItem("username"));
  const [image, setImage] = useState('');
  const url = `${BASE_URL}uploads/${window.localStorage.getItem("profile_image")}`

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('id', window.localStorage.getItem('user_id'));
    formData.append('username', username);
    if (image !== '') formData.append('image', image)

    await axios.patch(`${BASE_URL}api/user/profile/update`, formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
        window.localStorage.setItem('username', response.data.user.username)
        window.localStorage.setItem('profile_image', response.data.user.image)
        
    })
    .catch(function (error) {
        console.log(error);

    });

    setShow(false);
  };

  const handleImage = (e) => {
    const img = e.target.files[0];
    setImage(img);
  };

  return (
    <motion.nav
      id="modal-1"
      animate={show ? "open" : "closed"}
      variants={variants}
      className="fixed inset-0 z-20 flex justify-center items-center bg-black/25"
    >
      <div
        className="relative w-full max-w-xl h-[60%] bg-white space-y-4 rounded-lg overflow-hidden px-3 py-3"
        data-modal-content="modal-1"
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Update Profile
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div className="avatar flex justify-center items-center">
            <div className="w-32 rounded-full">
              {image === "" ? (
                <label htmlFor="image" className="cursor-pointer">
                  <input type="file" name="image" id="image" onChange={handleImage} className="w-32" hidden />
                  <img src={url} alt="User" />
                </label>
              ) : (
                <img src={URL.createObjectURL(image)} alt="User" />
              )}
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Your username"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit
          </button>
        </form>

        {/* Close button */}
        <button onClick={() => setShow(false)} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </button>
      </div>
    </motion.nav>
  );
};

export default EditProfileModal;
