//const bcrypt = require("bcrypt"); 
//Precisa configurar back end


/* Função para criptografar a senha
async function criptografarSenha(senha) {
    const saltRounds = 10; // Define o número de "salting rounds" (quanto mais, mais seguro, mas mais lento)
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        return hash;
    } catch (err) {
        console.error('Erro ao criptografar a senha:', err);
    }
} */


window.onload = function() {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));  // Pega o usuário logado do localStorage
    if (userLogged) {
        document.getElementById("user-identification").innerText = userLogged.username;  // Atualiza o nome do usuário na página
    }
};


async function registerNewUser(user, password) {
    try {
        //const hashedPassword = await criptografarSenha(password);
        const novoUsuario = {
            username: user,
            password: password
        };

        console.log('Registrando novo usuário...');
        await axios.post("http://localhost:3000/users", novoUsuario);
        console.log("Usuário registrado com sucesso!");
    } catch (error) {
        console.log("Deu merda no registro: ", error);
    }
}

async function getAllUsers() {
    try {
        console.log('Obtendo todos os usuários...');
        let response = await axios.get("http://localhost:3000/users");
        console.log('Usuários recebidos:', response.data);
        return response.data;
    } catch (error) {
        console.log("Deu merda ao obter usuários: ", error);
        return [];
    }
}

async function mostrarAllUsers() {
    const data = await getAllUsers();
    console.log('Mostrando usuários na página...');
    document.getElementById("preUsers").innerHTML = JSON.stringify(data, null, 2);
}

async function login(user, password) {
    try {
        const response = await axios.get("http://localhost:3000/users", {
            params: {
                username:  user,
                password: password
            }
        });
        console.log("Foi retornado: ", response.data);

        if(response.data.length > 0){
            alert("Login realizado com sucesso!");
            console.log(response.data);
            return response.data[0];
        } else {
            alert("Usuario ou senha incorreto!");
            return null;
        }
        

    } catch (error) {
        console.log("Deu merda no login: ", error);
    }
}

// Evento do botão de registro
document.getElementById("btnSubmitRegister").addEventListener("click", async (e) => {
    console.log('Formulário enviado');

    const user = document.getElementById("inputRegisterUser").value;
    const password = document.getElementById("inputRegisterPassword").value;
    const password2 = document.getElementById("inputRegisterPassword2").value;

    if(user != "" && password == password2 && password != ""){
        await registerNewUser(user, password);  // Espera o registro ser concluído
    } else {
        alert("Usuário em branco ou senhas não coincidem!");
    }
});

document.getElementById("btnMostarUsers").addEventListener("click", () => {
    mostrarAllUsers();  // Mostra os dados dos usuários após o registro
})

document.getElementById("btnSubmitLogin").addEventListener("click", () => {
    let user = document.getElementById("inputLoginUser").value;
    let password = document.getElementById("inputLoginPassword").value;

    login(user, password).then(usermoment => {
        console.log("Usuario logado!");
        document.getElementById("user-identification").innerText = usermoment.username;
        localStorage.setItem("userLogged", JSON.stringify(usermoment))
    })
})