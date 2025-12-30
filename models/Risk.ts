import { Schema, models, model } from "mongoose";

const RiskSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    mitigationPlan: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Open", "Resolved"],
      default: "Open",
    },
  },
  { timestamps: true }
);

export default models.Risk || model("Risk", RiskSchema);
