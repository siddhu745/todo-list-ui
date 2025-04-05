import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  CREATE_TODO,
  GET_PAST_ACTIVITY,
  GET_PAST_TODOS,
} from "../../apiClient/url";
import { axiosClient } from "../../apiClient/apiClient";
import { RiAddCircleFill } from "react-icons/ri";

function MyActivity() {
  const [activityLoading, setActivityLoading] = useState(false);
  const [activity, setActivity] = useState(null);
  const [todosLoading, setTodosLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState({});
  const [msg, setMsg] = useState("");

  const [monthModal, setMonthModal] = useState({
    open: false,
    data: 0,
  });
  const [yearModal, setYearModal] = useState({
    open: false,
    data: 0,
  });

  const { setUnauthError } = useAuth();
  const navigate = useNavigate();

  const fetchAvailable = async () => {
    try {
      setActivityLoading(true);
      const response = await axiosClient.get(GET_PAST_ACTIVITY);
      setActivity(response.data.data);
    } catch (error) {
      if (
        error?.code === "ERR_NETWORK" ||
        error?.response?.status === 401 ||
        error?.response?.status === 403
      ) {
        setUnauthError(error);
        // console.log(error, "at protected route")
        navigate("/", { replace: true });
      }
    } finally {
      setActivityLoading(false);
    }
  };

  const fetchTodo = async () => {
    try {
      setTodosLoading(true);
      const response = await axiosClient.get(
        GET_PAST_TODOS + `?month=${monthModal.data}&year=${yearModal.data}`
      );
      setTodos(response.data.data);
    } catch (error) {
      if (
        error?.code === "ERR_NETWORK" ||
        error?.response?.status === 401 ||
        error?.response?.status === 403
      ) {
        setUnauthError(error);
        // console.log(error, "at protected route")
        navigate("/", { replace: true });
      }
    } finally {
      setTodosLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailable();
  }, []);

  useEffect(() => {
    if (activity) {
      setMonthModal((prev) => ({ ...prev, data: new Date().getMonth() + 1 }));
      setYearModal((prev) => ({ ...prev, data: new Date().getFullYear() }));
      fetchTodo();
    }
  }, [activity]);

  useEffect(() => {
    fetchTodo();
  }, [monthModal.data, yearModal.data]);

  const insertTodo = async () => {
    try {
      const response = await axiosClient.post(CREATE_TODO, {
        name: addTodo.name,
        description: addTodo.description,
      });
      if (response.status === 200) setMsg("added");
    } catch (error) {
      setMsg("unable to add, try again.");
    } finally {
      setTimeout(() => {
        setMsg("");
      }, 1500);
    }
  };

  useEffect(() => {
    if (addTodo.name) {
      insertTodo();
    }
  }, [addTodo]);

  const TodoItem = ({ item }) => {
    const [hoverd, setHoverd] = useState(false);
    const getTodoBorderColor = {
      TODO: "border-t-blue-500",
      SKIPPED: "border-t-red-500",
      COMPLETED: "border-t-green-500",
    };
    const getTodoHeadingColor = {
      TODO: "text-blue-500",
      SKIPPED: "text-red-500",
      COMPLETED: "text-green-500",
    };
    return (
      <div
        className={`border-t-4 ${
          getTodoBorderColor[item.state]
        } bg-white dark:bg-slate-900 shadow-md rounded-sm rounded-t p-6 pl-5 pb-7 w-80 h-fit relative`}
        onMouseOver={() => setHoverd(true)}
        onMouseOut={() => {
          setHoverd(false);
        }}
      >
        {hoverd && (
          <div
            title="Quick actions"
            className="absolute right-0 top-0 text-slate-500 border-slate-100 text-2xl flex gap-2 p-1"
          >
            <div className="text-base">{msg}</div>
            <RiAddCircleFill
              className="text-slate-400 hover:text-blue-500 cursor-pointer"
              title="add todo"
              onClick={() => {
                setAddTodo(item);
              }}
            />
          </div>
        )}

        <p className={`font-medium text-lg ${getTodoHeadingColor[item.state]}`}>
          {item.name}
        </p>
        <p className="text-sm text-slate-500">{item.description}</p>
        {hoverd && (
          <p
            title="created at"
            className="absolute text-xs text-slate-400 right-2 bottom-2"
          >
            {new Date(item.cAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </p>
        )}
      </div>
    );
  };

  const pendingTodos = todos.filter(
    (item) => item.state === "TODO" || item.state === "SKIPPED"
  );

  const completedTodos = todos.filter((item) => item.state === "COMPLETED");

  return activityLoading ? (
    <div className="font-extralight text-slate-500 text-2xl text-center m-10">
      Please wait... Fetching activity
    </div>
  ) : (
    <div className="mb-10">
      <div className="pl-10">
        <div className="flex items-center gap-4 mb-5 mt-10">
          <p className="text-2xl w-60">Monthly Activity</p>

          <div
            onClick={() =>
              setMonthModal((prev) => ({
                ...prev,
                open: !prev.open,
              }))
            }
            className="border w-32 border-slate-500 rounded-full px-3 py-1 cursor-pointer flex gap-2 justify-between align-middle relative"
          >
            {new Date(0, monthModal.data - 1).toLocaleString("default", {
              month: "long",
            })}
            <FaSortDown />
            {monthModal.open && (
              <div className="absolute top-10 w-full bg-white right-0 border border-slate-500 rounded-md overflow-hidden">
                {activity &&
                  activity.months.map((data, idx) => (
                    <p
                      onClick={() =>
                        setMonthModal((prev) => ({ ...prev, data: data }))
                      }
                      key={idx}
                      className="px-3 py-1 hover:bg-slate-100"
                    >
                      {new Date(0, data - 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </p>
                  ))}
              </div>
            )}
          </div>

          <div
            onClick={() =>
              setYearModal((prev) => ({
                ...prev,
                open: !prev.open,
              }))
            }
            className="border border-slate-500 rounded-full px-3 py-1 cursor-pointer flex gap-2 justify-between align-middle relative"
          >
            {yearModal.data}
            <FaSortDown />
            {yearModal.open && (
              <div className="absolute top-10 w-full bg-white right-0 border border-slate-500 rounded-md overflow-hidden">
                {activity &&
                  activity.years.map((data, idx) => (
                    <p
                      onClick={() =>
                        setYearModal((prev) => ({ ...prev, data: data }))
                      }
                      key={idx}
                      className="px-3 py-1 hover:bg-slate-100"
                    >
                      {data}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-50 w-40 py-4 rounded-md text-center">
            <span className="text-5xl">{todos.length}</span>
            <p className="text-slate-400">Created</p>
          </div>
          <div className="bg-green-50 w-40 py-4 rounded-md text-center text-green-500">
            <span className="text-5xl">{completedTodos.length}</span>
            <p className="text-green-400">Completed</p>
          </div>
          <div className="bg-red-50 w-40 py-4 rounded-md text-center text-red-500">
            <span className="text-5xl">{pendingTodos.length}</span>
            <p className="text-red-400">Pending</p>
          </div>
        </div>
        <div>
          <p className="text-2xl mb-5 mt-10">
            Pending tasks .{" "}
            <span className="text-sm text-slate-500">
              You can reopen these now
            </span>
          </p>
          {todosLoading ? (
            <div>Loading...</div>
          ) : pendingTodos.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {pendingTodos.map((item) => (
                <TodoItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-xl font-extralight">No todos left here</div>
          )}
        </div>
        <div>
          <p className="text-2xl mb-5 mt-10">
            Completed tasks .{" "}
            <span className="text-sm text-slate-500">
              You can reopen these now
            </span>
          </p>
          {todosLoading ? (
            <div>Loading...</div>
          ) : completedTodos.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {completedTodos.map((item) => (
                <TodoItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-xl font-extralight">No todos left here</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyActivity;
