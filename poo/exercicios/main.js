import { ContaCorrente } from './ContaCorrente.js'
import { ContaPoupanca } from './ContaPoupanca.js'
import { Pessoa } from './pessoa.js'

let pessoa1 = new Pessoa('Jackson Five', 38)
let pessoa2 = new Pessoa('Chaves', 8)

//Conta Corrente com limte de R$1000
let cc1 = new ContaCorrente(pessoa1, 1000)
//Conta Poupança com Rendimento de 0,8% ao mês
let cp2 = new ContaPoupanca(pessoa2, 0.008)

console.log('=== Dados dos Titulares ===')
pessoa1.exibirDados()
pessoa2.exibirDados()

console.log('=== Operações ===')
cc1.depositar(5000)
cc1.depositar(1500)
cp2.depositar(2000)

//saque normal
try {
  cc1.sacar(800)
} catch (error) {
  console.log('Error: ' + error)
}

try {
  //saque usando limite (cheque especial)
  cc1.sacar(6500)
} catch (e) {
  console.log('Erro esperado: ' + e)
}

try {
  //saque além do limite esperado - erro esperado
  cc1.sacar(9999)
} catch (e) {
  console.log('Erro esperado: ' + e)
}

//Rendimento na poupança
cp2.renderJuros()

try {
  //trasnferencia entre contas
  cc1.depositar(3000)
  cc1.transferir(cp2, 500)
} catch (e) {
  console.log('Erro esperado: ' + e)
}
//redimento aciional após receber transferencia
cp2.renderJuros()

console.log('=== Saldos Finais ===')
cc1.exibirSaldo()
cp2.exibirSaldo()

console.log('=== Extrato Completo ===')
cc1.exibirHistorico()
console.log('------------------')
cp2.exibirHistorico()

const pessoa3 = new Pessoa('Kiko', 14)
const cc2 = new ContaCorrente(pessoa3, 500)

cc2.depositar(1200)

const contas = [cc1, cp2, cc2]

console.log('=== Polimorfismo exibirSaldo() em cada conta ===')
for (let conta of contas) {
  conta.exibirSaldo() //cada objeto executa sua propria versão do metodo
}
