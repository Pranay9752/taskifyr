import { useState } from "react"
import axios from 'axios';
import BASE_URL from '../utils/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from "framer-motion";


const variants = {
    open: { scale: 1, opacity: 1 },
    closed: { scale: 0, opacity: 0 },
  }
const Modal = ( show, setShow ) => {
    
    const [newTask, setNewTask] = useState('');
    const [newDeadline, setNewDeadline] = useState('');

    const handleDate = (e) => {
        setNewDeadline(e)
      }
    return (
                
        <motion.nav
        id="modal-1"
        animate={show ? "open" : "closed"}
        variants={variants}
        className='fixed inset-0 z-10 flex justify-center items-center bg-black/25 '
      >
        <div
          className="relative w-full max-w-xl h-[85%] bg-white rounded-lg  overflow-hidden
          px-3 py-3"
          data-modal-content="modal-1"
        >
          <h3 className="font-bold text-lg pb-3">Add task!</h3>
          <textarea id="comment" rows="4" onChange={(e) => setNewTask(e.target.value)}
            className="border-2 border-[#10a37f] w-full rounded-lg" placeholder="Write your task..." value={newTask}></textarea>
          <div className='border-2 rounded flex justify-start items-center space-x-2  border-[#10a37f] w-max'>
            <svg className="w-4 h-4 ml-2 text-[#10a37f]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
            <DatePicker
              selected={newDeadline}
              onChange={handleDate}
              dateFormat="yyyy-MM-dd"
              className=""
              placeholderText="Select deadline"
            />

          </div>
          <button type="submit" className="absolute right-4 bottom-4 btn bg-[#10a37f] text-white   ">
            Add Task
          </button>
          <button onClick={setShow} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>


      </motion.nav>
        
    )
}

export default Modal