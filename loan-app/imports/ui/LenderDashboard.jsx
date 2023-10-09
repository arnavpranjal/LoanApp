import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const LenderDashboard = () => {
  const [requestedLoans, setRequestedLoans] = useState([]);

  useEffect(() => {
    // Fetching the loans where the current user is the lender
    Meteor.call('getLoansForLender', Meteor.user().emails[0].address, (error, result) => {
      if (!error) {
        setRequestedLoans(result);
      } else {
        console.error(error);
      }
    });
  }, []);

  const handleApproveLoan = (loanId) => {
    Meteor.call('approveLoan', loanId, (error, result) => {
      if (!error) {
        // Updating the loan status locally after approval
        const updatedLoans = requestedLoans.map(loan => 
          loan._id === loanId ? { ...loan, status: 'approved' } : loan
        );
        setRequestedLoans(updatedLoans);
      } else {
        console.error(error);
      }
    });
  };
  const handleDenyLoan = (loanId) => {
    Meteor.call('denyLoan', loanId, (error, result) => {
      if (!error) {
        // Updating the loan status locally after denial
        const updatedLoans = requestedLoans.map(loan => 
          loan._id === loanId ? { ...loan, status: 'denied' } : loan
        );
        setRequestedLoans(updatedLoans);
      } else {
        console.error(error);
      }
    });
  };

  return (
  
    <div className="lender-dashboard">
    <h2>Requested Loans</h2>
    <table>
        <thead>
            <tr>
                <th>Amount</th>
                <th>Borrower</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {requestedLoans.map(loan => (
                <tr key={loan._id}>
                    <td>{loan.amount}</td>
                    <td>{loan.borrower}</td>
                    <td style={{ color: loan.status === 'pending' || loan.status ==='denied' ? 'red' : (loan.status === 'approved' ? 'green' : 'black') }}>
                        {loan.status}
                    </td>
                    <td>
                    {loan.status === 'pending' && (
    <>
      <button className="approve-button" onClick={() => handleApproveLoan(loan._id)}>
        Approve
      </button>
      <button className="deny-button" onClick={() => handleDenyLoan(loan._id)}>
        Deny
      </button>
    </>
  )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

  );
};

export default LenderDashboard;