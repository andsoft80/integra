-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: integra
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `destinations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `host` varchar(200) NOT NULL,
  `typeDB` varchar(45) NOT NULL,
  `dbName` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (2,'Основное DWH6','localhost','mssql','company_dwh','test','Professional2');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processes`
--

DROP TABLE IF EXISTS `processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `processes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sourceid` int(11) NOT NULL,
  `destinationid` int(11) NOT NULL,
  `periodmin` int(11) NOT NULL,
  `success` tinyint(4) NOT NULL,
  `active` tinyint(4) NOT NULL,
  `lasttime` datetime DEFAULT NULL,
  `error` text,
  `sourcename` varchar(200) NOT NULL,
  `destinationname` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processes`
--

LOCK TABLES `processes` WRITE;
/*!40000 ALTER TABLE `processes` DISABLE KEYS */;
INSERT INTO `processes` VALUES (11,6,2,10,0,1,'1900-01-01 00:00:00','','Andrey Saulin','Основное DWH');
/*!40000 ALTER TABLE `processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources`
--

DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `getUrl` text NOT NULL,
  `authUrl` text,
  `login` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `dataproperty` varchar(200) DEFAULT NULL,
  `authType` varchar(45) NOT NULL,
  `parcel` text,
  `authParcel` text,
  `isJSON` tinyint(4) DEFAULT NULL,
  `authHeaders` text,
  `headers` text,
  `csrfHeaderName` varchar(200) DEFAULT NULL,
  `pkName` varchar(45) NOT NULL,
  `tableName` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources`
--

LOCK TABLES `sources` WRITE;
/*!40000 ALTER TABLE `sources` DISABLE KEYS */;
INSERT INTO `sources` VALUES (1,'Creatio-Возможности','https://072988-crm-bundle.terrasoft.ru/0/dataservice/json/reply/SelectQuery','https://072988-crm-bundle.terrasoft.ru/ServiceModel/AuthService.svc/Login',NULL,NULL,'rows','authCookies','{\n        \"RootSchemaName\": \"Opportunity\",\n        \"OperationType\": 0,\n        \"AllColumns\": true\n}','{\n        \"UserName\": \"Саулин Андрей\",\n        \"UserPassword\": \"Professional1\"\n    }',1,'{\n         \"Content-Type\": \"application/json\"\n    }','','BPMCSRF','',''),(6,'Andrey Saulin','https://reqres.in/api/users?page=1','','','','data','none','','',NULL,'','','','id','testTable');
/*!40000 ALTER TABLE `sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `extid` varchar(200) DEFAULT NULL,
  `clientid` varchar(45) NOT NULL,
  `approvepn` varchar(100) DEFAULT NULL,
  `personnelnumber` varchar(100) NOT NULL,
  `position` varchar(200) DEFAULT NULL,
  `department` varchar(200) NOT NULL DEFAULT 'Не указано',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'andsoft80@gmail.com','$2a$10$kRpUsrhJbp3dk7XXfA.neuuHmJVlhoGlfoX8ntylrQH7fT5nX8Y7O','Andrey Saulin',NULL,'main','U2','U1','Генеральный директор','ИТ'),(2,'boss@company.ru','$2a$10$kRpUsrhJbp3dk7XXfA.neuuHmJVlhoGlfoX8ntylrQH7fT5nX8Y7O','Ivan Ivanov',NULL,'main',NULL,'U2','Учредитель','Администрация');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-08 19:22:02
