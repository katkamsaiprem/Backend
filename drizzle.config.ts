//drizzle.config.ts tell drizzle-kit where your schema is ,where to put migrations ,and how to connect with db


import type { Config } from "drizzle-kit"; // here  config is type(interface) ,type tells compiler that config is strictly a type (like an interface ,alias or class shape) and will not be value or variable in actual code
import dotenv, { config } from "dotenv"

//loads .env before reading 
dotenv.config();


if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
}



export default {
    //where dizzle schema is located
    schema: "./src/db/schema/index.ts",

    //drizzle-kit will write migrations sql files here 
    out: "./src/db/migrations",


    dialect: "postgresql",

    dbCredentials: {
        url: process.env.DATABASE_URL,
    },

    //use verbose to log every sql statement that drizzle-kit run
    verbose: true,

    //automates the mapping of camelCase to snake_case (for postgress or sql snake_case is standard)
    casing: "snake_case",
    strict: true,// when true , drizzle-kit will not make a dangerous ,data -deleting changes with out permission

} satisfies Config; //satisfies checks the obj against config type ,if it matching shape defination or not ,if not ,it shows compile time error
