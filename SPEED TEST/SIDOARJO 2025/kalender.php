<?php
date_default_timezone_set('Asia/Jakarta');

$currentDay = date('j');
$currentMonth = $_GET['month'] ?? date('n');
$currentYear = $_GET['year'] ?? date('Y');

$prevMonth = $currentMonth - 1;
$prevYear = $currentYear;

if ($currentMonth < 1) {

    $prevMonth = 12;
    $prevYear--;
}

$nextMonth = $currentMonth + 1;
$nextYear = $currentYear;

if ($currentMonth > 12) {
    $nextMonth = 1;
    $nextYear++;
}

$numDays = cal_days_in_month(CAL_GREGORIAN, $currentMonth, $currentYear);
$firstDay = date('w', strtotime("$currentYear-$currentMonth-01"));

$monthNames = [1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
$dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalender</title>

    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
        }

        .month-nav {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
        }

        .month-nav a {
            text-decoration: none;
        }

        table {
            border-collapse: collapse;
        }

        th {
            background-color: #f2f2f2;
        }

        th,td {
            border: 1px solid black;
            padding: 5px;
            text-align: center;
            align-items: center;
        }

        .highlight {
            background-color: red;
            color: white;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="calendar-container">
        <div class="month-nav">
            <a href="?month=<?= $prevMonth ?>&year=<?= $prevYear ?>">
                << Bulan Sebelumnya </a>
                    <span><strong><?= $monthNames[$currentMonth] . " " . $currentYear ?></strong></span>
                    <a href="?month=<?= $nextMonth ?>&year=<?= $nextYear ?>"> Bulan Berikutnya >> </a>
        </div>

        <table>
            <thead>
                <tr>
                    <?php
                    foreach ($dayNames as $day) echo "<th>$day</th>";
                    ?>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <?php
                    for ($i = 0; $i < $firstDay; $i++) {
                        echo "<td> </td>";
                    }


                    $dayOfWeek = $firstDay;
                    for ($d = 1; $d < $numDays; $d++) {
                        $isToday = ($d == $currentDay);

                        echo "<td " . ($isToday ? "class='highlight'" : "") . " >$d</td>";

                        if (++$dayOfWeek == 7) {
                            echo "</tr>" . ($d < $numDays ? "<tr>" : "");

                            $dayOfWeek = 0;
                        }
                    }

                    if ($dayOfWeek > 0) {
                        for ($i = $dayOfWeek; $i < 7; $i++) {
                            echo "<td> </td>";
                        }
                    }
                    ?>
                </tr>
            </tbody>
        </table>
    </div>

</body>

</html>