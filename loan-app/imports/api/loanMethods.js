import { Meteor } from 'meteor/meteor';
import Loans from './loan.js';

Meteor.methods({
    'getMyLoans'() {
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
        const userEmail = Meteor.users.findOne(this.userId).emails[0].address;
        return Loans.find({ borrower: userEmail }).fetch();
      },
      'getLenders'() {
        // Assuming the user's role is stored in the profile field
        const lenders = Meteor.users.find({ "profile.role": "lender" }, { fields: { emails: 1 } }).fetch();
        return lenders.map(user => ({ _id: user._id, email: user.emails[0].address }));
      },
  'loans.insert'(borrowerEmail, lenderEmail, loanAmount) {
    Loans.insert({
      borrower: borrowerEmail,
      lender: lenderEmail,
      amount: loanAmount,
      status: "pending",
      createdAt: new Date(),
      interestrate : "7%"
      // ... add other necessary fields here
    });
  },
  'getLoansForLender': function(lenderEmail) {
    // Ensure the user is authenticated
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // Fetch loans where the lender is the given lenderEmail
    return Loans.find({ lender: lenderEmail }).fetch();
  },
  
  'approveLoan': function(loanId) {
    // Ensure the user is authenticated
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // Update the loan status to 'approved'
    Loans.update(loanId, { $set: { status: 'approved' } });
  }
});