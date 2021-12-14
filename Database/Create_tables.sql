DROP DATABASE IF EXISTS VETAPP;
CREATE DATABASE VETAPP; 
USE VETAPP;

DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
  `UserId` VARCHAR(100) NOT NULL,
  `Username` VARCHAR(100) DEFAULT NULL,
  `Password` VARCHAR(100) DEFAULT NULL,
  `AccountType` VARCHAR(100) DEFAULT NULL,
  `ActivationDate` DATE DEFAULT NULL,
  `FName` VARCHAR(100) DEFAULT NULL,
  `LName` VARCHAR(100) DEFAULT NULL,
  `Email` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
);

INSERT INTO `USER` (UserId, Username, `Password`, AccountType, ActivationDate, FName, LName, Email)
VALUES
('1','gslowski','greg123','Admin', '2021-11-29', 'Greg', 'Slowski', 'gregory.slowski@ucalgary.ca'),
('2','dburritt','drew123','Health Technician', '2021-11-29', 'Drew', 'Burritt', 'drew.burritt@ucalgary.ca'),
('3','tscott','thomas123','Instructor', '2021-11-29', 'Thomas', 'Scott', 'thomas.scott@ucalgary.ca'),
('14','Instructor_1','pt@123','Instructor', '2021-11-29', 'Mohammad', 'Moshirpour', 'mohammad@gmail.ca'),
('5','Technician','pa','Health Technician', '2021-11-29', 'Emily', 'Marasco', 'emily@gmail.ca'),
('6','Admin_1','pe','Admin', '2021-11-29', 'Greg', 'Theclient', 'admin1@gmail.ca'),
('7','btables','12345','Student', '2021-11-29', 'Bobby', 'Droptables', 'bobby.droptables@gmail.ca'),
('8','Healthtech1','ht1','Health Technician', '2021-07-25', 'John', 'Doe', 'JD1@shaw.ca');

DROP TABLE IF EXISTS `STUDENT`;
CREATE TABLE `STUDENT` (
  `StudentId` VARCHAR(100) NOT NULL,
  `UserId` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`StudentId`),
  FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE
  );
  
INSERT INTO `STUDENT` (StudentId, UserId)
VALUES
('1432444','1'),
('1234567','2'),
('9876543','3');

DROP TABLE IF EXISTS `ANIMAL`;
CREATE TABLE `ANIMAL` (
  `AnimalId` VARCHAR(100) NOT NULL,
  `Name` VARCHAR(100) DEFAULT NULL,
  `Species` VARCHAR(100) DEFAULT NULL,
  `Subspecies` VARCHAR(100) DEFAULT NULL,
  `Breed` VARCHAR(100) DEFAULT NULL,
  `Sex` CHAR DEFAULT NULL,
  `Colour` VARCHAR(100) DEFAULT NULL,
  `Features` VARCHAR(1000) DEFAULT NULL,
  `BirthDate` DATE DEFAULT NULL,
  `RFID` VARCHAR(100) DEFAULT NULL,
  `Microchip` VARCHAR(100) DEFAULT NULL,
  `TattooNum` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`AnimalId`)
);

INSERT INTO ANIMAL (AnimalId, `Name`, Species, Subspecies, Breed, Sex, Colour, Features, BirthDate, RFID, Microchip, TattooNum)
VALUES
('53195','Rex', 'Canine', 'Dog', 'Pitbull', 'M', 'beige', 'flat face', '2015-11-29', 'adlkfneo2342334', 'ieupaenr14234524342', '1234'),
('53196','Spot', 'Canine', 'Dog', 'Labrador', 'F', 'chocolate', 'big smile', '2014-11-29', 'adlkaefeo2342334', 'ieupaenr167896342', '1235'),
('53197','Charles', 'Feline', 'Cat', 'Sphinx', 'M', 'orange', 'purrs lots', '2010-11-29', 'adlkfneo2323142334', 'ieupaenr144654342', '1236'),
('53198','Tom', 'Feline', 'Cat', 'Sphinx', 'M', 'orange', 'purrs lots', '2010-11-15', 'adlkfneo2323142334', 'ieupaenr144654342', '1237'),
('53199','Jack', 'Horse', 'Horse', 'FastBreed', 'M', 'brown', 'whinny', '2010-11-10', 'adlkfneo2323142334', 'ieupaenr144654342', '1238'),
('53200','Johnny', 'Feline', 'Cat', 'Sphinx', 'M', 'yellow', 'purrs lots', '2010-09-29', 'jflkeahpf', 'eiabunfea', '1239');

