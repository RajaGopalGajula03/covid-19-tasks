CREATE TABLE State(state_id INTEGER PRIMARY KEY AUTOINCREMENT,
state_name TEXT NOT NULL UNIQUE,
population INTEGER NOT NULL);


CREATE TABLE District(
district_id INTEGER PRIMARY KEY AUTOINCREMENT,
district_name TEXT NOT NULL,
state_id INTEGER NOT NULL,
cases INTEGER,
cured INTEGER,
active INTEGER,
deaths INTEGER,
FOREIGN KEY(state_id) REFERENCES State(state_id));

PRAGMA TABLE_INFO(State);

PRAGMA TABLE_INFO(District);

INSERT INTO State(state_name,population)
VALUES('Andaman and Nicobar Islands',380581),
('Andhara Pradesh',49386799),
('Arunachal Pradesh',84580777),
('Assam',1383727),
('Bihar',104099452),
('Delhi',16787941),
('Goa',1458545),
('Kerala',33406061),
('Tamil Nadu',72147030),
('Telangana',35193978)

select * from state;

SELECT * from District;

PRAGMA journal_mode=WAL;

sqlite3 covid19India.db
PRAGMA journal_mode=WAL;

PRAGMA journal_mode=WAL;

PRAGMA journal_mode;

drop table district;

INSERT INTO District(district_name,state_id,cases,cured,active,deaths)
VALUES('Nicobar',1,5000,4500,480,20),
('South Andaman',1,6000,4500,1470,30),
('Middle Andaman',1,5500,4500,985,15),
('Bapatla',2,7000,5000,1973,27),
('Guntur',2,8000,6500,1487,13),
('Krishna',2,3000,2400,596,4),
('Anjaw',3,2000,1200,789,11),
('Changlang',3,5050,4500,450,30),
('Itanagar',3,6000,5500,480,20),
('Biswanath',4,5500,4400,4552,5),
('Hojai',4,6400,4200,4240,13),
('Bajali',4,3100,1500,1580,10),
('Champaran',5,7000,4150,4150,10),
('Siwan',5,9400,4500,3380,80),
('Vaishali',5,6000,4510,482,50),
('North Delhi',6,2000,1450,480,10),
('South Delhi',6,6800,5500,2350,20),
('Central Delhi',6,9900,6800,2480,60),
('North Goa',7,6600,2700,2780,40),
('South Goa',7,1530,1500,150,50),
('Thiruvananthapuram',8,8530,4500,2770,20),
('Kollam',8,6000,4500,1660,20),
('Pathanamthitta',8,7050,4200,2680,30),
('Chengalpattu',9,8600,4700,1560,50),
('Coimbatore',9,7250,4340,2770,80),
('Dharmapuri',9,6000,2700,1617,16),
('Adilabad',10,7000,2200,2750,10),
('Hanumakonda',10,3400,1700,1670,10),
('Hyderabad',10,6110,4150,1480,20),
('Jagitial',10,8350,1364,4166,20)
