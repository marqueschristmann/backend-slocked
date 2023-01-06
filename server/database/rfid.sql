-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 06-Jan-2023 às 21:23
-- Versão do servidor: 8.0.31
-- versão do PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rfid`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `sala`
--

DROP TABLE IF EXISTS `sala`;
CREATE TABLE IF NOT EXISTS `sala` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `sala`
--

INSERT INTO `sala` (`id`, `uuid`, `name`, `numero`, `status`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '13603b16-76ff-4f9a-9c98-035383488bd6', 'mineirinho2', 'D16', 'ativo', 1, '2023-01-06 20:47:42', '2023-01-06 20:47:42');

-- --------------------------------------------------------

--
-- Estrutura da tabela `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('pvQtEOd1S6BETsDCmVDIBchGTm_Uz2VG', '2023-01-07 21:10:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"cdded5f1-c6b2-419b-853a-5f253387433c\"}', '2023-01-06 21:03:54', '2023-01-06 21:10:07'),
('TMwZkSYhk2JlBGi9kGENm3tjHCo548p7', '2023-01-07 00:55:53', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-06 00:55:53', '2023-01-06 00:55:53');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `matricula` varchar(255) NOT NULL,
  `disciplinaOUcargo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `tags`, `matricula`, `disciplinaOUcargo`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '2b22c47f-f5ed-4cc3-8b0b-a511b1bc22fd', 'fulsss', 'ghgfvkj876', '5646546', 'cordenador', 'admin@gmil.com', '$argon2id$v=19$m=4096,t=3,p=1$3ViIJoKimFeVTb3dljDD2w$/TqFqUmYB5M/wg/6/9IPINeYyBsVHUPp1oY5+v6nA9c', 'admin', '2023-01-05 23:53:39', '2023-01-05 23:53:39'),
(2, '8ee5f868-a550-41f8-bfa4-619071576dbd', 'joao', 'ghgfvskj876', '56s46546', 'matematica', 'admin@gmil.com', '$argon2id$v=19$m=4096,t=3,p=1$pUo0SSimLftwpu7YA7lv7A$aOf42mMk9yoLyBzmwqpPMBGnFCRUy16JrWxjMv2AZF4', 'user', '2023-01-05 23:59:01', '2023-01-05 23:59:01'),
(3, '2b3ea53f-7144-41bc-b758-1846b696382c', 'teste', 'ghgfvskj876', '56s46546', 'matematica', 'admin@gmil.com', '$argon2id$v=19$m=4096,t=3,p=1$p1fF19nBPPiFnYLGXn84Ng$68GDc0s6RSCu1V29Fnfo10rxi/9Zdc+dI3dfYn82VD4', 'admin', '2023-01-06 00:01:39', '2023-01-06 00:01:39'),
(4, '57235caf-18cf-4637-baae-340654c61500', 'teste', 'ghgfvskj876', '56s46546', 'matematica', 'teste@gmil.com', '$argon2id$v=19$m=4096,t=3,p=1$NyFRZWNI6iCaYkojJiwcaw$nCOwt1AqNUU97mdUShlCeJ2O691azCI4p2AC+XiAiTA', 'user', '2023-01-06 00:23:40', '2023-01-06 00:23:40'),
(5, 'cdded5f1-c6b2-419b-853a-5f253387433c', 'comun', 'ghgfvkj876', '5646546', 'cordenador', 'comun@gmil.com', '$argon2id$v=19$m=4096,t=3,p=1$q/v/+4sFSAso4CkRDoJcYA$+/DwGF31Uxo+b91wteNQ5sLLJOPrzgVLK6kk21IaHsE', 'user', '2023-01-06 21:02:45', '2023-01-06 21:02:45');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `sala`
--
ALTER TABLE `sala`
  ADD CONSTRAINT `sala_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
