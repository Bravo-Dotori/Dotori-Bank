const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const csvPath = path.join(root, "api-test-scenarios.csv");
const outPath = path.join(root, "Dotori-Bank_API_Test_Scenarios.xlsx");
const tempDir = path.join(os.tmpdir(), `dotori-api-test-xlsx-${Date.now()}`);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (quoted) {
      if (ch === '"' && next === '"') {
        value += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        value += ch;
      }
      continue;
    }

    if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(value);
      value = "";
    } else if (ch === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += ch;
    }
  }

  if (value.length || row.length) {
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headers, ...dataRows] = rows;
  return dataRows
    .filter((dataRow) => dataRow.some((cell) => cell !== ""))
    .map((dataRow) =>
      Object.fromEntries(headers.map((header, index) => [header, dataRow[index] || ""]))
    );
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function colName(number) {
  let name = "";
  while (number > 0) {
    const mod = (number - 1) % 26;
    name = String.fromCharCode(65 + mod) + name;
    number = Math.floor((number - mod) / 26);
  }
  return name;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function writeSheet(filePath, rows, widths = []) {
  const rowXml = rows
    .map((row, rowIndex) => {
      const rowNumber = rowIndex + 1;
      const style = rowIndex === 0 ? 1 : 0;
      const cells = row
        .map((cell, cellIndex) => {
          const ref = `${colName(cellIndex + 1)}${rowNumber}`;
          return `<c r="${ref}" t="inlineStr" s="${style}"><is><t xml:space="preserve">${escapeXml(cell)}</t></is></c>`;
        })
        .join("");
      return `<row r="${rowNumber}">${cells}</row>`;
    })
    .join("");
  const colsXml = widths.length
    ? `<cols>${widths
        .map(
          (width, index) =>
            `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`
        )
        .join("")}</cols>`
    : "";

  writeText(
    filePath,
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  ${colsXml}
  <sheetData>${rowXml}</sheetData>
  <autoFilter ref="A1:Z1"/>
</worksheet>`
  );
}

const scenarios = parseCsv(fs.readFileSync(csvPath, "utf8"));

const overviewRows = [
  ["항목", "내용"],
  ["문서명", "Dotori Bank API 테스트 시나리오"],
  ["작성 기준", "로컬 Swagger UI: http://localhost:5000/api-docs"],
  ["대상 서버", "http://localhost:5000"],
  ["인증 방식", "로그인 성공 후 token 쿠키 기반 인증"],
  ["권장 실행 순서", "테스트 데이터 확인 -> 로그인 -> 조회 API -> 생성/변경 API -> 관리자 권한 API"],
  ["상태값", "미실행 / Pass / Fail / Blocked / 보류"],
  ["주의", "이체, 예금 가입, 계좌 활성화 변경은 DB 상태를 바꾸므로 테스트 전후 데이터 복구 여부를 확인하세요."],
  ["총 시나리오 수", String(scenarios.length)],
];

const scenarioRows = [
  [
    "ID",
    "대분류",
    "우선순위",
    "API",
    "Method",
    "테스트 케이스",
    "사전조건",
    "요청 데이터/Swagger 입력값",
    "예상 상태코드",
    "예상 결과",
    "확인 포인트",
    "실행 상태",
    "실제 상태코드",
    "실제 결과",
    "담당자",
    "실행일",
    "비고",
  ],
];

for (const row of scenarios) {
  const priority = ["인증", "이체", "예금", "관리자"].includes(row["카테고리"])
    ? "P1"
    : "P2";
  scenarioRows.push([
    row["순번"],
    row["카테고리"],
    priority,
    row["API"],
    row["Method"],
    row["테스트 케이스"],
    row["로그인 계정"],
    row["요청 예시"],
    row["예상 상태코드"],
    row["예상 결과"],
    row["확인 포인트"],
    "미실행",
    "",
    "",
    "",
    "",
    row["비고"],
  ]);
}

const testDataRows = [
  ["구분", "값", "용도", "비고"],
  ["Swagger URL", "http://localhost:5000/api-docs", "API 수동 테스트 진입점", ""],
  ["일반 사용자 로그인 예시", '{ "user_id": "testuser", "password": "1234" }', "사용자 권한 API 테스트", "DB seed 기준으로 실제 계정 확인 필요"],
  ["관리자 로그인 예시", '{ "user_id": "admin", "password": "1234" }', "관리자 API 테스트", "기존 CSV 기준"],
  ["받는 계좌번호 예시", "100-2222-222222", "이체/받는 계좌 조회", "DB 상태에 따라 변경"],
  ["없는 계좌번호 예시", "999-9999-999999", "404/실패 케이스", ""],
  ["상품 ID 예시", "1", "상품 상세/예금 가입", "GET /api/products로 실제 ID 확인"],
  ["없는 상품 ID 예시", "9999", "404 케이스", ""],
  ["이체 정상 금액", "10000", "이체 성공 케이스", "잔액 충분한 출금 계좌 사용"],
  ["이체 오류 금액", "0 또는 -1000", "금액 검증 케이스", ""],
  ["예금 가입 금액", "100000", "예금 가입 성공 케이스", "상품 min/max 조건 확인"],
];

const checklistRows = [
  ["순서", "체크 항목", "확인 방법", "상태", "비고"],
  ["1", "서버 실행", "server 폴더에서 npm start 후 http://localhost:5000 접속", "미확인", ""],
  ["2", "Swagger 접속", "http://localhost:5000/api-docs 접속", "미확인", ""],
  ["3", "DB seed/초기 데이터 확인", "관리자/일반 사용자/계좌/상품 데이터 존재 여부 확인", "미확인", ""],
  ["4", "쿠키 인증 흐름 확인", "POST /api/user/login 후 Swagger에서 인증 필요한 API 호출", "미확인", ""],
  ["5", "권한 분리 확인", "일반 유저로 /api/admin/* 호출 시 403 확인", "미확인", ""],
  ["6", "상태 변경 API 후속 조회", "이체/예금/계좌 활성화 변경 후 목록 또는 상세 API로 DB 반영 확인", "미확인", ""],
  ["7", "오류 응답 형식 확인", "success, message, errorCode 등 프론트에서 기대하는 필드 확인", "미확인", ""],
  ["8", "테스트 결과 기록", "시나리오 시트의 실행 상태/실제 결과/비고 작성", "미확인", ""],
];

const defectRows = [
  ["결함 ID", "발견일", "관련 시나리오 ID", "API", "현상", "기대 결과", "실제 결과", "심각도", "상태", "담당자", "비고"],
  ["BUG-001", "", "", "", "", "", "", "Major", "Open", "", ""],
];

ensureDir(path.join(tempDir, "_rels"));
ensureDir(path.join(tempDir, "docProps"));
ensureDir(path.join(tempDir, "xl", "_rels"));
ensureDir(path.join(tempDir, "xl", "worksheets"));
ensureDir(path.join(tempDir, "xl", "theme"));

writeSheet(path.join(tempDir, "xl", "worksheets", "sheet1.xml"), scenarioRows, [
  8, 12, 10, 34, 10, 30, 18, 44, 14, 34, 42, 12, 14, 36, 12, 14, 28,
]);
writeSheet(path.join(tempDir, "xl", "worksheets", "sheet2.xml"), overviewRows, [18, 86]);
writeSheet(path.join(tempDir, "xl", "worksheets", "sheet3.xml"), testDataRows, [24, 52, 30, 42]);
writeSheet(path.join(tempDir, "xl", "worksheets", "sheet4.xml"), checklistRows, [8, 28, 66, 14, 32]);
writeSheet(path.join(tempDir, "xl", "worksheets", "sheet5.xml"), defectRows, [
  12, 14, 16, 32, 42, 42, 42, 12, 12, 12, 32,
]);

writeText(
  path.join(tempDir, "[Content_Types].xml"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${[1, 2, 3, 4, 5].map((id) => `<Override PartName="/xl/worksheets/sheet${id}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("\n  ")}
</Types>`
);

writeText(
  path.join(tempDir, "_rels", ".rels"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`
);

writeText(
  path.join(tempDir, "xl", "workbook.xml"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="테스트 시나리오" sheetId="1" r:id="rId1"/>
    <sheet name="개요" sheetId="2" r:id="rId2"/>
    <sheet name="테스트 데이터" sheetId="3" r:id="rId3"/>
    <sheet name="실행 체크리스트" sheetId="4" r:id="rId4"/>
    <sheet name="결함 기록" sheetId="5" r:id="rId5"/>
  </sheets>
</workbook>`
);

writeText(
  path.join(tempDir, "xl", "_rels", "workbook.xml.rels"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${[1, 2, 3, 4, 5].map((id) => `<Relationship Id="rId${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${id}.xml"/>`).join("\n  ")}
  <Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
</Relationships>`
);

writeText(
  path.join(tempDir, "xl", "styles.xml"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts>
  <fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF4F81BD"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFill="1" applyFont="1" applyAlignment="1"><alignment wrapText="1" vertical="center"/></xf></cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`
);

writeText(
  path.join(tempDir, "xl", "theme", "theme1.xml"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">
  <a:themeElements>
    <a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme>
    <a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/></a:minorFont></a:fontScheme>
    <a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle/></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>
  </a:themeElements>
</a:theme>`
);

const now = new Date().toISOString();
writeText(
  path.join(tempDir, "docProps", "core.xml"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Dotori Bank API Test Scenarios</dc:title><dc:creator>Codex</dc:creator><cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`
);

writeText(
  path.join(tempDir, "docProps", "app.xml"),
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Microsoft Excel</Application><Company>Dotori Bank</Company></Properties>`
);

if (fs.existsSync(outPath)) fs.rmSync(outPath, { force: true });
const zipPath = `${outPath}.zip`;
if (fs.existsSync(zipPath)) fs.rmSync(zipPath, { force: true });

execFileSync(
  "powershell",
  [
    "-NoProfile",
    "-Command",
    `Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${zipPath}' -Force`,
  ],
  { stdio: "inherit" }
);
fs.renameSync(zipPath, outPath);
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`Created ${outPath}`);
