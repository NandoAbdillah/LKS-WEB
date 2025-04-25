<?php

require_once './test_php_doc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
  $title = trim($_POST['title']);
  $content = trim($_POST['content']);


  if (empty($title)) {
    $errors[] = 'Judul tidak boleh kosong !';
  }

  if (empty($content)) {
    $errors[] = 'Isi kontent tidak boleh kosong !';
  }


  if (empty($errors)) {

    $htd = new HTML_TO_DOC();

    $htmlContent = "
          <h1>$title</h1>
          <p>$content</p>
        ";


    $htd->createDoc($htmlContent, $title . '.doc', true);

    exit;
  }
}

?>



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generate DOC File</title>
</head>

<body>
  <?php if (!empty($errors)) : ?>
    <ul>
      <?php foreach ($errors as $error) : ?>
        <li style="color:red;">
          <?= htmlspecialchars($error) ?>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>



  <form action="" method="post">

    <input type="text" name="title" placeholder="title" id="title" value="<?php
                                                                          if (isset($_POST['title'])) echo htmlspecialchars($_POST['title']);
                                                                          else "";
                                                                          ?>">
    <br> <br>
    <textarea name="content" placeholder="text content" id="content" rows="15" cols="50"><?php
                                                                      if (isset($_POST['content'])) echo htmlspecialchars($_POST['content']);
                                                                      else "";
                                                                      ?></textarea>
    <br> <br>
    <input type="submit" value="Create" name="submit">
  </form>

</body>

</html>