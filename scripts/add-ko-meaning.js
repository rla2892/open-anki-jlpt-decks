const fs = require('fs');
const path = require('path');

// N1부터 N5까지 처리
for (let level = 1; level <= 5; level++) {
    const jsonPath = path.join(__dirname, `../src/n${level}.json`);
    const txtPath = path.join(__dirname, `../src/n${level}-combined.txt`);

    // JSON 파일 읽기
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // 텍스트 파일 읽기
    const txtContent = fs.readFileSync(txtPath, 'utf8');
    const lines = txtContent.split('\n');

    // 각 줄을 파싱하여 단어와 의미 매핑
    const meaningMap = new Map();
    lines.forEach(line => {
        const [word, ...meanings] = line.split(',');
        if (word && meanings.length > 0) {
            meaningMap.set(word.trim(), meanings.join(',').trim());
        }
    });

    // JSON 데이터에 한국어 의미 추가
    jsonData.forEach(item => {
        const meaning = meaningMap.get(item.expression);
        if (meaning) {
            item.meaningKo = meaning;
        }
    });

    // 수정된 JSON 파일 저장
    const newFileName = `n${level}-ko.json`;
    fs.writeFileSync(
        path.join(__dirname, `../src/${newFileName}`),
        JSON.stringify(jsonData, null, 2),
        'utf8'
    );

    console.log(`N${level} 처리 완료`);
}

console.log('모든 처리가 완료되었습니다.');
