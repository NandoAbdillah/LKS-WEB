<?php
// 1. Baca file JSON
$data = json_decode(file_get_contents('./result.json'), true);

// 2. Siapkan variabel penghitung
$sentWords = []; // frekuensi kata2 yang dikirim user (bukan Bot)
$totalSent = 0;  // total pesan dikirim user
$charsSent = 0;  // total karakter pesan user
$totalRecv = 0;  // total pesan diterima (pesan Bot)
$charsRecv = 0;  // total karakter pesan Bot

// 3. Loop semua pesan
foreach($data['messages'] as $msg){
  if($msg['from'] === 'Bot'){
    // Pesan dari Bot
    $totalRecv++;
    $charsRecv += mb_strlen($msg['text']);
  } else {
    // Pesan dari user (mis. Budi)
    $totalSent++;
    $charsSent += mb_strlen($msg['text']);
    // Pisahkan kata, bersihkan tanda baca, ke huruf kecil
    $words = preg_split('/\s+/', strtolower(preg_replace('/[^\w\s]/', '', $msg['text'])));
    foreach($words as $w){
      if($w==='') continue; // abaikan string kosong
      $sentWords[$w] = ($sentWords[$w] ?? 0) + 1;
    }
  }
}

// 4. Urutkan kata teratas & ambil 5 terbanyak
arsort($sentWords);
$top5 = array_slice($sentWords, 0, 5, true);

// 5. Hitung rata-rata panjang karakter
$avgSent = $totalSent ? round($charsSent / $totalSent) : 0;
$avgRecv = $totalRecv ? round($charsRecv / $totalRecv) : 0;
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>E2. Chat Analytics</title>
  <style>
    body {
      background-color: #000; /* latar hitam */
      color: #fff;           /* teks putih */
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    h2 {
      text-align: left;
      margin-bottom: 20px;
    }
    .item { margin: 5px 0; }
  </style>
</head>
<body>
  <h2>E2. Chat Analytics</h2>
  <div class="item"><strong>Top 5 sent words:</strong></div>
  <?php foreach($top5 as $word => $count): ?>
    <div class="item">&nbsp;&nbsp;<?=htmlspecialchars($word)?> (<?=$count?>x)</div>
  <?php endforeach; ?>

  <br>
  <div class="item">Total message sent: <?=$totalSent?></div>
  <div class="item">Total message received: <?=$totalRecv?></div>
  <div class="item">Average characters length sent: <?=$avgSent?></div>
  <div class="item">Average characters length received: <?=$avgRecv?></div>
</body>
</html>
