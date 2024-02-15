import axios from "axios";
import BASE_URL from "../utils/config";
import UserTasks from "./user-tasks.component";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

function UserProjectTasks() {
  const [projects, setProjects] = useState([]);
  const [reloadUserTasks, setReloadUserTasks] = useState(false); // State variable for triggering reload

  useEffect(() => {
    const url = `${BASE_URL}api/product/?status[]=inProgress`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reloadUserTasks]); // Reload trigger added as a dependency

  const handleTaskRemove = (taskId, project_id) => {
    const url = `${BASE_URL}api/product/${project_id}/task/${taskId}/status`;
    axios
      .patch(
        url,
        {
          status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setReloadUserTasks(!reloadUserTasks); // Toggle the reload trigger after task removal
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        {projects.length > 0 && (
          <div className="flex items-center text-lg font-bold text-black hover:text-gray-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
            <a href="#" className="ml-1 ">
              Tasks
            </a>
            <svg
              aria-hidden="true"
              className="w-8 h-8 "
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

        <div className="flex">
          {projects.map((project, index) => {
            const projectStyle = {
              backgroundColor: project.vibe,
            };
            const tasks = project.tasks;
            console.log(tasks)
            const id = project._id;
            return (
              <div key={index} className="relative card h-56 w-96  border-2 bg-white border-black m-4">
                <div
                  style={projectStyle}
                  className="absolute -top-4 left-[105px] card image-full z-10  w-44 h-8 border-2 border-black"
                >
                  <h1 className="text-center text-xl font-bold text-white z-10 mt-auto">{project.name}</h1>
                </div>
                <div>
                  <div className="flex items-center mt-6 p-2">
                    <UserTasks tasks={tasks} project_id={id} handleTaskRemove={handleTaskRemove} /> {/* Pass the handleTaskRemove function as a prop */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UserProjectTasks;











// import axios from "axios"
// import BASE_URL from "../utils/config"
// import UserTasks from "./user-tasks.component"

// const { useEffect, useState } = require("react")



// function UserProjectTasks() {

//     const [projects, setProjects] = useState([])

//     useEffect(() => {
//         const url = `${BASE_URL}api/product/?status[]=inProgress`
//         axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${window.localStorage.getItem('token')}`
//             }
//         })
//             .then((res) => {
//                 console.log(res.data)
//                 setProjects(res.data)
//             })
//             .catch((error) => {
//                 console.error(error)
//             })
//     }, [])

//     return (
//         <>
//             <div>
//                 {projects.length > 0 && <div className="flex items-center text-lg font-bold text-black hover:text-gray-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
//                     <a href="#" className="ml-1 ">
//                         Tasks
//                     </a>
//                     <svg aria-hidden="true" className="w-8 h-8 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
//                 </div>
//                 }

//                 <div className="flex">
//                     {projects.map((project, index) => {
//                         const projectStyle = {
//                             backgroundColor: project.vibe,
//                         };
//                         const tasks = project.tasks
//                         const id = project._id
//                         return (
//                             <>
//                                 <div key={index} className="relative card h-56 w-96 bg-white border-2 border-black m-4">
//                                     <div style={projectStyle}
//                                         className="absolute -top-4 left-[105px] card image-full  w-44 h-8 bg-[#10a37f] border-2 border-black">
//                                         <h1 className="text-center text-xl font-bold text-white z-10 mt-auto">{project.name}</h1>
//                                     </div>
//                                     <div>
//                                         <div className="flex items-center mt-6 p-2">
//                                             <UserTasks tasks={tasks} project_id={id} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </>
//                         )
//                     })}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default UserProjectTasks




