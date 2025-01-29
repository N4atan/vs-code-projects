document.getElementById("btnLogin").addEventListener("click", () => {
    document.getElementById("divLogin").style.display = "flex";
    document.getElementById("divRegister").style.display = "none";
})


document.getElementById("btnRegister").addEventListener("click", () => {
    document.getElementById("divLogin").style.display = "none";
    document.getElementById("divRegister").style.display = "flex";
})