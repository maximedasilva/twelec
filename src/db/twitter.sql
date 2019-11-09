CREATE DATABASE `twitter` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `tweets` (
  `idTweet` int(11) NOT NULL AUTO_INCREMENT,
  `lieu` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  `personne` varchar(45) NOT NULL,
  PRIMARY KEY (`idTweet`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
