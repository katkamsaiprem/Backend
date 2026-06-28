import { Request, Response } from "express";
import { InsertUser } from "@/db/schema/users.schema.js";
import { createUserService } from "./auth.service.js";
import { setAccessToken, setRefreshToken } from "@/utils/cookies.utils.js";





export const registerController = async (req: Request, res: Response): Promise<void> => {

    const body = req.body as InsertUser // remove this type casting after implementing ZOD


    const { tokens, user } = await createUserService(body)





    // TODO 
    // set cookies that browser stores them automatically 
    setAccessToken(res, tokens.accessToken)
    setRefreshToken(res, tokens.refreshToken)

    res.status(201).json({
        success: true,
        data: { user },
        message: "Account created successfully"
    })

}
