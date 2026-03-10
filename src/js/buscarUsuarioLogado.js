async function buscarUsuarioLogado() {
  const res = await fetch("http://localhost:8000/");
  const data = await res.json();
  console.log(data.user);

  const usuarioLogado = document.getElementById("usuarioLogado");

  for (let i = 0; i < data.user.length; i++) {
    const div = document.createElement("div");
    div.classList.add("usuarioLogado");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    p.textContent = `Nome completo: ${data.user[i].nome}`;
    p2.textContent = `E-mail: ${data.user[i].email}`;
    p.classList.add("formatacao_1");
    p2.classList.add("formatacao_1");
    div.classList.add("formatarDiv");
    div.appendChild(p);
    div.appendChild(p2);
    
    usuarioLogado.appendChild(div);
    console.log(p);
  }
}

buscarUsuarioLogado();
