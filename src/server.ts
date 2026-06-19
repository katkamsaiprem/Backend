import express from "express"
import router from "@/properties/properties.router.js";




const app = express()


app.use(express.json());// middleware to parse req body into js object

//Routes

app.use("/api/v1/properties", router);




app.get("/health-check", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "server is healthy"
    })
})


app.listen(3000, () => {
    console.log("server is running on port 3000");
})