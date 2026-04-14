export class Conta {
  constructor(pessoa) {
    this.pessoa = pessoa;
    this.saldo = 0;
    this.historico = [];
  }

  depositar = (valor) => {
    this.saldo += valor;
    this.historico.push("Depositado: +R$ " + valor);
  };

  sacar = function (valor) {
    if (valor > this.saldo) {
      throw "Você não tem saldo suficiente! Saldo atual é: " + this.saldo;
    }
    this.saldo -= valor;
    this.historico.push("Sacar: -R$ " + valor);
  };
  
  exibirSaldo() {
    console.log(this.pessoa.nome + " - Saldo: R$" + this.saldo);
  }

  transferir = (outraConta, valor) => {
    this.sacar(valor);
    outraConta.depositar(valor);
  };
}
