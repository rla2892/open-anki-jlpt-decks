$from1to5 = 1..5

foreach ($i in $from1to5) {
    $jpFile = "./src/n$i-jp.txt"
    $koFile = "./src/n$i-ko.txt"
    
    if (!(Test-Path $jpFile) -or !(Test-Path $koFile)) {
        Write-Host "경고: N$i 레벨의 파일이 없습니다. 건너뜁니다."
        continue
    }
    
    $japanese = Get-Content $jpFile -Encoding UTF8
    $translation = Get-Content $koFile -Encoding UTF8
    $combined = for ($j=0; $j -lt $japanese.Count; $j++) {
        "$($japanese[$j]),$($translation[$j])"
    }
    $combined | Out-File "./src/n$i-combined.txt" -Encoding UTF8
    Write-Host "N$i 파일 결합 완료"
}
