-- ============================================================
-- Criação do banco de dados e tabela CLIENTES para ensino
-- Database: db_prog3_eng_2026_1
-- Tabela: clientes
-- ============================================================

-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS `db_prog3_eng_2026_1` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `db_prog3_eng_2026_1`;

-- ============================================================
-- Tabela: clientes
-- ============================================================
DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `telefone` VARCHAR(20),
  `endereco` VARCHAR(255),
  `cidade` VARCHAR(100),
  `estado` VARCHAR(2),
  `cep` VARCHAR(10),
  `cpf` VARCHAR(14) UNIQUE,
  `cnpj` VARCHAR(18) UNIQUE,
  `tipo` ENUM('fisica', 'juridica') DEFAULT 'fisica',
  `ativo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_cpf` (`cpf`),
  INDEX `idx_cnpj` (`cnpj`),
  INDEX `idx_ativo` (`ativo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Dados de exemplo para testes
-- ============================================================
INSERT INTO `clientes` (
  `nome`, `email`, `telefone`, `endereco`, `cidade`, `estado`, `cep`, 
  `cpf`, `cnpj`, `tipo`, `ativo`
) VALUES 
(
  'João Silva',
  'joao.silva@email.com',
  '(11) 99999-1234',
  'Rua das Flores, 123',
  'São Paulo',
  'SP',
  '01310-100',
  '123.456.789-00',
  NULL,
  'fisica',
  TRUE
),
(
  'Maria Santos',
  'maria.santos@email.com',
  '(21) 98888-5678',
  'Av. Paulista, 456',
  'Rio de Janeiro',
  'RJ',
  '20040-020',
  '987.654.321-00',
  NULL,
  'fisica',
  TRUE
),
(
  'Empresa XYZ LTDA',
  'contato@empresaxyz.com',
  '(31) 97777-9999',
  'Rua Comercial, 789',
  'Belo Horizonte',
  'MG',
  '30140-071',
  NULL,
  '12.345.678/0001-90',
  'juridica',
  TRUE
);

-- ============================================================
-- Verificação final
-- ============================================================
SELECT COUNT(*) as total_clientes FROM clientes;
