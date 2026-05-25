<div className="dashboard">
         {/* Greetings section */}
        <div className="greetings">
          <span>Hello,</span>
          <span>User</span>
        </div>

        {/* Dashboard card section  */}
        <div className="dashboard-card">
          <span>Current Balance</span>
          <span>Balance</span>

          <div className="dashboard-readings">
            <div className="income">
              <div className="income-info">
                <span>Income</span>
                <span>icon</span>
              </div>

              <div className="total-amount">
                <span>$10,000</span>
              </div>
            </div>
            <div className="expense">
              <div className="expense-info">
                <span>Expense</span>
                <span>icon</span>
              </div>
              <div className="total-amount">
                <span>$10,000</span>
              </div>
            </div>
            <div />
        </div>

        {/* Transaction info section */}
        <div className="transations">
              <h2>Recent Transactions</h2>

              <div className="transaction-list">
                {transactions?.map((t) => (
                  <Transactions key={t._id} transaction={t} />
                ))}
              </div>
        </div>

        {/* cta section */}
        <div className="cta-buttons">
              <button onClick={() => openForm("income")}>Add Income</button>
              <button onClick={() => openForm("expense")}>Add Expense</button>
            </div>
      </div>