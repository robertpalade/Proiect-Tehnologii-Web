<?php
class Masina
{

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
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // used when filling up the update product form
    function readOne()
    {

        // query to read single record
        $query = "SELECT * FROM masini2015 WHERE id = 3";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // bind id of product to be updated
        //$stmt->bindParam(1, $this->id);

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

    function count_cars_county_nat_categ($year, $county, $nat_categ)
    {

        if ($county == "Toate" && $nat_categ == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } else if ($county != "Toate" && $nat_categ == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->execute();
        } else if ($county == "Toate" && $nat_categ != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE categorie_nationala = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE categorie_nationala = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE categorie_nationala = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE categorie_nationala = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE categorie_nationala = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $nat_categ);
            $stmt->execute();
        } else if ($county != "Toate" && $nat_categ != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ? AND categorie_nationala = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $nat_categ);
            $stmt->execute();
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
    function count_cars_county_com_categ($year, $county, $com_categ)
    {

        if ($county == "Toate" && $com_categ == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } else if ($county == "Toate" && $com_categ != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE categorie_comunitara = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE categorie_comunitara = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE categorie_comunitara = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE categorie_comunitara = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE categorie_comunitara = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $com_categ);
            $stmt->execute();
        } else if ($county != "Toate" && $com_categ == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->execute();
        } else if ($county != "Toate" && $com_categ != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ? AND categorie_comunitara = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ? AND categorie_comunitara = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ? AND categorie_comunitara = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ? AND categorie_comunitara = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ? AND categorie_comunitara = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $com_categ);
            $stmt->execute();
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
    function count_cars_county_brand($year, $county, $brand)
    {

        if ($county == "Toate" && $brand == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } else if ($county != "Toate" && $brand == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->execute();
        } else if ($county == "Toate" && $brand != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE marca = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE marca = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE marca = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE marca = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE marca = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $brand);
            $stmt->execute();
        } else if ($county != "Toate" && $brand != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ? AND marca = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ? AND marca = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ? AND marca = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ? AND marca = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ? AND marca = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $brand);
            $stmt->execute();
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
    function count_cars_county_nat_categ_brand($year, $county, $nat_categ, $brand)
    {
        if ($county == "Toate" && $nat_categ == "Toate" && $brand == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        } else if ($county != "Toate" && $nat_categ == "Toate" && $brand == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->execute();
        } else if ($county == "Toate" && $nat_categ != "Toate" && $brand == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE categorie_nationala = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE categorie_nationala = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE categorie_nationala = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE categorie_nationala = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE categorie_nationala = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $nat_categ);
            $stmt->execute();
        } else if ($county == "Toate" && $nat_categ == "Toate" && $brand != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE marca = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE marca = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE marca = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE marca = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE marca = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $brand);
            $stmt->execute();
        } else if ($county != "Toate" && $nat_categ != "Toate" && $brand == "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ? AND categorie_nationala = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ? AND categorie_nationala = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $nat_categ);
            $stmt->execute();
        } else if ($county != "Toate" && $nat_categ == "Toate" && $brand != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ? AND marca = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ? AND marca = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ? AND marca = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ? AND marca = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ? AND marca = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $brand);
            $stmt->execute();
        } else if ($county == "Toate" && $nat_categ != "Toate" && $brand != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE categorie_nationala = ? AND marca = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE categorie_nationala = ? AND marca = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE categorie_nationala = ? AND marca = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE categorie_nationala = ? AND marca = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE categorie_nationala = ? AND marca = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $nat_categ);
            $stmt->bindParam(2, $brand);
            $stmt->execute();
        } else if ($county != "Toate" && $nat_categ != "Toate" && $brand != "Toate") {
            if ($year == 2015)
                $query = "SELECT SUM(total) as total_rows FROM masini2015 WHERE judet = ? AND categorie_nationala = ? AND marca = ?";
            else if ($year == 2016)
                $query = "SELECT SUM(total) as total_rows FROM masini2016 WHERE judet = ? AND categorie_nationala = ? AND marca = ?";
            else if ($year == 2017)
                $query = "SELECT SUM(total) as total_rows FROM masini2017 WHERE judet = ? AND categorie_nationala = ? AND marca = ?";
            else if ($year == 2018)
                $query = "SELECT SUM(total) as total_rows FROM masini2018 WHERE judet = ? AND categorie_nationala = ? AND marca = ?";
            else if ($year == 2019)
                $query = "SELECT SUM(total) as total_rows FROM masini2019 WHERE judet = ? AND categorie_nationala = ? AND marca = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $nat_categ);
            $stmt->bindParam(3, $brand);
            $stmt->execute();
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
    function counties()
    {
        $query = "SELECT DISTINCT judet as county_name FROM masini2015";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    function brands($county)
    {
        if ($county == "All") {
            $query = "SELECT marca as brand_name FROM(
                (SELECT DISTINCT marca FROM masini2015) 
                UNION 
                (SELECT DISTINCT marca FROM masini2016) 
                UNION
                (SELECT DISTINCT marca FROM masini2017) 
                UNION
                (SELECT DISTINCT marca FROM masini2018) 
                UNION
                (SELECT DISTINCT marca FROM masini2019)) AS i
                 ORDER BY marca";
            $stmt = $this->conn->prepare($query);
        } else {
            $query = "SELECT marca as brand_name FROM(
                 (SELECT DISTINCT marca FROM masini2015
                  WHERE judet = ?) UNION 
                 (SELECT DISTINCT marca FROM masini2016
                  WHERE judet = ?) UNION
                 (SELECT DISTINCT marca FROM masini2017 
                  WHERE judet = ?) UNION
                 (SELECT DISTINCT marca FROM masini2018
                  WHERE judet = ?) UNION
                 (SELECT DISTINCT marca FROM masini2019
                  WHERE judet = ?)) AS i
                  ORDER BY marca";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $county);
            $stmt->bindParam(3, $county);
            $stmt->bindParam(4, $county);
            $stmt->bindParam(5, $county);
        }
        $stmt->execute();
        return $stmt;
    }
    function nat_cat($county)
    {
        if ($county == "All") {
            $query = "SELECT categorie_nationala AS nat_categ FROM(
                (SELECT DISTINCT categorie_nationala FROM masini2015)
                  UNION 
                (SELECT DISTINCT categorie_nationala FROM masini2016) 
                  UNION
                (SELECT DISTINCT categorie_nationala FROM masini2017)
                  UNION
                (SELECT DISTINCT categorie_nationala FROM masini2018) 
                  UNION
                (SELECT DISTINCT categorie_nationala FROM masini2019)) AS i
                ORDER BY categorie_nationala";
            $stmt = $this->conn->prepare($query);
        } else {
            $query = "SELECT categorie_nationala AS nat_categ FROM(
                  (SELECT DISTINCT categorie_nationala FROM masini2015 WHERE judet = ?)
                    UNION 
                  (SELECT DISTINCT categorie_nationala FROM masini2016 WHERE judet = ?) 
                    UNION
                  (SELECT DISTINCT categorie_nationala FROM masini2017 WHERE judet = ?)
                    UNION
                  (SELECT DISTINCT categorie_nationala FROM masini2018 WHERE judet = ?) 
                    UNION
                  (SELECT DISTINCT categorie_nationala FROM masini2019 WHERE judet = ?)) AS i
                  ORDER BY categorie_nationala";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $county);
            $stmt->bindParam(3, $county);
            $stmt->bindParam(4, $county);
            $stmt->bindParam(5, $county);
        }
        $stmt->execute();
        return $stmt;
    }
    function com_cat($county)
    {
        if ($county == "All") {
            $query = "SELECT categorie_comunitara AS com_categ FROM(
                (SELECT DISTINCT categorie_comunitara FROM masini2015)
                  UNION 
                (SELECT DISTINCT categorie_comunitara FROM masini2016) 
                  UNION
                (SELECT DISTINCT categorie_comunitara FROM masini2017)
                  UNION
                (SELECT DISTINCT categorie_comunitara FROM masini2018) 
                  UNION
                (SELECT DISTINCT categorie_comunitara FROM masini2019)) AS i
                ORDER BY categorie_comunitara";
            $stmt = $this->conn->prepare($query);
        } else {
            $query = "SELECT categorie_comunitara AS com_categ FROM(
            (SELECT DISTINCT categorie_comunitara FROM masini2015 WHERE judet = ?)
              UNION 
            (SELECT DISTINCT categorie_comunitara FROM masini2016 WHERE judet = ?) 
              UNION
            (SELECT DISTINCT categorie_comunitara FROM masini2017 WHERE judet = ?)
              UNION
            (SELECT DISTINCT categorie_comunitara FROM masini2018 WHERE judet = ?) 
              UNION
            (SELECT DISTINCT categorie_comunitara FROM masini2019 WHERE judet = ?)) AS i
            ORDER BY categorie_comunitara";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $county);
            $stmt->bindParam(2, $county);
            $stmt->bindParam(3, $county);
            $stmt->bindParam(4, $county);
            $stmt->bindParam(5, $county);
        }
        $stmt->execute();
        return $stmt;
    }
}
