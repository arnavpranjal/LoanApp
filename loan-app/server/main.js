import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/loan.js';
import '../imports/api/loanMethods.js';
Meteor.startup(() => {
 
  Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
  });

});

