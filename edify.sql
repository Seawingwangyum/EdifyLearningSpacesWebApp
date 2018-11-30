-- MySQL dump 10.13  Distrib 8.0.13, for Linux (x86_64)
--
-- Host: localhost    Database: edify
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `license`
--

DROP TABLE IF EXISTS `license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `license` (
  `license_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `file` varchar(100) DEFAULT NULL,
  `user_notes` varchar(200) DEFAULT NULL,
  `admin_notes` varchar(200) DEFAULT NULL,
  `frn_user_id` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`license_id`),
  UNIQUE KEY `file_UNIQUE` (`file`),
  KEY `frn_user_id_idx` (`frn_user_id`),
  CONSTRAINT `frn_user_id` FOREIGN KEY (`frn_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license`
--



--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `education` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (22,'admin','admin','admin','admin','vancouver','admin','adss')(24,'captain','falcon','$2b$10$MzdL2JGAUWcaosgHDqRp9eqKIBBTRgU/y3yVvGQwbfNFTWHWj1nOy','f@zero.ca','vancouver','user','racer'),(25,'super','super','super','super','north vancouver','owner','smart'),(26,'Free','jeff','$2b$10$m8RiXYL2kQ8KVeJUOffCLO1YQNXEzeJEbGetItYemohh358VCo7..','free@jeff.com','adsdsa','user','dadsdsa'),(27,'falcon','falcon','$2b$10$lZCJ4nlP.qn4PgIAJDFZvuLVsbKV04GG9DEgu9RVlfqmuQQb7fGAG','blue@falcon.ca','yeet','user','A123456789'),(28,'yee','yee','$2b$10$.Qw0SgScesG7Esw9/AoEueXppNZPgIsqLudCqsZFsRNRFqsqokbS2','yee@yee.com','yee','user','yee'),(29,'Garry','Larry','$2b$10$0Z7.Jap/EmtiKa.HJ48FG.xHIOXb62w4GDTv6C0/pbN9Et1rtihXG','garry@larry.com','Vancouver','user','Background');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-30 22:44:50
