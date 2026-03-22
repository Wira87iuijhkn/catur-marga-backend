const mongoose = require('mongoose');

const studentAktivitasSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  pertemuan_id: { type: String, required: true },
  marga_id: { type: String, required: true },
  aktivitas_id: { type: String, required: true },
  
  status: {
    type: String,
    enum: ['pending', 'submitted', 'graded'],
    default: 'pending'
  },
  
  submission: {
    content: String, // Quiz answers (JSON), essay, reflection, etc.
    submitted_at: Date,
    attempts: { type: Number, default: 0 }
  },
  
  score: {
    raw_points: Number,
    max_points: Number,
    percentage: Number,
    graded_by: String, // Dosen ID
    graded_at: Date,
    rubric_scores: Map,
    notes: String
  },
  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Compound index for quick lookups
studentAktivitasSchema.index({ user_id: 1, pertemuan_id: 1, aktivitas_id: 1 });
studentAktivitasSchema.index({ pertemuan_id: 1, aktivitas_id: 1 }); // For dosen view

module.exports = mongoose.model('StudentAktivitas', studentAktivitasSchema);
