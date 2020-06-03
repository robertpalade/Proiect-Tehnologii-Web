<?php
class Masina
{

    // database connection and table name
    private $conn;
    // object properties
    public $id;
    public $judet;
    public $categorie_nationala;
    public $categorie_comunitara;
    public $marca;
    public $descriere_comerciala;
    public $total;
    public $an;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // used when filling up the update product form
    function count_cars_county_nat_categ($year, $county, $nat_categ)
    {
        $query = "SELECT SUM(total) as total_rows FROM masini WHERE an = ? AND judet = ? AND categorie_nationala = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $year);
        $stmt->bindParam(2, $county);
        $stmt->bindParam(3, $nat_categ);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
    function count_cars_county_com_categ($year, $county, $com_categ)
    {

        $query = "SELECT SUM(total) as total_rows FROM masini WHERE an = ? AND judet = ? AND categorie_comunitara = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $year);
        $stmt->bindParam(2, $county);
        $stmt->bindParam(3, $com_categ);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
    function count_cars_county_brand($year, $county, $brand)
    {

        $query = "SELECT SUM(total) as total_rows FROM masini WHERE an = ? AND judet = ? AND marca = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $year);
        $stmt->bindParam(2, $county);
        $stmt->bindParam(3, $brand);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }

    function count_cars_county($year, $county)
    {

        $query = "SELECT SUM(total) as total_rows FROM masini WHERE an = ? AND judet = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $year);
        $stmt->bindParam(2, $county);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }

    function years()
    {
        $query = "SELECT DISTINCT an as year FROM masini";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function counties()
    {
        $query = "SELECT DISTINCT judet as county FROM masini";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function brands($county, $year)
    {
        if ($county == "All") {
            $query = "SELECT DISTINCT marca AS brand_name FROM masini WHERE an = ? ORDER BY marca";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $year);
        } else {
            $query = "SELECT DISTINCT marca AS brand_name FROM masini WHERE judet = ? ORDER BY marca";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
        }
        $stmt->execute();
        return $stmt;
    }
    function nat_cat($county, $year)
    {
        if ($county == "All") {
            $query = "SELECT DISTINCT categorie_nationala AS nat_categ FROM masini WHERE an = ? ORDER BY categorie_nationala";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $year);
        } else {
            $query = "SELECT DISTINCT categorie_nationala AS nat_categ FROM masini WHERE judet = ? ORDER BY categorie_nationala";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
        }
        $stmt->execute();
        return $stmt;
    }
    function com_cat($county, $year)
    {
        if ($county == "All") {
            $query = "SELECT DISTINCT categorie_comunitara AS com_categ FROM masini WHERE an = ? ORDER BY categorie_comunitara";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $year);
        } else {
            $query = "SELECT DISTINCT categorie_comunitara AS com_categ FROM masini WHERE judet = ? ORDER BY categorie_comunitara";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
        }
        $stmt->execute();
        return $stmt;
    }
}
