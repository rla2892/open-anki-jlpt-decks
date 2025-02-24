// n1~n5 파일을 읽어서 html 파일로 변환

const fs = require('fs');
const path = require('path');

const n1 = JSON.parse(fs.readFileSync('src/n1.json', 'utf8'));
const n2 = JSON.parse(fs.readFileSync('src/n2.json', 'utf8'));
const n3 = JSON.parse(fs.readFileSync('src/n3.json', 'utf8'));
const n4 = JSON.parse(fs.readFileSync('src/n4.json', 'utf8'));
const n5 = JSON.parse(fs.readFileSync('src/n5.json', 'utf8'));

// HTML 템플릿 생성 함수
function createHtmlTemplate(data, level) {
  const title = `JLPT N${level} 단어장`;
  let html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .expression { font-size: 1.2em; }
        .reading { color: #666; }
        .meaning { color: #333; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <table>
        <tr>
            <th>단어</th>
            <th>읽는 법</th>
            <th>의미</th>
        </tr>`;

  data.forEach(item => {
    html += `
        <tr>
            <td class="expression">${item.expression}</td>
            <td class="reading">${item.reading}</td>
            <td class="meaning">${item.meaning}</td>
        </tr>`;
  });

  html += `
    </table>
</body>
</html>`;

  return html;
}

// 각 레벨별 HTML 파일 생성
const levels = {
  n1, n2, n3, n4, n5
};

for (let level = 1; level <= 5; level++) {
  const html = createHtmlTemplate(levels[`n${level}`], level);
  fs.writeFileSync(`src/n${level}.html`, html);
}

console.log('HTML 파일 생성 완료!');

