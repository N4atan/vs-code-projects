//Pegar o nome de usuário se houver alguem logado.
window.onload = function() {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));  // Pega o usuário logado do localStorage
    if (userLogged) {
        document.getElementById("user-identification").innerText = userLogged.username;  // Atualiza o nome do usuário na página
    }

    getPosts();
};

document.getElementById("fazer-postagem-btn").addEventListener("click", function(){
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));  // Pega o usuário logado do localStorage
    
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('pt-BR').format(currentDate);

    if(userLogged){
        createPost("Cachorro fudido", userLogged.username, "Xique-Xique, Bahia", formattedDate)
    } else {
        alert("Crie sua conta ou faça login!")
    }
})

async function getPosts(){
    try {
        const response = await axios.get("http://localhost:3000/posts")

        if(response.data.length > 0){
            const container = document.querySelector(".seccao-divs"); // O elemento onde as divs serão adicionadas

            console.log(response.data)
            
            response.data.forEach(animal => {
                const novaDiv = criarDivAnimal(
                    animal.nome, 
                    animal.usuario, 
                    animal.localizacao, 
                    animal.dataPostagem
                );
                container.appendChild(novaDiv);
            });
        }
    } catch (error) {
        console.log("Deu merda:", error)
    }
}

async function createPost(nome, usuario, localizacao, dataPostagem){
    try {
        const novoPost ={
            nome: nome,
            usuario: usuario,
            localizacao: localizacao,
            dataPostagem: dataPostagem
        }

        await axios.post("http://localhost:3000/posts", novoPost)
        console.log("Criado com sucesso!")
    } catch (error) {
        console.log("Deu merda pra criar: ", error)
    }

}

function criarDivAnimal(nome, usuario, localizacao, dataPostagem) {
    const divAnimal = document.createElement("div");
    divAnimal.classList.add("div-animal");

    const imgAnimal = document.createElement("div");
    imgAnimal.classList.add("img-animal");

    const dadosAnimal = document.createElement("div");
    dadosAnimal.classList.add("dados-animal");

    const nomeAnimal = document.createElement("label");
    nomeAnimal.id = "nome-animal";
    nomeAnimal.textContent = nome;

    const postadoPor = document.createElement("label");
    postadoPor.id = "postado-por";
    postadoPor.textContent = `Publicado por ${usuario}`;

    const local = document.createElement("label");
    local.id = "local";
    local.textContent = localizacao;

    const dataPostagemEl = document.createElement("label");
    dataPostagemEl.id = "data-postagem";
    dataPostagemEl.textContent = dataPostagem;

    dadosAnimal.appendChild(nomeAnimal);
    dadosAnimal.appendChild(postadoPor);
    dadosAnimal.appendChild(local);
    dadosAnimal.appendChild(dataPostagemEl);

    divAnimal.appendChild(imgAnimal);
    divAnimal.appendChild(dadosAnimal);

    return divAnimal;
}