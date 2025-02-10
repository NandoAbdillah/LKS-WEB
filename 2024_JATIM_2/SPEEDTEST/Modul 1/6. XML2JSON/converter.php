<?php

function read_xml($file){
    // check apakah file ada
    if(!file_exists($file)) {
        exit('Error: File tidak ditemukan.');
    }

    // check ekstensinya apakah sudah xml?
    $fileinfo = pathinfo($file);
    if($fileinfo['extension'] != 'xml') {
        exit('Error: Ekstensi file bukan XML.');
    }

    $xmlString = simplexml_load_file($file);
    return $xmlString;
}


function xmlToJson($xmlString){
    $json = json_encode($xmlString, JSON_PRETTY_PRINT);
    return $json;
}


function write_json($json, $file){
    $fileinfo = pathinfo($file);
    if($fileinfo['extension'] != 'json') {
        exit('Error: Ekstensi file bukan JSON.');
    }

    $fp = fopen($file, 'w');
    fwrite($fp, $json);
    fclose($fp);
    $pathfile = realpath($file);
    echo "File JSON berhasil dibuat : di ".$pathfile;
}

function convertXMLtoJSON($filexml, $filejson){
    $xmlString = read_xml($filexml);
    $json = xmlToJson($xmlString);
    write_json($json, $filejson);
}

convertXMLtoJSON('data.xml', 'data.json');