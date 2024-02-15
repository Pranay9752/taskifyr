import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../utils/config";




const Join = () => {
    const navigate = useNavigate()
    const { project_id } = useParams();

    const handleTaskSubmit = async () => {
        
        const data = {
            _id: project_id,
            action: "add",
            teamMember: {
                user_id: window.localStorage.getItem('user_id'),
                role: "teamMember"
            }
        }

        const url = `${BASE_URL}api/product/team/update`
        await axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        });
        navigate(`/project/${project_id}`)
    }

    useEffect(() => {
        if (!window.localStorage.getItem('token')) return navigate(`/user/login?next=join/${project_id}`)
    }, [])

    return (
        <div className="mt-52 flex flex-col space-y-2 justify-center items-center">
            <h3 className="font-bold text-3xl pb-3">Click to join project!</h3>

            <button
                type="submit"
                onClick={handleTaskSubmit}
                className=" btn bg-[#10a37f] font-bold text-white hover:bg-[#c6fff7] hover:text-[#0b7265] hover:border-[#0b7265]"
            >Join us</button>
        </div>
    )
}

export default Join