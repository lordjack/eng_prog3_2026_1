class NomeDaClasse {
  // Constructor: inicializa os atributos do objeto
  constructor(parametro1, parametro2) {
    this.atributo1 = parametro1; // "this" se refere ao objeto atual
    this.atributo2 = parametro2;
  }

  // Método: comportamento do objeto
  meuMetodo() {
    console.log(this.atributo1);
  }
}

// Criando instâncias (objetos)
const obj = new NomeDaClasse("valor1", "valor2");
obj.nome = "Jackson";
obj.raca = "Humana"

obj.meuMetodo();

