import { Conta } from "./conta.js";
import { Pessoa } from "./pessoa.js";

let pessoa1 = new Pessoa("Jackson Five", 38);
let pessoa2 = new Pessoa("Chaves", 8);

let conta1 = new Conta(pessoa1);
let conta2 = new Conta(pessoa2);

conta1.depositar(500);
conta2.depositar(300);

try {
  conta1.transferir(conta2, 200);

  conta1.exibirSaldo();
  conta1.exibirHistorico();
  conta2.exibirSaldo();
  conta2.exibirHistorico();
} catch (error) {
  console.log("Error: " + error);
}
