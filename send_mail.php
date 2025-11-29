<?php
// send_message.php

// 允许跨语言页面表单提交
header('Content-Type: text/html; charset=utf-8');

// 目标接收邮箱（请替换成你的邮箱）
$to = "1840502833@qq.com";

// 获取表单数据
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// 简单验证
if(empty($name) || empty($email) || empty($message)){
    echo "请填写必填字段（姓名、电子邮箱、信息）！";
    exit;
}

// 邮件标题
$subject = "来自网站的留言：$name";

// 邮件正文
$body = "姓名: $name\n";
$body .= "电话: $phone\n";
$body .= "电子邮箱: $email\n\n";
$body .= "留言内容:\n$message\n";

// 邮件头
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// 发送邮件
if(mail($to, $subject, $body, $headers)){
    echo "<script>alert('留言发送成功，我们会尽快联系您！'); window.location.href='contact.html';</script>";
} else {
    echo "<script>alert('留言发送失败，请稍后再试！'); window.history.back();</script>";
}
?>
