-- ============================================================================
-- 📊 SCRIPT SQL - Tabela de Clientes para APIModelo
-- ============================================================================
-- Execute este script em seu banco de dados db_pweb1_202x_x
-- Cria a tabela clientes com os campos: id, nome, cpf, telefone

-- Deletar tabela se existir (cuidado!)
-- DROP TABLE IF EXISTS clientes;

-- Criar tabela clientes
CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 📝 DADOS DE EXEMPLO
-- ============================================================================

-- Limpar dados existentes (opcional)
-- TRUNCATE TABLE clientes;

-- Inserir alguns clientes de exemplo
INSERT INTO clientes (nome, cpf, telefone) VALUES 
('João Silva', '12345678901', '(11) 99999-9999'),
('Maria Santos', '98765432100', '(21) 98888-8888'),
('Pedro Oliveira', '55544433322', '(85) 97777-7777');

-- ============================================================================
-- 🔍 CONSULTAS ÚTEIS
-- ============================================================================

-- Listar todos os clientes
SELECT * FROM clientes;

-- Contar quantidade de clientes
SELECT COUNT(*) as total FROM clientes;

-- Buscar cliente por CPF
SELECT * FROM clientes WHERE cpf = '12345678901';

-- Buscar cliente por nome
SELECT * FROM clientes WHERE nome LIKE '%João%';

-- Atualizar telefone de um cliente
-- UPDATE clientes SET telefone = '(11) 98888-8888' WHERE id = 1;

-- Deletar um cliente
-- DELETE FROM clientes WHERE id = 1;
