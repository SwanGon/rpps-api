import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {getPracticians} from "~/ressources/instamed/practician.instamed.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Mise à jour de la route pour inclure les paramètres d'URL
app.get('/practicians/:searchString/:numberToDisplay', getPracticians);

// Vous pouvez également vouloir fournir une route sans paramètres spécifiques pour une requête plus générale
app.get('/practicians', getPracticians);