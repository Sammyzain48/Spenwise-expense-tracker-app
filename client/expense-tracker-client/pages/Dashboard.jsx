import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../api/useAxiosPrivate";
import Transactions from "../components/Transactions";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import TrackerForm from "../components/TrackerForm";
import FormModal from "../components/FormModal";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + Number(t.amount) || 0, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(Math.abs(t.amount)) || 0, 0);

  const totalBalance = totalIncome - totalExpense;

  const api = useAxiosPrivate();
  const { auth } = useAuth();

  async function fetchTransaction() {
    try {
      setIsLoading(true);
      const res = await api.get("/api/home/get-transactions", {
        withCredentials: true,
      });

      if (res.data?.success) {
        setTransactions(res.data.data);
      }
    } catch (error) {
      console.log(
        "failed to fetch transactions from database -> ",
        error.message,
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  // function openForm(selectedType) {
  //   setType();
  //   setIsOpen(true);
  // }

  function handleClick() {
    setShowModal(true);
  }

  function closeForm() {
    setIsOpen(false);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pt-0 sm:pt-0">
      <header className="dashboard-header flex px-4 flex-col sm:flex-row sm:items-center sm:justify-between gap-3  border border-[#182234] mb-8 pl-4 sm:pl-1">
        <div className="flex flex-col gap-1 p-4">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-[14px]">
            Welcome back,{" "}
            <span className="capitalize">{auth.user.username}</span>
          </p>
        </div>
        <button
          onClick={handleClick}
          className="cta capitalize p-3 bg-[#6366f1] rounded-xl cursor-pointer hover:bg-[#6365f1e0] w-full sm:w-auto"
        >
          add transaction
        </button>
      </header>

      {/* dashboard card section */}
      <main className="p-4 sm:p-6">
        <section className="w-full min-h-75 lg:min-h-90 bg-[#6366f1] rounded-3xl p-6 sm:p-9 mb-5 shadow-l shadow-[#8d90d6]">
          <div className="dashboard-card w-full h-full flex flex-col gap-22 justify-between">
            <div className="">
              <p className="text-[14px] mb-3 font-semibold">Total Balance</p>
              <span className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold amount">
                {`$${totalBalance + "." + "00"}`}
              </span>
            </div>
            <div className="expense-income flex flex-col sm:flex-row justify-around gap-5 sm:gap-7 uppercase font-bold">
              <div className="income py-5 px-4 sm:px-6 bg-[#7376f2] rounded-2xl shadow-sm shadow-[rgb(153,154,219)] flex-1">
                <p className="text-[#b4b5f8] mb-3"> income</p>
                <span className="mt-6 text-xl sm:text-2xl">
                  {`$${totalIncome + "." + "00"}`}
                </span>
              </div>
              <div className="expense py-5 px-4 sm:px-6 bg-[#7376f2] rounded-2xl shadow-sm shadow-[rgb(153,154,219)] flex-1">
                <p className="text-[#b4b5f8] mb-3">expense</p>
                <span className="mt-6 text-xl sm:text-2xl">
                  {`$${totalExpense + "." + "00"}`}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="transaction-section mt-14 sm:flex-col md:flex-col">
          <div className="box-1 ">
            <div className="top-section mb-8 sm:mb-12 ">
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
                Recent Activity
              </h2>
              {/* <Link
                to="/transactions"
                className="text-[#6366f1] capitalize font-semibold"
              >
                view all
              </Link> */}
            </div>
            <div className="transaction-list bg-[#1e293b] w-full max-w-none sm:px-0 px-0 rounded-2xl">
              {transactions.length ? (
                transactions.map((t) => (
                  <Transactions key={t._id} transaction={t} />
                ))
              ) : (
                <p>No transactions yet</p>
              )}
            </div>
          </div>
          {/* <div className="box-2">
            <h2>Category Distribution</h2>
            <div className="distribution">
              <div className="chart">
                <div className="main_frame">
                  <div className="loader"></div>
                </div>
              </div>

              <div className="info">
                {transactions?.length &&
                  transactions.map((t) => (
                    <div>
                      <div className="icon-color"></div>
                    </div>
                  ))}
              </div>
            </div>
          </div> */}
        </section>
      </main>
      {showModal && (
        <FormModal
          setType={setType}
          setShowModal={setShowModal}
          setIsOpen={setIsOpen}
        />
      )}
      {isOpen && (
        <TrackerForm
          type={type}
          closeForm={closeForm}
          fetchTransaction={fetchTransaction}
        />
      )}
    </div>
  );
};

export default Dashboard;
