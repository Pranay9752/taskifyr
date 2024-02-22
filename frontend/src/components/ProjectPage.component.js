import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskCard from './TasksCard.component';
import axios from 'axios';
import BASE_URL from '../utils/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import Modal from './taskModal.component';
import ProjectInfo from './addMember.component';
import EditProjectModal from './editProject.component';


const variants = {
  open: { scale: 1, opacity: 1 },
  closed: { scale: 0, opacity: 0 },
};

const ProjectPage = ({ projectData, setProjectData }) => {
  const taskCardRef = useRef(null);
  const [project, setProject] = useState(projectData);
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [currenStatus, setCurrentStatus] = useState(null);
  const [query, setQuery] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [assignTask, setAssignTask] = useState([]);

  useEffect(() => {

    function isAdminOrProjectManager() {
      const adminId = project.admin._id;
      const teamMembers = project.team;
      const userId = window.localStorage.getItem('user_id')
      // Check if the user is the admin
      if (userId === adminId) {
        return true;
      }

      // Check if the user is a project manager
      const projectManager = teamMembers.find(
        (member) => member.user_id._id === userId && member.role === 'projectManager'
      );

      return !!projectManager;
    }

    const fetchProjectData = async () => {
      try {
        const url = `${BASE_URL}api/product/${projectData._id}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        });
        setProject(response.data);


      } catch (error) {
        console.error(error);
      }
    };


    fetchProjectData();
    setIsAdmin((prev) => isAdminOrProjectManager())
  }, []);

  const { tasks } = project;

  const inProgressTasks = useMemo(() => tasks?.filter((task) => task.status === 'inProgress'), [tasks, project]);
  const completedTasks = useMemo(() => tasks?.filter((task) => task.status === 'completed'), [tasks, project]);
  const todoTasks = useMemo(() => tasks?.filter((task) => task.status === 'todo'), [tasks, project]);

  const changeStatus = useCallback((taskId, newStatus) => {
    const url = `${BASE_URL}api/product/${project._id}/task/${taskId}/status`;
    axios.patch(url, {
      status: newStatus,
      userId: window.localStorage.getItem('user_id')
    }, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  }, [project._id]);

  const onDragEnd = useCallback((result) => {
    const { draggableId, source, destination } = result;
    if (!destination) return;

    const sourceCardId = source.droppableId;
    const destinationCardId = destination.droppableId;

    if (sourceCardId !== destinationCardId) {
      const draggedTask = tasks.find((task) => task._id === draggableId);
      const updatedTask = { ...draggedTask, status: destinationCardId };
      const taskIndex = tasks.findIndex((task) => task._id === draggableId);
      const updatedTasks = [
        ...tasks.slice(0, taskIndex),
        updatedTask,
        ...tasks.slice(taskIndex + 1),
      ];

      const updatedProject = { ...project, tasks: updatedTasks };

      changeStatus(draggableId, destinationCardId);
      setProject(updatedProject);

      return;
    }
  }, [changeStatus, project, tasks]);

  const handleTaskModal = useCallback((status) => {
    setShow(true);
    setCurrentStatus(status);
  }, []);

  const handleTaskSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const url = `${BASE_URL}api/product/task/add/${project._id}`;
      const response = await axios.put(url, {
        task: newTask,
        status: currenStatus,
        deadline: new Date(newDeadline),
        team: assignTask,
      }, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      setNewTask('');
      setNewDeadline('');
      setAssignTask([]);
      setShow(false);
      setProjectData(response.data)
    } catch (error) {
      console.error(error);
    }
  }, [assignTask, currenStatus, newDeadline, newTask, project._id]);

  const handleDate = useCallback((e) => {
    setNewDeadline(e);
  }, []);

  const handleChange = useCallback((e) => {
    // Handle the change event
  }, []);


  useEffect(() => {
    if (projectData) {
      setProject(projectData)
    }
  }, [projectData])

  console.log(project)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='h-screen w-full flex justify-between'>
        {/* ... */}
        <main className="w-[100%]">
          {editProject && (
            <EditProjectModal
              project={project}
              setProject={setProject}
              show={editProject}
              setShow={setEditProject}
            />
          )}

          {show && (
            <Modal
              show={show}
              setShow={setShow}
              setProjectData={setProject}
              currentStatus={currenStatus}
              project={project}
            />
          )}

          <ProjectInfo
            isAdmin={isAdmin}
            project={project}
            editProject={editProject}
            setEditProject={setEditProject}
          />

          <div className="mx-[33px] lg:grid grid-cols-3 gap-4 px-5 py-5">
            <TaskCard
              isAdmin={isAdmin}
              tasks={todoTasks}
              handleTaskModal={() => handleTaskModal("todo")}
              status="todo"
              project={project}
            />
            <TaskCard
              isAdmin={isAdmin}
              tasks={inProgressTasks}
              handleTaskModal={() => handleTaskModal("inProgress")}
              status="inProgress"
              project={project}
            />
            <TaskCard
              isAdmin={isAdmin}
              tasks={completedTasks}
              handleTaskModal={() => handleTaskModal("completed")}
              status="completed"
              project={project}
            />
          </div>
        </main>
      </div>
    </DragDropContext>
  );
};

export default ProjectPage;
