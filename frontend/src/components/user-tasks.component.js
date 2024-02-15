import { useEffect, useState } from "react";
import BASE_URL from "../utils/config";
import axios from "axios";

const CreatorInfo = ({ creatorId }) => {
    const [creator, setCreator] = useState();
    useEffect(() => {
        const fetchCreator = async () => {
            const url = `${BASE_URL}api/user/${creatorId}`
            await axios
                .get(
                    url,
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data.username)
                    setCreator(res.data.username); // Toggle the reload trigger after task removal
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchCreator();
    }, []);

    return (
        <span>
            created by {creator} <br />
        </span>
    );
};
const CreatorInfo1 = ({ creatorId }) => {
    useEffect(() => {
      const fetchCreator = async () => {
        const url = `${BASE_URL}api/user/${creatorId}`;
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          });
          const creatorData = response.data;
          // Handle the creator data here if needed
          console.log(creatorData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchCreator();
    }, []);
  
    return null; // Return null or any JSX if necessary
  };
  

const UserTasks = (props) => {
    return (
        <div>
            <ul>
                {props.tasks.map((task) => {
                    const projectStyle = {
                        backgroundColor: task.color,
                    };
                    const date = new Date(task.deadline);

                    const formattedDate = date.toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    });
                    const creator = CreatorInfo1(task.creator)
                    
                    return (
                        <li
                            key={task._id}
                            className={`card  m-1 p-2  z-30 w-[356px] flex border-1 rounded-md`}
                            style={projectStyle}
                        >
                            <div className="flex justify-between items-center">
                                <input
                                    type="checkbox"
                                    onClick={() => props.handleTaskRemove(task._id, props.project_id)}
                                />
                                <span className="ml-2 max-w-xs truncate">{task.task}</span>
                                <div className="group avatar">
                                    <span className="task-data group-hover:scale-100">
                                        {creator}
                                        <CreatorInfo creatorId={task.creator} />
                                        Deadline: <b>{formattedDate}</b>
                                    </span>
                                    <div className="w-7 bg-zinc-500 rounded-full">
                                        <img src="https://api.dicebear.com/6.x/lorelei/svg?seed=Znoe" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UserTasks;
