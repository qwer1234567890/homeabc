<?php
/**
 * Created by PhpStorm.
 * User: situ
 * Date: 2016/8/14
 * Time: 15:38
 */

require_once ('util/db.php');

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select * from new_reg where username='$username' and password='$password'";

// echo $sql;

$user = $db -> rawQuery($sql);

if (empty($user)) {
    echo '登录失败，请<a href="../html/login.html">重试</a>';
} else {
    echo '<script>location.href="http://www.baidu.com";</script>';
}

?>
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>
