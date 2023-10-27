import { Meteor } from "meteor/meteor";
import Loans from "./loan.js";

Meteor.methods({
  getMyLoans() {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    const userEmail = Meteor.users.findOne(this.userId).emails[0].address;
    return Loans.find({ borrower: userEmail }).fetch();
  },
  getLenders() {
    const lenders = Meteor.users
      .find({ "profile.role": "lender" }, { fields: { emails: 1 } })
      .fetch();
    return lenders.map((user) => ({
      _id: user._id,
      email: user.emails[0].address,
    }));
  },
  "loans.insert"(borrowerEmail, lenderEmail, loanAmount, rate) {
    Loans.insert({
      borrower: borrowerEmail,
      lender: lenderEmail,
      amount: loanAmount,
      status: "pending",
      createdAt: new Date(),
      interestrate: rate,
    });
  },
  getLoansForLender: function (lenderEmail) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return Loans.find({ lender: lenderEmail }).fetch();
  },

  approveLoan: function (loanId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Loans.update(loanId, { $set: { status: "approved" } });
  },

  denyLoan: function (loanId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Loans.update(loanId, { $set: { status: "denied" } });
  },
  getAllLoans() {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Only admins can fetch all loans."
      );
    }

    const loans = Loans.find({}).fetch();

    return loans;
  },
});
