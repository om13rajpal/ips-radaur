import { Request, Response } from "express";
import attendanceModel, { Status } from "../../models/attendance";
import employeeModel from "../../models/employee";
import { sendMail } from "../../utils/mail";

export default async function attendanceHandler(req: Request, res: Response) {
  const employeeId = req.params.id;

  try {
    const date = new Date();

    const time = date.getTime();

    var status: Status = Status.Present;

    if (time > date.setHours(22, 20, 0, 0)) {
      status = Status.Late;
    }

    const employee = await employeeModel.findById(employeeId);

    if (!employee) {
      res.status(404).json({
        status: false,
        message: "Employee Not Found",
      });
      return;
    }

    const createAtt = await attendanceModel.create({
      date: date,
      status: status,
      employeeId: employeeId,
    });

    const saveAtt = await createAtt.save();

    var late = 0;
    if (status === Status.Late) {
      late = 1;
    }

    var year = employee.attendance.find(
      (year: any) => year.year === date.getFullYear()
    );
    if (!year) {
      employee.attendance.push({
        year: date.getFullYear(),
        months: [
          {
            month: date.getMonth(),
            present: 1,
            late: late,
            attendance: [saveAtt._id],
          },
        ],
      });
    } else {
      const month = year.months.find(
        (month: any) => month.month === date.getMonth()
      );

      if (!month) {
        year.months.push({
          month: date.getMonth(),
          present: 1,
          late: late,
          attendance: [saveAtt._id],
        });
      }

      month.attendance.push(saveAtt._id);
      month.present += 1;

      const daySalary = employee.salary / 30;

      month.monthSalary += daySalary;

      if (status === Status.Late) {
        const salaryCut = daySalary / 20;
        if (month.late >= 4) {
          sendMail(
            employee.email,
            "Salary Deduction",
            `Dear ${
              employee.name
            },\nYour have been deducted ${salaryCut} for being late for more than 4 times in a month\nYour late count for this month is ${
              month.late + 1
            }`
          );
          month.monthSalary -= salaryCut;
        }
        month.late += 1;
      }
    }

    await employee.save();
    res.status(200).json({
      message: "Attendance Marked",
      data: saveAtt,
      user: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error,
    });
  }
}

export async function getAttendance(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const attendance = await attendanceModel.find({ employeeId: id });

    res.status(200).json({
      message: "Attendance Fetched",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error,
    });
  }
}
