<?php
$kelipatan = isset($_POST['kelipatan']) ? $_POST['kelipatan'] : 1;
$inputValue = isset($_POST['kelipatan']) ? htmlspecialchars($_POST['kelipatan'])  : '';


$showRows = 40;
$warning = '';
$defaultValue = true;

if (isset($_POST['kelipatan'])) {
    $input = trim($kelipatan);

    if ($kelipatan === '' || $kelipatan === 0) {
        $kelipatan = 1;
    } elseif (!is_numeric($kelipatan) || (int)$kelipatan < 0) {
        $kelipatan = 1;
        $warning = "Peringatan : Kelipatan tidak boleh negatif!";
    } else {
        $kelipatan = (int)$input;
        $defaultValue = false;
    }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelipatan</title>

    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, Helvetica, sans-serif;
        }

        .canvas {
            background-color: #eee;
            min-width: 600px;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;

        }

        th,
        td {
            border: 1px solid black;
            text-align: center;
            padding: 5px;
        }

        .highlight {
            background-color: green;
            color: white;
        }

        .warning {
            color: red;
        }
    </style>
</head>

<body>
    <div class="canvas">
        <form action="" method="post">
            <label for="keliapatan">Masukkan Kelipatan :</label>
            <input type="number" name="kelipatan" id="kelipatan" value="<?=
                                                                        $inputValue ? $inputValue : 1
                                                                        ?>">
            <button type="submit">Kirim</button>
        </form>
        <p class="warning"><?= $warning ?? '' ?></p>


        <div class="kelipatan-container">
            <h2>Kelipatan 1</h2>

            <table>
                <thead>
                    <tr>
                        <th>Angka</th>
                        <th>Kelipatan</th>
                    </tr>
                </thead>


                <tbody>
                    <?php
                    for ($i = 1; $i <= $showRows; $i++) :

                    ?>

                        <tr>
                            <td><?= $i ?></td>
                            <?php
                            if ($i % $kelipatan === 0 || $defaultValue) {
                                echo "<td class='highlight'>$i ($i Kelipatan dari $kelipatan)</td>";
                            } else {
                                echo "<td>$i</td>";
                            }
                            ?>
                        </tr>


                    <?php endfor; ?>

                </tbody>
            </table>
        </div>
    </div>
</body>

</html>