/**
 * Converte os slides HTML em arquivos PDF com texto selecionável.
 * Usa page.pdf() do Puppeteer (renderização nativa do Chrome → PDF real),
 * gerando um PDF por slide e mesclando com pdf-lib.
 *
 * Uso:
 *   node gerar_pdf.js
 *
 * Saída:
 *   01_introducao_html.pdf
 *   02_introducao_php.pdf
 *   03_slim_framework.pdf
 */

const puppeteer = require("puppeteer-core");
const { PDFDocument } = require("pdf-lib");
const path = require("path");
const fs = require("fs");

// Caminho do Chrome instalado no sistema
const CHROME_PATH =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Arquivos a converter: [ [html, pdf] ]
const ARQUIVOS = [
  ["01_introducao_html.html", "01_introducao_html.pdf"],
  ["02_introducao_php.html", "02_introducao_php.pdf"],
  ["03_slim_framework.html", "03_slim_framework.pdf"],
];

// CSS base: ocultar UI, resetar layout flex do body, exibir um slide por vez
const BASE_CSS = `
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  #nav, #hint, #progress { display: none !important; }

  html {
    margin: 0 !important;
    padding: 0 !important;
    height: auto !important;
    overflow: visible !important;
  }
  body {
    margin: 0 !important;
    padding: 0 !important;
    display: block !important;   /* remove flex que causava página em branco */
    overflow: visible !important;
    height: auto !important;
    min-height: 0 !important;
  }
  #deck {
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    height: auto !important;
    display: block !important;
  }
  .slide {
    display: none !important;
    width: 1280px !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
    position: relative !important;
    margin: 0 !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  .slide.capture-active {
    display: flex !important;
  }
  /* Impedir quebra de página dentro de qualquer elemento do slide */
  .slide.capture-active * {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    page-break-before: avoid !important;
    break-before: avoid !important;
    page-break-after: avoid !important;
    break-after: avoid !important;
  }
`;

async function converter(htmlFile, pdfFile) {
  const htmlPath = path.resolve(__dirname, htmlFile);
  const pdfPath = path.resolve(__dirname, pdfFile);

  if (!fs.existsSync(htmlPath)) {
    console.error(`[ERRO] Arquivo não encontrado: ${htmlPath}`);
    return;
  }

  console.log(`\n📄 Convertendo: ${htmlFile} → ${pdfFile}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
      waitUntil: "networkidle0",
    });

    // Injetar CSS base
    await page.addStyleTag({ content: BASE_CSS });
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));

    const total = await page.evaluate(
      () => document.querySelectorAll(".slide").length,
    );
    console.log(`   ✔ ${total} slides encontrados`);

    const mergedDoc = await PDFDocument.create();

    for (let i = 0; i < total; i++) {
      // Ativar apenas o slide atual com altura livre
      const slideHeight = await page.evaluate((idx) => {
        const slides = document.querySelectorAll(".slide");
        slides.forEach((s) => {
          s.classList.remove("capture-active");
          s.removeAttribute("style");
        });
        const current = slides[idx];
        current.classList.add("capture-active");
        // Forçar layout para medir altura real
        void current.offsetHeight;
        return Math.ceil(current.scrollHeight);
      }, i);

      // Buffer generoso: o Chrome em modo print pode calcular layout
      // ligeiramente diferente do modo tela, causando quebra de página
      const pageH = Math.max(slideHeight, 400) + 120;

      // Ajustar viewport para a altura real do slide
      await page.setViewport({ width: 1280, height: pageH });
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
      // Aguardar extra para garantir layout estabilizado
      await page.evaluate(() => new Promise((r) => setTimeout(r, 80)));

      // Gerar PDF real deste slide (texto selecionável, não imagem)
      const pdfBytes = await page.pdf({
        width: "1280px",
        height: `${pageH}px`,
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
      });

      // Mesclar todas as páginas geradas (evita perder conteúdo em slides de 2 páginas)
      const slideDoc = await PDFDocument.load(pdfBytes);
      const pageCount = slideDoc.getPageCount();
      const pageIndices = Array.from({ length: pageCount }, (_, k) => k);
      const pages = await mergedDoc.copyPages(slideDoc, pageIndices);
      pages.forEach((p) => mergedDoc.addPage(p));

      process.stdout.write(
        `\r   📄 Slide ${i + 1}/${total} (${pageH}px)      `,
      );
    }
    console.log("");

    const finalBytes = await mergedDoc.save();
    fs.writeFileSync(pdfPath, finalBytes);
    console.log(`   ✅ Salvo em: ${pdfPath}`);
  } finally {
    await browser.close();
  }
}

(async () => {
  console.log(
    "🚀 Iniciando conversão de slides para PDF (texto selecionável)...",
  );
  console.log(`   Chrome: ${CHROME_PATH}`);

  for (const [html, pdf] of ARQUIVOS) {
    await converter(html, pdf);
  }

  console.log("\n✨ Conversão concluída!");
})();
