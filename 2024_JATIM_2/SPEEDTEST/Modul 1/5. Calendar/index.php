<?php
$currentMonth = isset($_GET['month']) ? $_GET['month'] : date('n');
$currentYear = isset($_GET['year']) ? $_GET['year'] : date('Y');
$today = date('j');

$firstDayOfMonth = strtotime("{$currentYear}-{$currentMonth}-01");
$lastDayOfMonth = date('Y-m-t', $firstDayOfMonth);
$firstWeekCount = date('W', $firstDayOfMonth); # 1- 52 ,1
$lastWeekCount = date('W', strtotime($lastDayOfMonth));
if($firstWeekCount > $lastWeekCount){
    $lastWeekCount = 52 + $lastWeekCount;
}

$weekCount = $lastWeekCount - $firstWeekCount + 1;
$isDateCurrent = $currentYear == date('Y') && $currentMonth == date('n');
$monthName = date('F', $firstDayOfMonth);

$daysInMonth = date('t', $firstDayOfMonth);
$firstDayOfMonth = date('N', $firstDayOfMonth);


$dayLast = date('N', strtotime($lastDayOfMonth));
if($dayLast ==7){
    $weekCount++;
}else if($firstDayOfMonth ==7){
    $weekCount--;
}
$firstDayOfMonth = $firstDayOfMonth == 7 ? 0 : $firstDayOfMonth;
$nextMonth = $currentMonth == 12 ? 1 : $currentMonth + 1;
$nextYear = $currentMonth == 12 ? $currentYear + 1 : $currentYear;

$prevMonth = $currentMonth == 1 ? 12 : $currentMonth - 1;
$prevYear = $currentMonth == 1 ? $currentYear - 1 : $currentYear;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
    <style>
        .calendar {
            padding: 20px;
            background-color: white;
            border-radius: 5px;
            border: 1px solid #ddd;
            border-top: 5px solid #eb526b;
            margin: 20px auto;
            max-width: 50vw;
        }

        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .calendar-month {
            text-align: center;
        }

        .calendar-month h2 {
            margin: 0 0 5px;
            font-size: 1.5rem;
            font-weight: 500;
        }

        .calendar-month span {
            font-size: 1rem;
            color: #909090;
        }

        .arrow {
            padding: 6px;
            font-size: 30px;
            cursor: pointer;
            color: #eb526b;
            text-decoration: none;
        }


        .calendar table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
            text-align: center;
        }

        .calendar table td {
            border: 1px solid #ddd;
            padding: 15px;
        }

        .calendar table th {
            color: #eb526b;
            padding: 10px;
        }

        .active {
            background-color: #eb526b;
            color: white;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="calendar">
        <div class="calendar-header">
            <div class="navigation-arrows">
                <a href="<?= '?month=' . $prevMonth . '&year=' . $prevYear ?>" class="arrow">&#11164;</a>
            </div>
            <div class="calendar-month">
                <h2><?= $monthName ?></h2>
                <span><?= $currentYear ?></span>
            </div>
            <div class="navigation-arrows">
                <a href="<?= '?month=' . $nextMonth . '&year=' . $nextYear ?>" class="arrow">&#11166;</a>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>SUN</th>
                    <th>MON</th>
                    <th>TUE</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                </tr>
            </thead>
            <tbody>
                <?php $currentDay = 1; ?>
                <?php for ($i = 1; $i <= $weekCount; $i++) : ?>
                    <tr>
                        <?php for ($j = 0; $j < 7; $j++) : ?>
                            <?php if ($i == 1 && $j < $firstDayOfMonth || $currentDay>$daysInMonth): ?>
                                <td></td>
                            <?php else : ?>
                                <td class="<?= $currentDay == $today && $isDateCurrent  ? 'active' : '' ?>"><?= $currentDay ?></td>
                                <?php $currentDay++; ?>
                            <?php endif; ?>
                        <?php endfor; ?>
                    </tr>
                <?php endfor; ?>
            </tbody>
        </table>
    </div>
</body>

</html>