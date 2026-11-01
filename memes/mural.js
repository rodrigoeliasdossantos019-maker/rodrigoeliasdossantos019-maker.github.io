// ===== MemesLab — mural de memes =====
// Os memes de exemplo são criações originais, desenhados aqui com fundos e emojis.
// Curtidas e memes publicados ficam guardados só no aparelho de quem usa (localStorage).
(() => {
  const mural = document.getElementById("mural");
  const vazio = document.getElementById("vazio");
  const ranking = document.getElementById("ranking");
  const textoMural = document.getElementById("texto-mural");
  const busca = document.getElementById("busca");
  const editor = window.EditorMemes;
  const FONTE_EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

  // ---------- memes de exemplo ----------
  const EXEMPLOS = [
    { id: "ex1", cat: "escola", cima: "Quando o professor diz", baixo: "que vai ter prova surpresa", emoji: "😱", fundo: ["#3a86ff", "#0b1d51"], autor: "ZoeiraTotal", av: "🦊", curtidas: 12700, coment: 328, horas: 2 },
    { id: "ex2", cat: "trabalho", cima: "Eu na segunda", baixo: "fingindo que estou bem", emoji: "🙂", extra: "☕", fundo: ["#f4a261", "#6b2d0f"], autor: "CafeComMeme", av: "☕", curtidas: 24300, coment: 573, horas: 5 },
    { id: "ex3", cat: "programacao", cima: "Funcionou e eu", baixo: "não sei por quê", emoji: "🤯", extra: "💻", fundo: ["#2a9d8f", "#0b2b26"], autor: "DevCansado", av: "🤖", curtidas: 18900, coment: 421, horas: 8 },
    { id: "ex4", cat: "bichos", cima: "Meu gato quando", baixo: "eu chego em casa", emoji: "😼", fundo: ["#e9c46a", "#7a4f10"], autor: "Miau2000", av: "🐱", curtidas: 31200, coment: 890, horas: 1 },
    { id: "ex5", cat: "jogos", cima: "Só mais uma partida", baixo: "eram 4 da manhã", emoji: "🎮", extra: "🌙", fundo: ["#7b2cbf", "#10002b"], autor: "GamerRaiz", av: "👾", curtidas: 15400, coment: 260, horas: 12 },
    { id: "ex6", cat: "reacoes", cima: "Eu lendo", baixo: "o grupo da família", emoji: "🫠", fundo: ["#ef476f", "#4a0d1e"], autor: "SemFiltro", av: "🙃", curtidas: 9800, coment: 145, horas: 20 },
    { id: "ex7", cat: "engracados", cima: "Ninguém:", baixo: "Eu dançando na cozinha", emoji: "🕺", extra: "🍳", fundo: ["#ffbe0b", "#8a3b00"], autor: "RiDemais", av: "😂", curtidas: 21000, coment: 512, horas: 3 },
    { id: "ex8", cat: "escola", cima: "Grupo do trabalho", baixo: "eu fazendo tudo sozinho", emoji: "😤", extra: "📚", fundo: ["#06d6a0", "#03402f"], autor: "Estudante", av: "📚", curtidas: 11300, coment: 233, horas: 26 },
    { id: "ex9", cat: "engracados", cima: "Quando o salário cai", baixo: "e já tem dono", emoji: "💸", extra: "🥲", fundo: ["#8338ec", "#24064f"], autor: "ContasPagas", av: "💰", curtidas: 27800, coment: 640, horas: 6 },
    { id: "ex10", cat: "programacao", cima: "Achei o bug", baixo: "era um ponto e vírgula", emoji: "🔍", extra: "🐛", fundo: ["#118ab2", "#04202e"], autor: "CodigoLimpo", av: "💻", curtidas: 8700, coment: 198, horas: 30 },
    { id: "ex11", cat: "bichos", cima: "O pato olhando", baixo: "você comer pão sozinho", emoji: "🦆", extra: "🥖", fundo: ["#90be6d", "#253b17"], autor: "PatoSincero", av: "🦆", curtidas: 14600, coment: 301, horas: 15 },
    { id: "ex12", cat: "reacoes", cima: "Quando alguém fala", baixo: "\"rapidinho\"", emoji: "🤨", fundo: ["#577590", "#141f2b"], autor: "Desconfiado", av: "🤨", curtidas: 7600, coment: 98, horas: 40 },
  ];

  // desenha um meme de exemplo e devolve a imagem
  function desenharExemplo(m) {
    const T = 640;
    const c = document.createElement("canvas");
    c.width = c.height = T;
    const x = c.getContext("2d");
    const g = x.createRadialGradient(T * 0.5, T * 0.45, T * 0.05, T * 0.5, T * 0.5, T * 0.75);
    g.addColorStop(0, m.fundo[0]);
    g.addColorStop(1, m.fundo[1]);
    x.fillStyle = g;
    x.fillRect(0, 0, T, T);
    // raios de fundo
    x.save();
    x.translate(T / 2, T / 2);
    x.fillStyle = "rgba(255,255,255,.06)";
    for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); x.beginPath(); x.moveTo(0, 0); x.lineTo(T, -60); x.lineTo(T, 60); x.fill(); }
    x.restore();
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.font = `230px ${FONTE_EMOJI}`;
    x.fillText(m.emoji, T / 2, T * 0.52);
    if (m.extra) { x.font = `120px ${FONTE_EMOJI}`; x.fillText(m.extra, T * 0.78, T * 0.66); }
    // textos no estilo meme
    const escrever = (texto, y) => {
      let tam = 58;
      x.font = `${tam}px Anton, Impact, "Arial Black", sans-serif`;
      const t = texto.toUpperCase();
      while (x.measureText(t).width > T * 0.92 && tam > 30) { tam -= 2; x.font = `${tam}px Anton, Impact, "Arial Black", sans-serif`; }
      x.lineJoin = "round";
      x.lineWidth = tam * 0.14;
      x.strokeStyle = "#000";
      x.strokeText(t, T / 2, y);
      x.fillStyle = "#fff";
      x.fillText(t, T / 2, y);
    };
    escrever(m.cima, T * 0.1);
    escrever(m.baixo, T * 0.9);
    return c.toDataURL("image/jpeg", 0.85);
  }

  // ---------- dados guardados no aparelho ----------
  const guardar = (chave, valor) => { try { localStorage.setItem(chave, JSON.stringify(valor)); return true; } catch (e) { return false; } };
  const ler = (chave, padrao) => { try { return JSON.parse(localStorage.getItem(chave)) ?? padrao; } catch (e) { return padrao; } };

  let curtidos = new Set(ler("meme-curtidos", []));
  let meus = ler("meme-meus", []); // { id, cat, titulo, img, data }

  // ---------- estado do mural ----------
  let aba = "inicio";
  let categoria = "todos";
  let posts = [];

  function montarPosts() {
    const exemplos = EXEMPLOS.map((m) => ({
      id: m.id, cat: m.cat, titulo: `${m.cima} ${m.baixo}`, img: null, fonte: m,
      autor: m.autor, av: m.av, curtidas: m.curtidas, coment: m.coment, horas: m.horas, meu: false,
    }));
    const proprios = meus.map((m) => ({
      id: m.id, cat: m.cat, titulo: m.titulo, img: m.img, autor: "Você", av: "⭐",
      curtidas: 0, coment: 0, horas: Math.max(0, Math.round((Date.now() - m.data) / 3600000)), meu: true,
    }));
    posts = [...proprios, ...exemplos];
  }

  const totalCurtidas = (p) => p.curtidas + (curtidos.has(p.id) ? 1 : 0);
  // número completo (12.701) para a curtida aparecer na hora
  const formatar = (n) => n.toLocaleString("pt-BR");
  const tempo = (h) => (h < 1 ? "agora" : h < 24 ? `há ${h} h` : `há ${Math.round(h / 24)} d`);
  const imagemDe = (p) => p.img || (p.img = desenharExemplo(p.fonte));

  function filtrados() {
    const termo = busca.value.trim().toLowerCase();
    let lista = posts.filter((p) =>
      (categoria === "todos" || p.cat === categoria) &&
      (!termo || p.titulo.toLowerCase().includes(termo) || p.autor.toLowerCase().includes(termo))
    );
    if (aba === "meus") lista = lista.filter((p) => p.meu);
    if (aba === "curtidos") lista = [...lista].sort((a, b) => totalCurtidas(b) - totalCurtidas(a));
    return lista;
  }

  // ---------- desenha o mural ----------
  function mostrar() {
    const lista = filtrados();
    textoMural.textContent = aba === "curtidos" ? "Mais curtidos" : aba === "meus" ? "Meus memes" : "Novos memes";
    mural.innerHTML = "";
    vazio.hidden = lista.length > 0;
    vazio.textContent = aba === "meus" ? "Você ainda não publicou nenhum meme. Crie o primeiro lá embaixo!" : "Nenhum meme encontrado. Que tal criar um?";

    lista.forEach((p) => {
      const card = document.createElement("article");
      card.className = "post";
      const curtido = curtidos.has(p.id);
      card.innerHTML = `
        <button type="button" class="post-img" aria-label="Ver meme maior: ${p.titulo}">
          <img src="${imagemDe(p)}" alt="Meme: ${p.titulo}" loading="lazy" width="640" height="640">
        </button>
        <div class="post-barra">
          <button type="button" class="curtir ${curtido ? "curtido" : ""}" aria-pressed="${curtido}" aria-label="Curtir">
            <span class="coracao">${curtido ? "❤️" : "🤍"}</span> <span class="num">${formatar(totalCurtidas(p))}</span>
          </button>
          <span>💬 ${formatar(p.coment)}</span>
          <button type="button" class="baixar-post" aria-label="Baixar meme" title="Baixar">⬇️</button>
        </div>
        <div class="post-autor"><span class="avatar">${p.av}</span><div>${p.autor}<small>${tempo(p.horas)}</small></div></div>`;
      card.querySelector(".post-img").addEventListener("click", () => abrir(p));
      card.querySelector(".curtir").addEventListener("click", () => curtir(p));
      card.querySelector(".baixar-post").addEventListener("click", () => baixar(p));
      mural.appendChild(card);
    });
    mostrarRanking();
  }

  function mostrarRanking() {
    ranking.innerHTML = "";
    [...posts].sort((a, b) => totalCurtidas(b) - totalCurtidas(a)).slice(0, 5).forEach((p) => {
      const li = document.createElement("li");
      li.tabIndex = 0;
      li.innerHTML = `<img src="${imagemDe(p)}" alt=""><span>${p.titulo}</span><b>${formatar(totalCurtidas(p))}</b>`;
      li.addEventListener("click", () => abrir(p));
      li.addEventListener("keydown", (e) => { if (e.key === "Enter") abrir(p); });
      ranking.appendChild(li);
    });
  }

  function curtir(p) {
    if (curtidos.has(p.id)) curtidos.delete(p.id); else curtidos.add(p.id);
    guardar("meme-curtidos", [...curtidos]);
    mostrar();
  }

  async function baixar(p) {
    const blob = await (await fetch(imagemDe(p))).blob();
    editor.baixarBlob(blob, `meme-${p.id}.jpg`);
  }

  // ---------- meme ampliado ----------
  const janela = document.getElementById("janela");
  const janelaImg = document.getElementById("janela-img");
  let abertoAgora = null;
  let focoAntes = null;

  function abrir(p) {
    abertoAgora = p;
    focoAntes = document.activeElement;
    janelaImg.src = imagemDe(p);
    janelaImg.alt = `Meme: ${p.titulo}`;
    janela.hidden = false;
    document.getElementById("fechar").focus();
  }
  function fechar() { janela.hidden = true; if (focoAntes) focoAntes.focus(); }

  document.getElementById("fechar").addEventListener("click", fechar);
  janela.addEventListener("click", (e) => { if (e.target === janela) fechar(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !janela.hidden) fechar(); });
  document.getElementById("janela-baixar").addEventListener("click", () => abertoAgora && baixar(abertoAgora));
  document.getElementById("janela-editar").addEventListener("click", async () => {
    if (!abertoAgora) return;
    fechar();
    await editor.usarComoBase(imagemDe(abertoAgora));
    document.getElementById("criar").scrollIntoView({ behavior: "smooth" });
  });

  // ---------- publicar ----------
  document.getElementById("publicar").addEventListener("click", async () => {
    const img = await editor.miniatura();
    const novo = { id: "meu-" + Date.now(), cat: editor.categoria(), titulo: editor.textoPrincipal() || "Meu meme", img, data: Date.now() };
    const lista = [novo, ...meus];
    if (!guardar("meme-meus", lista)) {
      editor.avisar("Não há espaço para guardar mais memes neste aparelho. Baixe e apague alguns.");
      return;
    }
    meus = lista;
    montarPosts();
    aba = "meus";
    categoria = "todos";
    atualizarAbas();
    mostrar();
    editor.avisar("Publicado! Ele aparece em Meus memes, aqui no seu aparelho.");
    document.getElementById("inicio").scrollIntoView({ behavior: "smooth" });
  });

  // ---------- abas, categorias e busca ----------
  function atualizarAbas() {
    document.querySelectorAll("[data-aba]").forEach((b) => b.classList.toggle("ativa", b.dataset.aba === aba));
    document.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("ativo", b.dataset.cat === categoria));
  }

  document.querySelectorAll("[data-aba]").forEach((b) =>
    b.addEventListener("click", () => {
      aba = b.dataset.aba;
      atualizarAbas();
      mostrar();
      document.getElementById("titulo-mural").scrollIntoView({ behavior: "smooth", block: "start" });
    })
  );
  document.querySelectorAll("[data-cat]").forEach((b) =>
    b.addEventListener("click", () => { categoria = b.dataset.cat; atualizarAbas(); mostrar(); })
  );
  busca.addEventListener("input", mostrar);

  // ---------- começa ----------
  montarPosts();
  // espera a fonte de meme para os exemplos saírem com a letra certa
  document.fonts.load('58px "Anton"').finally(() => { posts.forEach((p) => { if (!p.meu) p.img = null; }); mostrar(); });
  mostrar();
})();
