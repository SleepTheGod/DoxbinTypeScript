<?php
$config_file = "config";

//if config file not exist; create
if(!file_exists($config_file))
{
	$fh = fopen($config_file, "w");
	if(!$fh)
	{
		die("cannot create file, try manually creating a file named <b>config</b> in this directory.");
	}
	fclose($fh);

	die("config file not found.<br/>creating config file<br/>file created<br/><a href=\"install.php\">Try the install again</a>");
}

//check file perms
if(!is_writable($config_file))
{
	die("please change permissions of config file to writable (chmod 666 config)");
}

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$fh = fopen($config_file, "w");
	
	fwrite($fh, json_encode([
		"db_host" => $_POST['db_host'] ?? '127.0.0.1',
		"db_user" => $_POST['db_user'] ?? '',
		"db_pass" => $_POST['db_pass'] ?? '',
		"db_db" => $_POST['db_db'] ?? '',
		"cap_sec_key" => $_POST['cap_sec_key'] ?? '',
		"cap_site_key" => $_POST['cap_site_key'] ?? ''
	]));

	fclose($fh);

	if(!file_exists("smarty/templates_c")) {
		mkdir("smarty/templates_c", 0755, true);
	}
	if(!file_exists("smarty/cache")) {
		mkdir("smarty/cache", 0755, true);
	}
	if(!file_exists("smarty/templates/default")) {
		mkdir("smarty/templates/default", 0755, true);
	}

	include("Db.class.php");
	$db = new Db();
	$db->installTables();

	die("config file created and database initialized. <br/>Please delete this file (install.php) and create your Smarty templates in smarty/templates/default/");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>DoxBin Installation</title>
	<style>
		body {
			background-color: #000;
			color: #fff;
			font-family: Arial, sans-serif;
			padding: 2rem;
		}

		form {
			max-width: 600px;
			margin: 0 auto;
		}

		form section {
			background-color: #ccc;
			border-radius: 1rem;
			padding: 1rem;
			color: #000;
		}

		p.section_header {
			border-bottom: 0.3rem solid #000;
			font-size: larger;
			color: #c00;
			font-weight: bold;
			margin-top: 0;
		}

		form section p label {
			display: block;
			margin-bottom: 0.5rem;
			font-weight: bold;
		}

		input[type="text"],
		input[type="password"] {
			width: 100%;
			padding: 0.5rem;
			box-sizing: border-box;
			border: 1px solid #999;
			border-radius: 4px;
		}

		button[type="submit"] {
			background-color: #c00;
			color: #fff;
			padding: 0.75rem 2rem;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 1rem;
		}

		button[type="submit"]:hover {
			background-color: #900;
		}

		i {
			color: #666;
		}
	</style>
</head>
<body>
<form method="post">
	<section>
		<p class="section_header">Database Configuration</p>
		<p>
			<label for="db_host">Database Host</label>
			<input type="text" id="db_host" name="db_host" placeholder="127.0.0.1" value="127.0.0.1" required />
		</p>
		
		<p>
			<label for="db_db">Database Name</label>
			<input type="text" id="db_db" name="db_db" placeholder="doxbin" required />
		</p>
		
		<p>
			<label for="db_user">Database User</label>
			<input type="text" id="db_user" name="db_user" placeholder="username" required />
		</p>
		
		<p>
			<label for="db_pass">Database Password</label>
			<input type="password" id="db_pass" name="db_pass" placeholder="password" />
		</p>

		<p class="section_header">Captcha Configuration</p>
		<p><i>This is not required.</i></p>
		<p>
			<label for="cap_site_key">Google ReCaptcha Site Key</label>
			<input type="text" id="cap_site_key" name="cap_site_key" />
		</p>
		<p>
			<label for="cap_sec_key">Google ReCaptcha Secret Key</label>
			<input type="text" id="cap_sec_key" name="cap_sec_key" />
		</p>

		<p><button type="submit">Save Settings</button></p>
	</section>
</form>
</body>
</html>
