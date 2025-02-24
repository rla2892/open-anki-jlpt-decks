const fs = require('fs');
const translate = require('google-translate-api');

const jsonFileNameList = [
    'n5.json',
    // 'n4.json',
    // 'n3.json',
    // 'n2.json',
    // 'n1.json'
];

jsonFileNameList.forEach(eachJsonFileName => {
    const eachJsonFile = require(`../src/${eachJsonFileName}`);

    eachJsonFile.forEach(item => {
        translate(item.expression, { from: 'ja', to: 'ko' }).then(res => {
            item.koreanMeaning = res.text;
        });
    });

    const newFileName = eachJsonFileName.replace('.json', '-korean.json');

    fs.writeFileSync(`src/${newFileName}`, JSON.stringify(eachJsonFile, null, 2));
});
