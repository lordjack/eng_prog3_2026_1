class Conversor {
  static celsiusParaFahrenheit(c) {
    return (c * 9/5) + 32;
  }
  static barParaPsi(bar) {
    return bar * 14.504;
  }
}

// Usamos diretamente na classe, sem "new"
console.log(Conversor.celsiusParaFahrenheit(100)); // 212
console.log(Conversor.barParaPsi(5));              // 72.52