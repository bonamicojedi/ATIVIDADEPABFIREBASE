var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
    },

    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        var db = firebase.firestore();
        var ag = db.collection("cadastro").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("txtNome").value = doc.data().nome;
                document.getElementById("txtTelefone").value = doc.data().telefone;
                document.getElementById("txtIdade").value = doc.data().idade;
                document.getElementById("txtDataContato").value = doc.data().data_contato;
                document.getElementById("txtMotivo").value = doc.data().motivo;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },

    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        let cnome = document.getElementById("txtNome").value;
        let ctelefone = document.getElementById("txtTelefone").value;
        let cidade = document.getElementById("txtIdade").value;
        let cdata_contato = document.getElementById("txtDataContato").value;
        let cmotivo = document.getElementById("txtMotivo").value;

        var db = firebase.firestore();
        var ag = db.collection("cadastro").where("telefone", "==", getTelefone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("cadastro").doc(doc.id);

                return dados.update({
                    nome: cnome,
                    telefone: ctelefone,
                    idade: cidade,
                    data_contato: cdata_contato,
                    motivo: cmotivo
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = "file:///www/consultarClientes.html";
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

};

app.initialize();