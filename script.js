async function atualizarEConverter() {
    const produtosUSD = document.querySelectorAll(".preco-usd");
    const produtosBRL = document.querySelectorAll(".valor-real");

    try {
        // Buscar cotação
        const resposta = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL");
        const dados = await resposta.json();
        const taxaCambio = parseFloat(dados.USDBRL.bid);

        // Converter cada preço
        produtosUSD.forEach((el, index) => {
            const texto = el.textContent.replace("US$", "").trim();
            const valorUSD = parseFloat(texto);

            if (!isNaN(valorUSD)) {
                const valorConvertido = valorUSD * taxaCambio;

                produtosBRL[index].innerText = valorConvertido.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });
            }
        });

    } catch (erro) {
        console.error("Erro ao atualizar cotação e converter:", erro);
        if (spanCotacao) spanCotacao.innerText = "Erro ao obter cotação";
    }
}

// Executa ao abrir
window.addEventListener("DOMContentLoaded", atualizarEConverter);

// Atualiza a cada 20 segundos
setInterval(atualizarEConverter, 20000);