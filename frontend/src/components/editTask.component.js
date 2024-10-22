import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

const Modal = ({
    show,
    setShow,
    currentStatus,
    project,
    taskId,
    task,
    team,
    deadline
}) => {
    const [query, setQuery] = useState('');
    const [newTask, setNewTask] = useState(task);
    const [newDeadline, setNewDeadline] = useState(new Date(deadline));
    const [assignTask, setAssignTask] = useState(team.map(item => item._id))

    const variants = {
        open: { scale: 1, opacity: 1 },
        closed: { scale: 0, opacity: 0 },
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({
            task: newTask,
            status: currentStatus,
            deadline: new Date(newDeadline),
            team: assignTask
        }))
        try {
            
            const url = `${BASE_URL}api/product/${project._id}/task/${taskId}`;
            const response = await axios.patch(url, {
                task: newTask,
                status: currentStatus,
                deadline: new Date(newDeadline),
                team: assignTask
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
            });

            setNewTask('');
            setNewDeadline('');
            setAssignTask([])
            setShow(false)




        } catch (error) {
            console.error(error);
            // Handle the error, display an error message, or perform any other actions
        }
    };

    const handleDate = (e) => {
        setNewDeadline(e)
    }

    return (
        <motion.nav
            id="modal-1"
            animate={show ? 'open' : 'closed'}
            variants={variants}
            className="fixed inset-0 z-10 flex justify-center items-center bg-black/25 cursor-default"
        >
            <div
                className="relative w-full max-w-xl h-[85%] bg-white rounded-lg  overflow-hidden
        px-3 py-3"
                data-modal-content="modal-1"
            >
                <h3 className="font-bold text-lg pb-3">Update task!</h3>
                {/* Task textarea */}
                <textarea
                    id="comment"
                    rows="4"
                    onChange={(e) => setNewTask(e.target.value)}
                    className="border-2 p-2 border-[#10a37f] w-full rounded-lg"
                    placeholder="Write your task..."
                    value={newTask}
                ></textarea>
                {/* Task deadline */}
                <div className="border-2 p-1 border-[#10a37f] w-max rounded-lg  my-3  flex justify-start items-center space-x-2 ">
                    <svg className="w-4 h-4 ml-2 text-[#10a37f]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                    <DatePicker
                        selected={newDeadline}
                        onChange={handleDate}
                        dateFormat="yyyy-MM-dd"
                        className="p-2"
                        placeholderText="Select deadline"
                    />
                </div>
                {/* Task assignment */}
                <div>
                    <label htmlFor="team" className="py-2">
                        Assign task
                    </label>
                    <div id="team w-full h-max p-2">
                        {/* Render assigned badges */}
                        {assignTask.map((id, index) => {
                            const member = project.team.find(
                                (user) => user.user_id._id === id
                            );

                            const deleteBadge = () => {
                                setAssignTask(assignTask.filter(item => item !== id))
                            };

                            return (
                                <span
                                    id={index}
                                    className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-100 rounded overflow-auto"
                                >
                                    {member.user_id.username}
                                    <button
                                        type="button"
                                        onClick={deleteBadge}
                                        className="inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900"
                                        aria-label="Remove"
                                    >
                                        <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </span>
                            );
                        })}
                    </div>
                    <div className="pt-4">
                        {/* Add assign task input */}
                        <input
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Search members"
                            className="border-2 p-2 border-[#10a37f] w-max rounded-lg"
                        />
                        {/* Dropdown list of team members */}
                        <div
                            id="dropdownUsers"
                            className="z-10  bg-green-100 rounded-lg shadow w-60"
                        >
                            <ul className="h-max py-2 mt-2 overflow-y-auto text-black  " aria-labelledby="dropdownUsersButton">
                                {/* Render team members */}
                                {project && project.team.filter(user => user.user_id.username.toLowerCase().includes(query))
                                    .map((user, index) => {
                                        const handleClick = () => {
                                            const id = user.user_id._id
                                            if (!assignTask.includes(id)) {
                                                setAssignTask(prev => [...prev, id])
                                            }
                                        };

                                        return (
                                            <li key={index} onClick={handleClick}>
                                                <a
                                                    href="#"
                                                    className="flex items-center px-4 py-2  hover:bg-green-200 hover:text-green-900 hover:font-bold"
                                                >
                                                    <img className="w-6 h-6 mr-2 rounded-full" src={`${BASE_URL}uploads/${user.user_id.image}`} alt="Jese image" />
                                                    {user.user_id.username}
                                                </a>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Submit button */}
                <button
                    type="submit"
                    onClick={handleTaskSubmit}
                    className="absolute right-4 bottom-4 btn bg-[#10a37f] font-bold text-white hover:bg-[#c6fff7] hover:text-[#0b7265] hover:border-[#0b7265]"
                >
                    Update task
                </button>
                {/* Close button */}
                <button
                    onClick={() => setShow(false)}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    ✕
                </button>
            </div>
        </motion.nav>
    );
};

export default Modal;
