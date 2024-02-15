import { useState } from "react"
import axios from 'axios';
import BASE_URL from '../utils/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const variants = {
  open: { scale: 1, opacity: 1 },
  closed: { scale: 0, opacity: 0 },
}
const EditProjectModal = ({ project, setProject, show, setShow }) => {
  const navigate = useNavigate()

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        

        const url = `${BASE_URL}api/product/update`;
            const response = await axios.patch(url, {
                id:project._id,
                name: name,
                description: description,
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
            });
            await setProject(response.data)
            setShow(false)


    } catch (error) {
        console.error(error);
        // Handle the error, display an error message, or perform any other actions
    }
};

  return (
    <motion.nav
      id="modal-1"
      animate={show ? "open" : "closed"}
      variants={variants}
      className='fixed inset-0 z-10 flex justify-center items-center bg-black/25'
    >
      <div
        className="relative w-full max-w-xl h-[60%] bg-white space-y-4 rounded-lg overflow-hidden px-3 py-3"
        data-modal-content="modal-1"
      >
        <h3 className="font-bold text-lg pb-3 mt-2">Update <span className="text-[#10a37f]">Project!</span></h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border-2 p-2 border-[#10a37f] w-full rounded-lg" />
        
        <textarea
                    id="comment"
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-2 p-2 border-[#10a37f] w-full rounded-lg"
                    placeholder="Add project description..."
                    value={description}
                ></textarea>


        {/* Submit button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="absolute right-4 bottom-4 btn bg-[#10a37f] font-bold text-white hover:bg-[#c6fff7] hover:text-[#0b7265] hover:border-[#0b7265]"
        >
          Update
        </button>
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="btn btn-sm btn-circle absolute right-2 top-0"
        >
          ✕
        </button>
      </div>
    </motion.nav>
  );
};

export default EditProjectModal