DROP TABLE IF EXISTS `TREATMENT`;
CREATE TABLE `TREATMENT` (
  `TreatmentId` VARCHAR(100) NOT NULL,
  `AnimalId` VARCHAR(100) NOT NULL,
  `Date` DATE DEFAULT NULL,
  `AdministeredBy` VARCHAR(100) DEFAULT NULL,
  `Description` mediumtext DEFAULT NULL,
  PRIMARY KEY (`TreatmentId`, `AnimalId`),
  FOREIGN KEY (`AnimalId`) REFERENCES `ANIMAL` (`AnimalId`)
  );

INSERT INTO `TREATMENT` (TreatmentId, AnimalId, `Date`, AdministeredBy, `Description`)
VALUES
('111', '53195', '2021-11-29', '1', 'bad leg, made better'),
('112', '53196', '2021-11-30', '2', 'bad arm, made better'),
('113', '53197', '2021-10-29', '3', 'bad breath, made better');

DROP TABLE IF EXISTS `WEIGHT`;
CREATE TABLE `WEIGHT` (
  `AnimalId` VARCHAR(100) NOT NULL,
  `Date` DATETIME NOT NULL,
  `Weight` FLOAT DEFAULT NULL,
  `notes` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`AnimalId`, `Date`),
  FOREIGN KEY (`AnimalId`) REFERENCES `ANIMAL` (`AnimalId`)
  );

INSERT INTO `WEIGHT` (AnimalId, `Date`, Weight)
VALUES
('53195', '2021-11-29', '155'),
('53196', '2021-11-30', '25'),
('53197', '2021-10-29', '300');

DROP TABLE IF EXISTS `PRESCRIPTION`;
CREATE TABLE `PRESCRIPTION` (
	`PrescriptionId`		VARCHAR(100) not null,
	`TreatmentId`				VARCHAR(100) not null,
	`AnimalId`				VARCHAR(100) not null,
    `Prescription`			VARCHAR(100) not null,
    `Notes`					mediumtext,
	primary key (PrescriptionId),
    foreign key (TreatmentId) references TREATMENT(TreatmentId),
	foreign key (AnimalId) references Animal(AnimalId)
);

DROP TABLE IF EXISTS `COMMENTS`;
CREATE TABLE `COMMENTS` (
	`CommentId`			VARCHAR(100) not null,
	`UserId`				VARCHAR(100) DEFAULT 'Deleted',
	`AnimalId`			VARCHAR(100) not null,
    `CommentDate`			DATETIME not null,
    `CommentText`			mediumtext not null,
	primary key (CommentId),
	foreign key (UserId) references USER(UserId) ON DELETE SET NULL,
	foreign key (AnimalId) references Animal(AnimalId)
);

INSERT INTO `COMMENTS` (CommentId, `UserId`, AnimalId, CommentDate, CommentText)
VALUES
(1, 2, '53195', '2015-11-29', 'this is test comment 1'),
(2, 3, '53196', '2015-11-29', 'this is test comment 2'),
(4, 5, '53197', '2015-11-29', 'good comment 4'),
(5, 7, '53197', '2015-11-29', 'student comment 4');

DROP TABLE IF EXISTS `ANIMAL_STATUS`;
CREATE TABLE `ANIMAL_STATUS` (
	`AnimalId`			VARCHAR(100) not null,
	`AnimalStatus`		VARCHAR(100) not null,
	primary key (AnimalId),
	foreign key (AnimalId) references Animal(AnimalId)
);

INSERT INTO ANIMAL_STATUS (AnimalId, AnimalStatus)
VALUES
('53195','Healthy'),
('53196','Healthy'),
('53197','Sick'),
('53198','Injured'),
('53199','Deceased'),
('53200','Healthy');

