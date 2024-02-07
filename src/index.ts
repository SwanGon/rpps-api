import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {getPracticians} from "~/ressources/instamed/practician.instamed.controller";
import { getPractitioner } from "./ressources/esante/practitioner.esante.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// E-Sante

app.get('/getEmails/:rpps', getPractitioner)

// Instamed

app.get('/practicians/:searchString/:numberToDisplay', getPracticians);

app.get('/practicians/:searchString', getPracticians);

app.get('/practicians', getPracticians);