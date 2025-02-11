import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/siddhu_outline_logo.svg'
import { MdAutoGraph, MdOutlineInventory, MdPerson } from 'react-icons/md';
import Todos from './Todos';

function Dashboard() {

    const { logOut, authData } = useAuth();

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
            <div className='h-screen w-60 border-r sticky top-0'>
                <div className='flex items-center m-7 mb-20 gap-2'>
                    <img alt='logo' src={logo} />
                    <h2 className='text-gray-700 font-medium'>Todo</h2>
                </div>
                <div>
                    <ul>
                        {
                            menuItems.map((d, idx) => {
                                return (<li
                                    key={idx}
                                    className={`flex items-center gap-3 font-medium text-lg text-gray-400 cursor-pointer m-3 ml-5 p-2 rounded-lg ${active === idx && 'bg-slate-50 text-gray-700'}`}
                                    onClick={() => setActive(idx)}
                                >
                                    {d.icon} {d.name}
                                </li>)
                            })

                        }
                    </ul>
                </div>

            </div>

            <div className='flex-1'>
                <div title='profile' className='absolute top-10 right-10 cursor-pointer'>
                    <img className='w-8 h-8 rounded-full' src={`https://api.dicebear.com/6.x/initials/svg?seed=${authData?.username}`} />
                </div>
                <Todos />
            </div>
        </div>
    )
}

export default Dashboard