<?php
ob_start();
$file = isset($_FILES['_inputFile']) ? $_FILES['_inputFile'] : NULL;
$filename = $_FILES['_inputFile']['name'];
$targetfolder = 'upload/';
if (!file_exists($targetfolder)) {
    error_log(print_r("in", TRUE));
    error_log(print_r($targetfolder, TRUE));
    error_log(print_r( $_FILES['_inputFile']['name']));
    mkdir($targetfolder, 0777, true);
}
if (file_exists($targetfolder . $_FILES["_inputFile"]["name"])) {
    echo $_FILES["_inputFile"]["name"] . " already exists. ";
}
else {
   move_uploaded_file($_FILES["_inputFile"]["tmp_name"],
       $targetfolder . $_FILES["_inputFile"]["name"]);

   //echo "Stored in: " . $targetfolder . $_FILES["_inputFile"]["name"];
}


system("ffmpeg -i upload/".$filename." -vcodec copy -f rawvideo -y /dev/null 2>&1 | tr ^M '\n' | awk '/^frame=/ {print $2}'|tail -n 1");
$out = ob_get_clean();
$data = array();
foreach(explode("\n", $out) as $line) {
    list($k, $v) = explode("=", trim($line));
    $data[trim($k)] = trim($v);
}
unlink("upload/".$filename);

print json_encode($data,$out);
?>