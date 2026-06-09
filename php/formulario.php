<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulário PHP Exemplo</title>
  </head>
  <body>
    <header>

    </header>
    <main>
      <h1>Formulário PHP Exemplo</h1>
        <form action="processar.php" method="post">
            <label for="">Titulo</label>
            <input type="text" name="titulo" id="">
            <br>
            <label for="">Descrição</label>
            <input type="text" name="descricao" id="">
            <br>
            <label for="">Preço</label>
            <input type="text" name="preco" id="">
            <br>
            <label for="">Categoria</label>
            <input type="text" name="categoria" id="">
            <br>
            <button type="submit">Salvar</button>
        </form>
    
    </main>
    <footer>

    </footer>
  </body>
</html>
