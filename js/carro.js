async function enviaFormulario() {
    //recuperar as informações do formulario e colocar em objeto JSON
    const carroDTO = {
        "marca": document.querySelectorAll("input")[0].value,
        "modelo": document.querySelectorAll("input")[1].value,
        "ano": Number(document.querySelectorAll("input")[2].value),
        "cor": document.querySelectorAll("input")[3].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/carro", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Carro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaCarros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/carros");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao conectar com o servidor');
        }

        const listaDeCarros = await respostaServidor.json();
        console.log(listaDeCarros)
        criarTabelaCarros(listaDeCarros)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaCarros(carros) {
    const tabela = document.getElementById('tabela')

    carros.forEach(carro => {
        // criando nova linha
        const linha = document.createElement('tr');

        //cria/preenche cada cédula 
        const id = document.createElement('td');
        id.textContent = carro.idCarro; // id do carro

        const marca = document.createElement('td');
        marca.textContent = carro.marca; // marca do carro

        const modelo = document.createElement('td');
        modelo.textContent = carro.modelo; //modelo do carro

        const ano = document.createElement('td');
        ano.textContent = carro.ano // ano do carro

        const cor = document.createElement('td');
        cor.textContent = carro.cor // cor do carro

        const acoes = document.createElement('td'); // elemento img

        const atualizarIcon = document.createElement('img');
        atualizarIcon.src = 'assets/icons/pencil-square.svg';

        const excluirIcon = document.createElement('img');
        excluirIcon.src = 'assets/icons/trash-fill.svg';

        linha.appendChild(id);
        linha.appendChild(marca);
        linha.appendChild(modelo);
        linha.appendChild(ano);
        linha.appendChild(cor);
        acoes.appendChild(atualizarIcon);
        linha.appendChild(acoes);
        acoes.appendChild(excluirIcon);

        //adiciona a linha prenchida
        tabela.appendChild(linha);
    });
}
