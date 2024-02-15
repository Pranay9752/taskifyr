import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoutes = () => {
  let token = window.localStorage.getItem('token')
return (
    token ? <Outlet/> : <Navigate to='/user/login'/>
  )
}

export default PrivateRoutes