/**
 * Converte os slides HTML em arquivos PPTX.
 * Captura cada slide como imagem (Puppeteer) e monta o PPTX (pptxgenjs).
 *
 * Uso:
 *   node gerar_pptx.js
 *
 * Saída:
 *   01_introducao_html.pptx
 *   02_introducao_php.pptx
 *   03_slim_framework.pptx
 */

const puppeteer = require("puppeteer-core");
const PptxGenJS = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

// Caminho do Chrome instalado no sistema
const CHROME_PATH =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Arquivos a converter: [ [html, pptx] ]
const ARQUIVOS = [
  ["01_introducao_html.html", "01_introducao_html.pptx"],
  ["02_introducao_php.html", "02_introducao_php.pptx"],
  ["03_slim_framework.html", "03_slim_framework.pptx"],
];

// CSS injetado para exibir cada slide individualmente na captura
const CAPTURE_CSS = `
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  #nav, #hint, #progress { display: none !important; }
  body  { overflow: hidden !important; background: transparent !important; }
  #deck { margin-top: 0 !important; overflow: hidden !important; }
  .slide {
    display: none !important;
    width: 1280px !important;
    height: 720px !important;
    min-height: 720px !important;
    overflow: hidden !important;
    position: relative !important;
  }
  .slide.capture-active {
    display: flex !important;
  }
`;

async function converter(htmlFile, pptxFile) {
  const htmlPath = path.resolve(__dirname, htmlFile);
  const pptxPath = path.resolve(__dirname, pptxFile);

  if (!fs.existsSync(htmlPath)) {
    console.error(`[ERRO] Arquivo não encontrado: ${htmlPath}`);
    return;
  }

  console.log(`\n📄 Convertendo: ${htmlFile} → ${pptxFile}`);

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
    await page.addStyleTag({ content: CAPTURE_CSS });
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));

    // Contar total de slides
    const total = await page.evaluate(
      () => document.querySelectorAll(".slide").length,
    );
    console.log(`   ✔ ${total} slides encontrados`);

    // Criar o PPTX
    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_16x9"; // 10 x 5.63 inches
    pptx.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
    pptx.layout = "WIDE";

    for (let i = 0; i < total; i++) {
      // Ativar apenas o slide atual
      await page.evaluate((idx) => {
        document.querySelectorAll(".slide").forEach((s, j) => {
          s.classList.toggle("capture-active", j === idx);
        });
      }, i);

      await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));

      // Capturar screenshot como base64
      const imgBase64 = await page.screenshot({
        encoding: "base64",
        clip: { x: 0, y: 0, width: 1280, height: 720 },
      });

      // Adicionar slide ao PPTX com a imagem ocupando toda a área
      const slide = pptx.addSlide();
      slide.addImage({
        data: `image/png;base64,${imgBase64}`,
        x: 0,
        y: 0,
        w: "100%",
        h: "100%",
      });

      process.stdout.write(`\r   🖼  Slide ${i + 1}/${total}`);
    }

    console.log(""); // nova linha após o contador

    // Salvar o PPTX
    await pptx.writeFile({ fileName: pptxPath });
    console.log(`   ✅ Salvo em: ${pptxPath}`);
  } finally {
    await browser.close();
  }
}

(async () => {
  console.log("🚀 Iniciando conversão de slides para PPTX...");
  console.log(`   Chrome: ${CHROME_PATH}`);

  for (const [html, pptx] of ARQUIVOS) {
    await converter(html, pptx);
  }

  console.log("\n✨ Conversão concluída!");
})();
