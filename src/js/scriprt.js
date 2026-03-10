const button = document.getElementsByTagName("button")[0];

async function cadastrar(nome, email, passWord) {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome,
      email: email,
      passWord: passWord,
    }),
  };

  try {
    const res = await fetch("http://localhost:8000/cadastro", init);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("erro no cadastro:", err);
    throw err;
  }
}

button.addEventListener("click", async () => {
  const nome = document.getElementById("input_nome").value;
  const email = document.getElementById("input_email").value;
  const passWord = document.getElementById("input_password").value;

  

  try {
    const resultado = await cadastrar(nome, email, passWord);
    window.alert("Cadastrado com sucesso!");
    console.log(resultado);
   
  } catch (e) {
    window.alert("Falha no cadastro, veja o console.");
  }
});
