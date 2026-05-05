import { Conta } from './conta.js'

export class ContaPoupanca extends Conta {
  #taxaRendimento // percentual, ex: 0.005 = 0,5% mês

  constructor(titular, taxaRendimento = 0.005) {
    super(titular)
    if (taxaRendimento < 0) {
      throw new Error('Limite não pode ser negativo')
    }
    this.#taxaRendimento = taxaRendimento
  }

  get taxaRendimento() {
    return this.#taxaRendimento
  }

  //Método excluivo da poupança
  renderJuros() {
    const juros = this.saldo * this.#taxaRendimento

    this._alterarSaldo(juros)
    this._addHistorico(this.#taxaRendimento * 100 + '% Juros +R$ ' + juros)
  }

  exibirSaldo() {
    console.log(
      this.pessoa.nome +
        ' [CP] - Saldo: R$' +
        this.saldo +
        ' | Taxa: R$' +
        this.#taxaRendimento * 100 +
        '% a.m',
    )
  }
}
