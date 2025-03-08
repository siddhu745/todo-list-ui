import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../apiClient/apiClient";
import { CREATE_TODO } from "../../../apiClient/url";

function DeleteAlert({ deleteAlert, setDeleteAlert, setConfirmDeleteTodo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setDeleteAlert(false);
    }, 150);
  };

  const handleYes = () => {
    setShow(false);
    setTimeout(() => {
      setDeleteAlert(false);
    }, 150);
    setConfirmDeleteTodo(true);
  };

  useEffect(() => {
    setShow(deleteAlert);
  }, [deleteAlert]);

  return (
    deleteAlert && (
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
          <h1 className="text-red-500 text-2xl">Are you sure you want to delete this todo?</h1>
          <p className="text-slate-500">You can't undo this action.</p>
          <div className="float-right">
          <button
            onClick={handleClose}
            className="p-2 pb-1 pt-1 border text-red-500 border-red-500 rounded mr-2"
          >
            cancel
          </button>

          <button
            className="p-2 pb-1 pt-1 border border-red-500 bg-red-500 text-white rounded"
            onClick={handleYes}
          >
            Yes
          </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteAlert;
