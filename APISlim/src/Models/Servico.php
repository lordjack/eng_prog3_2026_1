<?php

namespace App\Models;

/**
 * Modelo da tabela Servico
 * 
 * Esta classe representa um serviço no sistema.
 * Demonstra boas práticas de POO para os alunos.
 * 
 * Aula: Programação Orientada a Objetos
 */
class Servico
{
    private $db;

    private $id;
    private $titulo;
    private $descricao;
    private $preco;
    private $categoria;
    private $id_prestador;
    private $data_criacao;

    /**
     * Construtor
     */
    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Setters
     */
    public function setId($id)
    {
        $this->id = $id;
    }
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;
    }
    public function setDescricao($descricao)
    {
        $this->descricao = $descricao;
    }
    public function setPreco($preco)
    {
        $this->preco = $preco;
    }
    public function setCategoria($categoria)
    {
        $this->categoria = $categoria;
    }
    public function setIdPrestador($id_prestador)
    {
        $this->id_prestador = $id_prestador;
    }

    /**
     * Getters
     */
    public function getId()
    {
        return $this->id;
    }
    public function getTitulo()
    {
        return $this->titulo;
    }
    public function getDescricao()
    {
        return $this->descricao;
    }
    public function getPreco()
    {
        return $this->preco;
    }
    public function getCategoria()
    {
        return $this->categoria;
    }
    public function getIdPrestador()
    {
        return $this->id_prestador;
    }
    public function getDataCriacao()
    {
        return $this->data_criacao;
    }

    /**
     * Obtém todos os serviços
     * 
     * @return array
     */
    public function getAll()
    {
        $sql = "SELECT * FROM servicos ORDER BY data_criacao DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Obtém um serviço por ID
     * 
     * @param int $id
     * @return array|null
     */
    public function getById($id)
    {
        $sql = "SELECT * FROM servicos WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Obtém serviços de um prestador
     * 
     * @param int $id_prestador
     * @return array
     */
    public function getByPrestador($id_prestador)
    {
        $sql = "SELECT * FROM servicos WHERE id_prestador = :id_prestador ORDER BY data_criacao DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id_prestador', $id_prestador, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Cria um novo serviço
     * 
     * @return bool
     */
    public function create()
    {
        $sql = "INSERT INTO servicos (titulo, descricao, preco, categoria, id_prestador) 
                VALUES (:titulo, :descricao, :preco, :categoria, :id_prestador)";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':preco', $this->preco);
        $stmt->bindParam(':categoria', $this->categoria);
        $stmt->bindParam(':id_prestador', $this->id_prestador, \PDO::PARAM_INT);

        return $stmt->execute();
    }

    /**
     * Atualiza um serviço
     * 
     * @return bool
     */
    public function update()
    {
        $sql = "UPDATE servicos SET 
                titulo = :titulo,
                descricao = :descricao,
                preco = :preco,
                categoria = :categoria
                WHERE id = :id";

        $stmt = $this->db->prepare($sql);

        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':preco', $this->preco);
        $stmt->bindParam(':categoria', $this->categoria);
        $stmt->bindParam(':id', $this->id, \PDO::PARAM_INT);

        return $stmt->execute();
    }

    /**
     * Deleta um serviço
     * 
     * @param int $id
     * @return bool
     */
    public function delete($id)
    {
        $sql = "DELETE FROM servicos WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        return $stmt->execute();
    }

    /**
     * Valida os dados do serviço
     * 
     * @return array|null Retorna array com erros ou null se válido
     */
    public function validate()
    {
        $errors = [];

        if (empty($this->titulo) || strlen($this->titulo) < 3) {
            $errors['titulo'] = 'O título deve ter no mínimo 3 caracteres';
        }

        if (empty($this->descricao) || strlen($this->descricao) < 10) {
            $errors['descricao'] = 'A descrição deve ter no mínimo 10 caracteres';
        }

        if (empty($this->preco) || !is_numeric($this->preco) || $this->preco <= 0) {
            $errors['preco'] = 'O preço deve ser um número positivo';
        }

        if (empty($this->categoria)) {
            $errors['categoria'] = 'A categoria é obrigatória';
        }

        if (empty($this->id_prestador)) {
            $errors['id_prestador'] = 'O prestador é obrigatório';
        }

        return !empty($errors) ? $errors : null;
    }
}
