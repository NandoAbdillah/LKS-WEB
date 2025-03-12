<?php
$act = file('./actualAnswers.csv');
$sub = file('./submittedAnswers.csv');
$score = 0;

?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Answer Checker</title>
</head>

<body>

    <table border="1">
        <thead>
            <tr>
                <th>Questions</th>
                <th>Actual</th>
                <th>Submitted</th>
            </tr>
        </thead>

        <tbody>
            <?php for ($i = 0; $i < count($act); $i++) :
                if($act[$i] === $sub[$i]) $score++;
                
                ?>
                <tr>
                    <td><?= $i+1 ?></td>
                    <td><?= $act[$i] ?></td>
                    <td><?= $sub[$i] ?></td>
                </tr>
            <?php endfor ?>
        </tbody>
    </table>

    <p>Score : <?= $score ?>/<?= count($act) ?></p>

</body>

</html>