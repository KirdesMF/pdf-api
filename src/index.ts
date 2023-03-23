import express, { Express, Request, Response } from "express";
import { getPdf } from "./services/puppeteer";

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("views", "src/views");
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/invoices", (req: Request, res: Response) => {
  const pdf = getPdf("src/views/header.ejs");
  res.contentType("application/pdf");
  res.send(pdf);
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
