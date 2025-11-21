<?php
class Db
{
	private $host, $db, $user, $pass;
	private $charset = 'utf8mb4';
	private $dsn;
	private $pdo;

	private $options = [
	    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	    PDO::ATTR_EMULATE_PREPARES => false,
	];

	function __construct()
	{
		//get config details
		if(!file_exists("config"))
		{
			die("config file not found.");
		}

		$config = json_decode(file_get_contents("config"));

		$this->host = $config->db_host;
		$this->db = $config->db_db;
		$this->user = $config->db_user;
		$this->pass = $config->db_pass;

		$this->dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
 		try {
			$this->pdo = new PDO($this->dsn, $this->user, $this->pass, $this->options);
		} catch (PDOException $e) {
			die("Database connection failed: " . $e->getMessage());
		}
		return $this->pdo;
	}

	//this adds a new dox to the db
	function addDox($title, $dox, $ip)
	{
		try {
			$q = $this->pdo->prepare("insert into dox (title, dox, ip) values (?,?,?)");
			$q->execute([$title, $dox, $ip]);
		} catch (PDOException $e) {
			die("Error adding dox: " . $e->getMessage());
		}
	}

	//this will return dox info by its id
	function getDox($id)
	{
		try {
			$q = $this->pdo->prepare("select * from dox where id = ?");
			$q->execute([$id]);
			return $q->fetch(PDO::FETCH_ASSOC);
		} catch (PDOException $e) {
			die("Error fetching dox: " . $e->getMessage());
		}
	}

	//get a list of the dox
	function getDoxList()
	{
		try {
			$q = $this->pdo->query("select * from dox order by id desc");
			return $q->fetchAll();
		} catch (PDOException $e) {
			die("Error fetching dox list: " . $e->getMessage());
		}
	}

	//increment the views
	function addView($id)
	{
		try {
			$q = $this->pdo->prepare("update dox set views = views+1 where (id = ?)");
			$q->execute([$id]);
		} catch (PDOException $e) {
			// Silently fail for view counting
			error_log("Error incrementing views: " . $e->getMessage());
		}
	}

	//install tables
	function installTables()
	{
		try {
			$q = $this->pdo->exec(file_get_contents("db.sql"));
		} catch (PDOException $e) {
			die("Error installing tables: " . $e->getMessage());
		}
	}
}
?>
