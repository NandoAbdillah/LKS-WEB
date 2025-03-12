<?php
date_default_timezone_set("Asia/Jakarta");


$currentDay = date('j');
$currentMonth = $_GET['month'] ?? date('n');
$currentYear = $_GET['year'] ?? date('Y');

$prevMonth = $currentMonth - 1;
$prevYear = $currentYear;

if ($prevMonth < 1) {
    $prevMonth = 12;
    $prevYear--;
}

$nextMonth = $currentMonth + 1;
$nextYear = $currentYear;

if ($nextMonth > 12) {
    $nextMonth = 1;
    $nextYear++;
}


$timestamp = strtotime("$currentYear-$currentMonth-01");
$firstDay = date('w', $timestamp);
$numDays = cal_days_in_month(CAL_GREGORIAN, $currentMonth, $currentYear);

$monthNames = date('F', $timestamp);


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalender</title>

    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, Helvetica, sans-serif;
        }


        .calendar-nav a {
            text-decoration: none;
        }

        table {
            border-collapse: collapse;

        }

        th {
            background-color: #eee;
        }

        th,
        td {
            text-align: center;
            border: 1px solid black;
            padding: 6px;

        }

        .today {
            background: red;
            color: white;
        }
    </style>
</head>

<body>

    <div class="calendar-container">
        <div class="calendar-nav">
            <a href="
            <?= "?month=$prevMonth&year=$prevYear" ?>
            ">
                << Bulan Sebelumnya </a>
                    <span><strong> <?= $monthNames . " " . $currentYear ?> </strong></span>
                    <a href=" <?= "?month=$nextMonth&year=$nextYear" ?>"> Bulan Setelahnya >></a>
        </div>


        <table>
            <thead>
                <tr>
                    <th>Minggu</th>
                    <th>Senin</th>
                    <th>Selasa</th>
                    <th>Rabu</th>
                    <th>Kamis</th>
                    <th>Jumat</th>
                    <th>Sabtu</th>
                </tr>
            </thead>



            <tbody>
                <tr>
                    <?php
                    for ($i = 0; $i < $firstDay; $i++) {
                        echo "<td> </td>";
                    }


                    $weekDay = $firstDay;
                    for ($d = 1; $d <=  $numDays; $d++) {


                        $isToday = ($currentDay == $d);

                        echo "<td " . ($isToday ? " class='today'" : "") . " >$d</td>";

                        if (++$weekDay === 7) {
                            echo "</tr>";

                            if ($d < $numDays) {
                                echo "<tr>";
                            }

                            $weekDay = 0;
                        }
                    }


                    if ($weekDay > 0) {
                        for ($i = $weekDay; $i < 7; $i++) {
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