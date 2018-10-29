function exibeClientes(clientes) {
    for (var i = 0; i < clientes.length; i++) {
        var cliente = clientes[i];
        var dadosCliente = '<div id="' + cliente.id + '">' +
            'ID: ' + cliente.id +
            '<br>Nome: ' + cliente.nome +
            '<br>Endereço: ' + cliente.endereco +
            '<br>Telefone: ' + cliente.telefone +
            '<br>Email: ' + cliente.email +
            '<br><a href="#" onClick="deletaCliente(' + cliente.id +')"> EXCLUIR </a>' +
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