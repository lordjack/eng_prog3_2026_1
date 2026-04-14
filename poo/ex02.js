class Atuador {
  constructor(nome, tipo, potenciaMaxima) {
    this.nome = nome;
    this.tipo = tipo;
    this.potenciaMaxima = potenciaMaxima;
    this.ligado = false;
    this.potenciaAtual = 0;
  }

  ligar(potencia) {
    if (potencia > this.potenciaMaxima) {
      console.log("⚠️ Potência acima do limite!");
      return;
    }
    this.ligado = true;
    this.potenciaAtual = potencia;
    console.log(`✅ ${this.nome} ligado a ${potencia}W`);
  }

  desligar() {
    this.ligado = false;
    this.potenciaAtual = 0;
    console.log(`🔴 ${this.nome} desligado`);
  }

  status() {
    const estado = this.ligado ? "Ligado" : "Desligado";
    console.log(`[${this.tipo}] ${this.nome} — ${estado} (${this.potenciaAtual}W)`);
  }
}

// Criando diferentes atuadores
const motor1 = new Atuador("Motor Esteira", "Motor", 5000);
const valvula1 = new Atuador("Válvula Principal", "Válvula", 200);

motor1.ligar(3000);   // ✅ Motor Esteira ligado a 3000W
motor1.ligar(9000);   // ⚠️ Potência acima do limite!
valvula1.ligar(150);  // ✅ Válvula Principal ligada a 150W
motor1.status();      // [Motor] Motor Esteira — Ligado (3000W)