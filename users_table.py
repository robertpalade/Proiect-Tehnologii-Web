import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="apax",
    passwd="apax",
    database="parc_auto"
)
mycursor = mydb.cursor()
sql = "DROP TABLE users"
mycursor.execute(sql)
sql = ("CREATE TABLE users( "
       "id INT(10) NOT NULL AUTO_INCREMENT, "
       "admin TINYINT(1) NOT NULL, "
       "email VARCHAR(50) NOT NULL, "
       "password VARCHAR(2048) NOT NULL, "
       "CONSTRAINT masini_pk PRIMARY KEY (id))")
mycursor.execute(sql)
sql = "ALTER TABLE users CONVERT TO CHARACTER SET latin1";
mycursor.execute(sql)