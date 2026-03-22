const mongoose = require('mongoose');

const margaDetailsSchema = new mongoose.Schema({
  role: String,
  weight: Number, // Percentage: 50, 30, 20
  aktivitas: [{
    id: String,
    desc: String,
    type: String, // quiz, essay, forum, exit_ticket, etc.
    points: Number
  }]
});

const pertemuanMargaConfigSchema = new mongoose.Schema({
  pertemuan_id: { type: String, required: true, unique: true },
  marga_active: [String], // ["jnana", "karma", "raja"]
  marga_details: {
    jnana: margaDetailsSchema,
    bhakti: margaDetailsSchema,
    karma: margaDetailsSchema,
    raja: margaDetailsSchema
  },
  instruments: [{
    id: String,
    type: String, // quiz, forum, essay, exit_ticket
    name: String,
    description: String,
    auto_score: Boolean,
    max_points: Number,
    questions: [{
      id: String,
      text: String,
      options: [String],
      correct_answer: String
    }]
  }],
  rubrics: {
    type: Map,
    of: new mongoose.Schema({
      name: String,
      criteria: [{
        id: String,
        name: String,
        max_points: Number,
        description: String
      }]
    })
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PertemuanMargaConfig', pertemuanMargaConfigSchema);
