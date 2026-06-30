import express from "express"
import cookieParser from 'cookie-parser'
import { env } from "@/config/env.js"
import { globalErrorHandler } from "@/middlewares/globalErrorHandler.middlewares.js";
import { notFoundHandler } from "@/middlewares/routeNotFound.middlewares.js";
import propertyRouter from "@/properties/properties.router.js";
import authRouter from "./auth/auth.router.js";




const app = express()


// middleware to parse req body into js object , limit to 10kb prevents large payloads from crashing the server 
app.use(express.json({ limit: "10kb" }));

// Parse url encoded data like html form submissions with extended true to support nested obj and arr to parse
app.use(express.urlencoded({ extended: true, limit: "10kb" }))

// cookie - parser read the cookie header and we can add cookies in req.cookie
//The cookie secret is used by cookie-parser to sign cookies (HMAC), which prevents clients from tampering with cookie values
app.use(cookieParser(env.COOKIE_SECRET))

//Routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/properties", propertyRouter);





//Route not Found

app.use(notFoundHandler)

//GlobalError Handler Middleware

app.use(globalErrorHandler)




app.get("/health-check", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "server is healthy"
    })
})

export { app }