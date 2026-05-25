import React, { useState } from "react";
import useAxiosPrivate from "../api/useAxiosPrivate";
import { useEffect } from "react";
import Transactions from "../components/Transactions";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [dateRange, setDateRange] = useState("all");

  const api = useAxiosPrivate();

  // filteration logic
  let cutoffDate = null; // setting the date we want to cutoff to nothing/zero
  if (dateRange !== "all") {
    // if the dateRange is set to all, then continue to set cuttofdate to null, else do the next thing
    cutoffDate = new Date(); // set cutoffdate to current date
    cutoffDate.setDate(cutoffDate.getDate() - Number(dateRange)); // and now set it cutoffdate to today's date - what the user select
  }

  const filteredItems = transactions.filter((t) => {
    const filteredSearch = t.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const filteredDateSearch = cutoffDate
      ? new Date(t.date) >= cutoffDate
      : true;
    return filteredSearch && filteredDateSearch;
  });

  // pagination logic
  const ITEMS_PER_PAGE = 3; // how many items we want per page
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE); // total pages
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // starting items at a page
  const endIndex = startIndex + ITEMS_PER_PAGE; // last item in a page
  const currentItems = filteredItems.slice(startIndex, endIndex); // current items in a particular page

  function goToPage(page) {
    if (page < 1 || page > totalPages) return; // if page is less than the first page, or even greater than the total number of pages, then stop
    setCurrentPage(page); // set the current page back to that page.
  }

  function handleSearch(e) {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  }

  function handleDateChange(e) {
    setDateRange(e.target.value);
    setCurrentPage(1);
  }

  useEffect(() => {
    setIsLoading(true);
    async function getAllTransactions() {
      try {
        const res = await api.get("/api/home/all-transactions", {
          withCredentials: true,
        });

        console.log(res.data.data);
        setTransactions(res.data.data);
      } catch (error) {
        console.log(
          "failed to get all transactions from the database -> ",
          error.message,
        );
      } finally {
        setIsLoading(false);
      }
    }

    getAllTransactions();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="transactions-page w-full max-w-none px-0  sm:pt-0">
      <header className="w-full border border-[#182234] mb-6 sm:mb-8 px-4 sm:px-6 py-4 sm:py-6">
        <h1 className="capitalize mb-1 sm:mb-2 font-semibold text-xl sm:text-2xl">
          transactions
        </h1>
        <p className="text-sm sm:text-base">Manage your history and filters</p>
      </header>

      <main className="w-full px-4 sm:px-6 py-4 sm:py-6 overflow-x-auto">
        <div className="filter flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8 w-full">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchInput}
            onChange={handleSearch}
            className="w-full sm:w-[25%] bg-[#1e293b] p-3 rounded-xl border border-[#182234] text-white placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
          />

          <select
            name="dateRange"
            value={dateRange}
            onChange={handleDateChange}
            className="w-full sm:w-auto p-2 bg-[#1e293b] font-semibold rounded-xl border border-[#182234] text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
          >
            <option value="all">All time</option>
            <option value="30">Last 30 Days</option>
            <option value="7">Last Week</option>
            <option value="365">Last Year</option>
          </select>
        </div>

        <div className="transaction-list bg-[#1e293b] rounded-xl overflow-hidden">
          {currentItems.length ? (
            currentItems.map((t) => <Transactions key={t.id} transaction={t} />)
          ) : (
            <p className="p-6">No Transactions yet</p>
          )}

          <div className="stats p-4 sm:p-6">
            <div className="info">
              <span className="text-sm sm:text-base">
                Showing {currentPage} to {totalPages} of {transactions.length}{" "}
                entries
              </span>
            </div>

            <div className="navigate mt-4 flex flex-wrap gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    style={{
                      fontWeight: currentPage === page ? "bold" : "normal",
                    }}
                    onClick={() => goToPage(page)}
                    className="p-3 sm:p-4 bg-[#6366f1] text-center text-sm sm:text-md rounded-xl cursor-pointer"
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="buttons mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="h-11 rounded-xl bg-[#1e293b] border border-[#182234] px-4 cursor-pointer hover:border-[#6366f1]">
            prev
          </button>
          <button
            onClick={() => setCurrentPage()}
            className="h-11 rounded-xl bg-[#6366f1] text-white font-extrabold px-4 cursor-pointer hover:bg-[#5557e8]"
          >
            next
          </button>
        </div>
      </main>
    </div>
  );
};

export default TransactionsList;
