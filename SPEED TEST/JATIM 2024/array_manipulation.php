<?php
$a = range(1, 40);
$f = isset($_GET['factor'])  ? (int)$_GET['factor'] : 0;

if ($f > 0) {
    foreach ($a as &$v) {
        //  tanda & digunakan agar bisa memodifikasi isi dalam array
        if ($v % $f == 0) {
            $v .= " is a multiple of $f";
        }
    }
}

// Gunakan <pre> agar new line dipertahankan
echo "<pre style='border: 3px solid black; width : 250px; padding: 20px'>";
print_r($a);
echo "</pre>";
