import React, { useEffect, useState } from "react";
import {
  MdAdd,
  MdBookmarkRemove,
  MdDelete,
  MdDone,
  MdEdit,
} from "react-icons/md";
import AddTodoForm from "./components/AddTodoForm";
import { axiosClient } from "../../apiClient/apiClient";
import { GET_TODO, UPDATE_STATE } from "../../apiClient/url";
import DeleteAlert from "./components/DeleteAlert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Todos() {
  const date = new Date();
  const [active, setActive] = useState(0);
  const [addTodo, setAddTodo] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({});
  const [confirmDeleteTodo, setConfirmDeleteTodo] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [inserted, setInserted] = useState(false);
  const [items, setItems] = useState([]);
  const [todoStateUpdated, setTodoStateUpdated] = useState({});
  const [deletedTodo, setDeletedTodo] = useState({});
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState(items);
  const [todosLoading, setTodosLoading] = useState(false);

  const { authData, loading, isLogOut, setUnauthError } = useAuth();
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      setTodosLoading(true);
      const response = await axiosClient.get(GET_TODO);
      setItems(response.data.data);
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

  const updateState = async (id, state) => {
    try {
      const response = await axiosClient.patch(UPDATE_STATE + `${id}/${state}`);
      if (response.status === 200) setTodoStateUpdated(response.data.data);
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
    }
  };

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((e) =>
        e.id === todoStateUpdated.id ? todoStateUpdated : e
      )
    );
  }, [todoStateUpdated]);

  const deleteTodo = async (id) => {
    try {
      const response = await axiosClient.delete(
        UPDATE_STATE + `delete?id=${id}`
      );
      if (response.status === 200) setDeletedTodo(response.data.data);
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
    }
  };

  useEffect(() => {
    setItems((prevItems) => prevItems.filter((e) => e.id !== deletedTodo.id));
    setConfirmDeleteTodo(false);
  }, [deletedTodo]);

  useEffect(() => {
    if (confirmDeleteTodo) deleteTodo(deleteId);
  }, [confirmDeleteTodo]);

  // call on load
  useEffect(() => {
    fetch();
  }, []);

  // call when inserted
  useEffect(() => {
    if (inserted) {
      fetch();
      setInserted(false);
    }
  }, [inserted]);

  //search
  useEffect(() => {
    setSearchItems(
      items.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const menuItems = ["All", "Todo", "Completed", "Skipped"];

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

  const getMenuBgColor = {
    0: "bg-slate-50",
    1: "bg-blue-50",
    2: "bg-green-50",
    3: "bg-red-50",
  };

  const TodoItem = ({ item }) => {
    const [hoverd, setHoverd] = useState(false);

    return (
      <div
        className={`border-t-4 ${
          getTodoBorderColor[item.state]
        } bg-white dark:bg-slate-900 shadow-md rounded-sm rounded-t    p-6 pl-5 pb-7 w-80 m-3 h-fit relative`}
        onMouseOver={() => setHoverd(true)}
        onMouseOut={() => setHoverd(false)}
      >
        {hoverd && (
          <div
            title="Quick actions"
            className="absolute right-0 top-0 text-slate-500 border-slate-100 text-2xl flex gap-2 p-1"
          >
            <MdEdit
              className="text-slate-400 hover:text-blue-500 cursor-pointer"
              title="edit"
              onClick={() => {
                setAddTodo(true);
                setUpdateTodo(item);
              }}
            />
            <MdDelete
              className="text-slate-400 hover:text-gray-900 cursor-pointer"
              title="delete"
              onClick={() => {
                setDeleteAlert(true);
                setDeleteId(item.id);
              }}
            />
            {item.state !== menuItems[2].toUpperCase() &&
              item.state !== menuItems[3].toUpperCase() && (
                <MdBookmarkRemove
                  className="text-slate-400 hover:text-red-500 cursor-pointer"
                  title="skip"
                  onClick={() =>
                    updateState(item.id, menuItems[3].toUpperCase())
                  }
                />
              )}
            {item.state !== menuItems[2].toUpperCase() && (
              <MdDone
                className="text-slate-400 hover:text-green-500 cursor-pointer"
                title="complete"
                onClick={() => updateState(item.id, menuItems[2].toUpperCase())}
              />
            )}
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

  return (
    <div className="pl-10">
      {/* date section */}
      <div className="flex">
        <div className="flex items-end gap-5 p-10">
          <span className="text-8xl">
            {date.getDate().toString().padStart(2, "0")}
          </span>
          <div>
            <span className="text-xl font-semibold">
              {date.toLocaleDateString("en-US", { weekday: "long" })}
            </span>
            <div className="text-3xl font-light pb-1">
              <span>
                {date.toLocaleDateString("en-US", { month: "short" })}
              </span>{" "}
              <span>{date.getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* todo menu */}
      <div className="flex flex-wrap gap-3 items-center">
        <div
          className={`dark:bg-slate-900 w-fit m-3 ml-4 rounded-xl p-1 ${getMenuBgColor[active]}`}
        >
          {menuItems.map((d, idx) => {
            return (
              <span
                key={idx}
                className={`cursor-pointer p-1  text-lg inline-block text-center w-28 ${
                  active === idx &&
                  `${getTodoHeadingColor[d.toUpperCase()]} font-medium`
                }`}
                onClick={() => setActive(idx)}
              >
                {d}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-5">
          <div>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search todo..."
              className=" border-slate-400 p-2 px-4 text-lg rounded-lg bg-slate-50 outline-none"
            />
          </div>
          <button
            title="Add todo"
            type="button"
            className="flex items-center bg-blue-500 text-white font-extrabold text-2xl p-1 rounded-full h-fit"
            onClick={() => setAddTodo((prev) => !prev)}
          >
            <MdAdd />
          </button>
        </div>
      </div>

      {/* items */}
      {todosLoading ? (
        <div className="m-3 mt-0 p-2 text-2xl font-extralight">Loading...</div>
      ) : (
        <div className="flex p-2 flex-wrap">
          {items.filter(
            (item) =>
              item.state === menuItems[active].toUpperCase() || active === 0
          ).length === 0 ? (
            <div className="m-3 mt-0 p-2 text-2xl font-extralight">
              No todos left here{" "}
              {active === 0 && ", have a goal today and create one."}
            </div>
          ) : (
            <div className="m-3 mt-0 text-2xl font-extralight w-full">
              {search.length > 0
                ? searchItems.filter(
                    (item) =>
                      item.state === menuItems[active].toUpperCase() ||
                      active === 0
                  ).length
                : items.filter(
                    (item) =>
                      item.state === menuItems[active].toUpperCase() ||
                      active === 0
                  ).length}{" "}
              Todos
            </div>
          )}

          {search.length > 0
            ? searchItems
                .filter(
                  (item) =>
                    item.state === menuItems[active].toUpperCase() ||
                    active === 0
                )
                .map((item, idx) => <TodoItem key={idx} item={item} />)
            : items
                .filter(
                  (item) =>
                    item.state === menuItems[active].toUpperCase() ||
                    active === 0
                )
                .map((item, idx) => <TodoItem key={idx} item={item} />)}
        </div>
      )}

      <AddTodoForm
        showForm={addTodo}
        setShowFrom={setAddTodo}
        setInserted={setInserted}
        updateTodo={updateTodo}
        setUpdateTodo={setUpdateTodo}
      />

      <DeleteAlert
        deleteAlert={deleteAlert}
        setDeleteAlert={setDeleteAlert}
        setConfirmDeleteTodo={setConfirmDeleteTodo}
      />
    </div>
  );
}

export default Todos;
