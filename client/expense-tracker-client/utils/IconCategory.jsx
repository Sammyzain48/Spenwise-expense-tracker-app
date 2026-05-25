import {
  FaShoppingCart,
  FaBus,
  FaSyncAlt,
  FaGamepad,
  FaDice,
  FaShoppingBasket,
  FaUtensils,
  FaFileInvoiceDollar,
  FaCalendarCheck,
  FaGift,
  FaMoneyBill,
  FaChartLine,
  FaUndo,
  FaCalendarAlt,
} from "react-icons/fa";

export const IconCategory = {
  //Expenses
  shopping: <FaShoppingCart />,
  transportation: <FaBus />,
  subscription: <FaSyncAlt />,
  hobbies: <FaGamepad />,
  betting: <FaDice />,
  groceries: <FaShoppingBasket />,
  food: <FaUtensils />,
  bills: <FaFileInvoiceDollar />,

  //Income
  gift: <FaGift />,
  salary: <FaMoneyBill />,
  investment: <FaChartLine />,
  refund: <FaUndo />,

  //Others
  others: <FaCalendarAlt />,
};

export function getCategoryIcon(category) {
  if (!category) return undefined;

  const normalized = String(category).trim().toLowerCase();

  if (normalized === "other") return IconCategory.others;

  return IconCategory[normalized] ?? IconCategory.others;
}
