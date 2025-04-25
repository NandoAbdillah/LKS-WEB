<?php

date_default_timezone_set("Asia/Jakarta");

$today = date('j');
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


$numDays = cal_days_in_month(CAL_GREGORIAN, $currentMonth, $currentYear);
$timestamps = strtotime("$currentYear-$currentMonth-01");
$firstDay = date('w', $timestamps);
$monthName = date('F', $timestamps);

?>




<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="calendar.css">
</head>

<body>


    <div class="custom-calendar-wrap">
        <div class="custom-inner">
            <div class="custom-header clearfix">
                <nav>
                    <a href="?month=<?= $prevMonth ?>&year=<?= $prevYear ?>" class="custom-btn custom-prev"></a>
                    <a href="?month=<?= $nextMonth ?>&year=<?= $nextYear ?>" class="custom-btn custom-next" class="custom-btn custom-next"></a>
                </nav>
                <h2 id="custom-month" class="custom-month"><?= $monthName ?></h2>
                <h3 id="custom-year" class="custom-year"><?= $currentYear ?></h3>
            </div>
            <div id="calendar" class="fc-calendar-container">
                <div class="fc-calendar fc-five-rows">
                    <div class="fc-head">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class="fc-body">
                        <div class="fc-row">
                            <?php
                            for ($i = 0; $i < $firstDay; $i++) :
                            ?>
                                <div><span class="fc-date"></span></div>

                            <?php endfor ?>

                            <?php
                            $weekDay = $firstDay;
                            for ($d = 1; $d <= $numDays; $d++) :
                                $isToday = ($d == $today);
                                if ($isToday) {

                                    echo "<div class='fc-today'><span class='fc-date'>$d</span></div>";
                                } else {
                                    echo "<div><span class='fc-date'>$d</span></div>";
                                }

                                if (++$weekDay % 7 == 0) {
                                    echo "</div>";

                                    if ($d < $numDays) {
                                        echo "<div class='fc-row'>";
                                    }
                                }
                            ?>
                            <?php endfor ?>

                            <?php
                            if ($weekDay > 0) {
                                for ($i = $weekDay; $i < 7; $i++) {
                                    echo "<div><span class='fc-date'></span></div>";
                                }
                            }
                            ?>

                        </div>

                    </div>
                </div>
            </div>
        </div>


</body>

</html>