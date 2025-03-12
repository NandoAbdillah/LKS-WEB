<?php

require_once './test_php_doc.php';


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['submit'])) {
  $title = $_POST['title'];
  $content = $_POST['content'];

  $htd = new HTML_TO_DOC();

  $htmlContent = "
    <h1>$title</h1>
    <p>$content</p>
    ";

    $htd->createDoc($htmlContent, $title . '.doc', true);

    exit;
}


?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generate File DOC</title>
</head>

<body>
  <form action="" method="post">
    <input type="text" name="title" id="title" placeholder="title" required> <br><br>
    <textarea name="content" id="content" rows="5" cols="50" placeholder="text content" required></textarea> <br>

    <input type="submit" value="Create" name="submit">
  </form>

</body>

</html>