DROP TABLE IF EXISTS `animal_request`;
CREATE TABLE `animal_request` (
  `animalRequestId` varchar(100) NOT NULL,
  `animalId` varchar(100) NOT NULL,
  `userId` varchar(100),
  `state` varchar(100) NOT NULL,
  PRIMARY KEY (`animalRequestId`),
  KEY `userId_idx` (`userId`),
  KEY `animalId_idx` (`animalId`),
  CONSTRAINT `animalId` FOREIGN KEY (`animalId`) REFERENCES `animal` (`AnimalId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE
);


INSERT INTO `animal_request` (animalRequestId, `animalId`, userId, state)
VALUES
(5, '53195', '1', 'requested'),
(6, '53196', '1', 'requested'),
(7, '53197', '1', 'requested'),
(8, '53197', '2', 'requested');

DROP TABLE IF EXISTS `assigned_animals`;
CREATE TABLE `assigned_animals` (
  `UserId` VARCHAR(100) NOT NULL,
  `AnimalId` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`UserId`, `AnimalId`),
  FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE,
  FOREIGN KEY (`AnimalId`) REFERENCES `animal` (`AnimalId`)
 );
 INSERT INTO `assigned_animals` (`UserId`, animalId)
VALUES
(5, '53195'),
(5, '53196');

DROP TABLE IF EXISTS `health_record`;
CREATE TABLE `health_record` (
  `AnimalId` varchar(100) NOT NULL,
  `Date` datetime NOT NULL,
  `Type` varchar(100) NOT NULL,
  `Record` varchar(100) NOT NULL,
  `Notes` mediumtext,
  PRIMARY KEY (`Date`),
  KEY `AnimalId` (`AnimalId`),
  CONSTRAINT `health_record_ibfk_1` FOREIGN KEY (`AnimalId`) REFERENCES `animal` (`AnimalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `health_record` (`AnimalId`,`Date`,`Type`,`Record`,`Notes`) VALUES ('53195','2020-10-01 00:00:00','temp','a','1');
INSERT INTO `health_record` (`AnimalId`,`Date`,`Type`,`Record`,`Notes`) VALUES ('53195','2020-11-01 00:00:00','blood','b','2');

DROP TABLE IF EXISTS `reminders`;
CREATE TABLE `reminders` (
  `ReminderId` varchar(100) NOT NULL,
  `DueDate` datetime NOT NULL,
  `CreationDate` datetime NOT NULL,
  `Text` mediumtext,
  `AnimalId` varchar(100) NOT NULL,
  `UserId` varchar(100),
  primary key (ReminderId),
  foreign key (AnimalId) references ANIMAL(AnimalId),
  foreign key (UserId) references USER(UserId) ON DELETE CASCADE
);

INSERT INTO REMINDERS (ReminderId, DueDate, CreationDate, Text, AnimalId, UserId) 
VALUES
(1,'2021-12-25','2010-12-25',"pick up kibble","53197","1"),
(2,'2021-12-26','2011-12-25',"pick up catfood","53197","1"),
(3,'2021-12-27','2012-12-25',"pick up treats","53197","1");

/*Run query 'select @@GLOBAL.secure_file_priv' to find default location for where to store images for upload into database*/
/*User account must have global privilege FILE in order to upload image data*/

DROP TABLE IF EXISTS IMAGE;
CREATE TABLE IMAGE (
	ImageId VARCHAR(100) NOT NULL,
    ImageData MEDIUMBLOB,
	ImageLocation VARCHAR(300) DEFAULT NULL,
    CreationDate DATETIME NOT NULL,
    UserId VARCHAR(100),
    AnimalId VARCHAR(100) NOT NULL,
    primary key (ImageId),
    foreign key (UserId) references USER(UserId) ON DELETE SET NULL,
    foreign key (AnimalId) references ANIMAL(AnimalId)
);

INSERT INTO IMAGE (ImageId, ImageData, CreationDate, UserId, AnimalId)
VALUES
('1908046', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Charles.jpg'), '2021-11-29 00:01:02', '2', '53197'),
('1908047', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Charles2.jpg'), '2021-11-30 00:01:02', '2', '53197'),
('1908048', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Charles3.jpg'), '2021-11-29 00:09:08', '3', '53197'),
('1908049', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Charles4.jpg'), '2021-12-01 12:01:01', '3', '53197'),
('1908050', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Jack.jpg'), '2021-11-29 00:01:02', '1', '53199'),
('1908051', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Johnny.jpg'), '2021-11-30 00:01:02', '1', '53200'),
('1908052', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Johnny2.jpg'), '2021-12-01 00:01:02', '1', '53200'),
('1908053', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Rex.jpg'), '2021-11-29 00:01:02', '14', '53195'),
('1908054', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Rex2.jpg'), '2021-11-30 00:01:02', '14', '53195'),
('1908055', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Spot.jpg'), '2021-10-09 00:01:02', '1', '53196'),
('1908056', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Spot2.jpg'), '2021-10-19 00:01:02', '2', '53196'),
('1908057', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Spot3.jpg'), '2021-10-29 00:01:02', '3', '53196'),
('1908058', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Tom.jpg'), '2021-11-29 00:01:02', '2', '53198');
