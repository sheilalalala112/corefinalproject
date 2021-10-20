use coreproject;
show create table referee

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
    gametime time
);
 
 DROP TABLE IF EXISTS assignment;
 CREATE TABLE assignment (
	assid INT PRIMARY KEY AUTO_INCREMENT,
    assgameid INT,
    assrefereeid INT,
    refereestatus VARCHAR (18),
    FOREIGN KEY (assgameid) REFERENCES game(gameid),
    FOREIGN KEY (assrefereeid) REFERENCES referee(refereeid)
);

insert into referee values (1, 'Tanvi','Hegde', 2, 35, 78);
insert into referee values (2, 'Xuanlan','Xu', 6, 29, 32);
insert into referee values (3, 'Jonah','Hoffman', 3, 23, 67);
insert into referee values (4, 'Jonathan','Benishay', 9, 78, 21);

insert into game values (1,'Hodge', '2021-01-23 09:37:23');
insert into game values (2, 'Godfrey', '2021-06-07 02:45:21');
insert into game values (3, 'Prebys', '2021-03-05 23:11:24');

insert into assignment values (1, 1, 2, 'Accepted');
insert into assignment values (2, 2, 4, 'Assigned');
insert into assignment values (3, 3, 3, 'Tentative');

select * from game;
select * from referee;
select * from assignment;

