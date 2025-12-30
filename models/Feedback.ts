import mongoose, { Schema, models, model } from "mongoose";

const FeedbackSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    satisfactionRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    communicationRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
    },
    flagIssue: {
      type: Boolean,
      default: false,
    },
    weekStart: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// One feedback per client per project per week
FeedbackSchema.index(
  { projectId: 1, clientId: 1, weekStart: 1 },
  { unique: true }
);

export default models.Feedback || model("Feedback", FeedbackSchema);
