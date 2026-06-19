import { Request, Response } from "express"

export const getAllproperties = (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: "Properties fetched successfully",
        data: []
    })
}
