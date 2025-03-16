import { Request, Response } from "express";
import attendanceModel, { Status } from "../../models/attendance";

export default async function attendanceHandler(req: Request, res: Response) {
  const employeeId = req.params.id;

  try {
    const date = new Date();

    const time = date.getTime();

    var status: Status = Status.Present;

    if (time > date.setHours(6, 30, 0, 0)) {
      status = Status.Late;
    }

    const createAtt = await attendanceModel.create({
      date: date,
      status: status,
      employeeId: employeeId,
    });

    const saveAtt = await createAtt.save();

    res.status(200).json({
      message: "Attendance Marked",
      data: saveAtt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error,
    });
  }
}
