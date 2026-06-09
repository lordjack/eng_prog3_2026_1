<?php

$dados = $_REQUEST;

$titulo = $dados['titulo'] ?? '';
$descricao = $dados['descricao'] ?? '';
$preco = $dados['preco'] ?? '';
$categoria = $dados['categoria'] ?? '';


echo "Titulo: $titulo, Preço: $preco";

?>
