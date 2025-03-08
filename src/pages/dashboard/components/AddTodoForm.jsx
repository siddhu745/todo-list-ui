import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../apiClient/apiClient";
import { CREATE_TODO } from "../../../apiClient/url";

function AddTodoForm({ showForm, setShowFrom, setInserted }) {
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(false);
  const [wait, setWait] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setWait(true);
      const response = await axiosClient.post(CREATE_TODO, inputs);
      if(response.status === 200) {
        setInserted(true)
      }
      handleClose()
    } catch (error) {
      setMsg("Network Error !, please try again...");
    } finally {
      setWait(false);
      setTimeout(() => {
        handleClose();
      }, 1500);
      setInputs({});
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setShow(showForm);
  }, [showForm]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setShowFrom(false);
      setMsg("");
    }, 150);
  };

  return (
    showForm && (
      <div
        className={`fixed h-screen w-full flex justify-center items-center top-0 left-0`}
        onClick={handleClose}
      >
        <div
          className={`bg-white p-5 border rounded-md drop-shadow-2xl transition-all duration-300 ease-in-out ${
            show ? "mt-0" : "mt-5"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-blue-500 text-2xl m-1 mb-5">Add Todo</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="m-1 text-slate-500">
                Name
              </label>
              <br />
              <input
                name="name"
                value={inputs.name || ""}
                type="text"
                onChange={handleChange}
                className="border-2 p-1 pl-2 rounded-xl w-80 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="m-1 text-slate-500">
                Description
              </label>
              <br />
              <textarea
                name="description"
                value={inputs.description || ""}
                type="area"
                onChange={handleChange}
                className="border-2 p-1 pl-2 rounded-xl w-80 focus:border-blue-500 focus:outline-none"
                rows={6}
                required
              ></textarea>
            </div>
            <div className="float-right">
              {!wait && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 pb-1 pt-1 border border-slate-500 rounded mr-2"
                >
                  cancel
                </button>
              )}
              <button
                disabled={wait}
                className="p-2 pb-1 pt-1 border border-blue-500 bg-blue-500 text-white rounded"
              >
                {wait ? "please wait..." : "add"}
              </button>
            </div>
            <br />
            <br />
            {msg && (
              <p className="text-red-500 p-2 m-1 bg-red-100 rounded-md w-full block">
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>
    )
  );
}

export default AddTodoForm;
