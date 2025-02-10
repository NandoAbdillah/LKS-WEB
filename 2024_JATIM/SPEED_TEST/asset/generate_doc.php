<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari formulir
    $title = trim($_POST['title']);
    $content = trim($_POST['content']);

    // Validasi input
    if (empty($title) || empty($content)) {
        die('Title and content are required.');
    }

    
    $fileName = $title . '.doc';
    $htmlContent = "
        <html>
        <head><meta charset='UTF-8'></head>
        <body>
            <h1>{$title}</h1>
            <p>{$content}</p>
        </body>
        </html>
    ";

    // Set header untuk download file DOC
    header("Content-type: application/vnd.ms-word");
    header("Content-Disposition: attachment;Filename=\"{$fileName}\"");

    // Output file DOC
    echo $htmlContent;
    exit;
}
?>
