import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const LogoutUser = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        window.localStorage.clear()
        navigate('/user/login')
    },[])
}

export default LogoutUser