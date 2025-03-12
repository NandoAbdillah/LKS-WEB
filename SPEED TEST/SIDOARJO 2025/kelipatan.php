<?php
// Get the kelipatan input value, default to 1
$kelipatan = isset($_POST['kelipatan']) ? $_POST['kelipatan'] : 1;
$inputValue = isset($_POST['kelipatan']) ? htmlspecialchars($_POST['kelipatan']) : '';


// Handle edge cases
$warning = '';
$showRows = 40;
$defaultView = true;

if (isset($_POST['kelipatan'])) {
    $input = trim($_POST['kelipatan']);

    if ($input === '' || $input === '0') {
        $kelipatan = 1;
    } elseif (!is_numeric($input) || (int)$input < 0) {
        $warning = 'Peringatan: Angka tidak boleh minus!';
        $kelipatan = 1;
    } else {
        $kelipatan = (int)$input;
        $showRows = 40;
        $defaultView = false;
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Kelipatan</title>
    <style>
        body {
            background: #f0f0f0;
            font-family: Arial;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 40px;
        }

        .canvas {
            background: #ccc;
            width: 700px;
            padding: 15px
        }

        table {
            width: 100%;
            border-collapse: collapse
        }

        th,
        td {
            border: 1px solid #999;
            padding: 6px;
            text-align: center
        }

        th {
            background: #eee
        }

        .kelipatan {
            background: #90EE90
        }

        .warning {
            color: red;
            display: <?= $warning ? 'block' : 'none' ?>
        }
    </style>
</head>

<body>
    <div class="canvas">
        <form method="post" id="kelipatanForm">
            <label for="kelipatan">Masukkan Kelipatan: </label>
            <input type="text" id="kelipatan" name="kelipatan" value="<?= $inputValue ?>">
            <button type="submit">Kirim</button>
            <div class="warning" id="warning"><?= $warning ?></div>
        </form>

        <h2>Kelipatan dari <?= $kelipatan ?></h2>

        <table>
            <tr>
                <th>Angka</th>
                <th>Kelipatan</th>
            </tr>
            <tbody>
                <?php for ($i = 1; $i <= $showRows; $i++): ?>
                    <tr>
                        <td><?= $i ?></td>
                        <?php if ($defaultView || $i % $kelipatan == 0): ?>
                            <td class="kelipatan"><?= $i ?> (kelipatan dari <?= $kelipatan ?>)</td>
                        <?php else: ?>
                            <td><?= $i ?></td>
                        <?php endif; ?>
                    </tr>
                <?php endfor; ?>
            </tbody>
        </table>
    </div>

</body>

</html>