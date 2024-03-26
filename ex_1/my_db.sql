-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: my_db
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `idCity` int NOT NULL,
  `cityName` varchar(45) NOT NULL,
  PRIMARY KEY (`idCity`),
  UNIQUE KEY `idcity_UNIQUE` (`idCity`),
  UNIQUE KEY `citycol_UNIQUE` (`cityName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Jerusalem'),(2,'Tel-Aviv');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `idClient` varchar(9) NOT NULL,
  `clientFirstName` varchar(45) NOT NULL,
  `clientLastName` varchar(45) NOT NULL,
  `dateBirth` date NOT NULL,
  `idCity` int NOT NULL,
  `address` varchar(45) NOT NULL,
  `telephone` varchar(10) NOT NULL,
  `mobilePhone` varchar(10) NOT NULL,
  PRIMARY KEY (`idClient`),
  KEY `idCity` (`idCity`),
  CONSTRAINT `client_ibfk_1` FOREIGN KEY (`idCity`) REFERENCES `city` (`idCity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('027876101','Sarit','Omesi','1971-09-19',1,'Hadaf Hayomi 617/1','025870436','0508801429'),('056136199','Michal','Menachem','2024-02-27',1,'Bait vagan 44','025869660','0508577877'),('059896101','Shmuel','Ben','1989-06-08',2,'Menachem 11','035874564','0506136188'),('115599882','Naama','Soto','2016-03-28',2,'Begin 33','036698547','0504122145'),('123456789','Israel','Israeli','2000-01-12',2,'Hzait 3','025870111','0503456789'),('147258369','Shoshi','Katz','2004-01-03',2,'Kablan 7','025874444','0556778741'),('213669500','Efrat','Shwartzman','2003-03-30',1,'Morgentawo','0583293172','0583293171'),('214255788','Batchen','Omesi','2003-05-14',1,'Hadaf Hayomi 619/1','025870436','0504144053'),('234423442','Sara','Cohen','2024-03-12',2,'Menucha 44','025487125','0581236544'),('334743382','Tzivya','Omesi','2010-06-20',1,'Hadaf Hayomi 617/1','025870436','0534187448'),('456123789','Moshe','Kahan','1970-01-17',2,'Mizrachi 2','0508801429','0504107526'),('777777777','Leah','Levi','2024-03-04',1,'Ramat Shlomo','025870456','0583214325'),('987654321','Mira','Dan','2014-02-15',1,'Ranbam 6','027778888','0549876543'),('987987987','Noa','Cohen','2007-02-01',1,'Ramot A','0554564566','0554567899'),('999999999','Yael','Levi','2000-02-04',1,'Hadaf Hayomi 617/1','029972883','0504144053');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `covid19`
--

DROP TABLE IF EXISTS `covid19`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `covid19` (
  `idCovid19` int NOT NULL AUTO_INCREMENT,
  `idClient` varchar(9) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  PRIMARY KEY (`idCovid19`),
  KEY `idClient` (`idClient`),
  CONSTRAINT `covid19_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `covid19`
--

LOCK TABLES `covid19` WRITE;
/*!40000 ALTER TABLE `covid19` DISABLE KEYS */;
INSERT INTO `covid19` VALUES (1,'214255788','2021-01-01','2021-01-14'),(2,'123456789','2020-09-08','2020-09-20'),(11,'027876101','2024-03-06','2024-03-07'),(14,'777777777','2024-03-23','2024-03-23'),(23,'334743382','2021-09-01','2021-09-10'),(24,'987987987','2021-02-04','2021-02-11'),(25,'056136199','2024-03-22','2024-03-25'),(27,'147258369','2020-01-04','2020-01-11');
/*!40000 ALTER TABLE `covid19` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccinemanufacturer`
--

DROP TABLE IF EXISTS `vaccinemanufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccinemanufacturer` (
  `idVaccineManufacturer` int NOT NULL,
  `vaccineManufacturerName` varchar(45) NOT NULL,
  PRIMARY KEY (`idVaccineManufacturer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccinemanufacturer`
--

LOCK TABLES `vaccinemanufacturer` WRITE;
/*!40000 ALTER TABLE `vaccinemanufacturer` DISABLE KEYS */;
INSERT INTO `vaccinemanufacturer` VALUES (1,'Pfizer'),(2,'Moderna');
/*!40000 ALTER TABLE `vaccinemanufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccines`
--

DROP TABLE IF EXISTS `vaccines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccines` (
  `idVaccines` int NOT NULL AUTO_INCREMENT,
  `idClient` varchar(9) NOT NULL,
  `vaccineDate` date NOT NULL,
  `idVaccineManufacturer` int NOT NULL,
  PRIMARY KEY (`idVaccines`),
  KEY `idClient` (`idClient`),
  KEY `idVaccineManufacturer` (`idVaccineManufacturer`),
  CONSTRAINT `vaccines_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`),
  CONSTRAINT `vaccines_ibfk_2` FOREIGN KEY (`idVaccineManufacturer`) REFERENCES `vaccinemanufacturer` (`idVaccineManufacturer`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccines`
--

LOCK TABLES `vaccines` WRITE;
/*!40000 ALTER TABLE `vaccines` DISABLE KEYS */;
INSERT INTO `vaccines` VALUES (2,'214255788','2020-04-21',2),(3,'123456789','2020-01-06',2),(4,'214255788','2020-10-01',2),(10,'999999999','2019-12-12',1),(11,'999999999','2019-12-12',1),(25,'027876101','2023-07-21',1),(26,'027876101','2024-03-06',2),(27,'234423442','2024-03-20',1),(34,'777777777','2024-03-23',1),(37,'214255788','2024-03-24',1),(43,'987987987','2022-03-02',2),(44,'059896101','2024-03-02',2),(45,'056136199','2024-03-01',2),(46,'147258369','2024-03-07',1),(47,'987654321','2024-03-20',2),(48,'213669500','2021-06-17',1),(49,'213669500','2021-07-03',1),(50,'115599882','2024-03-02',1),(52,'115599882','2024-02-29',1);
/*!40000 ALTER TABLE `vaccines` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-26 13:55:55
