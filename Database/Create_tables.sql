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
('4','Instructor_1','pt@123','Instructor', '2021-11-29', 'Mohammad', 'Moshirpour', 'mohammad@gmail.ca'),
('5','Technician','pa','Health Technician', '2021-11-29', 'Emily', 'Marasco', 'emily@gmail.ca'),
('6','Admin_1','pe','Admin', '2021-11-29', 'Greg', 'Theclient', 'admin1@gmail.ca'),
('7','btables','12345','Student', '2021-11-29', 'Bobby', 'Droptables', 'bobby.droptables@gmail.ca');

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
  -- FOREIGN KEY (`AdminsteredBy`) REFERENCES `TECHNICIAN` (`UserId`)
  );

INSERT INTO `TREATMENT` (TreatmentId, AnimalId, `Date`, AdministeredBy, `Description`)
VALUES
('111', '53195', '2021-11-29', '1', 'bad leg, made better'),
('112', '53196', '2021-11-30', '2', 'bad arm, made better'),
('113', '53197', '2021-10-29', '3', 'bad breath, made better');

DROP TABLE IF EXISTS `WEIGHT`;
CREATE TABLE `WEIGHT` (
  `AnimalId` VARCHAR(100) NOT NULL,
  `Date` DATE NOT NULL,
  `Weight` FLOAT DEFAULT NULL,
  PRIMARY KEY (`AnimalId`, `Date`),
  FOREIGN KEY (`AnimalId`) REFERENCES `ANIMAL` (`AnimalId`)
  );
  
INSERT INTO `WEIGHT` (AnimalId, `Date`, Weight)
VALUES
('53195', '2021-11-29', '155'),
('53196', '2021-11-30', '25'),
('53197', '2021-10-29', '300');

-- CREATE TABLE `animal` (
--   `AnimalId` varchar(45) NOT NULL,
--   `type` varchar(45) DEFAULT NULL,
--   `weight` double DEFAULT NULL,
--   `breed` varchar(45) DEFAULT NULL,
--   `color` varchar(45) DEFAULT NULL,
--   PRIMARY KEY (`AnimalId`),
--   UNIQUE KEY `AnimalId_UNIQUE` (`AnimalId`)
-- );

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
    `CommentDate`			DATE not null,
    `CommentText`			mediumtext not null,
	primary key (CommentId),
	foreign key (UserId) references USER(UserId) ON DELETE SET NULL,
	foreign key (AnimalId) references Animal(AnimalId)
);

INSERT INTO `COMMENTS` (CommentId, `UserId`, AnimalId, CommentDate, CommentText)
VALUES
(1, 2, '53195', '2015-11-29', 'this is test comment 1'),
(2, 3, '53196', '2015-11-29', 'this is test comment 2'),
(3, 4, '53197', '2015-11-29', 'bad comment 3'),
(4, 5, '53197', '2015-11-29', 'good comment 4');

DROP TABLE IF EXISTS `ANIMAL_STATUS`;
CREATE TABLE `ANIMAL_STATUS` (
	`AnimalId`			VARCHAR(100) not null,
	`AnimalStatus`		VARCHAR(100) not null,
    `StatusDate`			DATETIME not null,
	primary key (AnimalId),
	foreign key (AnimalId) references Animal(AnimalId)
);

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
-- SELECT * FROM `Weight`;

CREATE TABLE `vetapp`.`assigned_animals` (
  `UserId` VARCHAR(100) NOT NULL,
  `AnimalId` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`UserId`, `AnimalId`),
  FOREIGN KEY (`UserId`) REFERENCES `vetapp`.`user` (`UserId`),
  FOREIGN KEY (`AnimalId`) REFERENCES `vetapp`.`animal` (`AnimalId`)
 );
 INSERT INTO `assigned_animals` (`UserId`, animalId)
VALUES
(5, '53195'),
(5, '53196');
-- SELECT * FROM `Weight`;
