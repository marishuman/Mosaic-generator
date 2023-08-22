import express from "express";
import { save, list, load } from './routes';
import bodyParser from 'body-parser';




// Configure and start the HTTP server.
const port = 8088;
const app = express();
app.use(bodyParser.json());
app.post("/api/save", save);
app.get("/api/list", list);
app.get("/api/load", load);
app.listen(port, () => console.log(`Server listening on ${port}`));
