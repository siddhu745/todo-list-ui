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
            <div className='h-screen w-56 border-r-4 sticky top-0'>
                <div className='flex items-center m-5 mt-20 mb-28 justify-center gap-5'>
                    <img alt='logo' src={logo} />
                    <h2 className='text-gray-700 font-medium'>Todo</h2>
                </div>
                <div>
                    <ul>
                        {
                            menuItems.map((d, idx) => {
                                return (<li
                                    key={idx}
                                    className={`flex items-center gap-3 font-medium text-lg text-gray-400 cursor-pointer m-3 ml-5 p-2 rounded-lg ${active === idx && 'bg-slate-100 text-gray-700'}`}
                                    onClick={() => setActive(idx)}
                                >
                                    {d.icon} {d.name}
                                </li>)
                            })

                        }
                    </ul>
                </div>
                <div title='profile' className='absolute bottom-0 pl-7 p-3 bg-slate-100 w-full flex items-center gap-2 text-center cursor-pointer font-medium text-gray-600'>
                    <div className='w-10 h-10 rounded-full border-2 border-gray-600 text-3xl flex justify-center items-center' ><MdPerson /></div>
                    {authData?.username}
                </div>
            </div>

            <div className='flex-1'>
                <Todos />
            </div>
        </div>
    )
}

export default Dashboard