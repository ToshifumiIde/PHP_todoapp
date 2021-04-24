<?php
require_once(__DIR__ . "/../app/config.php");
//現在のファイルが存在するディレクトリの絶対パスを示す特殊なキーワードを使う。
//__DIR__は最後にスラッシュがつかないから、スラッシュの付け忘れに注意

use MyApp\Database;
//Databaseクラスが出てきたら、MyApp\をつけてくれる
use MyApp\Todo;
use MyApp\Utils;
//なお、TokenクラスではTokenクラスのメソッドを使っているTodo.phpの先頭で、既にMyAppの名前空間が定義されているため、こちらのTokenクラスにはMyAppをつける必要はない。

$pdo = Database::getInstance();

$todo = new Todo($pdo);
$todo->processPost();
$todos = $todo->getAll();

?>


<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>My Todos</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <main data-token="<?= Utils::h($_SESSION['token']); ?>">
    <header>
      <h1>Todos</h1>
      <span 
        class="purge"
      >
      Purge
      </span>
    </header>

    <form action="?action=add" method="post">
      <input type="text" name="title" placeholder="Type new todo.">
      <input type="hidden" name="token" value="<?=Utils::h($_SESSION["token"]); ?>">
    </form>

    <ul>
      <?php foreach($todos as $todo):?>
        <li>
          <input 
            type="checkbox"
            data-id="<?=Utils::h($todo->id) ?>"
            <?=$todo->is_done ? "checked" : "";?> 
          >
          <span><?=Utils::h($todo->title); ?></span>
            <span 
              class="delete" 
              data-id="<?= Utils::h($todo->id); ?>"
              >
              x
            </span>
        </li>
      <?php endforeach; ?>
    </ul>
  </main>
  <script src="./js/main.js"></script>
</body>
</html>