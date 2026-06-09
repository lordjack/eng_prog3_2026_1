-- =====================================================
-- Script SQL para criar tabelas necessárias
-- para a API Slim Framework
-- 
-- Execute este script no seu banco de dados
-- =====================================================

-- Tabela de Serviços (já deveria existir)
CREATE TABLE IF NOT EXISTS servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao LONGTEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    id_prestador INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_prestador ON servicos(id_prestador);
CREATE INDEX idx_categoria ON servicos(categoria);
CREATE INDEX idx_data_criacao ON servicos(data_criacao);

-- Dados de exemplo para testes
INSERT IGNORE INTO servicos (id, titulo, descricao, preco, categoria, id_prestador) VALUES
(1, 'Conserto de Notebook', 'Conserto de componentes eletrônicos e limpeza de hardware', 150.00, 'Eletrônicos', 1),
(2, 'Encanamento Residencial', 'Instalação e reparo de encanamento para residências', 200.00, 'Hidráulica', 2),
(3, 'Aula de Programação', 'Aulas particulares de programação em PHP, JavaScript e React Native', 80.00, 'Educação', 3),
(4, 'Pintura de Parede', 'Serviço de pintura de interiores e exteriores', 120.00, 'Pintura', 4),
(5, 'Reparação de Eletrônicos', 'Reparo de tv, microondas, som e outros eletrônicos', 100.00, 'Eletrônicos', 5);

-- Tabela de Prestadores (opcional, para expandir o projeto)
CREATE TABLE IF NOT EXISTS prestadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    categoria VARCHAR(100),
    avaliacao DECIMAL(3, 1) DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO prestadores (id, nome, email, telefone, categoria) VALUES
(1, 'João Técnico', 'joao@email.com', '11999999999', 'Eletrônicos'),
(2, 'Pedro Encanador', 'pedro@email.com', '11988888888', 'Hidráulica'),
(3, 'Maria Programadora', 'maria@email.com', '11977777777', 'Educação'),
(4, 'Carlos Pintor', 'carlos@email.com', '11966666666', 'Pintura'),
(5, 'Ana Eletrônica', 'ana@email.com', '11955555555', 'Eletrônicos');

-- Tabela de Clientes (opcional)
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(500),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
