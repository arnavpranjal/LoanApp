import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const AdminDashboard = () => {
  const [allLoans, setAllLoans] = useState([]);

  useEffect(() => {
    // Fetch all loans for admin review
    Meteor.call('getAllLoans', (error, result) => {
      if (!error) {
        setAllLoans(result);
      } else {
        console.error(error);
      }
    });
  }, []);

  return (
    <div className="lender-dashboard">
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Borrower</th>
            <th>Lender</th>
            <th>Amount</th>
            <th>Date of Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allLoans.map(loan => (
            <tr key={loan._id}>
              <td>{loan.borrower}</td>
              <td>{loan.lender}</td>
              <td>{loan.amount}</td>
              <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
              <td style={{ color: loan.status === 'pending' ? 'yellow' : (loan.status === 'approved' ? 'green' : (loan.status === 'denied' ? 'red' : 'black')) }}>
                {loan.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
