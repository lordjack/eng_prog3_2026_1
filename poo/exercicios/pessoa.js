export class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  checarDeMaior(idade) {
    if (idade >= 18) {
      return true;
    } else {
      return false;
    }
  }
  exibirDados(){
    console.log(
      "Nome: "+this.nome +" | Idade: "+this.idade
    )
  }
}
