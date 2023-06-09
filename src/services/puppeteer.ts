import puppeteer from "puppeteer";
import ejs from "ejs";

export async function getPdf(template: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  const html = await ejs.renderFile(template);

  await page.setContent(html);
  const pdf = await page.pdf({ format: "A4", path: "invoice.pdf" });

  await page.close();
  await browser.close();

  return pdf;
}
