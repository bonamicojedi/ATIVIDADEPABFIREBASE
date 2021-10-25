var app = {
        
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnInserir").addEventListener("click",app.inserir);
    },

    inserir: function(){

        
        let cnome = document.getElementById("txtNome").value;
        let ctelefone = document.getElementById("txtTelefone").value;
        let cidade = document.getElementById("txtIdade").value;
        let cdata_contato = document.getElementById("txtDataContato").value;
        let cmotivo = document.getElementById("txtMotivo").value;

        var db = firebase.firestore();

        db.collection("cadastro").add({
            nome: cnome,
            telefone: ctelefone,
            idade: cidade,
            data_contato: cdata_contato,
            motivo: cmotivo,
        })
        .then((docRef) =>{
            console.log("Document written with ID: ", docRef.id);
            windows.location.href = cordova.file.applicationDirectory + "www/index.html";
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    }
    
};

app.initialize();