//Database connection pool
//instead of creating db connections ,every time for every query which is slow ,takes time ,so to solve it we use connection pool
//Connection pool maintains a pool of db connections ready to use.

import { Pool } from "pg"


const pool = new Pool({
    connectionString: env.DATABASE_URL,

})