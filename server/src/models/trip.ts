import { Schema, model } from 'mongoose';

const tripSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },

    destination: { type: String, required: true, trim: true },

    startDate: { type: Date, required: true },

    endDate: { type: Date, required: true },

    budget: { type: Number, min: 0 },

    status: {
      type: String,
      enum: ['planning', 'booked', 'completed'],
      default: 'planning',
    },

    description: { type: String, trim: true },

    coverImage: { type: String, trim: true },

    travelers: { type: Number, min: 1, default: 1},

    currency: { type: String, uppercase: true, default: 'EUR'}
  },

  // Automatically add createdAt and updatedAt
  { timestamps: true }
);

// Before saving, make sure the trip doesn't end before it starts
tripSchema.pre('validate', function () {
  if (this.endDate < this.startDate) {
    this.invalidate('endDate', 'End date must be on or after the start date');
  }
});

export const Trip = model('Trip', tripSchema);