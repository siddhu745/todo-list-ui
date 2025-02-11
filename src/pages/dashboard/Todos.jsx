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
            taskName: 'Fix Login Bug',
            taskDesc: 'Investigate authentication failures where users are unable to log in under specific conditions, especially when using social logins. Debug logs, replicate the issue, and implement a solution ensuring no regressions. Add automated tests to prevent future issues.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 2,
            taskName: 'Write Unit Tests',
            taskDesc: 'Improve test coverage for the user authentication module.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 3,
            taskName: 'Optimize API Response Time',
            taskDesc: 'Analyze slow API endpoints and optimize them by refactoring database queries, adding caching where necessary, and reducing payload sizes. The goal is to ensure all API responses complete within 200ms for better user experience.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 4,
            taskName: 'Update Project Dependencies',
            taskDesc: 'Upgrade outdated NPM dependencies to resolve security vulnerabilities and improve performance. Ensure major updates do not break existing features by running regression tests post-update.',
            cAt: new Date().toLocaleString(),
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 5,
            taskName: 'Implement Dark Mode',
            taskDesc: 'Allow users to switch between light and dark themes based on their preferences. Store preferences in local storage or user profiles for a persistent experience across sessions.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 6,
            taskName: 'Fix Memory Leak Issue',
            taskDesc: 'Memory consumption spikes over time, leading to performance degradation. Profile the Node.js application, identify memory leaks, and optimize garbage collection strategies.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 7,
            taskName: 'Refactor Legacy Code',
            taskDesc: 'Convert old JavaScript class-based components into React functional components using hooks, ensuring improved readability and maintainability.',
            cAt: new Date().toLocaleString(),
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 8,
            taskName: 'Add Logging to Backend',
            taskDesc: 'Implement structured logging using Winston to improve debugging and monitoring.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 9,
            taskName: 'Deploy Microservices',
            taskDesc: 'Migrate monolithic services into microservices architecture for better scalability. Implement API gateways and service discovery mechanisms.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 10,
            taskName: 'Fix Broken Links in Documentation',
            taskDesc: 'Some internal links in the API documentation lead to 404 errors. Identify and fix them for better developer experience.',
            cAt: new Date().toLocaleString(),
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 11,
            taskName: 'Implement Rate Limiting',
            taskDesc: 'Prevent API abuse by implementing rate limiting using Redis. Ensure that limits are configurable and work across multiple servers.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 12,
            taskName: 'Fix UI Alignment Issues',
            taskDesc: 'The profile page layout is breaking on mobile screens. Ensure responsiveness using CSS Grid or Flexbox.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 13,
            taskName: 'Conduct Load Testing',
            taskDesc: 'Use JMeter to simulate thousands of concurrent users and identify performance bottlenecks in the application backend. Tune database connections and optimize caching strategies.',
            cAt: new Date().toLocaleString(),
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 14,
            taskName: 'Add OAuth Support',
            taskDesc: 'Implement OAuth login with Google, GitHub, and Facebook to provide users with alternative authentication options.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 15,
            taskName: 'Migrate Database to PostgreSQL',
            taskDesc: 'The application currently uses MySQL, but PostgreSQL provides better performance for complex queries. Plan the migration, update the ORM models, and test thoroughly before deployment.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 16,
            taskName: 'Fix Session Expiry Bug',
            taskDesc: 'Users are being logged out randomly due to session expiration issues. Investigate token refresh mechanism and implement an appropriate fix.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 17,
            taskName: 'Automate CI/CD Pipeline',
            taskDesc: 'Set up GitHub Actions to automate testing and deployment processes, ensuring faster and more reliable software releases.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 18,
            taskName: 'Fix Broken Email Notifications',
            taskDesc: 'Users are not receiving password reset emails. Check SMTP configuration and logs to debug the issue.',
            cAt: new Date().toLocaleString(),
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 19,
            taskName: 'Improve Search Performance',
            taskDesc: 'Implement Elasticsearch to enhance search performance, replacing slow text-based SQL searches.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 20,
            taskName: 'Fix UI Flashing Issue',
            taskDesc: 'Investigate and resolve the issue where UI elements flicker during page transitions.',
            cAt: new Date().toLocaleString(),
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 21,
            taskName: 'Enable Two-Factor Authentication',
            taskDesc: 'Improve security by adding an option for two-factor authentication (2FA) using TOTP or SMS verification.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 22,
            taskName: 'Setup Logging Dashboard',
            taskDesc: 'Integrate an ELK stack (Elasticsearch, Logstash, Kibana) for real-time monitoring of application logs.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 23,
            taskName: 'Fix Cross-Origin Issues',
            taskDesc: 'Users are experiencing CORS errors when making API requests. Adjust server configurations to allow appropriate cross-origin requests.',
            cAt: new Date().toLocaleString(),
            state: "TODO",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 24,
            taskName: 'Implement Feature Flags',
            taskDesc: 'Use feature flags to enable or disable experimental features without redeploying the app.',
            cAt: new Date().toLocaleString(),
            state: "SKIPPED",
            user: 'sivaramsiddhu@gmail.com',
        },
        {
            id: 25,
            taskName: 'Write Technical Documentation',
            taskDesc: 'Create detailed documentation for the backend API, including authentication methods, rate limits, and expected response formats.',
            cAt: new Date().toLocaleString(),
            state: "COMPLETED",
            user: 'sivaramsiddhu@gmail.com',
        },
    ])


    const menuItems = [
        "All",
        "Todo",
        "Completed",
        "Skipped"
    ]

    const getTodoColor = (state) => {
        switch (state) {
            case "TODO":
                return 'orange-300'
            case "SKIPPED":
                return 'red-500'
            case "COMPLETED":
                return 'green-500'
            default:
                break;
        }
    }

    const getBgColor = (state) => {
        switch (state) {
            case 1:
                return 'bg-orange-50'
            case 3:
                return 'bg-red-50'
            case 2:
                return 'bg-green-50'
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
                className={`bg-white shadow-md  border-t-4 rounded-t border-t-${getTodoColor(item.state)} rounded-sm p-6 pl-5 pb-7 w-80 m-3 h-fit relative`}
                onMouseOver={() => setHoverd(true)}
                onMouseOut={() => setHoverd(false)}
            >
                {hoverd && <div className='absolute right-0 top-0 text-slate-500 border-slate-100 text-2xl flex gap-2 p-1'>
                    <CiEdit className='text-slate-600 cursor-pointer' title='edit' />
                    <MdOutlineDeleteOutline className='text-red-600 cursor-pointer' title='delete' />
                    <MdOutlineBookmarkRemove className='text-blue-500 cursor-pointer' title='skip' />
                    <MdDone className='text-green-600 cursor-pointer' title='complete' />
                </div>}
                <p className={`font-medium text-lg text-${getTodoColor(item.state)}`}>{item.taskName}</p>
                <p className='text-sm text-slate-500'>{item.taskDesc}</p>
                {hoverd && <p title='created at' className='absolute text-xs text-slate-300 right-2 bottom-2'>{item.cAt}</p>}
            </div>
        )
    }

    return (
        <div className='ml-10'>
            {/* date section */}
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
            </div>


            {/* todo menu */}
            <div className='flex gap-5 items-center'>
                <div className={`bg-slate-50 w-fit m-3 ml-5 rounded-xl p-1 ${getBgColor(active)}`}>
                    {
                        menuItems.map((d, idx) => {
                            return (
                                <span
                                    key={idx}
                                    className={`cursor-pointer p-1 text-lg inline-block text-center w-28 ${active === idx && `text-${getTodoColor(d.toUpperCase())} font-medium`}`}
                                    onClick={() => setActive(idx)}
                                >
                                    {d}
                                </span>
                            )
                        })
                    }

                </div>
                <button title='Add todo' type='button' className='flex items-center bg-blue-500 text-white font-extrabold text-2xl p-1 rounded-full h-fit'><MdAdd /></button>
            </div>
            <div className='flex p-2 flex-wrap'>

                {items.filter((item) => item.state === menuItems[active].toUpperCase() || active === 0).length === 0
                    ?
                    <div className='m-3 mt-0 p-2 text-2xl font-extralight'>
                        No todos left here
                    </div> :
                    <div className='m-3 mt-0 text-2xl font-extralight w-full'>
                        {items.filter((item) => item.state === menuItems[active].toUpperCase() || active === 0).length} Todos
                    </div>
                }

                {
                    items.filter((item) => item.state === menuItems[active].toUpperCase() || active === 0).map((item, idx) => (
                        <TodoItem key={idx} item={item} />
                    ))
                }

            </div>

        </div>
    )
}

export default Todos