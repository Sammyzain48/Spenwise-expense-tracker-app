import React from "react";
import { RiCloseLine } from "react-icons/ri";

const FormModal = ({ setType, setShowModal, setIsOpen }) => {
  function openForm(selectedType) {
    setType(selectedType);
    setShowModal(false);
    setIsOpen(true);
  }

  return (
    <div className="modal w-full min-h-full inset-0 top-0 fixed flex justify-center items-center bg-[rgba(0,0,0,0.6)] p-3 sm:p-6 overflow-hidden">
      <div className="question bg-[#1e293b] w-full max-w-sm p-5 sm:p-6 rounded-2xl shadow-xs shadow-black overflow-hidden">
        <div className="text-right">
          <button
            onClick={() => setShowModal(false)}
            className="text-3xl font-extrabold bg-[#6366f1] hover:bg-[rgba(99,101,241,0.88)] rounded-full text-right cursor-pointer"
          >
            <RiCloseLine />
          </button>
        </div>
        <h2 className="text-2xl sm:text-3xl text-center mb-5 sm:mb-7 font-extrabold capitalize">
          what type of transaction is this?
        </h2>
        <div className="modal-cta flex flex-col sm:flex-row justify-center gap-3 sm:gap-10">
          <button
            onClick={() => openForm("income")}
            className="bg-[#10b981] font-semibold py-3 px-5 rounded-xl cursor-pointer drop-shadow-xs drop-shadow-black w-full sm:w-auto"
          >
            income
          </button>
          <button
            onClick={() => openForm("expense")}
            className="bg-[#ef4444] font-semibold py-2 px-5 rounded-xl cursor-pointer drop-shadow-xs drop-shadow-black w-full sm:w-auto"
          >
            expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
