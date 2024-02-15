import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/config";

const Projects = ({ title, type }) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = `${BASE_URL}api/product/${type}/${window.localStorage.getItem(
          "username"
        )}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        console.log(response.data)
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const handleClick = ({ project_id }) => {
    console.log(project_id);
  };

  return (
    <>
      {projects.length > 0 && (
        <div className="flex items-center text-lg font-bold text-black hover:text-gray-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
          <Link to="#" className="ml-1">
            {title}
          </Link>
          <svg
            aria-hidden="true"
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}

      <div className="flex ml-2 mt-2 z-40 carousel rounded-box w-[98%] mb-4">
        {projects.map((project, index) => {
            const projectStyle = {
            backgroundColor: project.vibe, 
          };
          const userCount = project.team.length
            return (
          <div
            key={index}
            className={`mx-2`}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <div
              className={`card w-96 shadow-xl image-full transform active:scale-90 duration-[10] transition-transform cursor-pointer`}
              style={projectStyle}
            >
              <div className="card-body">
                <p className="card-title">{project.name}</p>
                <p className="max-w-xs truncate ">{project.description}</p>
                <div className="card-actions justify-end">
                  <div className="btn btn-ghost rounded-full">
                    <div
                      className={`avatar-group  rounded-full -space-x-6`}
                    >
                      <div className="avatar">
                        <div className="w-8">
                          <img src="https://api.dicebear.com/6.x/lorelei/svg?seed=Znoe" alt="Avatar" />
                        </div>
                      </div>
                      <div className="avatar placeholder">
                        <div className="w-8 bg-neutral-focus text-neutral-content">
                          <span>+{userCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
    </>
  );
};

export default Projects;
