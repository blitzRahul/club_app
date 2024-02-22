import { Schema, model, models } from 'mongoose';

const mailSchema = new Schema({
    email:      { type: String, required: true },
    code:       { type: String, required: true },
    mailSent:   { type: Boolean },
    timestamp:  { type: String },
  })
  const Mail = models.Mail || model('Mail', mailSchema, 'mails');

export default Mail;