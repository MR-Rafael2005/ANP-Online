document.getElementById('fotoForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nome = document.getElementById('nomeFoto').value;
  const fileInput = document.getElementById('inputFoto');
  const file = fileInput.files[0];

  if (!file) {
    alert("Selecione uma imagem!");
    return;
  }

  // Converter para Base64
  const reader = new FileReader();
  reader.onload = async function(event) {
    const base64Image = event.target.result;

    // Preview opcional
    document.getElementById('preview').innerHTML = `<img src="${base64Image}" style="max-width:200px;">`;

    // Salvar no Firestore
    await firebase.firestore().collection('fotos').add({
      nome: nome,
      imagem: base64Image
    });

    alert("Imagem enviada para o Firestore!");
  };
  
  reader.readAsDataURL(file);
});