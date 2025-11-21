<?php
if(file_exists("install.php"))
{
  die("please rename or run install.php");
}

include("Db.class.php");
include("smarty/libs/Smarty.class.php");

$smarty = new Smarty;
$smarty->setCaching(false);
$smarty->setTemplateDir("smarty/templates/default/");
$smarty->setCompileDir("smarty/templates_c/");
$smarty->setCacheDir("smarty/cache/");

if(isset($_GET['page'])) $page = filter_var($_GET['page'], FILTER_SANITIZE_STRING);
else $page = null;

switch($page)
{
  default:
    $db = new Db();
    $doxList = $db->getDoxList();
    $smarty->assign("doxCount", count($doxList));
    $smarty->assign("doxList", $doxList);

    $smarty->display("header.tpl");
    $smarty->display("nav.tpl");
    $smarty->display("index.tpl");
    $smarty->display("footer.tpl");
  break;

  case "add":
    $config = json_decode(file_get_contents("config"));

    if($config->cap_site_key != "" && $config->cap_sec_key != "")
    {
        $smarty->assign("cap_sec_key", $config->cap_sec_key);
        $smarty->assign("cap_site_key", $config->cap_site_key);
    }

    $smarty->assign("page", "add");

    $smarty->display("header.tpl");
    $smarty->display("nav.tpl");
    $smarty->display("add.tpl");
    $smarty->display("footer.tpl");
  break;

  case "tos":
    $smarty->display("header.tpl");
    $smarty->display("nav.tpl");
    $smarty->display("tos.tpl");
    $smarty->display("footer.tpl");
  break;

  case "upload":
    if(!isset($_GET['id'])) {
        header("Location: index.php");
        exit();
    }
    
    $id = filter_var($_GET['id'], FILTER_SANITIZE_STRING);

    $db = new Db();
    $dox = $db->getDox($id);
    
    if(!$dox) {
        header("Location: index.php");
        exit();
    }
    
    $db->addView($id);

    $smarty->assign("dox", $dox);
    $smarty->assign("page", "upload");
    $smarty->display("header.tpl");
    $smarty->display("nav.tpl");
    $smarty->display("upload.tpl");
    $smarty->display("footer.tpl");
  break;

  case "raw":
    if(!isset($_GET['id'])) {
        header("Location: index.php");
        exit();
    }
    
    $id = filter_var($_GET['id'], FILTER_SANITIZE_STRING);

    $db = new Db();
    $dox = $db->getDox($id);
    
    if(!$dox) {
        header("Location: index.php");
        exit();
    }
    
    $db->addView($id);
    $smarty->assign("dox", $dox);
    $smarty->display("raw.tpl");
  break;

  case "submit":
    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header("Location: index.php");
        exit();
    }
    
    //check captcha
    $config = json_decode(file_get_contents("config"));
    
    if($config->cap_site_key != "" && $config->cap_sec_key != "") {
        $cap_url = "https://www.google.com/recaptcha/api/siteverify";

        $fields = array(
            'secret' => $config->cap_sec_key,
            'response' => $_POST['g-recaptcha-response'] ?? '',
            'remoteip' => $_SERVER['REMOTE_ADDR']
        );

        //url-ify the data for the POST
        $fields_string = '';
        foreach($fields as $key=>$value)
        {
            $fields_string .= $key.'='.$value.'&';
        }
        $fields_string = rtrim($fields_string, '&');

        //open connection
        $ch = curl_init();

        //set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $cap_url);
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        //execute post
        $result = curl_exec($ch);

        //close connection
        curl_close($ch);
        
        $captcha_response = json_decode($result);
        
        if(!$captcha_response->success) {
            die("Captcha verification failed.");
        }
    }

    $db = new Db();
    $title = filter_var($_POST['doxTitle'] ?? 'Untitled', FILTER_SANITIZE_STRING);
    $dox = $_POST['dox'] ?? '';
    $db->addDox($title, $dox, $_SERVER['REMOTE_ADDR']);
    
    header("Location: index.php");
    exit();
  break;
}
?>
