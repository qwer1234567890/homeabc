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

	$username = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $gender = $_POST["gender"];
    $edu = $_POST["edu"];
    $desc = $_POST["desc"];
    $hobbies = $_POST["hobbies"];
    $pic = $_POST["pic"];
    // $now = date("Y-m-d h:i:s");

    $data = Array(
        "username" => $username,
        "password" => $password,
        "email" => $email,
        "gender" => $gender,
        "edu" => $edu,
        "desc" => $desc,
        "hobbies" => implode('|', $hobbies),
        "pic" => $pic
    );

    /*print_r($data);

    die;*/

    $id = $db->insert('new_reg', $data);

    sleep(2);

    if ($id > 0) {
        echo '恭喜，注册成功！点击<a href="../html/login.html">这里</a>登录';
    } else {
        echo '注册失败，请<a href="../html/reg.html">重新注册</a>';
    }

?>

</body>
</html>