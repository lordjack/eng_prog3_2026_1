<?php

//ambiente marcosvirgilio.online
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'db_prog3_web_service';

// Create connection
$con = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
