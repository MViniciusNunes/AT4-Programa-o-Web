// --- 1. Variáveis Globais e Dicionário ---
const precoGasolina = 6.79;
const precoEtanol = 5.40;
const precoDiesel = 6.20;

// Colocamos a tabela aqui em cima! Agora todo mundo tem acesso a ela.
const tabelaDePrecos = {
    'gasolina': precoGasolina,
    'etanol': precoEtanol,
    'diesel': precoDiesel
};

// --- 2. Funções Principais ---
const atualizarValor = () => {
    let tipo = document.getElementById("combustivel").value;
    let litrosValue = document.getElementById("litros").value;
    let litros = parseFloat(litrosValue);

    // Validação do tipo de combustível
    if (tabelaDePrecos[tipo] === undefined) {
        console.log("Escolha uma opção válida");
        return; 
    }

    let precoPorLitro = tabelaDePrecos[tipo];
    calcularAbastecimento(precoPorLitro, litros);
};

const calcularAbastecimento = (precoCombustivel, litros) => {
    // Validação de segurança: barra zeros, negativos e textos
    if (litros <= 0 || isNaN(litros)){
        alert("Por favor, digite um número válido e maior que zero."); // Adicionado o alert aqui!
        document.getElementById("resultado").textContent = "Insira um valor válido";
        return; 
    } 
    
    let valorTotal = precoCombustivel * litros;
    document.getElementById("resultado").textContent = formatarMoeda(valorTotal);
};

// --- 3. Função de Formatação ---
const formatarMoeda = (valor) => {
    // O jeito moderno e nativo de formatar dinheiro em JS:
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

// --- 4. Eventos (Listeners) ---
let tipoCombustivel = document.getElementById("combustivel");
tipoCombustivel.addEventListener("change", atualizarValor);

let inputLitros = document.getElementById("litros");
inputLitros.addEventListener("input", atualizarValor);

// Evento do Enter corrigido
inputLitros.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        
        let tipoAtual = document.getElementById("combustivel").value;
        
        if (inputLitros.value.trim() === "") {
            alert("Por favor, insira a quantidade de litros.");
            return; 
        }
        
        // Agora usamos a tabela global e buscamos o tipo atual do HTML
        if (tabelaDePrecos[tipoAtual] === undefined) {
            alert("Por favor, selecione um tipo de combustível válido.");
            return;
        }
        
        atualizarValor();
    }
});