import { Request, Response } from "express";
import attendanceModel, { Status } from "../../models/attendance";
import employeeModel from "../../models/employee";

export default async function attendanceHandler(req: Request, res: Response) {
  const employeeId = req.params.id;

  try {
    const date = new Date();

    const time = date.getTime();

    var status: Status = Status.Present;

    if (time > date.setHours(6, 30, 0, 0)) {
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

      if (status === Status.Late) {
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
