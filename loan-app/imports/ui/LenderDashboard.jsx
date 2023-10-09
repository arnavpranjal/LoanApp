import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const LenderDashboard = () => {
  const [requestedLoans, setRequestedLoans] = useState([]);

  useEffect(() => {
    // Fetch the loans where the current user is the lender
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
        // Update the loan status locally after approval
        const updatedLoans = requestedLoans.map(loan => 
          loan._id === loanId ? { ...loan, status: 'approved' } : loan
        );
        setRequestedLoans(updatedLoans);
      } else {
        console.error(error);
      }
    });
  };

  return (
    // <div className="lender-dashboard">
    //   <h2>Requested Loans</h2>
    //   <ul>
    //     {requestedLoans.map(loan => (
    //       <li key={loan._id}>
    //         Amount: {loan.amount} - 
    //        Borrower : {loan.borrower} -
    //         <span style={{ color: loan.status === 'pending' ? 'red' : (loan.status === 'approved' ? 'green' : 'black') }}>
    //           Status: {loan.status}
    //         </span>
    //         {loan.status === 'pending' && (
    //           <button onClick={() => handleApproveLoan(loan._id)}>
    //             Approve
    //           </button>
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
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
                    <td style={{ color: loan.status === 'pending' ? 'red' : (loan.status === 'approved' ? 'green' : 'black') }}>
                        {loan.status}
                    </td>
                    <td>
                        {loan.status === 'pending' && (
                            <button className="approve-button" onClick={() => handleApproveLoan(loan._id)}>
                                Approve
                            </button>
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