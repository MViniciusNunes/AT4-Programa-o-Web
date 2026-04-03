const precoGasolina = 6.79;
const precoEtanol = 5.40;
const precoDiesel = 6.20;


const tabelaDePrecos = {
    'gasolina': precoGasolina,
    'etanol': precoEtanol,
    'diesel': precoDiesel
};

const atualizarValor = () => {
    let tipo = document.getElementById("combustivel").value;
    let litrosValue = document.getElementById("litros").value;
    let litros = parseFloat(litrosValue);

    if (tabelaDePrecos[tipo] === undefined) {
        console.log("Escolha uma opção válida");
        return; 
    }

    let precoPorLitro = tabelaDePrecos[tipo];
    calcularAbastecimento(precoPorLitro, litros);
};

const calcularAbastecimento = (precoCombustivel, litros) => {
    if (litros <= 0 || isNaN(litros)){
        alert("Por favor, digite um número válido e maior que zero."); // Adicionado o alert aqui!
        document.getElementById("resultado").textContent = "Insira um valor válido";
        return; 
    } 
    
    let valorTotal = precoCombustivel * litros;
    document.getElementById("resultado").textContent = formatarMoeda(valorTotal);
};

const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

let tipoCombustivel = document.getElementById("combustivel");
tipoCombustivel.addEventListener("change", atualizarValor);

let inputLitros = document.getElementById("litros");
inputLitros.addEventListener("input", atualizarValor);

inputLitros.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        
        let tipoAtual = document.getElementById("combustivel").value;
        
        if (inputLitros.value.trim() === "") {
            alert("Por favor, insira a quantidade de litros.");
            return; 
        }
        
        if (tabelaDePrecos[tipoAtual] === undefined) {
            alert("Por favor, selecione um tipo de combustível válido.");
            return;
        }
        
        atualizarValor();
    }
});