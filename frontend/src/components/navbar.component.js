import { useLocation } from "react-router-dom";
import BASE_URL from "../utils/config";
import { useEffect, useState } from "react";
import Modal from "./CreateProject";
import EditProfileModal from "./editProfile.component";

function NavBar() {
  const [isPrivateRoute, setIsPrivateRoute] = useState(false);
  const [show, setShow] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsPrivateRoute(
      location.pathname !== "/user/login" && location.pathname !== "user/register/" && location.pathname !== "/user/interview"
    );
  }, [location]);

  const image = window.localStorage.getItem("profile_image");

  return (
    <div className="navbar z-50 bg-base-100">
      <div className="flex-1">
        <a onClick={() => (window.location.href = "/home")} className="btn btn-ghost normal-case text-xl">
          Taskifyr
        </a>
      </div>
      {isPrivateRoute && (
        <div className="flex-none">
          <div onClick={() => setShow(true)} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M11 2 L11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
              ></path>
            </svg>
          </div>

          {editProfile && (
            <EditProfileModal show={editProfile} setShow={setEditProfile} />
          )}

          {show && <Modal show={show} setShow={setShow} />}

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={`${BASE_URL}uploads/${image}`} alt="Profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu z-50 menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a tabIndex={1} onClick={() => setEditProfile(true)} className="justify-between">
                  Edit Profile
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="/user/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
