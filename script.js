// ===== Ano no rodapé =====
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== Menu do celular =====
const menu = document.querySelector(".menu");
const menuBotao = document.querySelector(".menu-botao");

menuBotao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", aberto);
  menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  atualizar(); // menu aberto ganha fundo escuro mesmo na primeira tela
});

// fecha o menu ao clicar num link
document.querySelectorAll(".menu-links a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  })
);

// ===== Rolagem normal: menu acompanha a seção visível =====
const topo = document.querySelector(".topo");
const secoes = [...document.querySelectorAll("main > section[id]")];

function atualizar() {
  // na primeira tela o menu fica transparente (como no modelo)
  const noTopo = window.scrollY < topo.offsetHeight - 90;
  document.body.classList.toggle("no-topo", noTopo && !menu.classList.contains("aberto"));

  // item do menu da seção que está na tela fica dourado
  let atual = "";
  secoes.forEach((s) => { if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) atual = s.id; });
  document.querySelectorAll(".menu-links a").forEach((a) =>
    a.classList.toggle("ativo", !noTopo && a.getAttribute("href") === `#${atual}`)
  );
}

window.addEventListener("scroll", () => requestAnimationFrame(atualizar), { passive: true });
window.addEventListener("resize", atualizar);

// logo "R" volta ao início
document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0 });
});

atualizar();

// ===== Formulário: abre o WhatsApp com a mensagem pronta =====
const WHATSAPP = "5519992932822";

const formulario = document.getElementById("formulario");
const enviar = document.getElementById("enviar-whats");

// o link do botão é atualizado a cada letra digitada
function montarLink() {
  const d = new FormData(formulario);
  let texto = "Olá Rodrigão! Vim pelo seu site.";
  if (d.get("nome")) texto += `\n\nNome: ${d.get("nome")}`;
  if (d.get("contato")) texto += `\nContato: ${d.get("contato")}`;
  if (d.get("mensagem")) texto += `\n\n${d.get("mensagem")}`;
  enviar.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

formulario.addEventListener("input", montarLink);
formulario.addEventListener("submit", (e) => { e.preventDefault(); enviar.click(); });
montarLink();
