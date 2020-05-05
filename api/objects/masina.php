<?php
class Masina{
  
    // database connection and table name
    private $conn;
    private $table_name2015 = "masini2015";
    private $table_name2016 = "masini2016";
    private $table_name2017 = "masini2017";
    private $table_name2018 = "masini2018";
    private $table_name2019 = "masini2019";
  
    // object properties
    public $id;
    public $judet;
    public $categorie_nationala;
    public $categorie_comunitara;
    public $marca;
    public $descriere_comerciala;
    public $total;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // used when filling up the update product form
function readOne(){
  
    // query to read single record
    $query = "SELECT
                
            FROM
                " . $this->table_name2015 . " 
            WHERE
                id = ?";
  
    // prepare query statement
    $stmt = $this->conn->prepare( $query );
  
    // bind id of product to be updated
    $stmt->bindParam(1, $this->id);
  
    // execute query
    $stmt->execute();
  
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
  
    // set values to object properties
    $this->id = $row['id'];
    $this->judet = $row['judet'];
    $this->categorie_nationala = $row['categorie_nationala'];
    $this->categorie_comunitara = $row['descriere_comunitara'];
    $this->marca = $row['marca'];
    $this->descriere_comerciala = $row['descriere_comerciala'];
    $this->total = $row['total'];
}

}
?>