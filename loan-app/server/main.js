import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/loan.js';
import '../imports/api/loanMethods.js';
Meteor.startup(() => {
  // Set the email configuration for the accounts system
  Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
  });

});

