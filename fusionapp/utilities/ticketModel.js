import { Schema, model, models } from 'mongoose';

const ticketSchema = new Schema({
    email:    { type: String, required: true },
    regNum:   { type: String, required: true },
    phone:    { type: String, default: '' },
    teamName: { type: String, default: '' },
    uuid:     { type: String, default: '' },
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
    info:     { type: Object, default: {} },
  })
  const Ticket = models.Ticket || model('Ticket', ticketSchema, 'tickets');

export default Ticket;