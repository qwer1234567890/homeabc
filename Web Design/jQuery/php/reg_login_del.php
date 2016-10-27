<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    
<?php

	date_default_timezone_set("Asia/Shanghai");

	require_once ('util/db.php');

	$id = $_GET["id"];

    $sql = "delete from new_reg where id = $id";

    $r = $db->doDelete($sql);

    sleep(1);

    if ($r > 0) {
        echo '删除成功！';
        echo '<script>setTimeout(function() {location.href="manage.php"}, 1000);</script>';
    } else {
        echo '删除失败';
    }

?>

</body>
</html>