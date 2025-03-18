import mongoose from "mongoose";

export interface Attendance {
  date: Date;
  status: string;
  employeeId: mongoose.Schema.Types.ObjectId;
}

export enum Status {
  Present = "Present",
  Absent = "Absent",
  Late = "Late",
}

const attendanceSchema = new mongoose.Schema<Attendance>({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(Status),
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model("attendance", attendanceSchema);
