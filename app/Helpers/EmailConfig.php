<?php

namespace App\Helpers;

use PHPMailer\PHPMailer\PHPMailer;

class EmailConfig
{
    /* variable $name que se recibió */
    static  function config($name): PHPMailer
    {
        $mail = new PHPMailer(true);
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        // $mail->Username = 'hola@mundoweb.pe';
        // $mail->Password = 'uohombtocndviqyz';
        $mail->Username = 'diegomartinez1996x@gmail.com';
        $mail->Password = 'piqutsbcfdzsrnkp';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->Subject = '' . $name . ', Gracias por comunicarte con Mundo Web';
        $mail->CharSet = 'UTF-8';
        $mail->setFrom('hola@mundoweb.pe', 'Mundo Web');
        return $mail;
    }
}