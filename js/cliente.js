async function enviaFormulario() {
    //recuperar as informações do formulario e colocar em objeto JSON
    const clienteDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "cpf": document.querySelectorAll("input")[1].value,
        "telefone":document.querySelectorAll("input")[2].value,
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/cliente", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Cliente cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaClientes() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/clientes");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao conectar com o servidor');
        }

        const listaDeClientes = await respostaServidor.json();
        console.log(listaDeClientes)
        criarTabelaClientes(listaDeClientes)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaClientes(clientes) {
    const tabela = document.getElementById('tabela');

    clientes.forEach(cliente => {
        // criando nova linha
        const linha = document.createElement('tr');

        //cria/preenche cada cédula 
        const id = document.createElement('td');
        id.textContent = cliente.idCliente; // id do cliente

        const nome = document.createElement('td');
        nome.textContent = cliente.nome; // nome do cliente

        const cpf = document.createElement('td');
        cpf.textContent = cliente.cpf; // cpf do cliente

        const telefone = document.createElement('td');
        telefone.textContent = cliente.telefone // telefone do cliente

        const acoes = document.createElement('td'); // elemento img

        const atualizarIcon = document.createElement('img');
        atualizarIcon.src = 'assets/icons/pencil-square.svg';

        const excluirIcon = document.createElement('img');
        excluirIcon.src = 'assets/icons/trash-fill.svg';

        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(cpf);
        linha.appendChild(telefone);
        acoes.appendChild(atualizarIcon);
        linha.appendChild(acoes);
        acoes.appendChild(excluirIcon);

        //adiciona a linha prenchida
        tabela.appendChild(linha);
    });
}
