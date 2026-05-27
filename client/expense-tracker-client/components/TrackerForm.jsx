import React from "react";
import { useState } from "react";
import useAxiosPrivate from "../api/useAxiosPrivate";
import Button from "../components/Button";
const TrackerForm = ({ type, closeForm, fetchTransaction }) => {
  const incomeCategory = ["gift", "salary", "investment", "refund", "other"];
  const expenseCategory = [
    "shopping",
    "transportation",
    "subscription",
    "hobbies",
    "betting",
    "groceries",
    "food",
    "bills",
    "other",
  ];

  const categories = type === "income" ? incomeCategory : expenseCategory;

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const api = useAxiosPrivate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post(
        "/api/home/transaction",
        { ...form, type, date: new Date(), amount: Number(form.amount) },
        { withCredentials: true },
      );
      await fetchTransaction();
    } catch (error) {
      console.log(
        "failed to upload transaction to database -> ",
        error.message,
      );
    } finally {
      closeForm();
    }
  }

  return (
    <div className="tracker-form w-full h-full inset-0 top-0 fixed flex justify-center items-center bg-[rgba(0,0,0,0.6)] overflow-hidden p-3 sm:p-6 sm:inset-0">
      <div className="form-modal bg-[#1e293b] w-full max-w-xl h-auto rounded-2xl shadow-xs shadow-black overflow-hidden">
        <h2 className="bg-[#222e40] p-5 sm:p-6 font-bold text-base sm:text-lg">
          Add Transaction
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 sm:gap-10 m-3 sm:m-5"
        >
          <div className="inputs flex flex-col gap-4 sm:gap-5">
            <div className="title">
              <label htmlFor="title" className="text-sm font-bold mb-4">
                TITLE
              </label>
              <input
                className="w-full h-10 rounded-xl bg-[#293548] p-2.5 mt-1 placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="eg. Monthly rent"
              />
            </div>

            <div className="amount_category flex flex-col sm:flex-row justify-between items-center gap-5">
              <div className="flex flex-col flex-1">
                <label htmlFor="amount" className="text-sm font-bold">
                  AMOUNT
                </label>

                <input
                  className="w-full h-10 rounded-xl bg-[#293548] p-2.5 mt-1 placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div className="flex flex-col flex-1">
                <label htmlFor="category" className="text-sm font-bold">
                  CATEGORY
                </label>

                <select
                  className="w-full h-10 rounded-xl bg-[#293548] p-2.5 mt-1 placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                  name="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="date">
              <label htmlFor="date" className="text-sm font-bold mb-4">
                DATE
              </label>

              <input
                className="w-full h-10 rounded-xl bg-[#293548] p-2.5 mt-1 placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                type="date"
                name="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="mm/dd/yy"
              />
            </div>
            <div className="note">
              <label htmlFor="note" className="text-sm font-bold mb-4">
                NOTE
              </label>

              <textarea
                className="w-full h-20 rounded-xl bg-[#293548] p-2.5 mt-1 placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                name="note"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Add more detail"
              />
            </div>
          </div>

          <div className="tracker-cta flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              className="cursor-pointer h-11 rounded-xl bg-[#1e293b] border border-[#182234] text-[#e2e8f0] px-4 font-extrabold hover:border-[#6366f1] transition-colors"
              onClick={closeForm}
            >
              Cancel
            </button>
            <div className="add sm:ml-auto">
              <Button
                background={"#6366f1"}
                textColor={"white"}
                padding={9}
                border={9}
                shadow={2}
              >
                Add Transaction
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrackerForm;
