import express from 'express';
import con from './db_connect.js';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes.js';
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
  origin: "*",
  credentials: true
}));


con.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected ✅");
    connection.release(); // return to pool
  }
});


// ROUTE
app.use('/', routes)

// RUN THE APP
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
