async function calcularFrete() {
  let cep = document.getElementById("cep").value;

  let valorProduto = parseFloat(document.getElementById("valorProduto").value);

  if (cep === "" || isNaN(valorProduto)) {
    alert("Preencha todos os campos");

    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const dados = await resposta.json();

    if (dados.erro) {
      alert("CEP não encontrado");

      return;
    }

    let frete = 0;

    let regiao = "";

    const uf = dados.uf;

    if (["SP", "RJ", "MG", "ES"].includes(uf)) {
      frete = 15;

      regiao = "Sudeste";
    } else if (["RS", "SC", "PR"].includes(uf)) {
      frete = 18;

      regiao = "Sul";
    } else if (["GO", "MT", "MS", "DF"].includes(uf)) {
      frete = 20;

      regiao = "Centro-Oeste";
    } else if (
      ["BA", "PE", "CE", "PB", "RN", "AL", "SE", "PI", "MA"].includes(uf)
    ) {
      frete = 25;

      regiao = "Nordeste";
    } else {
      frete = 30;

      regiao = "Norte";
    }

    let total = valorProduto + frete;

    document.getElementById("resultado").innerHTML =
      `Cidade: ${dados.localidade}
<br>Estado: ${uf}
<br>Região: ${regiao}
<br>Frete: R$ ${frete.toFixed(2)}
<br>Total: R$ ${total.toFixed(2)}`;
  } catch (erro) {
    alert("Erro ao consultar CEP");

    console.log(erro);
  }
}
