export class Conta {
  #pessoa;
  #saldo;
  #historico;

  constructor(pessoa) {
    this.#pessoa = pessoa
    this.#saldo = 0
    this.#historico = []
  }

  get pessoa(){
    return this.#pessoa;
  }

  set pessoa(pessoa){
    this.#pessoa = pessoa;
  }

  
  get saldo(){
    return this.#saldo;
  }

  set saldo(saldo){
    this.#saldo = saldo;
  }

  depositar = (valor) => {
    this.#saldo += valor
    this.#historico.push('Depositado: +R$ ' + valor)
  }

  sacar = function (valor) {
    if (valor > this.saldo) {
      throw 'Você não tem saldo suficiente! Saldo atual é: ' + this.saldo
    }
    this.#saldo -= valor
    this.#historico.push('Sacar: -R$ ' + valor)
  }

  exibirSaldo() {
    console.log(this.#pessoa.nome + ' - Saldo: R$' + this.#saldo)
  }

  transferir = (outraConta, valor) => {
    this.sacar(valor)
    outraConta.depositar(valor)

    this.#historico[this.historico.length - 1] =
      'Transferência enviada para ' + outraConta.pessoa.nome + ' :-R$' + valor

    outraConta.#historico[outraConta.historico.length - 1] =
      'Trensferência recebida de ' + this.#pessoa.nome + ': +R$' + valor
  }

  exibirHistorico() {
    console.log('--- Histórico ' + this.#pessoa.nome + ' ---')
    if (this.#historico.length === 0) {
      console.log('nenhuma operação realizada.')
    } else {
      for (let operacao of this.#historico) {
        console.log(' ' + operacao)
      }
    }
    console.log(' Saldo atual: R$' + this.#saldo)
  }
}
