import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdAdd, MdDone, MdOutlineBookmarkRemove, MdOutlineDeleteOutline } from 'react-icons/md'

function Todos() {
    const [date, setDate] = useState(new Date())
    const [active, setActive] = useState(0)
    const [activeDate, setActiveDate] = useState(3)
    const [items, setItems] = useState([
        {
            id: 1,
            taskName: 'read',
            taskDesc: 'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
            cAt: new Date().getTime(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        }, {
            id: 4,
            taskName: 'todo 4',
            taskDesc: 'this is my 4 todo',
            cAt: new Date().getTime(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },

        {
            id: 3,
            taskName: 'write',
            taskDesc: 'Duis aute irure dolor in reprehenderit in aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
            cAt: new Date().getTime(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        }, {
            id: 2,
            taskName: 'work',
            taskDesc: 'aliquip ex ea commodo consequat.',
            cAt: new Date().getTime,
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 2,
            taskName: 'work',
            taskDesc: 'aliquip ex ea commodo consequat.',
            cAt: new Date().getTime,
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 3,
            taskName: 'write',
            taskDesc: 'Duis aute irure dolor in reprehenderit in aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
            cAt: new Date().getTime(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 2,
            taskName: 'work',
            taskDesc: 'aliquip ex ea commodo consequat.',
            cAt: new Date().getTime,
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 3,
            taskName: 'write',
            taskDesc: 'Duis aute irure dolor in reprehenderit in aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
            cAt: new Date().getTime(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 2,
            taskName: 'work',
            taskDesc: 'aliquip ex ea commodo consequat.',
            cAt: new Date().getTime,
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 2,
            taskName: 'work',
            taskDesc: 'aliquip ex ea commodo consequat.',
            cAt: new Date().getTime,
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 3,
            taskName: 'write',
            taskDesc: 'Duis aute irure dolor in reprehenderit in aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
            cAt: new Date().getTime(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 3,
            taskName: 'write',
            taskDesc: 'Duis aute irure dolor in reprehenderit in aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu',
            cAt: new Date().getTime(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },

        {
            id: 5,
            taskName: 'todo 5',
            taskDesc: 'this is my 5 todo',
            cAt: new Date().getTime,
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 6,
            taskName: 'todo 6',
            taskDesc: 'this is my 6 todo',
            cAt: new Date().getTime(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 5,
            taskName: 'todo 5',
            taskDesc: 'this is my 5 todo',
            cAt: new Date().getTime,
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 6,
            taskName: 'todo 6',
            taskDesc: 'this is my 6 todo',
            cAt: new Date().getTime(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 5,
            taskName: 'todo 5',
            taskDesc: 'this is my 5 todo',
            cAt: new Date().getTime,
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 6,
            taskName: 'todo 6',
            taskDesc: 'this is my 6 todo',
            cAt: new Date().getTime(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 5,
            taskName: 'todo 5',
            taskDesc: 'this is my 5 todo',
            cAt: new Date().getTime,
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 6,
            taskName: 'todo 6',
            taskDesc: 'this is my 6 todo',
            cAt: new Date().getTime(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 5,
            taskName: 'todo 5',
            taskDesc: 'this is my 5 todo',
            cAt: new Date().getTime,
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 6,
            taskName: 'todo 6',
            taskDesc: 'this is my 6 todo',
            cAt: new Date().getTime(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
    ])


    const menuItems = [
        "todo",
        "completed",
        "skipped",
        "all"
    ]

    const getTodoColor = (state) => {
        switch (state) {
            case "TODO":
                return 'text-orange-300'
            case "SKIPPED":
                return 'text-red-500'
            case "COMPLETED":
                return 'text-green-500'
            default:
                break;
        }
    }

    const getRecentDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + i - 3);
            days.push(nextDay);
        }
        return days;
    };

    const TodoItem = ({ item }) => {
        const [hoverd, setHoverd] = useState(false)

        return (
            <div
                className='bg-white shadow-md border-slate-100 border-2 rounded-sm p-5 pb-5 w-96 m-3 h-fit relative'
                onMouseOver={() => setHoverd(true)}
                onMouseOut={() => setHoverd(false)}
            >
                {hoverd && <div className='absolute bg-white right-0 top-0 text-slate-500 border-l-2 border-b-2 border-slate-100 text-2xl flex gap-2 p-2'>
                    <CiEdit className='text-slate-600 cursor-pointer' title='edit' />
                    <MdOutlineDeleteOutline className='text-red-600 cursor-pointer' title='delete' />
                    <MdOutlineBookmarkRemove className='text-blue-500 cursor-pointer' title='skip' />
                    <MdDone className='text-green-600 cursor-pointer' title='complete' />
                </div>}
                <p className={`font-medium text-lg ${getTodoColor(item.state)}`}>{item.taskName}</p>
                <p className='text-sm text-slate-500'>{item.taskDesc}</p>
            </div>
        )
    }

    return (
        <div>
            {/* date section */}
            <div className='bg-slate-100 h-48 m-5 rounded-3xl'>
                <div>
                    <div className='flex'>
                        <div className='flex items-end gap-5 p-10'>
                            <span className='text-8xl'>{date.getDate().toString().padStart(2, "0")}</span>
                            <div>
                                <span className='text-xl font-semibold'>
                                    {date.toLocaleDateString("en-US", { weekday: "long" })}
                                </span>
                                <div className='text-3xl font-light pb-1'>
                                    <span>
                                        {date.toLocaleDateString("en-US", { month: "short" })}
                                    </span>,
                                    <span>
                                        {date.getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-center'>
                            <div className='flex p-10 gap-5 items-end'>
                                {getRecentDays().map((d, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className={`text-center cursor-pointer font-bold text-gray-400 ${idx == 3 && 'text-blue-500'} ${activeDate === idx && 'text-gray-700'}`}
                                            onClick={() => setActiveDate(idx)}
                                        >
                                            <div>{d.toLocaleDateString("en-US", { weekday: 'short' })}</div>
                                            <div>{d.getDate().toString().padStart(2, "0")} </div>
                                        </div>
                                    )
                                })

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* todo menu */}
            <div className='flex gap-10 items-center'>
                <div className='bg-slate-100 w-fit m-5 rounded-xl p-2'>
                    {
                        menuItems.map((d, idx) => {
                            return (
                                <span
                                    key={idx}
                                    className={`cursor-pointer p-2 text-lg inline-block text-center w-36 ${active === idx && 'bg-white rounded-lg font-medium'} `}
                                    onClick={() => setActive(idx)}
                                >
                                    {d}
                                </span>
                            )
                        })
                    }

                </div>
                <button type='button' className='flex items-center bg-blue-500 text-white p-2 pl-5 pr-5 rounded-full h-fit'><MdAdd /> Add</button>
            </div>
            <div className='flex p-2 flex-wrap'>
                {items.filter((item) => item.state === menuItems[active].toUpperCase() || active === 3).length === 0 && <div className='m-3 p-2 text-2xl font-extralight'> No todos left here </div>}
                {
                    items.filter((item) => item.state === menuItems[active].toUpperCase() || active === 3).map((item, idx) => (
                        <TodoItem key={idx} item={item} />
                    ))
                }
            </div>

        </div>
    )
}

export default Todos