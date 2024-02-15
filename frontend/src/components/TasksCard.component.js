import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './card.component';
import { motion } from 'framer-motion'
const TaskCard = ({ project, tasks, status, handleTaskModal, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="bg-[#f9f9f9] rounded-lg  px-2">
      <div className='flex justify-between items-center font-bold text-xl p-3 px-2 pb-5 capitalize'>
        <h3 className="">{status}</h3>
        <div onClick={handleTaskModal} className={`${isAdmin ? '' : 'hidden'} card card-actions h-[33px] w-[33px] rounded-full bg-[#10a37f] hover:bg-[#0b7265] text-white font-semibold
                        flex justify-center items-center cursor-pointer`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>

        </div>
      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => {
              const projectStyle = {
                backgroundColor: task.color,
              };
              return (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card task={task} project={project} isAdmin={isAdmin} />
                    </div>
                  )}
                </Draggable>
              )
            }
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskCard;
