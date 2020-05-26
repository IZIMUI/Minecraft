<?php
$Get_File_Data = $_FILES["File_Data"]["name"];
file_put_contents(fopen("Test.txt", "wb"), "你好");
echo $Get_File_Data
?>
