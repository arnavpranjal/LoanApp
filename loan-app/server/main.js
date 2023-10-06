import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // Set the email configuration for the accounts system
  Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
  });
});

