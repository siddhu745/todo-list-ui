import React, { useState } from 'react'

function Todos() {
    const [date, setDate] = useState(new Date())
    const [active, setActive] = useState(0)
    const [activeDate, setActiveDate] = useState(3)


    const menuItems = [
        "todo",
        "completed",
        "skipped",
        "all"
    ]

    const getRecentDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + i - 3);
            days.push(nextDay);
        }
        return days;
    };

    return (
        <div>
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
                                            className={`text-center cursor-pointer font-bold text-gray-400 ${idx == 3 && 'text-blue-400'} ${ activeDate === idx && 'text-gray-700'}`}
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
            <div>
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
            </div>
        </div>
    )
}

export default Todos