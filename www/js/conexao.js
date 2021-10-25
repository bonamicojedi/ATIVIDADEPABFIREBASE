var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnListar").addEventListener("click",app.listar);
        document.getElementById("btnInserir").addEventListener("click",app.inserir);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        db = window.sqlitePlugin.openDatabase({
            name: 'aplicativo.db',
            location: 'default',            
            androidDatabaseProvider: 'system'
        });

        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (nome, telefone, idade, data_contato, motivo)');
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            //alert('Banco e Tabela clientes criados com sucesso!!!');
        });
    },
    
    inserir: function(){
        let nome = document.getElementById("txtNome").value;
        let telefone = document.getElementById("txtTelefone").value;
        let idade = document.getElementById("txtIdade").value;
        let data_contato = document.getElementById("txtDataContato").value;
        let motivo = document.getElementById("txtMotivo").value;

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO clientes VALUES (?,?,?,?,?)', [nome, telefone, idade, data_contato, motivo]);
        }, function(error) {
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            alert('Insercao realizada com sucesso!!!');
        });
    },

    listar: function(){
        db.executeSql(
            'SELECT nome AS uNome, telefone AS uTelefone, origem AS uOrigem, data_contato AS uDataContato, observacao AS uObservacao FROM clientes', [], function(rs) {
                //alert(JSON.stringify(rs));
                //alert(rs.rows.length);
                let i = 0;
                for(i = 0; i < rs.rows.length; i++){
                    //alert("item "+i);
                    let recordItem = rs.rows.item(i);
                    //alert(JSON.stringify(recordItem));
                    $("#TableData").append("<tr>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uNome + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uTelefone + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uIdade + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uDataContato + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uMotivo + "</td>");
                    $("#TableData").append("<td scope='col'><a href='" + cordova.file.applicationDirectory + "www/editarClientes.html?telefone=" + rs.rows.item(i).uTelefone + "'>Editar</a></td>");
                    $("#TableData").append("</tr>");
                }
            //alert('Record count (expected to be 2): ' + rs.rows.item(0).uLoginName);
        }, function(error) {
            alert('Erro no SELECT: ' + error.message);
        }); 
    },

    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");
        alert(getTelefone);
        db.executeSql(
            'SELECT nome AS uNome, telefone AS uTelefone, idade AS uIdade, data_contato AS uDataContato, motivo ' + 
            'AS uMotivo FROM clientes WHERE telefone = ?', [getTelefone], function(rs) {
                alert(JSON.stringify(rs));
                alert(rs.rows.length);
                let i = 0;
                for(i = 0; i < rs.rows.length; i++){
                    alert("item "+i);
                    let recordItem = rs.rows.item(i);
                    alert(JSON.stringify(recordItem));
                    document.getElementById("txtNome").value = rs.rows.item(i).uNome;
                    document.getElementById("txtTelefone").value = rs.rows.item(i).uTelefone;
                    document.getElementById("txtIdade").value = rs.rows.item(i).uIdade;
                    document.getElementById("txtDataContato").value = rs.rows.item(i).uDataContato;
                    document.getElementById("txtMotivo").value = rs.rows.item(i).uMotivo;
                    
                }
            //alert('Record count (expected to be 2): ' + rs.rows.item(0).uLoginName);
        }, function(error) {
            alert('Erro no SELECT: ' + error.message);
        }); 
    },
    
    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");
        alert(getTelefone);

        let nome = document.getElementById("txtNome").value;
        let telefone = document.getElementById("txtTelefone").value;
        let idade = document.getElementById("txtIdade").value;
        let data_contato = document.getElementById("txtDataContato").value;
        let idade = document.getElementById("txtMotivo").value;

        db.transaction(function(tx) {
            tx.executeSql('UPDATE clientes SET nome=?, telefone=?, idade=?, data_contato=?, motivo=? WHERE telefone=?', [nome, telefone, idade, data_contato, motivo, getTelefone]);
        }, function(error) {
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            alert('Atualização realizada com sucesso!!!');
        });
    }

};

app.initialize();