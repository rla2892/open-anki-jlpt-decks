const fs = require('fs');
const csv = require('csv-parse/sync');

// CSV 파일 읽기
const csvFiles = ['n5.csv', 'n4.csv', 'n3.csv', 'n2.csv', 'n1.csv'];

csvFiles.forEach(file => {
  const csvContent = fs.readFileSync(`src/${file}`, 'utf-8');

  // CSV 파싱
  const records = csv.parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });

  // JSON으로 변환
  const jsonData = records.map(record => ({
    expression: record.expression,
    reading: record.reading,
    meaning: record.meaning,
    tags: record.tags.split(' '),
    guid: record.guid
  }));

  // JSON 파일로 저장
  fs.writeFileSync(`src/${file.replace('.csv', '.json')}`, JSON.stringify(jsonData, null, 2));

  console.log(`${file} 변환이 완료되었습니다.`);
});