// ===== Ano no rodapé =====
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== Menu do celular =====
const menu = document.querySelector(".menu");
const menuBotao = document.querySelector(".menu-botao");

menuBotao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", aberto);
  menuBotao.setAttribute("aria-label", t(aberto ? "a11y.fecharMenu" : "a11y.abrirMenu"));
  atualizar(); // menu aberto ganha fundo escuro mesmo na primeira tela
});

// fecha o menu com Esc ou tocando fora dele
function fecharMenu() {
  if (!menu.classList.contains("aberto")) return;
  menu.classList.remove("aberto");
  menuBotao.setAttribute("aria-expanded", "false");
  menuBotao.setAttribute("aria-label", t("a11y.abrirMenu"));
  atualizar();
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });
document.addEventListener("click", (e) => { if (!menu.contains(e.target)) fecharMenu(); });

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
  let texto = t("whats.ola");
  if (d.get("nome")) texto += `\n\n${t("whats.nome")}: ${d.get("nome")}`;
  if (d.get("contato")) texto += `\n${t("whats.contato")}: ${d.get("contato")}`;
  if (d.get("mensagem")) texto += `\n\n${d.get("mensagem")}`;
  enviar.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

formulario.addEventListener("input", montarLink);
formulario.addEventListener("submit", (e) => { e.preventDefault(); enviar.click(); });
montarLink();
document.addEventListener("idioma-mudou", montarLink);

// ===== Tela de boas-vindas (só na entrada) =====
(() => {
  const intro = document.getElementById("intro");
  if (!intro || !document.documentElement.classList.contains("mostrar-intro")) return;

  // monta o texto letra por letra; "portfólio digital" fica dourado
  const alvo = intro.querySelector(".intro-texto");
  const palavras = alvo.dataset.texto.split(" ");
  let atraso = 0.35;
  palavras.forEach((palavra, i) => {
    const grupo = document.createElement("span");
    grupo.style.display = "inline-block";
    grupo.style.opacity = "1";
    grupo.style.transform = "none";
    grupo.style.animation = "none";
    if (i >= palavras.length - 2) grupo.className = "destaque";
    [...palavra].forEach((letra) => {
      const s = document.createElement("span");
      s.textContent = letra;
      s.style.animationDelay = `${atraso.toFixed(2)}s`;
      atraso += 0.035;
      grupo.appendChild(s);
    });
    alvo.appendChild(grupo);
    if (i < palavras.length - 1) alvo.appendChild(document.createTextNode(" "));
    atraso += 0.06;
  });

  let saiu = false;
  function sair() {
    if (saiu) return;
    saiu = true;
    intro.classList.add("saindo");
    setTimeout(() => {
      document.documentElement.classList.remove("mostrar-intro");
      intro.remove();
    }, 900);
  }

  intro.addEventListener("click", sair);
  document.addEventListener("keydown", sair, { once: true });
  setTimeout(sair, 3400); // sai sozinha depois de ~3 segundos
})();

// ===== Versão clara / escura =====
(() => {
  const botao = document.getElementById("tema-botao");
  if (!botao) return;
  const raiz = document.documentElement;

  function aplicar(tema) {
    raiz.setAttribute("data-tema", tema);
    botao.setAttribute("aria-label", t(tema === "escuro" ? "a11y.temaClaro" : "a11y.temaEscuro"));
    const cor = document.querySelector('meta[name="theme-color"]');
    if (cor) cor.setAttribute("content", tema === "escuro" ? "#0d0d0d" : "#111111");
  }

  aplicar(raiz.getAttribute("data-tema") || "claro");
  document.addEventListener("idioma-mudou", () => aplicar(raiz.getAttribute("data-tema") || "claro"));

  botao.addEventListener("click", () => {
    const novo = raiz.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
    raiz.classList.add("trocando-tema");
    aplicar(novo);
    try { localStorage.setItem("tema", novo); } catch (e) {}
    setTimeout(() => raiz.classList.remove("trocando-tema"), 450);
  });
})();

// ===== Serviços, Monte seu pedido e botão flutuante =====
(() => {
  const NUMERO = "5519992932822";
  const link = (texto) => `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`;

  // cada pacote abre o WhatsApp já dizendo qual pacote interessa
  function atualizarPacotes() {
    document.querySelectorAll("[data-pedido]").forEach((a) => {
      a.href = link(`${t("pac.msg")} "${t(a.dataset.pedido)}".`);
    });
  }

  // Monte seu pedido: junta os itens marcados numa lista
  const enviar = document.getElementById("monte-enviar");
  const caixas = document.querySelectorAll(".monte input[type=checkbox]");
  function atualizarLista() {
    if (!enviar) return;
    const itens = [...caixas].filter((c) => c.checked).map((c) => `• ${t(c.value)}`);
    enviar.href = link(itens.length ? `${t("monte.msg")}\n\n${itens.join("\n")}` : t("whats.ola"));
    enviar.classList.toggle("pronto", itens.length > 0);
  }
  caixas.forEach((c) => c.addEventListener("change", atualizarLista));

  // botão flutuante: rótulo no idioma certo e some na primeira tela
  const flutuante = document.querySelector(".whats-flutuante");
  function rotuloFlutuante() { if (flutuante) flutuante.setAttribute("aria-label", t("whats.flutuante")); }
  function mostrarFlutuante() {
    if (flutuante) flutuante.classList.toggle("visivel", window.scrollY > window.innerHeight * 0.6);
  }
  window.addEventListener("scroll", () => requestAnimationFrame(mostrarFlutuante), { passive: true });

  function tudo() { atualizarPacotes(); atualizarLista(); rotuloFlutuante(); }
  document.addEventListener("idioma-mudou", tudo);
  tudo();
  mostrarFlutuante();
})();
