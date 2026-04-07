console.log("Olá Mundo JavaScript!");

let nome = "Jackson Five";
let idade = 38;

console.log("Nome: "+ nome +" - Idade: "+ idade);

if(idade>=18){
  console.log("É de maior")
}else{
  console.log("É de menor")
}

var notas = [5,7,8,9,4];

//crie uma função anonima para listar as notas
let listarNotas = function(vetor){
  for(let i=0; i< vetor.length ; i++){
    console.log(vetor[i])
  }
}
listarNotas(notas);
  
console.log("---------------")
//crie uma arrow function para imprimir as notas maiores que 6
let listarNotasMaior6 = (vetor) => {
  for(let i in vetor){
    if(vetor[i]>=6){
      console.log(vetor[i])
    }
  }
}
listarNotasMaior6(notas);

let pessoa = { nome:"Jackson Five", idade: 38 };

console.log("Nome: " + pessoa.nome);
console.log("Idade: " + pessoa.idade)
//crie um vetor de pessoas com os atributos nome e idade, em seguida crie uma arrow function que recebe como parametro o vetor, e liste as pessoas que são maiores que 18 anos.
let pessoas = [
  { nome:"Jackson Five", idade: 38 },
  { nome:"Chaves", idade:14 },
  { nome:"Chiquinha", idade: 16 }
];

let maior = (vetor) =>{
  //console.log(vetor[0].nome);
   for(let i in vetor){
    if(vetor[i].idade <= 18){
      console.log(vetor[i].nome)
    }
  }
}
maior(pessoas)







