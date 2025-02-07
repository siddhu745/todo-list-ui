import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/siddhu_outline_logo.svg'
import { MdAutoGraph, MdOutlineInventory } from 'react-icons/md';
import Todos from './Todos';

function Dashboard() {

    const { logOut } = useAuth();
    
    const [active, setActive] = useState(0)

    const handleLogOut = () => {
        navigate('/', { replace: true })
        logOut()
    }

    const menuItems = [
        {
            icon: <MdOutlineInventory />,
            name: 'todos'
        },
        {
            icon: <MdAutoGraph />,
            name: 'my activity'
        },
    ]

    return (
        <div className='flex'>
            <div className='h-screen w-60 border-r-4'>
                <div className='flex items-center m-20 justify-center gap-5'>
                    <img alt='logo' src={logo} />
                    <h2 className='text-gray-700 font-medium'>Todo</h2>
                </div>
                <div>
                    <ul>
                        {
                            menuItems.map((d, idx) => {
                                return (<li
                                    key={idx}
                                    className={`flex items-center gap-3 font-medium text-lg text-gray-400 cursor-pointer m-3 ml-10 p-2 rounded-lg ${active === idx && 'bg-slate-100 text-gray-700'}`}
                                    onClick={() => setActive(idx)}
                                >
                                    {d.icon} {d.name}
                                </li>)
                            })

                        }
                        <li></li>
                    </ul>
                </div>
            </div>

            <div className='flex-1'>
                <Todos />
            </div>
        </div>
    )
}

export default Dashboard