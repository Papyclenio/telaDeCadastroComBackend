const button = document.getElementsByTagName("button")[0];

async function cadastrar(nome, email, password) {
  id = Math.floor(Math.random() * 1000);
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      nome: nome,
      email: email,
      password: password,
    }),
  };

  console.log("enviando:", init);

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
  const password = document.getElementById("input_password").value;
  console.log(nome, email, password);

  try {
    const resultado = await cadastrar(nome, email, password);
    alert("Cadastrado com sucesso!");
    console.log(resultado);
  } catch (e) {
    window.alert("Falha no cadastro, veja o console.");
  }
});
