// ===== Rodrigo Memes — mural de memes =====
// Os memes de exemplo usam fotos de bichos do Unsplash (licença gratuita) e piadas originais.
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
  // Fotos reais de bichos (Unsplash, licença gratuita) com piadas originais.
  // estilo "legenda": faixa branca em cima (conversa) | estilo "classico": texto branco com borda na foto
  const EXEMPLOS = [
    { id: "ex1", cat: "engracados", foto: 0, estilo: "legenda", texto: "- Mãe, vou sair\n- Volta cedo, hein\n- Pode deixar, mãe...\n\nEu chegando às 4 da manhã:", autor: "ZoeiraTotal", av: "🦊", curtidas: 31200, coment: 890, horas: 1 },
    { id: "ex2", cat: "reacoes", foto: 1, estilo: "classico", cima: "Eu quando acaba", baixo: "a última fatia de pizza", autor: "FomeEterna", av: "🍕", curtidas: 24300, coment: 573, horas: 2 },
    { id: "ex3", cat: "trabalho", foto: 2, estilo: "legenda", texto: "Eu ouvindo meu chefe dizer que a reunião \"vai ser rapidinha\"", autor: "CafeComMeme", av: "☕", curtidas: 27800, coment: 640, horas: 3 },
    { id: "ex4", cat: "bichos", foto: 3, estilo: "classico", cima: "Eu fingindo", baixo: "que entendi a explicação", autor: "Miau2000", av: "🐱", curtidas: 21000, coment: 512, horas: 4 },
    { id: "ex5", cat: "reacoes", foto: 4, estilo: "legenda", texto: "Quando você tá falando mal da pessoa e ela aparece do nada", autor: "SemFiltro", av: "🙃", curtidas: 18900, coment: 421, horas: 5 },
    { id: "ex6", cat: "escola", foto: 5, estilo: "classico", cima: "Eu quando o professor", baixo: "fala \"vale nota\"", autor: "Estudante", av: "📚", curtidas: 15400, coment: 260, horas: 6 },
    { id: "ex7", cat: "engracados", foto: 6, estilo: "legenda", texto: "- Amor, ouvi um barulho no quintal\n- Solta o cavalo pra ele ver\n\nO cavalo:", autor: "RiDemais", av: "😂", curtidas: 26100, coment: 702, horas: 7 },
    { id: "ex8", cat: "bichos", foto: 7, estilo: "classico", cima: "Dieta começa", baixo: "segunda-feira", autor: "DogLife", av: "🐶", curtidas: 12700, coment: 328, horas: 8 },
    { id: "ex9", cat: "jogos", foto: 8, estilo: "legenda", texto: "Eu entrando na partida achando que sou o melhor do servidor", autor: "GamerRaiz", av: "👾", curtidas: 11300, coment: 233, horas: 10 },
    { id: "ex10", cat: "engracados", foto: 9, estilo: "classico", cima: "Eu no domingo", baixo: "às 3 da tarde", autor: "PreguicaTotal", av: "🛌", curtidas: 19800, coment: 455, horas: 12 },
    { id: "ex11", cat: "reacoes", foto: 10, estilo: "legenda", texto: "Minha amiga: \"agora é sério, nunca mais falo com ele\"\n\nEu:", autor: "Fofoqueira", av: "👀", curtidas: 22600, coment: 810, horas: 14 },
    { id: "ex12", cat: "programacao", foto: 11, estilo: "classico", cima: "Funcionou na primeira", baixo: "e eu não sei por quê", autor: "DevCansado", av: "🤖", curtidas: 9800, coment: 198, horas: 16 },
    { id: "ex13", cat: "trabalho", foto: 12, estilo: "legenda", texto: "Eu chegando no trabalho na sexta depois de receber o salário", autor: "Sextou", av: "😎", curtidas: 14600, coment: 301, horas: 20 },
    { id: "ex14", cat: "bichos", foto: 13, estilo: "classico", cima: "Quando alguém fala", baixo: "\"é só um minutinho\"", autor: "Desconfiado", av: "🤨", curtidas: 8700, coment: 145, horas: 24 },
    { id: "ex15", cat: "engracados", foto: 14, estilo: "legenda", texto: "Eu tentando entender o grupo da família às 7 da manhã", autor: "BomDiaGrupo", av: "🌻", curtidas: 17500, coment: 388, horas: 30 },
    { id: "ex16", cat: "escola", foto: 15, estilo: "classico", cima: "Eu descobrindo", baixo: "que a prova era hoje", autor: "Desesperado", av: "😱", curtidas: 20400, coment: 533, horas: 36 },
  ];

  // carrega uma foto liberando o uso no canvas (CORS)
  const carregarFoto = (src) => new Promise((ok, erro) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => ok(img);
    img.onerror = erro;
    img.src = src;
  });

  function quebrar(x, texto, larguraMax) {
    const linhas = [];
    texto.split("\n").forEach((par) => {
      let linha = "";
      par.split(" ").forEach((p) => {
        const teste = linha ? linha + " " + p : p;
        if (x.measureText(teste).width > larguraMax && linha) { linhas.push(linha); linha = p; }
        else linha = teste;
      });
      linhas.push(linha);
    });
    return linhas;
  }

  // desenha um meme de exemplo e devolve a imagem pronta
  async function desenharExemplo(m) {
    const T = 640;
    const foto = await carregarFoto(editor.urlFoto(editor.fotos[m.foto].id, T));
    const c = document.createElement("canvas");
    const x = c.getContext("2d");

    if (m.estilo === "legenda") {
      const tam = 30;
      x.font = `${tam}px "Helvetica Neue", Arial, sans-serif`;
      const linhas = quebrar(x, m.texto, T * 0.9);
      const altLinha = tam * 1.3;
      const faixa = Math.round(linhas.length * altLinha + tam * 1.6);
      c.width = T;
      c.height = T + faixa;
      x.fillStyle = "#fff";
      x.fillRect(0, 0, T, faixa);
      x.fillStyle = "#111";
      x.font = `${tam}px "Helvetica Neue", Arial, sans-serif`;
      x.textBaseline = "top";
      linhas.forEach((l, n) => x.fillText(l, T * 0.05, tam * 0.8 + n * altLinha));
      x.drawImage(foto, 0, faixa, T, T);
    } else {
      c.width = c.height = T;
      x.drawImage(foto, 0, 0, T, T);
      x.textAlign = "center";
      x.textBaseline = "middle";
      const escrever = (texto, y) => {
        let tam = 58;
        const t = texto.toUpperCase();
        x.font = `${tam}px Anton, Impact, "Arial Black", sans-serif`;
        while (x.measureText(t).width > T * 0.92 && tam > 30) { tam -= 2; x.font = `${tam}px Anton, Impact, "Arial Black", sans-serif`; }
        x.lineJoin = "round";
        x.lineWidth = tam * 0.14;
        x.strokeStyle = "#000";
        x.strokeText(t, T / 2, y);
        x.fillStyle = "#fff";
        x.fillText(t, T / 2, y);
      };
      escrever(m.cima, T * 0.09);
      escrever(m.baixo, T * 0.91);
    }
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
      id: m.id, cat: m.cat, titulo: m.texto ? m.texto.split("\n").filter(Boolean).join(" ") : `${m.cima} ${m.baixo}`, img: null, fonte: m,
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
  const CARREGANDO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10' fill='%231b1336'/%3E%3C/svg%3E";
  const imagemDe = (p) => p.img || CARREGANDO;

  let seguindo = new Set(ler("meme-seguindo", []));
  const alta = document.getElementById("alta");
  const textoAlta = document.getElementById("texto-alta");
  const secaoAlta = document.getElementById("secao-alta");

  function filtrados() {
    const termo = busca.value.trim().toLowerCase();
    let lista = posts.filter((p) =>
      (categoria === "todos" || p.cat === categoria) &&
      (!termo || p.titulo.toLowerCase().includes(termo) || p.autor.toLowerCase().includes(termo))
    );
    if (aba === "meus") lista = lista.filter((p) => p.meu);
    if (aba === "favoritos") lista = lista.filter((p) => curtidos.has(p.id));
    if (aba === "curtidos") lista = [...lista].sort((a, b) => totalCurtidas(b) - totalCurtidas(a));
    return lista;
  }

  // monta o cartão de um meme (com selo de ranking quando for "em alta")
  function cartao(p, posicao) {
    const card = document.createElement("article");
    card.className = "post";
    const curtido = curtidos.has(p.id);
    const segue = seguindo.has(p.autor);
    card.innerHTML = `
      ${posicao ? `<span class="selo">🔥 ${posicao}</span>` : ""}
      <button type="button" class="post-img" aria-label="Ver meme maior: ${p.titulo}">
        <img src="${imagemDe(p)}" alt="Meme: ${p.titulo}" loading="lazy" width="640" height="640">
      </button>
      <div class="post-barra">
        <button type="button" class="curtir ${curtido ? "curtido" : ""}" aria-pressed="${curtido}" aria-label="Curtir">
          <span class="coracao">${curtido ? "❤️" : "🤍"}</span> <span class="num">${formatar(totalCurtidas(p))}</span>
        </button>
        <span>💬 ${formatar(p.coment)}</span>
        <button type="button" class="baixar-post" aria-label="Baixar meme" title="Baixar">⬇️</button>
        <button type="button" class="compartilhar-post" aria-label="Compartilhar meme" title="Compartilhar">↗</button>
      </div>
      <div class="post-autor">
        <div class="quem"><span class="avatar">${p.av}</span><div>${p.autor}<small>${tempo(p.horas)}</small></div></div>
        ${p.meu ? "" : `<button type="button" class="seguir" aria-pressed="${segue}">${segue ? "Seguindo" : "Seguir"}</button>`}
      </div>`;
    card.querySelector(".post-img").addEventListener("click", () => abrir(p));
    card.querySelector(".curtir").addEventListener("click", () => curtir(p));
    card.querySelector(".baixar-post").addEventListener("click", () => baixar(p));
    card.querySelector(".compartilhar-post").addEventListener("click", () => compartilhar(p));
    card.querySelector(".seguir")?.addEventListener("click", () => seguir(p.autor));
    return card;
  }

  // ---------- telas: Início, Explorar, Categorias, Top Memes, Favoritos e Perfil ----------
  const vista = document.getElementById("vista");
  const secaoNovos = document.getElementById("novos");
  const carrosselEl = document.getElementById("carrossel");
  const chipsEl = document.getElementById("categorias");
  const CATEGORIAS = {
    engracados: { nome: "Engraçados", emoji: "😂", cor: "#ffbe0b" },
    bichos: { nome: "Bichos", emoji: "🐾", cor: "#06d6a0" },
    jogos: { nome: "Games", emoji: "🎮", cor: "#8338ec" },
    escola: { nome: "Escola", emoji: "📚", cor: "#3a86ff" },
    trabalho: { nome: "Trabalho", emoji: "💼", cor: "#f4a261" },
    programacao: { nome: "Programação", emoji: "💻", cor: "#118ab2" },
    reacoes: { nome: "Reações", emoji: "🔥", cor: "#ef476f" },
  };
  let categoriaAberta = null; // categoria escolhida na tela Categorias
  let abaPerfil = "memes";    // "memes" ou "seguindo" na tela Perfil
  let ordemExplorar = null;   // ordem misturada da tela Explorar

  const ordenarPorCurtidas = (lista) => [...lista].sort((a, b) => totalCurtidas(b) - totalCurtidas(a));
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const cabecalho = (emoji, titulo, sub) => el(`<div class="vista-topo"><span class="vista-emoji">${emoji}</span><div><h2>${titulo}</h2>${sub ? `<p>${sub}</p>` : ""}</div></div>`);

  function mostrar() {
    const lista = filtrados();
    const nomes = { curtidos: "Ranking completo", meus: "Meu perfil", favoritos: "Meus favoritos", explorar: "Descubra memes", categorias: "" };
    textoMural.textContent = nomes[aba] ?? "Novos Memes";

    // o que aparece em cada tela
    const editorEl = document.getElementById("criar");
    const conteudoEl = document.getElementById("conteudo");
    editorEl.hidden = aba !== "criar";
    conteudoEl.hidden = aba === "criar";
    carrosselEl.hidden = aba !== "inicio";
    chipsEl.hidden = !["inicio", "explorar"].includes(aba);
    secaoAlta.hidden = aba !== "inicio";
    vista.hidden = aba === "inicio";
    secaoNovos.hidden = ["categorias", "curtidos"].includes(aba) || (aba === "meus" && abaPerfil === "seguindo");
    const cartaoPerfil = document.getElementById("perfil-card");
    if (cartaoPerfil) {
      cartaoPerfil.hidden = aba !== "meus";
      if (aba === "meus" && typeof mostrarPerfil === "function") mostrarPerfil();
    }

    vista.innerHTML = "";
    alta.innerHTML = "";
    let grade = lista;

    if (aba === "inicio") {
      const top = ordenarPorCurtidas(lista).slice(0, 3);
      top.forEach((p, i) => alta.appendChild(cartao(p, i + 1)));
      textoAlta.textContent = categoria === "todos" ? "Memes em alta" : "Em alta nesta categoria";
      grade = lista.filter((p) => !top.includes(p));
    } else if (aba === "explorar") {
      telaExplorar();
      if (!ordemExplorar) ordemExplorar = posts.map((p) => p.id).sort(() => Math.random() - 0.5);
      grade = [...lista].sort((a, b) => ordemExplorar.indexOf(a.id) - ordemExplorar.indexOf(b.id));
    } else if (aba === "categorias") {
      telaCategorias();
    } else if (aba === "curtidos") {
      telaTop();
    } else if (aba === "favoritos") {
      vista.appendChild(cabecalho("❤️", "Favoritos", `${grade.length} ${grade.length === 1 ? "meme curtido" : "memes curtidos"}. Toque no 🤍 de qualquer meme para guardar aqui.`));
    } else if (aba === "meus") {
      telaPerfil();
      if (abaPerfil === "seguindo") grade = [];
    }

    mural.innerHTML = "";
    grade.forEach((p) => mural.appendChild(cartao(p)));
    vazio.hidden = secaoNovos.hidden || grade.length > 0 || (aba === "inicio" && alta.children.length > 0);
    vazio.textContent =
      aba === "meus" ? "Você ainda não publicou nenhum meme. Crie o primeiro lá embaixo!" :
      aba === "favoritos" ? "Nenhum favorito ainda. Curta um meme com o 🤍 e ele aparece aqui." :
      "Nenhum meme encontrado. Que tal criar um?";
    mostrarRanking();
  }

  // ----- Explorar -----
  function telaExplorar() {
    const topo = cabecalho("🧭", "Explorar", "Descubra memes de todas as categorias, numa ordem diferente a cada visita.");
    const acoes = el(`<div class="vista-acoes">
      <button type="button" class="botao-roxo" data-acao="surpresa">🎲 Me surpreenda</button>
      <button type="button" class="botao" data-acao="misturar">🔀 Misturar de novo</button>
      <button type="button" class="botao" data-acao="buscar">🔍 Buscar</button>
    </div>`);
    acoes.querySelector('[data-acao="surpresa"]').addEventListener("click", () => {
      const prontos = posts.filter((p) => p.img);
      if (prontos.length) abrir(prontos[Math.floor(Math.random() * prontos.length)]);
    });
    acoes.querySelector('[data-acao="misturar"]').addEventListener("click", () => { ordemExplorar = null; mostrar(); });
    acoes.querySelector('[data-acao="buscar"]').addEventListener("click", () => busca.focus());
    topo.appendChild(acoes);
    vista.appendChild(topo);
  }

  // ----- Categorias -----
  function telaCategorias() {
    if (categoriaAberta) {
      const c = CATEGORIAS[categoriaAberta];
      const lista = ordenarPorCurtidas(posts.filter((p) => p.cat === categoriaAberta));
      const topo = cabecalho(c.emoji, c.nome, `${lista.length} ${lista.length === 1 ? "meme" : "memes"} nesta categoria`);
      const voltar = el('<button type="button" class="botao voltar-cat">← Todas as categorias</button>');
      voltar.addEventListener("click", () => { categoriaAberta = null; mostrar(); });
      topo.appendChild(voltar);
      vista.appendChild(topo);
      const grade = el('<div class="mural"></div>');
      lista.forEach((p) => grade.appendChild(cartao(p)));
      if (!lista.length) grade.appendChild(el('<p class="vazio">Ainda não tem memes aqui. Crie o primeiro!</p>'));
      vista.appendChild(grade);
      return;
    }
    vista.appendChild(cabecalho("🗂️", "Categorias", "Escolha um assunto e veja só os memes dele."));
    const grade = el('<div class="grade-categorias"></div>');
    Object.entries(CATEGORIAS).forEach(([id, c]) => {
      const lista = ordenarPorCurtidas(posts.filter((p) => p.cat === id));
      const capas = lista.slice(0, 3).map((p) => `<img src="${imagemDe(p)}" alt="">`).join("");
      const tile = el(`<button type="button" class="tile-cat" style="--cor:${c.cor}">
        <span class="tile-capas">${capas}</span>
        <span class="tile-info"><span class="tile-emoji">${c.emoji}</span><b>${c.nome}</b><small>${lista.length} ${lista.length === 1 ? "meme" : "memes"}</small></span>
      </button>`);
      tile.addEventListener("click", () => { categoriaAberta = id; mostrar(); vista.scrollIntoView({ behavior: "smooth", block: "start" }); });
      grade.appendChild(tile);
    });
    vista.appendChild(grade);
  }

  // ----- Top Memes: pódio + ranking -----
  function telaTop() {
    const lista = ordenarPorCurtidas(filtrados());
    vista.appendChild(cabecalho("🏆", "Top Memes", "Os memes mais curtidos do Rodrigo Memes."));
    const [primeiro, segundo, terceiro] = lista;
    const degrau = (p, lugar, medalha) => p ? `
      <div class="degrau lugar-${lugar}">
        ${lugar === 1 ? '<span class="coroa-top">👑</span>' : ""}
        <button type="button" class="degrau-img" data-id="${p.id}" aria-label="Ver meme em ${lugar}º lugar"><img src="${imagemDe(p)}" alt="Meme: ${p.titulo}"></button>
        <span class="medalha">${medalha}</span>
        <b>${p.autor}</b>
        <small>❤ ${formatar(totalCurtidas(p))}</small>
        <span class="base">${lugar}º</span>
      </div>` : "";
    const podio = el(`<div class="podio">${degrau(segundo, 2, "🥈")}${degrau(primeiro, 1, "🥇")}${degrau(terceiro, 3, "🥉")}</div>`);
    podio.querySelectorAll("[data-id]").forEach((b) => b.addEventListener("click", () => abrir(posts.find((p) => p.id === b.dataset.id))));
    vista.appendChild(podio);

    const rank = el('<ol class="ranking-completo" start="4"></ol>');
    lista.slice(3).forEach((p, i) => {
      const li = el(`<li><span class="pos">${i + 4}º</span><img src="${imagemDe(p)}" alt=""><span class="info"><b>${p.titulo}</b><small>${p.autor} · ${CATEGORIAS[p.cat]?.nome || ""}</small></span><span class="likes">❤ ${formatar(totalCurtidas(p))}</span></li>`);
      li.tabIndex = 0;
      li.addEventListener("click", () => abrir(p));
      li.addEventListener("keydown", (e) => { if (e.key === "Enter") abrir(p); });
      rank.appendChild(li);
    });
    vista.appendChild(rank);
  }

  // ----- Perfil: abas Meus memes e Seguindo -----
  function telaPerfil() {
    const abas = el(`<div class="abas-perfil" role="tablist">
      <button type="button" role="tab" data-p="memes" aria-selected="${abaPerfil === "memes"}">🖼️ Meus memes (${meus.length})</button>
      <button type="button" role="tab" data-p="seguindo" aria-selected="${abaPerfil === "seguindo"}">👥 Seguindo (${seguindo.size})</button>
    </div>`);
    abas.querySelectorAll("[data-p]").forEach((b) => b.addEventListener("click", () => { abaPerfil = b.dataset.p; mostrar(); }));
    vista.appendChild(abas);
    if (abaPerfil === "seguindo") {
      const caixa = el('<div class="lista-seguindo"></div>');
      if (!seguindo.size) caixa.appendChild(el('<p class="vazio">Você ainda não segue ninguém. Toque em "Seguir" nos memes que você gostar.</p>'));
      [...seguindo].forEach((autor) => {
        const deles = posts.filter((p) => p.autor === autor);
        const item = el(`<div class="pessoa"><span class="avatar">${deles[0]?.av || "🙂"}</span><span class="info"><b>${autor}</b><small>${deles.length} ${deles.length === 1 ? "meme" : "memes"}</small></span><button type="button" class="seguir" aria-pressed="true">Seguindo</button></div>`);
        item.querySelector(".seguir").addEventListener("click", () => seguir(autor));
        caixa.appendChild(item);
      });
      vista.appendChild(caixa);
    }
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

  function seguir(autor) {
    if (seguindo.has(autor)) seguindo.delete(autor); else seguindo.add(autor);
    guardar("meme-seguindo", [...seguindo]);
    editor.avisar(seguindo.has(autor) ? `Agora você segue ${autor}!` : `Você deixou de seguir ${autor}.`);
    mostrar();
  }

  // compartilha a imagem (celular) ou copia o link do site
  async function compartilhar(p) {
    try {
      if (p.img && navigator.canShare) {
        const blob = await (await fetch(p.img)).blob();
        const arquivo = new File([blob], `meme-${p.id}.jpg`, { type: blob.type || "image/jpeg" });
        if (navigator.canShare({ files: [arquivo] })) { await navigator.share({ files: [arquivo], title: "Rodrigo Memes" }); return; }
      }
      await navigator.clipboard.writeText(location.href.split("#")[0]);
      alertaRapido("Link do site copiado! Cole no WhatsApp para mandar.");
    } catch (e) {
      if (e.name !== "AbortError") alertaRapido("Não deu para compartilhar. Use o botão de baixar.");
    }
  }

  // aviso curto no canto (usado fora do editor)
  function alertaRapido(msg) {
    let caixa = document.getElementById("alerta-rapido");
    if (!caixa) {
      caixa = document.createElement("div");
      caixa.id = "alerta-rapido";
      caixa.setAttribute("role", "status");
      caixa.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:120;background:#8b3dff;color:#fff;padding:12px 20px;border-radius:999px;font:700 .85rem Montserrat,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.4);max-width:90vw;text-align:center";
      document.body.appendChild(caixa);
    }
    caixa.textContent = msg;
    caixa.hidden = false;
    clearTimeout(alertaRapido.t);
    alertaRapido.t = setTimeout(() => (caixa.hidden = true), 3000);
  }

  async function baixar(p) {
    if (!p.img) return;
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
    if (!abertoAgora || !abertoAgora.img) return;
    fechar();
    await editor.usarComoBase(imagemDe(abertoAgora));
    irParaTela("criar");
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
    montarEnfeites();
    irParaTela("meus");
    editor.avisar("Publicado! Ele aparece no seu Perfil, aqui no seu aparelho.");
  });

  // ---------- perfil (salvo só neste navegador; senha nunca é guardada nem mostrada) ----------
  const PERFIL_PADRAO = {
    nome: "Rodrigo Elias",
    usuario: "@rodrigomemes",
    bio: "Criador do Rodrigo Memes. Aqui o humor nunca acaba! 😂",
    email: "",
    whats: "(19) 99293-2822",
    insta: "@its.rodrigoelias",
    foto: null,
  };
  let perfil = { ...PERFIL_PADRAO, ...ler("meme-perfil", {}) };
  const $ = (id) => document.getElementById(id);
  const soNumeros = (t) => (t || "").replace(/\D/g, "");

  function mostrarPerfil() {
    $("perfil-nome").textContent = perfil.nome || "Sem nome";
    $("perfil-usuario").textContent = perfil.usuario ? (perfil.usuario.startsWith("@") ? perfil.usuario : "@" + perfil.usuario) : "";
    $("perfil-bio").textContent = perfil.bio || "";

    const avatar = $("perfil-avatar");
    avatar.innerHTML = "";
    if (perfil.foto) {
      const img = document.createElement("img");
      img.src = perfil.foto;
      img.alt = `Foto de ${perfil.nome}`;
      avatar.appendChild(img);
    } else {
      avatar.textContent = (perfil.nome || "R").trim().charAt(0).toUpperCase();
    }

    // WhatsApp: número com DDI 55 do Brasil
    const numero = soNumeros(perfil.whats);
    const whats = $("perfil-whats");
    whats.hidden = !numero;
    whats.href = `https://wa.me/${numero.startsWith("55") ? numero : "55" + numero}`;
    $("perfil-whats-num").textContent = perfil.whats;

    const email = $("perfil-email");
    email.hidden = !perfil.email;
    email.href = `mailto:${perfil.email}`;
    $("perfil-email-txt").textContent = perfil.email;
    $("perfil-sem-email").hidden = !!perfil.email;

    const insta = $("perfil-insta");
    const user = (perfil.insta || "").replace(/^@/, "").trim();
    insta.hidden = !user;
    insta.href = `https://www.instagram.com/${encodeURIComponent(user)}/`;
    $("perfil-insta-txt").textContent = "@" + user;

    $("num-memes").textContent = meus.length;
    $("num-curtidas").textContent = curtidos.size;
    $("num-seguindo").textContent = seguindo.size;
  }

  const form = $("perfil-form");
  function abrirEdicao() {
    $("campo-nome").value = perfil.nome;
    $("campo-usuario").value = perfil.usuario;
    $("campo-bio").value = perfil.bio;
    $("campo-email").value = perfil.email;
    $("campo-whats").value = perfil.whats;
    $("campo-insta").value = perfil.insta;
    $("campo-foto").value = "";
    $("campo-senha-salvar").value = "";
    $("salvar-msg").textContent = "";
    form.hidden = false;
    $("campo-nome").focus();
  }
  // ----- senha: só o código embaralhado (hash) é guardado, nunca a senha -----
  const telaSenha = $("perfil-senha");
  const campoSenha = $("senha-campo");
  const campoConfirma = $("senha-confirma");
  const msgSenha = $("senha-msg");
  const sucesso = $("perfil-sucesso");
  const temSenha = () => !!ler("meme-senha", null);

  async function embaralhar(texto) {
    const dados = new TextEncoder().encode("rodrigo-memes::" + texto);
    const hash = await crypto.subtle.digest("SHA-256", dados);
    return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function pedirSenha() {
    const criando = !temSenha();
    $("senha-titulo").textContent = criando
      ? "🔒 Crie uma senha para proteger o seu perfil"
      : "🔒 Digite sua senha para editar o perfil";
    $("senha-confirma-rotulo").hidden = !criando;
    campoConfirma.required = criando;
    campoSenha.autocomplete = criando ? "new-password" : "current-password";
    $("senha-entrar").textContent = criando ? "Criar senha" : "Entrar";
    $("senha-esqueci").hidden = criando;
    campoSenha.value = "";
    campoConfirma.value = "";
    msgSenha.textContent = "";
    telaSenha.classList.remove("erro");
    sucesso.hidden = true;
    form.hidden = true;
    telaSenha.hidden = false;
    campoSenha.focus();
  }

  function erroSenha(texto) {
    msgSenha.textContent = texto;
    telaSenha.classList.remove("erro");
    void telaSenha.offsetWidth; // reinicia a animação de tremer
    telaSenha.classList.add("erro");
    campoSenha.select();
  }

  telaSenha.addEventListener("submit", async (e) => {
    e.preventDefault();
    const senha = campoSenha.value;
    if (senha.length < 4) { erroSenha("A senha precisa ter pelo menos 4 caracteres."); return; }

    if (!temSenha()) {
      if (senha !== campoConfirma.value) { erroSenha("As duas senhas não são iguais."); return; }
      guardar("meme-senha", await embaralhar(senha));
      telaSenha.hidden = true;
      alertaRapido("Senha criada!");
      abrirEdicao();
      return;
    }

    if ((await embaralhar(senha)) !== ler("meme-senha", null)) { erroSenha("❌ Senha errada"); return; }
    telaSenha.hidden = true;
    abrirEdicao();
  });

  $("senha-cancelar").addEventListener("click", () => { telaSenha.hidden = true; });

  // esqueceu: apaga a senha e volta o perfil ao padrão (os memes continuam)
  $("senha-esqueci").addEventListener("click", () => {
    msgSenha.innerHTML = "";
    const aviso = document.createElement("span");
    aviso.textContent = "Isso apaga a senha e volta o perfil ao padrão. ";
    const confirmar = document.createElement("button");
    confirmar.type = "button";
    confirmar.className = "link-esqueci";
    confirmar.textContent = "Sim, apagar";
    confirmar.addEventListener("click", () => {
      try { localStorage.removeItem("meme-senha"); localStorage.removeItem("meme-perfil"); } catch (err) {}
      perfil = { ...PERFIL_PADRAO };
      mostrarPerfil();
      pedirSenha();
      alertaRapido("Senha apagada. Crie uma nova.");
    });
    msgSenha.append(aviso, confirmar);
  });

  // editar perfil sempre pede a senha primeiro
  $("perfil-editar").addEventListener("click", () => {
    if (!form.hidden || !telaSenha.hidden) { form.hidden = true; telaSenha.hidden = true; return; }
    pedirSenha();
  });
  $("perfil-cancelar").addEventListener("click", () => { form.hidden = true; });

  // foto de perfil reduzida para caber no navegador
  function lerFoto(arquivo) {
    return new Promise((ok) => {
      if (!arquivo || !arquivo.type.startsWith("image/")) return ok(null);
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = c.height = 240;
        const lado = Math.min(img.width, img.height);
        c.getContext("2d").drawImage(img, (img.width - lado) / 2, (img.height - lado) / 2, lado, lado, 0, 0, 240, 240);
        URL.revokeObjectURL(img.src);
        ok(c.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => ok(null);
      img.src = URL.createObjectURL(arquivo);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = $("campo-email").value.trim();
    if (email && !$("campo-email").checkValidity()) { alertaRapido("Esse e-mail parece estar errado."); return; }

    // dados importantes mudaram? então a senha é pedida de novo para salvar
    const msgSalvar = $("salvar-msg");
    msgSalvar.textContent = "";
    const mudouImportante =
      ($("campo-nome").value.trim() || PERFIL_PADRAO.nome) !== perfil.nome ||
      email !== perfil.email ||
      $("campo-whats").value.trim() !== perfil.whats ||
      $("campo-insta").value.trim() !== perfil.insta;
    if (mudouImportante) {
      const senhaSalvar = $("campo-senha-salvar").value;
      if (!senhaSalvar) { msgSalvar.textContent = "🔑 Digite sua senha para salvar essas mudanças."; $("campo-senha-salvar").focus(); return; }
      if ((await embaralhar(senhaSalvar)) !== ler("meme-senha", null)) {
        msgSalvar.textContent = "❌ Senha errada. Nada foi salvo.";
        $("campo-senha-salvar").select();
        return;
      }
    }
    const novaFoto = await lerFoto($("campo-foto").files[0]);
    const novo = {
      ...perfil,
      nome: $("campo-nome").value.trim() || PERFIL_PADRAO.nome,
      usuario: $("campo-usuario").value.trim(),
      bio: $("campo-bio").value.trim(),
      email,
      whats: $("campo-whats").value.trim(),
      insta: $("campo-insta").value.trim(),
      foto: novaFoto || perfil.foto,
    };
    if (!guardar("meme-perfil", novo)) { alertaRapido("Não deu para salvar. Tente uma foto menor."); return; }
    perfil = novo;
    form.hidden = true;
    mostrarPerfil();
    sucesso.hidden = false;
    clearTimeout(sucesso.t);
    sucesso.t = setTimeout(() => (sucesso.hidden = true), 4000);
    alertaRapido("✅ Salvo com sucesso!");
  });

  // ---------- menu lateral, categorias e busca ----------
  const menuLateral = document.getElementById("menu-lateral");
  const abrirMenu = document.getElementById("abrir-menu");

  function atualizarAbas() {
    document.querySelectorAll(".menu-itens [data-aba]").forEach((b) => b.classList.toggle("ativo", b.dataset.aba === aba));
    document.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("ativo", b.dataset.cat === categoria));
  }

  function fecharMenu() {
    menuLateral.classList.remove("aberto");
    abrirMenu.setAttribute("aria-expanded", "false");
  }

  const ENDERECOS = { inicio: "", criar: "criar", explorar: "explorar", categorias: "categorias", curtidos: "top", favoritos: "favoritos", meus: "perfil" };
  const abaDoEndereco = () => Object.keys(ENDERECOS).find((k) => ENDERECOS[k] === location.hash.slice(1)) || "inicio";

  function irParaTela(nova, mudarEndereco = true) {
    aba = nova;
    if (nova !== "categorias") categoriaAberta = null;
    if (nova !== "explorar") ordemExplorar = null;
    if (nova !== "inicio" && nova !== "explorar") categoria = "todos";
    atualizarAbas();
    mostrar();
    fecharMenu();
    if (mudarEndereco) history.pushState(null, "", ENDERECOS[nova] ? "#" + ENDERECOS[nova] : location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-aba]").forEach((b) => b.addEventListener("click", () => irParaTela(b.dataset.aba)));
  window.addEventListener("popstate", () => irParaTela(abaDoEndereco(), false));
  window.addEventListener("hashchange", () => { if (abaDoEndereco() !== aba) irParaTela(abaDoEndereco(), false); });
  document.querySelectorAll('a[href="#criar"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); irParaTela("criar"); }));
  // links do menu (Explorar, Categorias, Criar) também fecham a gaveta no celular
  menuLateral.querySelectorAll("a").forEach((a) => a.addEventListener("click", fecharMenu));

  document.querySelectorAll("[data-cat]").forEach((b) =>
    b.addEventListener("click", () => { categoria = b.dataset.cat; atualizarAbas(); mostrar(); })
  );
  busca.addEventListener("input", mostrar);

  // menu em gaveta no celular
  abrirMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    const aberto = menuLateral.classList.toggle("aberto");
    abrirMenu.setAttribute("aria-expanded", aberto);
  });
  document.addEventListener("click", (e) => {
    if (menuLateral.classList.contains("aberto") && !menuLateral.contains(e.target)) fecharMenu();
  });

  // Ctrl + K (ou Cmd + K) vai para a busca; Esc fecha o menu
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); busca.focus(); busca.select(); }
    if (e.key === "Escape") fecharMenu();
  });

  document.getElementById("sino").addEventListener("click", () =>
    alertaRapido("Novidade: fotos de bichos, legenda estilo conversa e figurinhas exclusivas!")
  );

  // ---------- enfeites do banner ----------
  // figurinhas originais + emojis; os memes que a própria pessoa publicou também entram
  const caixaEnfeites = document.getElementById("enfeites");
  const LUGARES = [
    [3, 8, -12], [12, 62, 10], [42, 4, 8], [58, 70, -9], [86, 6, 12], [93, 58, -14],
    [27, 82, -6], [74, 30, 6], [50, 40, -4], [66, 88, 14],
  ];
  // imagem do banner escolhida pela própria pessoa (guardada só no navegador dela)
  let imagemBanner = ler("meme-banner", null);
  const tigresaDoBanner = () => imagemBanner || (editor.personagens || [])[0];

  // só figurinhas desenhadas (sem emojis); a Tigresa Voadora (posição 0) aparece mais vezes
  const ORDEM = [0, 2, 0, 1, 0, 4, 0, 3, 0, 5];

  function montarEnfeites() {
    if (!caixaEnfeites) return;
    caixaEnfeites.innerHTML = "";
    const proprios = meus.slice(0, 4).map((m) => m.img);
    const figs = editor.personagens || [];
    LUGARES.forEach(([x, y, giro], i) => {
      const el = document.createElement("span");
      const longe = i >= 6 ? " longe" : "";
      if (i < proprios.length) {
        el.className = "enfeite-meme" + longe;
        el.innerHTML = `<img src="${proprios[i]}" alt="">`;
      } else {
        const qual = ORDEM[i % ORDEM.length];
        el.className = "enfeite-fig" + longe + (qual === 0 ? " tigresa" : "");
        el.style.setProperty("--tam", `${qual === 0 ? 70 + (i % 3) * 14 : 44 + (i % 3) * 10}px`);
        el.innerHTML = `<img src="${qual === 0 ? tigresaDoBanner() : figs[qual] || figs[0]}" alt="">`;
      }
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      el.style.setProperty("--giro", `${giro}deg`);
      el.style.setProperty("--tempo", `${4 + (i % 4)}s`);
      el.style.animationDelay = `${-i * 0.7}s`;
      caixaEnfeites.appendChild(el);
    });
  }
  montarEnfeites();

  // ---------- banner em slides (mascotes originais do site) ----------
  const slides = [...document.querySelectorAll(".slide")];
  const bolinhas = document.getElementById("bolinhas");
  const mascotes = editor.personagens || [];
  let atual = 0;
  let timer = null;
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  slides.forEach((s, i) => {
    const img = s.querySelector(".slide-mascote");
    const m = mascotes[+s.dataset.mascote];
    if (img && m) img.src = m;
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Destaque ${i + 1}`);
    b.addEventListener("click", () => irPara(i, true));
    bolinhas.appendChild(b);
  });
  // primeiro slide usa a imagem escolhida pela pessoa, se houver
  const mascotePrincipal = slides[0]?.querySelector(".slide-mascote");
  const bannerArquivo = document.getElementById("banner-arquivo");
  const bannerVoltar = document.getElementById("banner-voltar");

  function aplicarBanner() {
    if (mascotePrincipal) mascotePrincipal.src = tigresaDoBanner();
    bannerVoltar.hidden = !imagemBanner;
    montarEnfeites();
  }

  bannerArquivo.addEventListener("change", (e) => {
    const arquivo = e.target.files[0];
    e.target.value = "";
    if (!arquivo || !arquivo.type.startsWith("image/")) { alertaRapido("Escolha um arquivo de imagem."); return; }
    const img = new Image();
    img.onload = () => {
      // reduz a imagem para caber no navegador sem ocupar muito espaço
      const c = document.createElement("canvas");
      const escala = Math.min(1, 600 / Math.max(img.width, img.height));
      c.width = Math.round(img.width * escala);
      c.height = Math.round(img.height * escala);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      const dados = c.toDataURL("image/png");
      if (!guardar("meme-banner", dados)) { alertaRapido("Essa imagem é grande demais. Tente uma menor."); return; }
      imagemBanner = dados;
      aplicarBanner();
      alertaRapido("Pronto! A imagem aparece no banner só neste aparelho.");
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => alertaRapido("Não consegui abrir essa imagem.");
    img.src = URL.createObjectURL(arquivo);
  });

  bannerVoltar.addEventListener("click", () => {
    try { localStorage.removeItem("meme-banner"); } catch (e) {}
    imagemBanner = null;
    aplicarBanner();
    alertaRapido("O banner voltou ao padrão.");
  });

  const logo = document.getElementById("logo-mascote");
  if (logo && mascotes[4]) logo.src = mascotes[4];

  function irPara(i, manual) {
    atual = (i + slides.length) % slides.length;
    slides.forEach((s, n) => { s.classList.toggle("ativo", n === atual); s.setAttribute("aria-hidden", n !== atual); });
    [...bolinhas.children].forEach((b, n) => b.setAttribute("aria-current", n === atual));
    if (manual) reiniciar();
  }
  function reiniciar() {
    clearInterval(timer);
    if (!semMovimento) timer = setInterval(() => irPara(atual + 1), 6000);
  }
  document.getElementById("slide-ant").addEventListener("click", () => irPara(atual - 1, true));
  document.getElementById("slide-prox").addEventListener("click", () => irPara(atual + 1, true));
  irPara(0);
  reiniciar();

  // ---------- começa ----------
  montarPosts();
  aba = abaDoEndereco();
  atualizarAbas();
  mostrar();
  // espera a fonte de meme e as fotos; cada exemplo aparece assim que fica pronto
  document.fonts.load('58px "Anton"').finally(() => {
    posts.filter((p) => !p.meu).forEach((p) => {
      desenharExemplo(p.fonte)
        .then((img) => { p.img = img; mostrar(); })
        .catch(() => { p.falhou = true; });
    });
  });
})();
