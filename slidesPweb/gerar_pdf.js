/**
 * Converte os slides HTML em arquivos PDF.
 * Usa puppeteer-core com o Chrome instalado no sistema.
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

// CSS injetado para exibir TODOS os slides como páginas do PDF
const PRINT_CSS = `
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

  /* Ocultar barra de navegação, hint e barra de progresso */
  #nav, #hint, #progress { display: none !important; }

  /* Retirar o overflow oculto do body/deck */
  body  { overflow: visible !important; height: auto !important; }
  #deck { overflow: visible !important; height: auto !important; display: block !important; }

  /* Cada slide ocupa uma "página" com quebra de página */
  .slide {
    display: flex !important;
    min-width: 100% !important;
    width: 1280px !important;
    height: 720px !important;
    page-break-after: always !important;
    break-after: page !important;
    overflow: hidden !important;
    position: relative !important;
  }

  /* Último slide não precisa de quebra depois */
  .slide:last-child {
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

    // Viewport 16:9
    await page.setViewport({ width: 1280, height: 720 });

    // Carregar o HTML como arquivo local
    await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
      waitUntil: "networkidle0",
    });

    // Injetar CSS de impressão que exibe todos os slides
    await page.addStyleTag({ content: PRINT_CSS });

    // Aguardar um frame para garantir que o estilo foi aplicado
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));

    // Contar slides para feedback
    const total = await page.evaluate(
      () => document.querySelectorAll(".slide").length,
    );
    console.log(`   ✔ ${total} slides encontrados`);

    // Gerar PDF em formato widescreen (1280×720 pt → 16:9)
    await page.pdf({
      path: pdfPath,
      width: "1280px",
      height: "720px",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    console.log(`   ✅ Salvo em: ${pdfPath}`);
  } finally {
    await browser.close();
  }
}

(async () => {
  console.log("🚀 Iniciando conversão de slides para PDF...");
  console.log(`   Chrome: ${CHROME_PATH}`);

  for (const [html, pdf] of ARQUIVOS) {
    await converter(html, pdf);
  }

  console.log("\n✨ Conversão concluída!");
})();
