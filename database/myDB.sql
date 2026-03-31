CREATE DATABASE  IF NOT EXISTS `db_prog3_web_service` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_prog3_web_service`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_prog3_web_service
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int unsigned NOT NULL AUTO_INCREMENT,
  `nmCliente` varchar(200) NOT NULL,
  `nmEndereco` varchar(200) NOT NULL,
  `nmContato` varchar(200) NOT NULL,
  `nmCPF` varchar(45) DEFAULT NULL,
  `nmCNPJ` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `idCliente_UNIQUE` (`idCliente`),
  UNIQUE KEY `nmCliente_UNIQUE` (`nmCliente`),
  UNIQUE KEY `nmCPF_UNIQUE` (`nmCPF`),
  UNIQUE KEY `nmCNPJ_UNIQUE` (`nmCNPJ`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Marcos','Rua Meu Cristo','40028922','123456789','132212565'),(2,'Jonas','Rua OmegaVille','666666666','123455465','987546565');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestador`
--

DROP TABLE IF EXISTS `prestador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestador` (
  `idPrestador` int unsigned NOT NULL AUTO_INCREMENT,
  `nmPrestador` varchar(200) NOT NULL,
  `nmContato` varchar(200) NOT NULL,
  `nmCPF` varchar(45) DEFAULT NULL,
  `nmCNPJ` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPrestador`),
  UNIQUE KEY `idPrestador_UNIQUE` (`idPrestador`),
  UNIQUE KEY `nmPrestador_UNIQUE` (`nmPrestador`),
  UNIQUE KEY `nmCPF_UNIQUE` (`nmCPF`),
  UNIQUE KEY `nmCNPJ_UNIQUE` (`nmCNPJ`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestador`
--

LOCK TABLES `prestador` WRITE;
/*!40000 ALTER TABLE `prestador` DISABLE KEYS */;
INSERT INTO `prestador` VALUES (1,'José','40028922',NULL,NULL);
INSERT INTO `prestador` VALUES (2,'João','40028923',NULL,NULL);
/*!40000 ALTER TABLE `prestador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `idServico` int NOT NULL AUTO_INCREMENT,
  `dtRequisicao` datetime NOT NULL,
  `dtInicio` datetime NOT NULL,
  `dtFim` datetime NOT NULL,
  `vCustoMaterial` decimal(14,2) DEFAULT NULL,
  `vCustoMaoDeObra` decimal(14,2) DEFAULT NULL,
  `idCliente` int unsigned NOT NULL,
  `idPrestador` int unsigned NOT NULL,
  PRIMARY KEY (`idServico`),
  KEY `fk_Servico_Cliente1_idx` (`idCliente`),
  KEY `fk_Servico_Prestador1_idx` (`idPrestador`),
  CONSTRAINT `fk_Servico_Cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `fk_Servico_Prestador1` FOREIGN KEY (`idPrestador`) REFERENCES `prestador` (`idPrestador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (1,'2003-03-31 00:00:00','2003-03-31 00:00:00','2003-04-01 00:00:00',500.00,500.00,1,1);
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-17  9:03:53
