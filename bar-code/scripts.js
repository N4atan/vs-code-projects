Quagga.init({
  inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#camera')
  },
  decoder: {
      readers: ["ean_reader", "upc_reader", "code_128_reader"],
      frequency: 5  // Ajuste conforme necessário
  }
}, function(err) {
  if (err) {
      console.error("Erro ao iniciar Quagga:", err);
      return;
  }
  console.log("Inicialização concluída.");
  Quagga.start();
});

// Criando o ResultCollector
const resultCollector = Quagga.ResultCollector.create({
  capture: true,  // Salvar imagens dos resultados capturados
  capacity: 20,   // Número máximo de resultados armazenados
  blacklist: [{ code: "123456789012", format: "ean_13" }],  // Exemplo de código ignorado
  filter: function(codeResult) {
      // Apenas armazena códigos com pelo menos 8 caracteres
      return codeResult.code.length >= 8;
  }
});

Quagga.onDetected(function (data) {
  const codigo = data.codeResult.code;
  
  // Verifica quantas vezes o mesmo código já foi detectado
  let ocorrencias = resultCollector.getResults().filter(result => result.codeResult.code === codigo).length;

  console.log(`Código detectado: ${codigo}, Ocorrências: ${ocorrencias}`);

  if (ocorrencias >= 3) {  // Verifica se o código foi lido 3 vezes
      document.getElementById("#resultado").innerText = "Código: " + codigo;

      // Para a câmera após leitura válida
      Quagga.stop();
      console.log("Câmera parada após leitura válida:", codigo);

      // Reinicia automaticamente após 3 segundos
      setTimeout(() => {
          document.getElementById("#resultado").innerText = "Escaneie outro item...";
          resultCollector.clear();  // Limpa os resultados anteriores
          Quagga.start();
          console.log("Reiniciando a câmera para nova leitura...");
      }, 3000);
  }
});