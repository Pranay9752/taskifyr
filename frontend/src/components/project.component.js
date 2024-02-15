import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import NavBar from './navbar.component';
import ProjectPage from './ProjectPage.component';
import UserList from './userlList.component';
import BASE_URL from '../utils/config';

const Project = () => {
  const { project_id } = useParams();
  const [project, setProject] = useState(null);

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
  }, [project_id]);

  return (
    <div className="flex flex-row h-full bg-gray-100">
      <div className="w-[20%] bg-white rounded-md">
        <h2 className="flex justify-start items-center font-semibold text-lg tracking-wide text-black ml-4">
          Members
        </h2>
        {project && <UserList usersData={project.team} />}
      </div>
      {project && <ProjectPage className="w-[80%]" projectData={project} />}
    </div>
  );
};

export default Project;
