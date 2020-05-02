import urllib.request
import csv
import codecs

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="user",
  passwd="user",
  database="parc_auto"
)

mycursor = mydb.cursor()

sql = "DROP TABLE masini2015"
mycursor.execute(sql)
sql = "DROP TABLE masini2016"
mycursor.execute(sql)
sql = "DROP TABLE masini2017"
mycursor.execute(sql)
sql = "DROP TABLE masini2018"
mycursor.execute(sql)
sql = "DROP TABLE masini2019"
mycursor.execute(sql)

mycursor.execute("CREATE TABLE masini2015 (id INT, judet VARCHAR(255), categorie_nationala VARCHAR(255), categorie_comunitara VARCHAR(255), marca VARCHAR(255), descriere_comerciala VARCHAR(255), total INT)")                             
mycursor.execute("CREATE TABLE masini2016 (id INT, judet VARCHAR(255), categorie_nationala VARCHAR(255), categorie_comunitara VARCHAR(255), marca VARCHAR(255), descriere_comerciala VARCHAR(255), total INT)")
mycursor.execute("CREATE TABLE masini2017 (id INT, judet VARCHAR(255), categorie_nationala VARCHAR(255), categorie_comunitara VARCHAR(255), marca VARCHAR(255), descriere_comerciala VARCHAR(255), total INT)")
mycursor.execute("CREATE TABLE masini2018 (id INT, judet VARCHAR(255), categorie_nationala VARCHAR(255), categorie_comunitara VARCHAR(255), marca VARCHAR(255), descriere_comerciala VARCHAR(255), total INT)")
mycursor.execute("CREATE TABLE masini2019 (id INT, judet VARCHAR(255), categorie_nationala VARCHAR(255), categorie_comunitara VARCHAR(255), marca VARCHAR(255), descriere_comerciala VARCHAR(255), total INT)")                                                                                                                    


url = 'https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/c6d449f8-3556-491d-a240-ae4207e7b1a7/download/parcauto2015.csv'
data = urllib.request.urlopen(url)
reader = csv.reader(codecs.iterdecode(data, 'utf-8'))
counter = 0

sqlQuery = "INSERT INTO masini2015 (id, judet, categorie_nationala, categorie_comunitara, marca, descriere_comerciala, total) VALUES ( %s, %s, %s, %s, %s, %s, %s)"
for record in reader:
    if counter > 0:
        mycursor.execute(sqlQuery, (counter, record[0], record[1], record[2], record[3], record[4], record[5]))
        #print(record[5])
    counter = counter + 1
mydb.commit()


url = 'https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/b335964e-3ef1-4e1f-bc39-b5b526470495/download/parcauto2016.csv'
data = urllib.request.urlopen(url)
reader = csv.reader(codecs.iterdecode(data, 'utf-8'))
counter = 0

sqlQuery = "INSERT INTO masini2016 (id, judet, categorie_nationala, categorie_comunitara, marca, descriere_comerciala, total) VALUES ( %s, %s, %s, %s, %s, %s, %s)"
for record in reader:
    if counter > 0:
        mycursor.execute(sqlQuery, (counter, record[0], record[1], record[2], record[3], record[4], record[5]))
    counter = counter + 1
mydb.commit()
    
url = 'https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/4f434c30-0afe-4101-bacd-58b4d95a998e/download/parcauto2017.csv'
data = urllib.request.urlopen(url)
reader = csv.reader(codecs.iterdecode(data, 'utf-8'))
counter = 0

sqlQuery = "INSERT INTO masini2017(id, judet, categorie_nationala, categorie_comunitara, marca, descriere_comerciala, total) VALUES ( %s, %s, %s, %s, %s, %s, %s)"
for record in reader:
    if counter > 0:
        mycursor.execute(sqlQuery, (counter, record[0], record[1], record[2], record[3], record[4], record[5]))
    counter = counter + 1
mydb.commit()


url = 'https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/c66e2f22-7c16-4dd4-919d-f592b3e09af6/download/parcauto2018.csv'
data = urllib.request.urlopen(url)
reader = csv.reader(codecs.iterdecode(data, 'utf-8'), delimiter=";")
counter = 0

sqlQuery = "INSERT INTO masini2018(id, judet, categorie_nationala, categorie_comunitara, marca, descriere_comerciala, total) VALUES ( %s, %s, %s, %s, %s, %s, %s)"
for record in reader:
    if counter > 0:
        mycursor.execute(sqlQuery, (counter, record[0], record[1], record[2], record[3], record[4], record[5]))
    counter = counter + 1
mydb.commit()

url = 'https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/8a27bf28-1693-446f-b6a1-732100570b51/download/parcauto2019.csv'
data = urllib.request.urlopen(url)
reader = csv.reader(codecs.iterdecode(data, 'utf-8'), delimiter =";")
counter = 0

sqlQuery = "INSERT INTO masini2019(id, judet, categorie_nationala, categorie_comunitara, marca, descriere_comerciala, total) VALUES ( %s, %s, %s, %s, %s, %s, %s)"
for record in reader:
    if counter > 0:
        mycursor.execute(sqlQuery, (counter, record[0], record[1], record[2], record[3], record[4], record[5]))
    counter = counter + 1
mydb.commit()