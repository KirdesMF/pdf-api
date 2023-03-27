import express, { Express, Request, Response } from "express";
import { getPdf } from "./services/puppeteer";

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("views", "src/views");
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/invoices", async (req: Request, res: Response) => {
  const pdf = await getPdf("src/views/header.ejs");
  const base64Pdf = pdf.toString("base64");
  const dataUri = `data:application/pdf;base64,${base64Pdf}`;
  res.render("pdf", { dataUri });
});

app.get("/invoices/download", async (req: Request, res: Response) => {
  const pdf = await getPdf("src/views/header.ejs");
  res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdf);
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
