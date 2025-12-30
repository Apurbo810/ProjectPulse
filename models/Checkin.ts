import { Schema, models, model } from "mongoose";

  const CheckinSchema = new Schema(
    {
      projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
      employeeId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      progressSummary: {
        type: String,
        required: true,
      },
      blockers: {
        type: String,
      },
      confidenceLevel: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      completionPercent: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      weekStart: {
        type: Date,
        required: true,
      },
    },
    { timestamps: true }
  );

  // Prevent duplicate weekly check-ins
  CheckinSchema.index(
    { projectId: 1, employeeId: 1, weekStart: 1 },
    { unique: true }
  );

  export default models.Checkin || model("Checkin", CheckinSchema);
