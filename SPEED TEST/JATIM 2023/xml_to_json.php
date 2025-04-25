<?php
if(isset($_POST['xml'])){
  $xmlObj=@simplexml_load_string($_POST['xml']);
  $json=$xmlObj?json_encode([$xmlObj->getName()=>$xmlObj],JSON_PRETTY_PRINT):'Invalid XML';
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>E1. XML2JSON Converter</title>
  <style>
    body { font-family: Arial, sans-serif; margin:20px; }
    h3 { text-align: center; }
    .box { display: flex; gap: 10px; }
    .box div { flex: 1; }
    textarea { width: 100%; height: 300px; }
    button { display: block; margin: 10px auto; padding: 10px 20px; }
  </style>
</head>
<body>
  <h3>E1. XML2JSON Converter</h3>
  <form method="post">
    <div class="box">
      <div>
        <p>XML Input:</p>
        <textarea name="xml"><?=htmlspecialchars($_POST['xml']??'')?></textarea>
      </div>
      <div>
        <p>JSON Output:</p>
        <textarea readonly><?=htmlspecialchars($json??'')?></textarea>
      </div>
    </div>
    <button type="submit">Convert!</button>
  </form>
</body>
</html>
