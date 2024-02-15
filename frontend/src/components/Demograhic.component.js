import { useEffect, useState } from "react"
import axios from 'axios';
import BASE_URL from '../utils/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from "framer-motion";
import { useNavigate, useHistory, useParams } from "react-router-dom";
import TotalUserComplete from "./charts/task-user-pie.component";
import UserList from "./userlList.component";
import OverallInfo from "./charts/overallInfo.component";

const Demograhic = ({ }) => {
  const [project, setProject] = useState()
  const { project_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${BASE_URL}api/product/${project_id}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setProject(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    // <>
    //    {project_id &&
    //     (
    //       <  />
    //       <TotalUserComplete project_id={project_id} />
    //     )
    //   } 
    // </>
    <div className="flex flex-row h-full bg-gray-100">
      <div className="w-[20%] bg-white rounded-md">
        <h2 className="flex justify-start items-center font-semibold text-lg tracking-wide text-black ml-4">
          Members
        </h2>
        {project && <UserList usersData={project.team} />}
      </div>
      {project && (
        <div className="w-full flex flex-col">
          <OverallInfo className='w-80%' project={project} />
          <TotalUserComplete className='w-80%' project={project} />
        </div>
      )}
    </div>
  );
};

export default Demograhic