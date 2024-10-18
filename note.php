<?php
$noteFile = 'note.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = isset($_POST['content']) ? $_POST['content'] : '';
    if (file_put_contents($noteFile, $content) !== false) {
        echo '笔记保存成功';
    } else {
        echo '保存笔记失败';
    }
} else {
    if (file_exists($noteFile)) {
        echo file_get_contents($noteFile);
    } else {
        echo '';
    }
}
?>