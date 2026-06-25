import { Request, Response } from "express";
import { InsertUser } from "@/db/schema/users.schema.js";
import { createUserService } from "./users.service.js";


const signUpController = async (req: Request, res: Response): Promise<void> => {

    const body = req.body as InsertUser // remove this type casting after implementing ZOD


    const user = await createUserService(body)

    res.status(201).json({
        success: true,
        data: user,
        message: "user created successfully"
    })

}

export { signUpController };