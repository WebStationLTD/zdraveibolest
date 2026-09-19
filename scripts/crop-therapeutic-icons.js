const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const src =
  "C:/Users/nikif/.cursor/projects/c-Users-nikif-Desktop-zdraveibolest/assets/c__Users_nikif_AppData_Roaming_Cursor_User_workspaceStorage_7c80476fc1c9ee43fd7fa8998f8fd592_images______-d6bfb60c-d42e-4970-b449-70a596e7f1c6.jpg";
const outDir = path.join(__dirname, "..", "public", "therapeutic-icons");
const names = [
  ["pulmonology", "rheumatology", "cardiology", "neurology"],
  ["nephrology", "gastroenterology", "endocrinology", "oncology"],
  ["allergology", "dermatology", "hematology", "obstetrics-gynecology"],
];

async function run() {
  fs.mkdirSync(outDir, { recursive: true });
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const cols = 4;
  const rows = 3;
  const cellW = width / cols;
  const cellH = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let minX = width;
      let minY = height;
      let maxX = 0;
      const x0 = Math.floor(c * cellW);
      const x1 = Math.floor((c + 1) * cellW);
      const y0 = Math.floor(r * cellH);
      const y1 = Math.floor(r * cellH + cellH * 0.72);
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * width + x) * 4;
          const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (lum > 215) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
          }
        }
      }
      const size = maxX - minX + 1;
      const pad = 2;
      const left = Math.max(0, minX - pad);
      const top = Math.max(0, minY - pad);
      const extractW = Math.min(width - left, size + pad * 2);
      const extractH = extractW;

      const circle = Buffer.from(
        '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><circle cx="256" cy="256" r="252" fill="white"/></svg>'
      );
      const labelCover = Buffer.from(
        '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="72"><rect width="512" height="72" fill="#f5f8fb"/></svg>'
      );

      const outPath = path.join(outDir, `${names[r][c]}.webp`);
      await sharp(src)
        .extract({ left, top, width: extractW, height: extractH })
        .resize(512, 512, { fit: "cover", position: "top" })
        .flatten({ background: "#f5f8fb" })
        .composite([
          { input: labelCover, top: 440, left: 0 },
          { input: circle, blend: "dest-in" },
        ])
        .webp({ quality: 90 })
        .toFile(outPath);

      console.log(names[r][c], { left, top, extractW, extractH });
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
