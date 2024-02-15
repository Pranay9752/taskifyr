import { useState } from "react"
import BASE_URL, { REACT_BASE_URL } from "../utils/config"
import { Navigate, useNavigate } from "react-router-dom"



const ProjectInfo = ({ project, setEditProject, isAdmin }) => {
    const url = `${REACT_BASE_URL}join/${project._id}`

    const [grow, setGrow] = useState(false)
    const navigate = useNavigate()
    return (
        <div className="flex justify-between items-center  px-5 pt-5 ">
            <div className="px-5 py-5">
                <div className="flex gap-3 items-center">
                    <h1 className="text-5xl font-bold uppercase">{project.name}</h1>
                    <div onClick={() => setEditProject(true)} className={`${isAdmin ? '' : 'hidden'}  h-[45px] w-[45px] cursor-pointer flex justify-center items-center rounded-full hover:bg-black/30 overflow-hidden hover:font-extrabold `}>
                        <svg
                            className="w-[30px] h-[30px] font-semibold "
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                </div>

                <p onClick={() => setGrow((prev) => !prev)} className={`text-4x1 py-2 text-gray-700 font-semibold max-w-xl ${grow ? '' : `cursor-pointer truncate`}`}>{project.description}</p>
                <div className="flex gap-2 justify-start items-center">
                    <p className="text-4x1 py-2">Team: </p>

                    <div className="avatar-group -space-x-5">

                        {project.team.map((user, index) => (
                            <div key={index} className="avatar bg-white ">
                                <div className=" w-[22px] ">
                                    <img className='' src={`${BASE_URL}uploads/${user.user_id.image}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="flex gap-4  ">

                {/* Need to Update */}
                {/* <input type="text" placeholder="Search" className="input input-bordered input-[#F3F5F7] w-[1000px] rounded-full max-w-xs" /> */}


                <div onClick={() => window.open(`/demographic/${project._id}`, '_blank')} className="w-[100px] btn bg-[#10a37f] font-bold text-white hover:bg-[#c6fff7] hover:text-[#0b7265] hover:border-[#0b7265]">
                    <div onClick={() => window.open(`/demographic/${project._id}`, '_blank')} className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                        {/* <span className="badge badge-sm indicator-item">8</span> */}
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="w-[100px] btn bg-[#10a37f] font-bold text-white hover:bg-[#c6fff7] hover:text-[#0b7265] hover:border-[#0b7265]">
                        <div className="indicator">
                            <svg className="w-8 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                            {/* <span className="badge badge-sm indicator-item">8</span> */}
                        </div>
                    </label>
                    <div
                        tabIndex={0}
                        className="mt-3 card card-compact dropdown-content w-max z-50 bg-base-100 shadow"
                    >
                        <div className="card-body">
                            <span className="font-bold text-lg">Share link to Add member</span>
                            <div className="flex gap-2 justify-between items-center">
                                <input type="text" value={url} className="border-2 p-2 border-[#10a37f] w-max rounded-lg" />
                                <div className="card-actions btn btn-ghost btn-circle content-center" onClick={() => { navigator.clipboard.writeText(url) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProjectInfo