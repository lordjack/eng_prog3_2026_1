<?php

declare(strict_types=1);

namespace App\Domain\Cliente;

use JsonSerializable;

/**
 * Entidade Cliente
 * Representa um cliente no sistema
 */
class Cliente implements JsonSerializable
{
    private ?int $id;
    private string $nome;
    private string $email;
    private ?string $telefone;
    private ?string $endereco;
    private ?string $cidade;
    private ?string $estado;
    private ?string $cep;
    private ?string $cpf;
    private ?string $cnpj;
    private string $tipo; // 'fisica' ou 'juridica'
    private bool $ativo;
    private ?string $created_at;
    private ?string $updated_at;

    /**
     * Construtor
     *
     * @param int|null $id
     * @param string $nome
     * @param string $email
     * @param string|null $telefone
     * @param string|null $endereco
     * @param string|null $cidade
     * @param string|null $estado
     * @param string|null $cep
     * @param string|null $cpf
     * @param string|null $cnpj
     * @param string $tipo
     * @param bool $ativo
     * @param string|null $created_at
     * @param string|null $updated_at
     */
    public function __construct(
        ?int $id,
        string $nome,
        string $email,
        ?string $telefone = null,
        ?string $endereco = null,
        ?string $cidade = null,
        ?string $estado = null,
        ?string $cep = null,
        ?string $cpf = null,
        ?string $cnpj = null,
        string $tipo = 'fisica',
        bool $ativo = true,
        ?string $created_at = null,
        ?string $updated_at = null
    ) {
        $this->id = $id;
        $this->nome = $nome;
        $this->email = $email;
        $this->telefone = $telefone;
        $this->endereco = $endereco;
        $this->cidade = $cidade;
        $this->estado = $estado;
        $this->cep = $cep;
        $this->cpf = $cpf;
        $this->cnpj = $cnpj;
        $this->tipo = $tipo;
        $this->ativo = $ativo;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    // ========== Getters ==========

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getTelefone(): ?string
    {
        return $this->telefone;
    }

    public function getEndereco(): ?string
    {
        return $this->endereco;
    }

    public function getCidade(): ?string
    {
        return $this->cidade;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function getCep(): ?string
    {
        return $this->cep;
    }

    public function getCpf(): ?string
    {
        return $this->cpf;
    }

    public function getCnpj(): ?string
    {
        return $this->cnpj;
    }

    public function getTipo(): string
    {
        return $this->tipo;
    }

    public function isAtivo(): bool
    {
        return $this->ativo;
    }

    public function getCreatedAt(): ?string
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): ?string
    {
        return $this->updated_at;
    }

    // ========== Setters ==========

    public function setNome(string $nome): void
    {
        $this->nome = $nome;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setTelefone(?string $telefone): void
    {
        $this->telefone = $telefone;
    }

    public function setEndereco(?string $endereco): void
    {
        $this->endereco = $endereco;
    }

    public function setCidade(?string $cidade): void
    {
        $this->cidade = $cidade;
    }

    public function setEstado(?string $estado): void
    {
        $this->estado = $estado;
    }

    public function setCep(?string $cep): void
    {
        $this->cep = $cep;
    }

    public function setCpf(?string $cpf): void
    {
        $this->cpf = $cpf;
    }

    public function setCnpj(?string $cnpj): void
    {
        $this->cnpj = $cnpj;
    }

    public function setTipo(string $tipo): void
    {
        $this->tipo = $tipo;
    }

    public function setAtivo(bool $ativo): void
    {
        $this->ativo = $ativo;
    }

    // ========== Serialização ==========

    /**
     * Serializa o cliente para array (para JSON)
     */
    #[\ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'endereco' => $this->endereco,
            'cidade' => $this->cidade,
            'estado' => $this->estado,
            'cep' => $this->cep,
            'cpf' => $this->cpf,
            'cnpj' => $this->cnpj,
            'tipo' => $this->tipo,
            'ativo' => $this->ativo,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
