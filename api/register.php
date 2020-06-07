<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


function msg($success, $status, $message, $extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
include_once 'config/database.php';
$db_connection = new Database();
$conn = $db_connection->getConnection();

// GET DATA FORM REQUEST

// var_dump($_POST);die;

    if (null !==$_POST['email'] && null !== $_POST['password'] && null !== $_POST['confirmPassword']):
    // receive all input values from the form
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        $confirmPassword = trim($_POST['confirmPassword']);

    $returnData = [];

    // CHECKING EMPTY FIELDS   
    if (null == $email || null == $password || null == $confirmPassword || empty(trim($email)) || empty(trim($password) || empty(trim($confirmPassword)))):
        $fields = ['fields' => ['email','password','confirmPassword']];
        $returnData = msg(0, 422, 'Please fill in all required fields!');
    // IF THERE ARE NO EMPTY FIELDS THEN-
    else:
        
        $email = trim($email);
        $password = trim($password);
        $confirmPassword = trim($confirmPassword);

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
            $returnData = msg(0,422,'Invalid email address!');
        
        elseif(strlen($password) < 8):
            $returnData = msg(0,422,'Your password must be at least 8 characters long!');

        elseif(strcmp($password, $confirmPassword) !== 0):
            $returnData = msg(0,422,'The passwords do not match!');

        else:
            try {
                $check_email = "SELECT `email` FROM `users` WHERE `email`=:email";
                $check_email_stmt = $conn->prepare($check_email);
                $check_email_stmt->bindValue(':email', $email,PDO::PARAM_STR);
                $check_email_stmt->execute();

                if($check_email_stmt->rowCount()):
                    $returnData = msg(0,422, 'This e-mail is already in use!');
                
                else:
                    $insert_query = "INSERT INTO `users`(`email`,`password`) VALUES(:email,:password)";
                    $insert_stmt = $conn->prepare($insert_query);

                    // DATA BINDING
                    $insert_stmt->bindValue(':email', $email,PDO::PARAM_STR);
                    $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT),PDO::PARAM_STR);
                    // echo($email);
                    // echo($password);
                    // echo($insert_query);
                    $insert_stmt->execute();

                    $returnData = msg(1,201,'You have successfully registered!');

                endif;

            }
            catch(PDOException $e) {
                $returnData = msg(0,500,$e->getMessage());
            }
        endif;
        
    endif;
    echo json_encode($returnData);
endif;
?>