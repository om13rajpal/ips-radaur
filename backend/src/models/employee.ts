import mongoose, { Document } from "mongoose";

export interface Employee extends Document {
  email: string;
  password: string;
  salary: any;
  name: string;
  position: string;
  department: string;
  phoneNumber: string;
  attendance: any;
}

const monthSchema = new mongoose.Schema({
  month: {
    type: Number,
    require: true,
  },
  monthSalary: {
    type: Number,
    default: 0,
  },
  late: {
    type: Number,
    default: 0,
  },
  present: {
    type: Number,
    default: 0,
  },
  attendance: [mongoose.Schema.Types.ObjectId],
});

const yearSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      require: true,
    },
    months: [
      {
        type: monthSchema,
      },
    ],
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema<Employee>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  attendance: [
    {
      type: yearSchema,
    },
  ],
});

const employeeModel = mongoose.model<Employee>("employee", employeeSchema);

export default employeeModel;
