import mongoose, { Document } from "mongoose";

enum Department {
  Teacher = "Teacher",
  Driver = "Driver",
}

interface Employee extends Document {
  email: string;
  password: string;
  salary: number;
  name: string;
  position: string;
  department: Department;
  phoneNumber: string;
}

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
    enum: Object.values(Department),
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
});

const employeeModel = mongoose.model<Employee>("employee", employeeSchema);

export default employeeModel;