import requests
import pprint
from bs4 import BeautifulSoup
import re
import urllib.request
import csv
import codecs

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="apax",
  passwd="apax",
  database="parc_auto"
)

mycursor = mydb.cursor()
sql = "DROP TABLE masini"
mycursor.execute(sql)
sql = ("CREATE TABLE masini( " 
       "id INT NOT NULL AUTO_INCREMENT, " 
       "judet VARCHAR(255), " 
       "categorie_nationala VARCHAR(255), " 
       "categorie_comunitara VARCHAR(255), " 
       "marca VARCHAR(255), " 
       "descriere_comerciala VARCHAR(255), " 
       "total INT, "
       "an INT, "
       "CONSTRAINT masini_pk PRIMARY KEY (id), "
       "INDEX an_index (an, judet))")
mycursor.execute(sql)

def clean_text(text):
    text = text.replace(".","")
    text = text.replace(",","")
    ap = text.find("0")
    if ap >= 1 and ap <= len(text)-2:
        if text[ap-1]>'A' and text[ap-1]<'Z' and text[ap+1]>'A' and text[ap+1]<'Z':
            text = text.replace("0","O")
    return text

def text_extract(text):
    ap = text.find(" ") 
    if ap != -1:
        return clean_text(text[0:ap])
    
    ap = text.find("-")
    if ap != -1:
        return clean_text(text[0:ap])
    
    ap = text.find("/")
    if ap != -1:
        return clean_text(text[0:ap])

    return clean_text(text)

def year_extraction(url):
    year = url[len(url)-8:len(url)-4]
    return year

def insert_into_table(url):
    data = urllib.request.urlopen(url)
    response = data.read()
    encoding = data.headers.get_content_charset('utf-8')
    data_string = response.decode(encoding)
    dialect = csv.Sniffer().sniff(data_string[0:101])
    data = urllib.request.urlopen(url)
    reader = csv.reader(codecs.iterdecode(data, 'utf-8'), delimiter=dialect.delimiter)
    iterator = 0
    year = year_extraction(url)
    sqlQuery = "INSERT INTO masini (judet, categorie_nationala, categorie_comunitara, marca, descriere_comerciala, total, an) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    for record in reader:
        if iterator > 0:
            mycursor.execute(sqlQuery, (record[0], record[1], record[2], text_extract(record[3]), record[4], record[5], year))
        iterator = iterator + 1
    mydb.commit()

URL = 'https://data.gov.ro/dataset/parc-auto-romania'
page = requests.get(URL, verify=False)
soup = BeautifulSoup(page.content, 'html.parser')
results = soup.find(id='dataset-resources')
list_items = results.find_all('a', class_='resource-url-analytics')
csv_links = []
for item in list_items:
    link = item['href']
    x = re.search("parc-auto-20[0-9][0-9].csv$|parcauto20[0-9][0-9].csv$", link)
    if x: 
        csv_links.append(link)

print(csv_links)

for i in range(len(csv_links)-5,len(csv_links)):
    insert_into_table(csv_links[i])
