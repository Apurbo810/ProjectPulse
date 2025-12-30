import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["On Track", "At Risk", "Critical", "Completed"],
      default: "On Track",
    },
    healthScore: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
