use coreproject;
show create table refere

DROP TABLE if exists referee;
CREATE TABLE `referee` (
   `refereeid` INT PRIMARY KEY AUTO_INCREMENT,
   `firstname` varchar(15) NOT NULL,
   `lastname` varchar(15) NOT NULL,
   `grade` varchar(1) NOT NULL,
   `age` int NOT NULL,
   `rating` int NOT NULL
 );
 
 DROP TABLE IF EXISTS game;
 CREATE TABLE game (
	gameid INT PRIMARY KEY AUTO_INCREMENT,
    field VARCHAR(10) NOT NULL,
    gametime time
);
 
 DROP TABLE IF EXISTS assignment;
 CREATE TABLE assignment (
	assid INT PRIMARY KEY AUTO_INCREMENT,
    assgameid INT REFERENCES game(gameid),
    assrefereeid INT references referee(refereeid),
    refereestatus VARCHAR(10)
);

insert into referee values (1, 'Tanvi','Hegde', 'C', 35, 78);
insert into referee values (2, 'Xuanlan','Xu', 'F', 29, 32);
insert into referee values (3, 'Jonah','Hoffman', 'G', 23, 67);
insert into referee values (4, 'Jonathan','Benishay', 'E', 78, 21);
