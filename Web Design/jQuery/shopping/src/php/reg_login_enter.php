<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
<?php
/**
 * Created by PhpStorm.
 * User: situ
 * Date: 2016/8/14
 * Time: 15:38
 */

session_start();

require_once ('util/db.php');

$username = $_POST['username'];
$password = $_POST['password'];
$vcode = $_POST['vcode'];
$authnum = $_SESSION['authnum_session'];

if ($vcode != $authnum) {
	echo "验证码不正确，请<a href='../html/login.html'>重新输入</a>";
	return;
}

$sql = "select * from new_reg where username='$username' and password='$password'";

// echo $sql;

$user = $db -> rawQuery($sql);

if (empty($user)) {
    echo '登录失败，请<a href="../html/login.html">重试</a>';
} else {
    echo '<script>alert("登陆成功啦,少年!");location.href="../html/main.html";</script>';
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
