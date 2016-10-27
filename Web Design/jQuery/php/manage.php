<?php
  require_once('util/db.php');
  $sql = "select * from new_reg order by id desc";
  $users = $db -> rawQuery($sql);
  $index = 0;
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>用户管理</title>
    <link rel="stylesheet" type="text/css" href="../bootstrap/dist/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
      <?php include "include/man-nav.php"; ?>
      <table class="table">
        <tr>
          <th>序列</th>
          <th>用户名</th>
          <th>e-mail</th>
          <th>性别</th>
          <th>学历</th>
          <th>自我评价</th>
          <th>爱好</th>
          <th>图片</th>
          <th>操作</th>
        </tr>

        <?php 
            foreach ($users as $key => $value) {
        ?>

        <tr>
          <td><?php echo ++$index; ?></td>
          <td><?php echo $value["username"] ?></td>
          <td><?php echo $value["email"] ?></td>
          <td><?php echo $value["gender"] ?></td>
          <td><?php echo $value["edu"] ?></td>
          <td><?php echo $value["desc"] ?></td>
          <td><?php echo $value["hobbies"] ?></td>
          <td>暂时无图</td>
          <td><button id="<?php echo $value['id']; ?>" uname="<?php echo $value["username"] ?>" class="btn btn-danger btn-xs del-btn">删除</button></td>
        </tr>

        <?php 
         }
        ?>

      </table>
  </div>
    <script src="../js/jquery-3.1.0.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.min.js"></script>
    <script>
      !function(window,document,$,undefined) {

        $('.del-btn').on('click',function() {

          var id = this.id,
              username = this.getAttribute('uname');
          if(confirm('确定要删除' + username + '吗？' )){
            location.href = 'reg_login_del.php?id=' + id + '&t=';
          }

        });

      } (window,document,jQuery)

    </script>
  </body>
</html>
