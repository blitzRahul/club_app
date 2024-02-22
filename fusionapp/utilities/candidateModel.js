import { Schema, model, models } from 'mongoose'

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
export default Candidate