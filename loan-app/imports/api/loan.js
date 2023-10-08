import { Mongo } from 'meteor/mongo';

const Loans = new Mongo.Collection('loans');

export default Loans;