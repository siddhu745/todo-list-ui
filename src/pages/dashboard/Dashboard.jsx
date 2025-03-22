import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/siddhu_outline_logo.svg";
import { MdAutoGraph, MdOutlineInventory, MdPerson } from "react-icons/md";
import Todos from "./Todos";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { TbSquareToggle } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import MyActivity from "./MyActivity";
import OlderTasks from "./OlderTasks";

function Dashboard() {
  const { logOut, authData } = useAuth();
  const [active, setActive] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [minimize, setMinimize] = useState(true);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/", { replace: true });
    logOut();
  };

  const menuItems = [
    {
      icon: <MdOutlineInventory />,
      name: "todos",
      page: <Todos />
    },
    {
      icon: <MdAutoGraph />,
      name: "my activity",
      page: <MyActivity />
    },
    {
      icon: <SlCalender />,
      name: "older tasks",
      page: <OlderTasks />
    },
  ];

  return (
    <div className="flex" onClick={() => setShowProfile(false)}>
      {minimize ? (
        <div className="h-screen w-20 border-r sticky top-0 transition-[width] duration-300">
          <div>
            <img
              className="mx-auto my-14"
              height={30}
              width={30}
              alt="logo"
              src={logo}
            />
          </div>
          <div>
            <ul>
              {menuItems.map((d, idx) => {
                return (
                  <li
                    key={idx}
                    className={`font-medium text-2xl text-gray-400 cursor-pointer flex justify-center mb-2 p-2 rounded ${
                      active === idx &&
                      "bg-slate-50 text-gray-700 dark:bg-slate-900 dark:text-gray-100"
                    }`}
                    onClick={() => setActive(idx)}
                    title={d.name}
                  >
                    {d.icon}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="h-screen w-60 border-r sticky top-0">
          <TbSquareToggle
            className="text-2xl m-3 absolute right-0 text-gray-400 cursor-pointer"
            onClick={() => setMinimize((prev) => !prev)}
          />
          <div className="flex items-center m-14 mb-20 gap-2">
            <img height={30} width={30} alt="logo" src={logo} />
            <h2 className="text-gray-700 dark:text-gray-100 font-medium">
              todo
            </h2>
          </div>
          <div>
            <ul>
              {menuItems.map((d, idx) => {
                return (
                  <li
                    key={idx}
                    className={`flex items-center gap-3 font-medium text-lg text-gray-400 cursor-pointer m-3 ml-5 p-2 rounded ${
                      active === idx &&
                      "bg-slate-50 text-gray-700 dark:bg-slate-900 dark:text-gray-100"
                    }`}
                    onClick={() => setActive(idx)}
                  >
                    {d.icon} {d.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <div className="flex-1">
        {minimize && (
          <TbSquareToggle
            className="text-2xl m-3 absolute left-30 text-gray-400 cursor-pointer"
            onClick={() => setMinimize((prev) => !prev)}
          />
        )}
        <div className="absolute top-10 right-10 cursor-pointer">
          <img
            title="profile"
            className="w-8 h-8 rounded-full"
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${authData?.username}`}
            onClick={(e) => {
              setShowProfile((prev) => !prev);
              e.stopPropagation();
            }}
          />
          {showProfile && (
            <div
              className="absolute right-0 p-4 border mt-2 rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              <p>{authData?.email}</p> <hr className="my-3" />
              <p
                className="flex items-center gap-2 hover:text-red-500"
                onClick={handleLogOut}
              >
                <LuLogOut /> Log out
              </p>
            </div>
          )}
        </div>
        {menuItems[active].page}
      </div>
    </div>
  );
}

export default Dashboard;
