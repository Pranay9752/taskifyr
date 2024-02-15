import NavBar from "./navbar.component";
import Projects from "./projects.component";
import SideBar from "./sidebar.component";
import UserProjectTasks from "./user-project-tasks.component";
import UserTasks from "./user-tasks.component";


export default function Home() {
    return (
        <>
            <div className="bg-gradient-to-br md:h-screen from-gray-50 to-zinc-300">
                <Projects title={"My Projects"} type={"p"} />
                <Projects title={"Team Projects"} type={"teamprojects"} />
                <UserProjectTasks />
            </div>
        </>
    )
}