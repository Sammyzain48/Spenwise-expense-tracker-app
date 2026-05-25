import React from "react";
import { IconCategory } from "../utils/IconCategory";

const Transactions = ({ transaction }) => {
  function formatDateTime(date) {
    const d = new Date(date); // grabs the date

    const datePart = d.toLocaleDateString("en-US", {
      // set how the date will appear
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const timePart = d.toLocaleTimeString("en-US", {
      // et how the time wil appear
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${datePart} at ${timePart}`; // joins both
  }

  function formatAmount(amount) {
    return amount < 0
      ? `- $${Math.abs(amount).toLocaleString()}`
      : `$${amount.toLocaleString()}`;
  }

  return (
    <div
      className="transaction flex w-full items-center justify-between px-3 sm:px-5 py-4 sm:py-5 gap-4 border-b border-b-[#6366f1] last-of-type:border-none text-sm sm:text-xs"
      style={{ cursor: "pointer" }}
    >
      {/* icon - left */}
      <div className="flex items-center justify-center capitalize shrink-0 w-12 sm:w-14">
        <div
          className="icons p-2 rounded-xl"
          style={{
            backgroundColor:
              transaction.type === "income" ? "#10b981" : "#ef4444",
          }}
        >
          <span className="text-xl sm:text-2xl">
            {IconCategory[transaction.category]}
          </span>
        </div>
      </div>

      {/* info - middle (stack) */}
      <div className="info flex flex-col justify-center gap-1 flex-1 min-w-0 text-center sm:text-left md:text-lg lg:text-xl xl:2xl">
        <span className="font-semibold capitalize leading-snug">
          {transaction.title}
        </span>
        <span className="text-[#94a3b8] leading-snug">
          {transaction.category}
        </span>
        <span className="text-[10px] sm:text-xs leading-tight text-[#cbd5e1]">
          {formatDateTime(transaction.date)}
        </span>
      </div>

      {/* amount - right */}
      <div className="amount flex flex-col items-end justify-center shrink-0 min-w-[96px] sm:min-w-[140px]">
        <span
          className={
            transaction.type === "income"
              ? "text-[#10b981] font-semibold"
              : "text-[#ef4444] font-semibold"
          }
        >
          {transaction.type === "income"
            ? "+" + "$" + transaction.amount
            : formatAmount(transaction.amount)}
        </span>
      </div>
    </div>
  );
};

export default Transactions;
