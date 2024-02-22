const mongoose = require('mongoose')
const { Schema, model, models } = mongoose

const statsSchema = new Schema({
  name: { type: String },
  count: { type: Number },
});
const Stats = models.Stats || model('Stats', statsSchema, 'stats');

const notificationSchema = new Schema({
  message:  { type: String },
  date:     { type: String, default: (new Date().toLocaleString()) },
  title:    { type: String, default: 'Alert' },
  isBanner: { type: Boolean, default: false },
  isPopup:  { type: Boolean, default: false },
  regNum:   { type: String, default: 'all', unique: false },
  isRead:   { type: Boolean, default: false },
  sender:   { type: String, required: true },
});
const Notification = models.Notification || model('Notification', notificationSchema, 'notifications');

const userSchema = new Schema({
  name:     { type: String },
  regNum:   { type: String, unique: true, required: true },
  email:    { type: String },
  slots:    { type: Array, default: [] },
  role:     { type: String, default: 'user' },
  phone:    { type: String, default: 'none' },
}); 
const User = models.User || model('User', userSchema, 'users');

const logSchema = new Schema({
  action:       { type: String },
  timestamp:    { type: Number, default: (new Date().getTime()) },
  regNum:       { type: String },
  level:        { type: String, default: 'info' },
  role:         { type: String },
});
const Log = models.Log || model('Log', logSchema, 'logs');

const ticketSchema = new Schema({
  email:    { type: String, required: true },
  regNum:   { type: String, required: true },
  phone:    { type: String, default: '' },
  teamName: { type: String, default: '' },
  uuid:     { type: String },
  members:  { type: Array, required: true },
  checkin:  { type: String },
  checkout: { type: String },
  utr:      { type: String, required: true },
  event:    { type: String, required: true },
  amount:   { type: String, required: true },
  type:     { type: String, default: '' },
  verified: { type: Boolean, default: false },
  used:     { type: Boolean, default: true },
  created:  { type: String, default: '' },
})
const Ticket = models.Ticket || model('Ticket', ticketSchema, 'tickets');

const candidateSchema = new Schema({
  regNum:               { type: String, unique: true },
  email:                { type: String, default: null },
  name:                 { type: String, default: '' },
  isECA:                { type: Boolean, default: false },
  threads:              { type: Object, default: {} },
  responses:            { type: Object, default: {} },
  teams:                { type: Array, default: [] },
  completed:            { type: Boolean, default: false },
  tag:                  { type: String, default: '' },
  isSelected:           { type: Boolean, default: false },
  round:                { type: String, default: '' },
  hidden:               { type: Boolean, default: false },
});
const Candidate = models.Candidate || model('Candidate', candidateSchema, 'candidates');

module.exports = {
  User: User,
  Stats: Stats,
  Notification: Notification,
  Log: Log,
  Ticket: Ticket,
  Candidate: Candidate,
}