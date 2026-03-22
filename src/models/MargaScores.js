const mongoose = require('mongoose');

const margaScoresSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  pertemuan_id: { type: String, required: true },
  
  marga_scores: {
    jnana: {
      aktivitas: [{
        aktivitas_id: String,
        points: Number,
        max: Number
      }],
      total_points: Number,
      max_points: Number,
      percentage: Number,
      weighted_score: Number // total_points * weight%
    },
    bhakti: {},
    karma: {},
    raja: {}
  },
  
  pertemuan_total: {
    jnana: Number,
    bhakti: Number,
    karma: Number,
    raja: Number,
    final_score: Number // Sum of all weighted scores
  },
  
  calculated_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Compound index for quick lookups
margaScoresSchema.index({ user_id: 1, pertemuan_id: 1 }, { unique: true });

module.exports = mongoose.model('MargaScores', margaScoresSchema);
