CREATE DATABASE IF NOT EXISTS coreproject;
USE coreproject;

drop table assignment;
DROP TABLE IF EXISTS referee;
CREATE TABLE referee (
   refereeid INT PRIMARY KEY AUTO_INCREMENT,
   firstname varchar(15) NOT NULL,
   lastname varchar(15) NOT NULL,
   grade int NOT NULL,
   age int NOT NULL,
   rating int NOT NULL
 );
 
 DROP TABLE IF EXISTS game;
 CREATE TABLE game (
	gameid INT PRIMARY KEY AUTO_INCREMENT,
    field VARCHAR(10) NOT NULL,
    gamedate date,
    gametime time
);
 
 DROP TABLE IF EXISTS assignment;
 CREATE TABLE assignment (
	assid INT PRIMARY KEY AUTO_INCREMENT,
    gameid INT,
    refereeid INT,
    refereestatus VARCHAR (18),
    position VARCHAR(48),
    FOREIGN KEY (gameid) REFERENCES game(gameid),
    FOREIGN KEY (refereeid) REFERENCES referee(refereeid)
);

insert into referee values (1, 'Tanvi','Hegde', 2, 35, 78);
insert into referee values (2, 'Xuanlan','Xu', 6, 29, 32);
insert into referee values (3, 'Jonah','Hoffman', 3, 23, 67);
insert into referee values (4, 'Jonathan','Benishay', 9, 78, 21);

insert into game values (1,'Hodge', '2021-01-23', '09:37:23');
insert into game values (2, 'Godfrey', '2021-06-07', '02:45:21');
insert into game values (3, 'Prebys', '2021-03-05', '23:11:24');

insert into assignment values (1, 1, 2, 'Accepted', 'Head');
insert into assignment values (2, 2, 4, 'Assigned', 'Head');
insert into assignment values (3, 3, 3, 'Tentative', 'Linesmen');
insert into assignment values (4, 1, 1, 'Assigned', 'Linesmen');

select * from game;
select * from referee;
select * from assignment;