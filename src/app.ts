import express from "express"
import router from "@/properties/properties.router.js";
import { globalErrorHandler } from "@/middlewares/globalErrorHandler.js";
import { notFoundHandler } from "@/middlewares/notFound.js";




const app = express()


// middleware to parse req body into js object , limit to 10kb prevents large payloads from crashing the server 
app.use(express.json({ limit: "10kb" }));

// Parse url encoded data like html form submissions with extended true to support nested obj and arr to parse
app.use(express.urlencoded({ extended: true, limit: "10kb" }))


//Routes

app.use("/api/v1/properties", router);


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