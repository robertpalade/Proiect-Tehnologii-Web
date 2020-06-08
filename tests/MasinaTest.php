<?php

define('ROOT_PATH', dirname(dirname(__FILE__)) . '\\');
include_once ROOT_PATH . '\\api\\config\\database.php';
include_once ROOT_PATH . '\\api\\objects\\masina.php';
use PHPUnit\Framework\TestCase;

class MasinaTest extends PHPUnit_Framework_TestCase 
{
    public static $database;
    public static $masina;

    public function initialize()
    {
        self::$database = new Database();
        $db = self::$database->getConnection();
        // prepare product object
        self::$masina = new Masina($db);
    }
    public function test_count_nat_categ()
    {
        $this->initialize();
        $cars_per_year = intval(self::$masina->count_cars_county_nat_categ(2015, "IASI", "AUTOBUZ"));
        $this->assertGreaterThan(0,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county_nat_categ(2015, "IASI", "M2"));
        $this->assertLessThan(1,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county_nat_categ(2021, "IASI", "AUTOBUZ"));
        $this->assertLessThan(1,$cars_per_year);
    }
    public function test_count_brands()
    {
        $this->initialize();
        $cars_per_year = intval(self::$masina->count_cars_county_brand(2015, "IASI", "MERCEDES"));
        $this->assertGreaterThan(0,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county_brand(2015, "IASI", "M2"));
        $this->assertLessThan(1,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county_brand(2021, "IASI", "MERCEDES"));
        $this->assertLessThan(1,$cars_per_year);
    }
    public function test_count_com_categ()
    {
        $this->initialize();
        $cars_per_year = intval(self::$masina->count_cars_county_com_categ(2015, "IASI", "M2"));
        $this->assertGreaterThan(0,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county_com_categ(2015, "IASI", "AUTOBUZ"));
        $this->assertLessThan(1,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county_com_categ(2021, "IASI", "M2"));
        $this->assertLessThan(1,$cars_per_year);
    }
    public function test_count_county()
    {
        $this->initialize();
        $cars_per_year = intval(self::$masina->count_cars_county(2015, "IASI"));
        $this->assertGreaterThan(0,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county(2015, "DACIA"));
        $this->assertLessThan(1,$cars_per_year);
        $cars_per_year = intval(self::$masina->count_cars_county(2021, "IASI"));
        $this->assertLessThan(1,$cars_per_year);
    }
    public function test_years()
    {
        $this->initialize();
        $years = self::$masina->years();
        $this->assertNotEmpty($years);
        $rowNum = $years->rowCount();
        $this->assertLessThan(6, $rowNum);
        $this->assertGreaterThan(4, $rowNum);
    }
    public function test_counties()
    {
        $this->initialize();
        $counties = self::$masina->counties();
        $this->assertNotEmpty($counties);
    }
    public function test_brands()
    {
        $this->initialize();
        $brands = self::$masina->brands(2015, "IASI");
        $this->assertNotEmpty($brands);
        $brands = self::$masina->brands(2015, "All");
        $this->assertNotEmpty($brands);
        $brands = self::$masina->brands("All", "IASI");
        $this->assertNotEmpty($brands);
        $brands = self::$masina->brands("All", "All");
        $rowNum = $brands->rowCount();
        $this->assertLessThan(1,$rowNum);
    }
    public function test_com_cat()
    {
        $this->initialize();
        $com_cat = self::$masina->com_cat(2015, "IASI");
        $this->assertNotEmpty($com_cat);
        $com_cat = self::$masina->com_cat(2015, "All");
        $this->assertNotEmpty($com_cat);
        $com_cat = self::$masina->com_cat("All", "IASI");
        $this->assertNotEmpty($com_cat);
        $com_cat = self::$masina->com_cat("All", "All");
        $rowNum = $com_cat->rowCount();
        $this->assertLessThan(1,$rowNum);
    }
    public function test_nat_cat()
    {
        $this->initialize();
        $nat_cat = self::$masina->nat_cat(2015, "IASI");
        $this->assertNotEmpty($nat_cat);
        $nat_cat = self::$masina->nat_cat(2015, "All");
        $this->assertNotEmpty($nat_cat);
        $nat_cat = self::$masina->nat_cat("All", "IASI");
        $this->assertNotEmpty($nat_cat);
        $nat_cat = self::$masina->nat_cat("All", "All");
        $rowNum = $nat_cat->rowCount();
        $this->assertLessThan(1,$rowNum);
    }
}
?>
