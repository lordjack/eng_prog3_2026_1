import { Conta } from './conta.js'

export class ContaCorrente extends Conta {
  #limite

  constructor(titular, limite = 0) {
    super(titular)
    if (limite < 0) {
      throw new Error('Limite não pode ser negativo')
    }
    this.#limite = limite
  }

  get limite() {
    return this.#limite
  }

  //override: permite sacar até o (saldo + limite)
  sacar(valor) {
    if (valor <= 0) {
      throw Error('Valor de saque deve ser posivito')
    }
    if (valor > this.saldo + this.#limite) {
      throw Error('Saldo + limite insuficiente para saque de R$' + valor)
    }
    this._alterarSaldo(-valor)
    this._addHistorico('Sacar: -R$ ' + valor)
  }

  exibirSaldo() {
    console.log(
      this.pessoa.nome +
        ' [CC] - Saldo: R$' +
        this.saldo +
        ' | Limite: R$' +
        this.#limite,
    )
  }
}
