function exibeClientes(clientes) {
    for (var i = 0; i < clientes.length; i++) {
        var cliente = clientes[i];
        var dadosCliente = '<div id="' + cliente.id + '">' +
            'ID: ' + cliente.id +
            '<br>Nome: ' + cliente.nome +
            '<br>Endereço: ' + cliente.endereco +
            '<br>Telefone: ' + cliente.telefone +
            '<br>Email: ' + cliente.email +
            '<br><a href="insere_cliente.html?id=' + cliente.id +' "> Alterar </a>' +
            '<br><a href="#" onClick="deletaCliente(' + cliente.id +')"> Excluir </a>' +
            '</div>';
        document.getElementById('result').innerHTML += dadosCliente + '<br><br>';
    }
}

function deletaCliente(id){
     $.ajax({
                url: '/cliente/deleta?id=' + id,
                dataType: 'json',
                type: 'post',
                error: function (dados) {
                    alert('Erro: ' + dados.data);
                },
                success: function (dados) {
                    if (dados.status === 'ERRO')
                        alert('Erro: ' + dados.data);
                    else{
                       alert(dados.data);
                       var divResult = document.getElementById('result');
                       divResult.removeChild(document.getElementById(id));
                    }
                }
            });
}

function salvaCliente() {
    var form = document.formCliente;
    var input = {
        nome: form.nome.value,
        endereco: form.endereco.value,
        email: form.email.value,
        telefone: form.telefone.value
    };

    var param = new URLSearchParams(window.location.search);
    var urlAcao;
    if(param.has('id')){
        urlAcao = 'cliente/altera?id=' + param.get('id');
    }
    else{
        urlAcao = 'cliente/insere';
    }
    $.ajax({
        url: urlAcao,
        type: 'post',
        data: input,
        error: function (dados) {
        alert('Erro: ' + dados.data);
        },
    success: function (dados) {
    if (dados.status === 'ERRO')
    alert('Erro: ' + dados.data);
        else
        alert(dados.data);
        }
    });
}

function alteraCliente(){

    var param = new URLSearchParams(window.location.search);
    if(param.has('id')){

        $.ajax({
            url: 'cliente/listaCliente?id=?' + param.get('id'),
            dataType: 'json',
            error: function (dados){
                alert('Erro: ' + dados.data);
            },
            success: function (dados){
                if( dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                else{
                    var form = document.formCliente;
                    form.nome.value = dados.data[0].nome;
                    form.endereco.value = dados.data[0].endereco;
                    form.telefon.value = dados.data[0].telefone;
                    form.email.value = dados.dados.data[0].email;
                }
            }
        });

    }
}