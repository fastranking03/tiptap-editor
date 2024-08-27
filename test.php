<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
$page = "contact";

$msg = "";
if (isset($_POST['submit'])) {
   
    $name = htmlentities($database->escape_string($_POST['name']));
    $subject = htmlentities($database->escape_string($_POST['subject']));
    $number = $_POST['number'];
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $message = $_POST['message'];
    $secret = "6Le0yiMqAAAAAOaZTFqin4pFx-i8KrscY302u1pA";
    $response = $_POST['g-recaptcha-response'];
    $remoteip = $_SERVER['REMOTE_ADDR'];
    $url = "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response&remoteip=$remoteip";
    $resData = file_get_contents($url);
    $dataRow = json_decode($resData);

    if ($dataRow && $dataRow->success) {

        $contact_data = new Contact();

        if (is_uploaded_file($_FILES['attachment']['tmp_name'])) {
            $contact_data->set_file($_FILES['attachment']);
            $result = $contact_data->save_photo();
         }
        
        // Set contact data
        $contact_data->name = $name;
        $contact_data->subject = $subject;
        $contact_data->phone = $number;
        $contact_data->email = $email;
        $contact_data->message = $message;
        $contact_data->created_at = $time;
        $result = $contact_data->save();
        
        if ($result === true) {
            // Create a new PHPMailer instance
            $mail = new PHPMailer(true);

            try {
                //Server settings
                $mail->isSMTP();                                        // Set mailer to use SMTP
                $mail->Host       = 'smtp.example.com';                 // Specify main and backup SMTP servers
                $mail->SMTPAuth   = true;                               // Enable SMTP authentication
                $mail->Username = 'jaydenmitchell0282@gmail.com';
                $mail->Password = 'rtcslwgbcgxkoibh';
                $mail->SMTPSecure = 'tls';                              // Enable TLS encryption, `ssl` also accepted
                $mail->Port       = 587;                                // TCP port to connect to

                //Recipients
                $mail->setFrom($email, $name);
                $mail->addAddress('fastranking03@gmail.com');           // Add a recipient
       
                // Content
                $mail->isHTML(true);                                    // Set email format to HTML
                $mail->Subject = $subject;
                $mail->Body    = "<h3>New Contact Inquiry</h3>
                                <p><strong>Name:</strong> $name</p>
                                <p><strong>Email:</strong> $email</p>
                                <p><strong>Phone:</strong> $number</p>
                                <p><strong>Message:</strong><br>$message</p>";

                $mail->send();
                $msg = '<div class="alert alert-success alert-dismissible alert-message">
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Success!</strong> Inquiry submitted and mail sent successfully.
                    </div>';
            } catch (Exception $e) {
                $msg = '<div class="alert alert-danger alert-dismissible alert-message">
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Failed!</strong> Inquiry submitted but mail could not be sent.
                    </div>';
            }
        } else {
            $msg = '<div class="alert alert-danger alert-dismissible alert-message">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Failed!</strong> Inquiry Failed.
                </div>';
        }
    } else {
        $msg = '<div class="alert alert-danger alert-dismissible alert-message">
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                <strong>Failed!</strong> Captcha is Required.
            </div>';
    }
}
?>