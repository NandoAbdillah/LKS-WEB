<?php

$sampleXmlString = "
    <data>
        <person>
            <name>John</name>
            <gender>Male</gender>
        </person>
        <person>
            <name>Budi</name>
            <gender>Male</gender>
        </person>
        <person>
            <name>Ani</name>
            <gender>Female</gender>
        </person>
        <person>
            <name>Randi</name>
            <gender>Male</gender>
        </person>
    </data>
";


function xmlToJson($xmlString){
    $xmlObject = simplexml_load_string($xmlString);
    $json = json_encode($xmlObject, JSON_PRETTY_PRINT);
    return $json;
}


echo xmlToJson($sampleXmlString);
