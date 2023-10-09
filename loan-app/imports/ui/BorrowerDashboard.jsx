import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const BorrowerDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loanAmount, setLoanAmount] = useState('');  
  const [lenders, setLenders] = useState([]);  
  const [selectedLender, setSelectedLender] = useState('');  
  useEffect(() => {
    Meteor.call('getMyLoans', (error, result) => {
      if (!error) {
        setLoans(result);
      } else {
        console.error(error);
      }
    });
    Meteor.call('getLenders', (error, result) => {  // New method to fetch the list of lenders
        if (!error) {
          setLenders(result);
        } else {
          console.error(error);
        }
      });

  }, []);

  const handleNewLoan = () => {
    const amount = parseFloat(loanAmount);  // Convert the string to a float
    if (!isNaN(amount) && amount > 0) {
      Meteor.call('loans.insert', Meteor.user().emails[0].address, selectedLender, amount, (error, result) => {
        if (!error) {
          alert('Loan request submitted!');
          setLoanAmount('');  // Reset the loan amount
          
          setLoans([...loans, { amount, status: 'pending' ,lender : selectedLender}]);
        } else {
          console.error(error);
        }
      });
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div class="borrower-dashboard">
      <h2>My Loans</h2>
    
      <table>
    <thead>
        <tr>
            <th>Amount</th>
            <th>Interest Rate</th>
            <th>Status</th>
            <th>Lender</th>
        </tr>
    </thead>
    <tbody>
        {loans.map(loan => (
            <tr key={loan._id}>
                <td>{loan.amount}</td>
                <td>{loan.interestrate}</td>
                <td style={{ color: loan.status === 'pending' || loan.status === 'denied' ? 'red' : (loan.status === 'approved' ? 'green' : 'black') }}>
                    {loan.status}
                </td>
                <td>{loan.lender}</td>
            </tr>
        ))}
    </tbody>
</table>







       {/* Dropdown to select a lender */}
      
      <h3>Request New Loan</h3>
      <input
        type="number"
        placeholder="Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <select value={selectedLender} onChange={(e) => setSelectedLender(e.target.value)}>
        <option value="">Select a Lender</option>
        {lenders.map(lender => (
          <option key={lender._id} value={lender.email}>
            {lender.email}
          </option>
        ))}
      </select>
      <button onClick={handleNewLoan}>
        Request Loan
      </button>
    </div>
  );
};

export default BorrowerDashboard;

