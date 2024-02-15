//import PrivateRoutes from '../../client/src/permissions/route-access';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/navbar.component';
import RegisterUser from './components/register.component';
import LoginUser from './components/login.component';
import LogoutUser from './components/Logout.component';
import Home from './components/home.component';
import PrivateRoutes from './permissions/route-access';
import Project from './components/project.component';
import Join from './components/joinProject.component';
import Demograhic from './components/Demograhic.component';
import Interview from './components/Interview.component';

const PrivateRoutes = () => {
    let token = window.localStorage.getItem('token') //Add token here
    return (
        <>
            {token ? <Outlet /> : <Navigate to='/user/login' />}
        </>
    )
}



function App() {
    return (
        <Router>
            <NavBar />
            <Routes>

                <Route exact path="/user/register" element={<RegisterUser />} />
                <Route exact path="/user/login" element={<LoginUser />} />
                <Route exact path="/join/:project_id" element={<Join />} />
                <Route exact path="/user/interview" element={<Interview />} />
                <Route element={<PrivateRoutes />}>

                    <Route exact path="/user/logout" element={<LogoutUser />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/project/:project_id" element={<Project />} />
                    <Route exact path="/demographic/:project_id" element={<Demograhic />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
