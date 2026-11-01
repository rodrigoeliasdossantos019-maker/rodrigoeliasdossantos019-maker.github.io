// ===== MemesLab — editor de memes =====
// Tudo acontece no navegador: a foto nunca sai do aparelho da pessoa.
(() => {
  const tela = document.getElementById("tela");
  const ctx = tela.getContext("2d");
  const moldura = document.getElementById("moldura");
  const listaTextos = document.getElementById("lista-textos");
  const aviso = document.getElementById("aviso");
  const LADO = 1080; // largura final da imagem
  const FONTE_EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif';

  // ---------- fundos prontos (desenhados aqui, sem imagens de terceiros) ----------
  const MODELOS = [
    { nome: "Fundo preto", w: 1080, h: 1080, textos: ["Ninguém:", "Eu às 3 da manhã:"],
      desenhar(c, w, h) { c.fillStyle = "#0b0b0b"; c.fillRect(0, 0, w, h); } },
    { nome: "Fundo branco", w: 1080, h: 1080, textos: ["Quando você", "termina o código de primeira"],
      cor: "#111111", borda: "#ffffff", sombra: false,
      desenhar(c, w, h) { c.fillStyle = "#fff"; c.fillRect(0, 0, w, h); } },
    { nome: "Roxo", w: 1080, h: 1080, textos: ["Segunda-feira", "chegou de novo"],
      desenhar(c, w, h) {
        const g = c.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#170c33"); g.addColorStop(0.6, "#5a1fd1"); g.addColorStop(1, "#ff4d8d");
        c.fillStyle = g; c.fillRect(0, 0, w, h);
      } },
    { nome: "Isso ou aquilo", w: 1080, h: 1080, textos: ["Isso", "Aquilo"], posicoes: [[0.25, 0.5], [0.75, 0.5]],
      desenhar(c, w, h) {
        c.fillStyle = "#1f6feb"; c.fillRect(0, 0, w / 2, h);
        c.fillStyle = "#e5484d"; c.fillRect(w / 2, 0, w / 2, h);
        c.fillStyle = "#fff"; c.font = `${w * 0.08}px Anton, Impact, sans-serif`;
        c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("VS", w / 2, h * 0.88);
      } },
    { nome: "Antes e depois", w: 1080, h: 1080, textos: ["Antes do café", "Depois do café"], posicoes: [[0.5, 0.25], [0.5, 0.75]],
      desenhar(c, w, h) {
        c.fillStyle = "#3b3b3b"; c.fillRect(0, 0, w, h / 2);
        c.fillStyle = "#f2b33d"; c.fillRect(0, h / 2, w, h / 2);
        c.fillStyle = "#000"; c.fillRect(0, h / 2 - 4, w, 8);
      } },
    { nome: "Story", w: 1080, h: 1920, textos: ["Eu explicando", "o que eu faço no trabalho"],
      desenhar(c, w, h) {
        const g = c.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "#1b1035"); g.addColorStop(1, "#05020d");
        c.fillStyle = g; c.fillRect(0, 0, w, h);
        c.fillStyle = "rgba(176,124,255,.4)";
        for (let i = 0; i < 60; i++) { c.beginPath(); c.arc((i * 137) % w, (i * 251) % h, (i % 3) + 1.5, 0, Math.PI * 2); c.fill(); }
      } },
  ];

  // ---------- figurinhas (emojis do próprio aparelho) ----------
  const FIGURINHAS = {
    "😂 Risada": "😂 🤣 😹 😆 😅 😁 😜 🤪 😝 🙃 😏 😎 🤓 🥸 🤠 🥳",
    "😭 Drama": "😭 😢 🥲 😩 😫 😤 😡 🤬 😱 😨 😰 🥶 🥵 🤯 😵‍💫 😵",
    "🤡 Zoeira": "🤡 💀 ☠️ 👻 🗿 🤖 👽 👾 💩 🙈 🙉 🙊 🧠 👀 👁️ 🫠",
    "🤔 Reações": "🤔 🧐 🤨 😐 😑 🙄 😬 🫢 🤭 🫣 🤫 😴 🥱 🤤 😳 🥺",
    "👍 Mãos": "👍 👎 👌 🤌 🤏 ✌️ 🤞 🫰 🤙 👏 🙌 🙏 💪 🫵 👉 🤦",
    "🐸 Bichos": "🐸 🐶 🐱 🐵 🐔 🦆 🐧 🐷 🐮 🦖 🐍 🦄 🐌 🦥 🐻 🦍",
    "🔥 Coisas": "🔥 💯 ❤️ 💔 ✨ ⭐ 💥 💢 💤 💸 🎉 🏆 🚀 💣 🧨 ⚡",
    "🍕 Comida": "🍕 🍔 🌭 🍟 🥤 ☕ 🍩 🍫 🍿 🧃 🍺 🥩 🌶️ 🥑 🍌 🧀",
    "⚽ Vida": "⚽ 🎮 📱 💻 📚 ✏️ 💼 🏠 🚗 🛌 🚿 📉 📈 ⏰ 🧾 💰",
  };

  // ---------- estado ----------
  const estado = {
    imagem: null,      // foto enviada
    modelo: MODELOS[0],
    textos: [],        // { texto, x, y } com x/y de 0 a 1
    figurinhas: [],    // { emoji, x, y, tam, giro }
    ativo: 0,          // texto selecionado
    figAtiva: -1,      // figurinha selecionada
  };

  const campo = (id) => document.getElementById(id);
  const estilo = () => ({
    fonte: campo("fonte").value,
    tamanho: +campo("tamanho").value,
    cor: campo("cor").value,
    borda: campo("borda").value,
    maiusculas: campo("maiusculas").checked,
    sombra: campo("sombra").checked,
  });

  function avisar(msg) {
    aviso.textContent = msg;
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => (aviso.textContent = ""), 3500);
  }

  // ---------- desenho ----------
  function quebrarLinhas(texto, larguraMax) {
    const linhas = [];
    texto.split("\n").forEach((paragrafo) => {
      let linha = "";
      paragrafo.split(" ").forEach((p) => {
        const teste = linha ? linha + " " + p : p;
        if (ctx.measureText(teste).width > larguraMax && linha) { linhas.push(linha); linha = p; }
        else linha = teste;
      });
      linhas.push(linha);
    });
    return linhas;
  }

  // caixas de toque: textos e figurinhas
  let caixas = [];

  function tamanhoTela() {
    if (estado.imagem) {
      const prop = estado.imagem.height / estado.imagem.width;
      return { w: LADO, h: Math.round(Math.min(Math.max(LADO * prop, LADO * 0.4), LADO * 2)) };
    }
    return { w: estado.modelo.w, h: estado.modelo.h };
  }

  function desenhar({ semSelecao = false } = {}) {
    const { w, h } = tamanhoTela();
    if (tela.width !== w || tela.height !== h) { tela.width = w; tela.height = h; }

    ctx.clearRect(0, 0, w, h);
    if (estado.imagem) ctx.drawImage(estado.imagem, 0, 0, w, h);
    else estado.modelo.desenhar(ctx, w, h);

    caixas = [];

    // figurinhas ficam embaixo dos textos
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    estado.figurinhas.forEach((f, i) => {
      const cx = f.x * w, cy = f.y * h;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((f.giro * Math.PI) / 180);
      ctx.font = `${f.tam}px ${FONTE_EMOJI}`;
      ctx.fillText(f.emoji, 0, f.tam * 0.05);
      ctx.restore();
      const meio = f.tam * 0.6;
      caixas.push({ tipo: "fig", i, x: cx - meio, y: cy - meio, w: meio * 2, h: meio * 2 });
      if (!semSelecao && i === estado.figAtiva) {
        ctx.save();
        ctx.strokeStyle = "#b07cff";
        ctx.lineWidth = 4;
        ctx.setLineDash([14, 10]);
        ctx.strokeRect(cx - meio, cy - meio, meio * 2, meio * 2);
        ctx.restore();
      }
    });

    // textos
    const e = estilo();
    const tam = e.tamanho * (w / LADO);
    ctx.font = `${tam}px "${e.fonte}", Impact, "Arial Black", sans-serif`;
    ctx.lineJoin = "round";
    ctx.miterLimit = 2;

    estado.textos.forEach((item, i) => {
      if (!item.texto.trim()) return;
      const conteudo = e.maiusculas ? item.texto.toUpperCase() : item.texto;
      const linhas = quebrarLinhas(conteudo, w * 0.92);
      const altLinha = tam * 1.12;
      const cx = item.x * w, cy = item.y * h;
      const topo = cy - (altLinha * (linhas.length - 1)) / 2;
      let maior = 0;
      linhas.forEach((l, n) => {
        const y = topo + n * altLinha;
        if (e.sombra) { ctx.lineWidth = Math.max(2, tam * 0.12); ctx.strokeStyle = e.borda; ctx.strokeText(l, cx, y); }
        ctx.fillStyle = e.cor;
        ctx.fillText(l, cx, y);
        maior = Math.max(maior, ctx.measureText(l).width);
      });
      caixas.push({ tipo: "texto", i, x: cx - maior / 2 - 10, y: topo - altLinha / 2 - 6, w: maior + 20, h: altLinha * linhas.length + 12 });
    });
  }

  // ---------- textos ----------
  function posicaoPadrao(i) {
    if (estado.modelo.posicoes && !estado.imagem && estado.modelo.posicoes[i]) {
      const [x, y] = estado.modelo.posicoes[i];
      return { x, y };
    }
    if (i === 0) return { x: 0.5, y: 0.12 };
    if (i === 1) return { x: 0.5, y: 0.88 };
    return { x: 0.5, y: 0.5 };
  }

  function definirTextos(lista) {
    estado.textos = lista.map((texto, i) => ({ texto, ...posicaoPadrao(i) }));
    estado.ativo = 0;
    montarLista();
    desenhar();
  }

  function montarLista() {
    listaTextos.innerHTML = "";
    estado.textos.forEach((item, i) => {
      const linha = document.createElement("div");
      linha.className = "item-texto" + (i === estado.ativo ? " ativo" : "");
      const area = document.createElement("textarea");
      area.rows = 1;
      area.value = item.texto;
      area.placeholder = i === 0 ? "Texto de cima" : i === 1 ? "Texto de baixo" : `Texto ${i + 1}`;
      area.setAttribute("aria-label", area.placeholder);
      area.addEventListener("input", () => { item.texto = area.value; desenhar(); });
      area.addEventListener("focus", () => marcarAtivo(i));
      const remover = document.createElement("button");
      remover.type = "button";
      remover.className = "remover";
      remover.textContent = "✕";
      remover.setAttribute("aria-label", `Remover ${area.placeholder.toLowerCase()}`);
      remover.addEventListener("click", () => {
        estado.textos.splice(i, 1);
        estado.ativo = Math.max(0, Math.min(estado.ativo, estado.textos.length - 1));
        montarLista();
        desenhar();
      });
      linha.append(area, remover);
      listaTextos.appendChild(linha);
    });
  }

  function marcarAtivo(i) {
    estado.ativo = i;
    [...listaTextos.children].forEach((el, n) => el.classList.toggle("ativo", n === i));
  }

  campo("add-texto").addEventListener("click", () => {
    estado.textos.push({ texto: "Novo texto", x: 0.5, y: 0.5 });
    estado.ativo = estado.textos.length - 1;
    montarLista();
    desenhar();
    const ultimo = listaTextos.lastElementChild?.querySelector("textarea");
    if (ultimo) { ultimo.focus(); ultimo.select(); }
  });

  // ---------- figurinhas ----------
  const abasFig = campo("abas-fig");
  const gradeFig = campo("figurinhas");
  const controleFig = campo("fig-controle");

  function mostrarGrupo(nome) {
    [...abasFig.children].forEach((b) => b.setAttribute("aria-pressed", b.dataset.grupo === nome));
    gradeFig.innerHTML = "";
    FIGURINHAS[nome].split(" ").forEach((emoji) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = emoji;
      b.setAttribute("aria-label", `Colocar figurinha ${emoji}`);
      b.addEventListener("click", () => colocarFigurinha(emoji));
      gradeFig.appendChild(b);
    });
  }

  Object.keys(FIGURINHAS).forEach((nome, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = nome;
    b.dataset.grupo = nome;
    b.addEventListener("click", () => mostrarGrupo(nome));
    abasFig.appendChild(b);
    if (i === 0) mostrarGrupo(nome);
  });

  function colocarFigurinha(emoji) {
    // cada nova figurinha aparece num lugar um pouco diferente
    const n = estado.figurinhas.length;
    estado.figurinhas.push({ emoji, x: 0.5 + ((n % 3) - 1) * 0.18, y: 0.5 + ((Math.floor(n / 3) % 3) - 1) * 0.12, tam: 220, giro: 0 });
    selecionarFigurinha(estado.figurinhas.length - 1);
    desenhar();
    avisar("Figurinha colocada! Arraste no meme para mudar de lugar.");
  }

  function selecionarFigurinha(i) {
    estado.figAtiva = i;
    const f = estado.figurinhas[i];
    controleFig.hidden = !f;
    if (f) { campo("fig-tamanho").value = f.tam; campo("fig-giro").value = f.giro; }
  }

  campo("fig-tamanho").addEventListener("input", (e) => {
    const f = estado.figurinhas[estado.figAtiva];
    if (f) { f.tam = +e.target.value; desenhar(); }
  });
  campo("fig-giro").addEventListener("input", (e) => {
    const f = estado.figurinhas[estado.figAtiva];
    if (f) { f.giro = +e.target.value; desenhar(); }
  });
  campo("fig-remover").addEventListener("click", () => {
    if (estado.figAtiva < 0) return;
    estado.figurinhas.splice(estado.figAtiva, 1);
    selecionarFigurinha(-1);
    desenhar();
  });

  // ---------- fundos prontos ----------
  const caixaModelos = campo("modelos");
  MODELOS.forEach((m) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "modelo";
    b.title = m.nome;
    b.setAttribute("aria-label", `Fundo: ${m.nome}`);
    b.setAttribute("aria-pressed", m === estado.modelo);
    const mini = document.createElement("canvas");
    mini.width = 160;
    mini.height = 160;
    m.desenhar(mini.getContext("2d"), 160, 160);
    b.appendChild(mini);
    b.addEventListener("click", () => escolherModelo(m));
    caixaModelos.appendChild(b);
  });

  function escolherModelo(m) {
    estado.imagem = null;
    estado.modelo = m;
    [...caixaModelos.children].forEach((b, i) => b.setAttribute("aria-pressed", MODELOS[i] === m));
    campo("cor").value = m.cor || "#ffffff";
    campo("borda").value = m.borda || "#000000";
    campo("sombra").checked = m.sombra !== false;
    definirTextos(m.textos);
  }

  // ---------- foto (botão, arrastar e soltar, colar) ----------
  async function usarImagem(src, avisoTexto) {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    await img.decode();
    estado.imagem = img;
    [...caixaModelos.children].forEach((b) => b.setAttribute("aria-pressed", "false"));
    campo("cor").value = "#ffffff";
    campo("borda").value = "#000000";
    campo("sombra").checked = true;
    if (!estado.textos.length) definirTextos(["Texto de cima", "Texto de baixo"]);
    else { estado.textos.forEach((t, i) => Object.assign(t, posicaoPadrao(i))); desenhar(); }
    if (avisoTexto) avisar(avisoTexto);
  }

  async function carregarArquivo(arquivo) {
    if (!arquivo || !arquivo.type.startsWith("image/")) { avisar("Escolha um arquivo de imagem (JPG, PNG, WebP…)."); return; }
    try { await usarImagem(URL.createObjectURL(arquivo), "Foto carregada. Agora escreva o texto e coloque figurinhas!"); }
    catch (e) { avisar("Não consegui abrir essa imagem. Tente outra."); }
  }

  campo("arquivo").addEventListener("change", (e) => { carregarArquivo(e.target.files[0]); e.target.value = ""; });
  ["dragenter", "dragover"].forEach((ev) => moldura.addEventListener(ev, (e) => { e.preventDefault(); moldura.classList.add("soltando"); }));
  ["dragleave", "drop"].forEach((ev) => moldura.addEventListener(ev, (e) => { e.preventDefault(); moldura.classList.remove("soltando"); }));
  moldura.addEventListener("drop", (e) => carregarArquivo(e.dataTransfer.files[0]));
  document.addEventListener("paste", (e) => {
    const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
    if (item) carregarArquivo(item.getAsFile());
  });

  // ---------- arrastar textos e figurinhas (mouse e dedo) ----------
  let arrastando = null;

  function pontoNaTela(e) {
    const r = tela.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * tela.width, y: ((e.clientY - r.top) / r.height) * tela.height };
  }

  tela.addEventListener("pointerdown", (e) => {
    const p = pontoNaTela(e);
    for (let n = caixas.length - 1; n >= 0; n--) {
      const c = caixas[n];
      if (p.x >= c.x && p.x <= c.x + c.w && p.y >= c.y && p.y <= c.y + c.h) {
        const alvo = c.tipo === "fig" ? estado.figurinhas[c.i] : estado.textos[c.i];
        arrastando = { alvo, dx: p.x - alvo.x * tela.width, dy: p.y - alvo.y * tela.height };
        if (c.tipo === "fig") selecionarFigurinha(c.i);
        else { marcarAtivo(c.i); selecionarFigurinha(-1); }
        tela.setPointerCapture(e.pointerId);
        tela.classList.add("arrastando");
        desenhar();
        e.preventDefault();
        return;
      }
    }
    // tocou fora: tira a seleção da figurinha
    if (estado.figAtiva >= 0) { selecionarFigurinha(-1); desenhar(); }
  });

  tela.addEventListener("pointermove", (e) => {
    if (!arrastando) return;
    const p = pontoNaTela(e);
    arrastando.alvo.x = Math.min(0.98, Math.max(0.02, (p.x - arrastando.dx) / tela.width));
    arrastando.alvo.y = Math.min(0.98, Math.max(0.02, (p.y - arrastando.dy) / tela.height));
    desenhar();
  });

  const soltar = () => { arrastando = null; tela.classList.remove("arrastando"); };
  tela.addEventListener("pointerup", soltar);
  tela.addEventListener("pointercancel", soltar);

  // ---------- estilo ----------
  ["tamanho", "cor", "borda", "maiusculas", "sombra"].forEach((id) => campo(id).addEventListener("input", () => desenhar()));
  campo("fonte").addEventListener("change", () => document.fonts.load(`80px "${campo("fonte").value}"`).then(() => desenhar()));

  campo("limpar").addEventListener("click", () => {
    campo("fonte").value = "Anton";
    campo("tamanho").value = 88;
    campo("maiusculas").checked = true;
    estado.figurinhas = [];
    selecionarFigurinha(-1);
    escolherModelo(MODELOS[0]);
    avisar("Tudo limpo. Comece de novo!");
  });

  // ---------- baixar, copiar e compartilhar ----------
  function imagemFinal(tipo = "image/png", qualidade) {
    desenhar({ semSelecao: true });
    return new Promise((ok) => tela.toBlob((blob) => { desenhar(); ok(blob); }, tipo, qualidade));
  }
  const nomeArquivo = () => `meme-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;

  function baixarBlob(blob, nome) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  campo("baixar").addEventListener("click", async () => { baixarBlob(await imagemFinal(), nomeArquivo()); avisar("Meme baixado!"); });

  campo("copiar").addEventListener("click", async () => {
    try {
      const blob = await imagemFinal();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      avisar("Imagem copiada. É só colar no WhatsApp ou onde quiser.");
    } catch (e) {
      avisar("Seu navegador não deixa copiar imagens. Use o botão Baixar.");
    }
  });

  const botaoCompartilhar = campo("compartilhar");
  if (navigator.canShare && navigator.share) {
    botaoCompartilhar.hidden = false;
    botaoCompartilhar.addEventListener("click", async () => {
      try {
        const arquivo = new File([await imagemFinal()], nomeArquivo(), { type: "image/png" });
        if (navigator.canShare({ files: [arquivo] })) await navigator.share({ files: [arquivo], title: "Meu meme" });
        else avisar("Seu aparelho não compartilha imagens por aqui. Use o botão Baixar.");
      } catch (e) {
        if (e.name !== "AbortError") avisar("Não deu para compartilhar. Use o botão Baixar.");
      }
    });
  }

  // ---------- usado pelo mural (mural.js) ----------
  window.EditorMemes = {
    // imagem menor (JPEG) para guardar no mural sem ocupar muito espaço
    async miniatura() {
      desenhar({ semSelecao: true });
      const c = document.createElement("canvas");
      const escala = Math.min(1, 640 / tela.width);
      c.width = Math.round(tela.width * escala);
      c.height = Math.round(tela.height * escala);
      c.getContext("2d").drawImage(tela, 0, 0, c.width, c.height);
      desenhar();
      return c.toDataURL("image/jpeg", 0.82);
    },
    textoPrincipal: () => estado.textos.map((t) => t.texto).filter(Boolean).join(" / "),
    categoria: () => campo("categoria").value,
    usarComoBase: (src) => usarImagem(src, "Pronto! Edite o texto e coloque figurinhas."),
    avisar,
    baixarBlob,
  };

  // ---------- começa com um exemplo pronto ----------
  escolherModelo(MODELOS[0]);
  document.fonts.load('80px "Anton"').then(() => desenhar()).catch(() => {});
})();
