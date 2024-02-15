import { FaBeer } from 'react-icons/fa';

const SideBar = () => {
    return (
        <div className="fixed top-16 left-0 h-screen w-33 m-0
                        flex flex-col
                        bg-gray-900 text-white shadow-lg">
            <SideBarIcon icon={<FaBeer />} />
            <SideBarIcon icon={<FaBeer />} />
            <SideBarIcon icon={<FaBeer />} />
            <SideBarIcon icon={<FaBeer />} />
            <SideBarIcon icon={<FaBeer />} />
            
        </div>
    )
}

const SideBarIcon = ({icon, text = 'tooltip'}) => (
    <div className="sidebar-icon group">
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
)
export default SideBar