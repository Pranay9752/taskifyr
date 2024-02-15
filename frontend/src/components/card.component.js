import React, { useMemo, useState } from 'react';
import BASE_URL from '../utils/config';
import { motion } from 'framer-motion';
import Modal from './editTask.component';

const variants = {
    open: { scale: 1, opacity: 1 },
    closed: { scale: 0, opacity: 0 },
}

const Card = ({ project, team, task, isAdmin }) => {

    const [show, setShow] = useState(false)
    const deadlineDate = useMemo(() => new Date(task.deadline), [task.deadline]);
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);

    const formattedDate = useMemo(() => {
        if (task.deadline.split('T')[0] === today) {
            return deadlineDate.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
            });
        } else {
            return deadlineDate.toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
    }, [task.deadline, today, deadlineDate]);

    const cardBackgroundColor = useMemo(() => {
        if (task.status === 'completed') {
            return 'bg-[#c9f9cd]';
        } else if (task.status === 'todo') {
            return 'bg-[#efefef]';
        } else {
            return 'bg-[#f9edc8]';
        }
    }, [task.status]);


    return (
        <div className={`card flex flex-col w-[100%] h-36 ${cardBackgroundColor} my-2 px-2 py-2 rounded-lg`}>
            <div className='flex justify-between'>

            

                {show && <Modal show={show}
                    setShow={setShow}
                    currentStatus={task.status}
                    task={task.task}
                    project={project}
                    team={task.team}
                    taskId={task._id}
                    deadline={task.deadline}
                />}

            

                <div className="flex flex-row justify-start items-center space-x-1">
                    <svg
                        className="w-[15px] h-[15px] font-extrabold"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs font-medium tracking-tighter">{formattedDate}</p>
                </div>

                <div onClick={() => setShow(true)} className={`${isAdmin ? '' : 'hidden'} p-2 cursor-pointer flex justify-center items-center rounded-full hover:bg-black/30 overflow-hidden hover:font-extrabold `}>
                    <svg
                        className="w-[22px] h-[22px] font-semibold "
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </div>
            </div>

            <p className='text-2xl tracking-tight space-x-2 font-semibold flex w-[86%] items-center flex-grow truncate'>{task.task}</p>
            <div className='flex justify-end items-center'>
                <div className="avatar-group -space-x-6">
                    {task.team.map((user, index) => (
                        <div key={index} className="avatar  ">
                            <div className=" w-[22px] ">
                                <img className='' src={`${BASE_URL}uploads/${user.image}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Card;
