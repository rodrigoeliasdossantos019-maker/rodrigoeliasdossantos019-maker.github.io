// ===== Rodrigo Memes — editor de memes =====
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

  // ---------- personagens originais do Rodrigo Memes (desenhados aqui, criação própria) ----------
  const olho = (c, x, y, r, tipo = "normal") => {
    c.fillStyle = "#fff"; c.beginPath(); c.ellipse(x, y, r, r * 1.1, 0, 0, 7); c.fill();
    c.fillStyle = "#1a1a1a";
    if (tipo === "debochado") { c.beginPath(); c.ellipse(x, y + r * 0.35, r * 0.55, r * 0.5, 0, 0, 7); c.fill(); c.fillStyle = "#e8913a"; c.fillRect(x - r * 1.1, y - r * 1.2, r * 2.2, r * 1.1); }
    else if (tipo === "sono") { c.strokeStyle = "#1a1a1a"; c.lineWidth = r * 0.3; c.beginPath(); c.arc(x, y, r * 0.7, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }
    else if (tipo === "chocado") { c.beginPath(); c.arc(x, y, r * 0.35, 0, 7); c.fill(); }
    else { c.beginPath(); c.arc(x, y + r * 0.15, r * 0.5, 0, 7); c.fill(); c.fillStyle = "#fff"; c.beginPath(); c.arc(x + r * 0.2, y - r * 0.1, r * 0.17, 0, 7); c.fill(); }
  };
  const lagrima = (c, x, y, s) => { c.fillStyle = "#5ec8ff"; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + s, y + s * 1.6, x, y + s * 2); c.quadraticCurveTo(x - s, y + s * 1.6, x, y); c.fill(); };

  const PERSONAGENS = [
    { nome: "Gato Debochado", desenhar(c) {
      c.fillStyle = "#e8913a";
      c.beginPath(); c.moveTo(70, 150); c.lineTo(95, 40); c.lineTo(165, 110); c.fill();
      c.beginPath(); c.moveTo(330, 150); c.lineTo(305, 40); c.lineTo(235, 110); c.fill();
      c.beginPath(); c.ellipse(200, 210, 150, 135, 0, 0, 7); c.fill();
      c.fillStyle = "#c46f22"; [[-40, 90], [0, 85], [40, 90]].forEach(([dx, y]) => { c.fillRect(200 + dx - 6, y, 12, 40); });
      olho(c, 145, 200, 30, "debochado"); olho(c, 255, 200, 30, "debochado");
      c.fillStyle = "#ff8fa3"; c.beginPath(); c.moveTo(188, 248); c.lineTo(212, 248); c.lineTo(200, 262); c.fill();
      c.strokeStyle = "#5a2d0c"; c.lineWidth = 7; c.lineCap = "round";
      c.beginPath(); c.moveTo(170, 285); c.quadraticCurveTo(210, 300, 245, 272); c.stroke();
      c.lineWidth = 4; [[-1, 250], [-1, 268], [1, 250], [1, 268]].forEach(([l, y]) => { c.beginPath(); c.moveTo(200 + l * 70, y); c.lineTo(200 + l * 150, y + (y - 259) * 0.6); c.stroke(); });
    } },
    { nome: "Cão Estiloso", desenhar(c) {
      c.fillStyle = "#6b4226"; c.beginPath(); c.ellipse(75, 200, 50, 105, 0.25, 0, 7); c.fill(); c.beginPath(); c.ellipse(325, 200, 50, 105, -0.25, 0, 7); c.fill();
      c.fillStyle = "#a8743f"; c.beginPath(); c.ellipse(200, 205, 140, 145, 0, 0, 7); c.fill();
      c.fillStyle = "#e9c99a"; c.beginPath(); c.ellipse(200, 275, 85, 65, 0, 0, 7); c.fill();
      c.fillStyle = "#111"; c.beginPath(); c.roundRect(95, 160, 95, 60, 18); c.fill(); c.beginPath(); c.roundRect(210, 160, 95, 60, 18); c.fill(); c.fillRect(185, 175, 30, 10);
      c.fillStyle = "rgba(255,255,255,.35)"; c.fillRect(110, 170, 30, 8); c.fillRect(225, 170, 30, 8);
      c.fillStyle = "#222"; c.beginPath(); c.ellipse(200, 250, 26, 18, 0, 0, 7); c.fill();
      c.strokeStyle = "#3b2414"; c.lineWidth = 7; c.lineCap = "round"; c.beginPath(); c.moveTo(165, 300); c.quadraticCurveTo(200, 325, 240, 295); c.stroke();
    } },
    { nome: "Pato Sonolento", desenhar(c) {
      c.fillStyle = "#ffd23f"; c.beginPath(); c.ellipse(200, 215, 145, 140, 0, 0, 7); c.fill();
      c.beginPath(); c.moveTo(180, 75); c.quadraticCurveTo(200, 30, 220, 78); c.fill();
      olho(c, 150, 190, 28, "sono"); olho(c, 250, 190, 28, "sono");
      c.fillStyle = "#ff8c1a"; c.beginPath(); c.ellipse(200, 262, 70, 30, 0, 0, 7); c.fill();
      c.strokeStyle = "#c95f00"; c.lineWidth = 4; c.beginPath(); c.moveTo(135, 262); c.lineTo(265, 262); c.stroke();
      c.fillStyle = "#fff"; c.font = "bold 46px Arial"; c.fillText("z", 320, 110); c.font = "bold 64px Arial"; c.fillText("Z", 345, 60);
    } },
    { nome: "Chorando de Rir", desenhar(c) {
      c.fillStyle = "#8b3dff"; c.beginPath(); c.ellipse(200, 210, 150, 145, 0, 0, 7); c.fill();
      c.strokeStyle = "#1a1030"; c.lineWidth = 12; c.lineCap = "round";
      c.beginPath(); c.moveTo(115, 175); c.lineTo(160, 195); c.lineTo(115, 215); c.stroke();
      c.beginPath(); c.moveTo(285, 175); c.lineTo(240, 195); c.lineTo(285, 215); c.stroke();
      c.fillStyle = "#1a1030"; c.beginPath(); c.moveTo(120, 245); c.quadraticCurveTo(200, 345, 280, 245); c.closePath(); c.fill();
      c.fillStyle = "#ff6b8b"; c.beginPath(); c.ellipse(200, 290, 40, 18, 0, 0, 7); c.fill();
      lagrima(c, 95, 215, 28); lagrima(c, 305, 215, 28); lagrima(c, 70, 260, 18); lagrima(c, 330, 260, 18);
    } },
    { nome: "Batata Chocada", desenhar(c) {
      c.fillStyle = "#c9955a"; c.beginPath(); c.ellipse(200, 210, 135, 160, 0.15, 0, 7); c.fill();
      c.fillStyle = "#a8763f"; [[140, 110, 10], [270, 150, 8], [150, 310, 9], [270, 290, 7]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); });
      olho(c, 155, 180, 32, "chocado"); olho(c, 250, 180, 32, "chocado");
      c.fillStyle = "#3b200c"; c.beginPath(); c.ellipse(205, 275, 30, 42, 0, 0, 7); c.fill();
      c.strokeStyle = "#3b200c"; c.lineWidth = 7; c.lineCap = "round";
      c.beginPath(); c.moveTo(120, 125); c.lineTo(175, 135); c.stroke(); c.beginPath(); c.moveTo(285, 125); c.lineTo(230, 135); c.stroke();
    } },
    { nome: "Robô Confuso", desenhar(c) {
      c.strokeStyle = "#9aa4b8"; c.lineWidth = 8; c.beginPath(); c.moveTo(200, 90); c.lineTo(200, 45); c.stroke();
      c.fillStyle = "#ff4d8d"; c.beginPath(); c.arc(200, 40, 16, 0, 7); c.fill();
      c.fillStyle = "#c4ccdb"; c.beginPath(); c.roundRect(70, 90, 260, 240, 40); c.fill();
      c.fillStyle = "#1d2433"; c.beginPath(); c.roundRect(100, 130, 200, 120, 26); c.fill();
      c.fillStyle = "#5ec8ff"; c.beginPath(); c.arc(155, 190, 24, 0, 7); c.fill(); c.beginPath(); c.arc(250, 185, 14, 0, 7); c.fill();
      c.strokeStyle = "#1d2433"; c.lineWidth = 8; c.lineCap = "round"; c.beginPath(); c.moveTo(150, 290); c.lineTo(180, 280); c.lineTo(210, 292); c.lineTo(250, 282); c.stroke();
      c.fillStyle = "#ffd23f"; c.font = "bold 110px Arial"; c.fillText("?", 345, 120);
    } },
    { nome: "Abacate Triste", desenhar(c) {
      c.fillStyle = "#3e6b1f"; c.beginPath(); c.ellipse(200, 215, 125, 165, 0, 0, 7); c.fill();
      c.fillStyle = "#c5e17a"; c.beginPath(); c.ellipse(200, 225, 100, 135, 0, 0, 7); c.fill();
      c.fillStyle = "#8a5a2b"; c.beginPath(); c.arc(200, 275, 52, 0, 7); c.fill();
      olho(c, 160, 165, 22); olho(c, 240, 165, 22);
      c.strokeStyle = "#2c3d12"; c.lineWidth = 6; c.lineCap = "round";
      c.beginPath(); c.moveTo(130, 130); c.lineTo(175, 140); c.stroke(); c.beginPath(); c.moveTo(270, 130); c.lineTo(225, 140); c.stroke();
      c.beginPath(); c.moveTo(178, 212); c.quadraticCurveTo(200, 195, 222, 212); c.stroke();
      lagrima(c, 152, 190, 14);
    } },
    { nome: "Nuvem Brava", desenhar(c) {
      c.fillStyle = "#5a6478";
      [[120, 220, 85], [200, 175, 105], [285, 215, 85], [200, 255, 95]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); });
      c.fillStyle = "#ffd23f"; c.beginPath(); c.moveTo(175, 330); c.lineTo(215, 330); c.lineTo(195, 365); c.lineTo(225, 365); c.lineTo(170, 400); c.lineTo(190, 360); c.lineTo(165, 360); c.fill();
      c.strokeStyle = "#1a1d26"; c.lineWidth = 12; c.lineCap = "round";
      c.beginPath(); c.moveTo(130, 165); c.lineTo(180, 190); c.stroke(); c.beginPath(); c.moveTo(270, 165); c.lineTo(220, 190); c.stroke();
      c.fillStyle = "#1a1d26"; c.beginPath(); c.arc(160, 210, 13, 0, 7); c.fill(); c.beginPath(); c.arc(240, 210, 13, 0, 7); c.fill();
      c.beginPath(); c.moveTo(165, 275); c.quadraticCurveTo(200, 245, 235, 275); c.stroke();
      c.fillStyle = "#ff4d4d"; c.font = "bold 70px Arial"; c.fillText("💢", 300, 95);
    } },
  ].map((p) => {
    const c = document.createElement("canvas");
    c.width = c.height = 400;
    const x = c.getContext("2d");
    x.textAlign = "center";
    x.textBaseline = "middle";
    p.desenhar(x);
    return { nome: p.nome, imagem: c, src: c.toDataURL("image/png") };
  });

  // ---------- formatos famosos de meme (só a estrutura do texto) ----------
  // fundo: 0 preto, 1 branco, 2 roxo, 3 isso ou aquilo, 4 antes e depois, 5 story
  const FORMATOS = [
    { nome: "Ninguém: / Eu:", fundo: 0, textos: ["Ninguém:", "Eu às 3 da manhã:"] },
    { nome: "Expectativa x Realidade", fundo: 4, textos: ["Expectativa", "Realidade"] },
    { nome: "Como eu acho x Como eu sou", fundo: 4, textos: ["Como eu acho que estou", "Como eu realmente estou"] },
    { nome: "Ele: / Eu:", fundo: 2, textos: ["Ele: no que você está pensando?", "Eu: em comida"] },
    { nome: "POV:", fundo: 2, textos: ["POV: você abriu a geladeira pela 5ª vez"], unico: true },
    { nome: "Vocês: / Eu:", fundo: 0, textos: ["Vocês: vamos dormir cedo", "Eu: só mais um vídeo"] },
    { nome: "Eu explicando para...", fundo: 5, textos: ["Eu explicando para minha mãe", "o que eu faço no trabalho"] },
    { nome: "Quando você...", fundo: 0, textos: ["Quando você", "acha o dinheiro no bolso da calça"] },
    { nome: "Isso x Aquilo", fundo: 3, textos: ["Pizza", "Salada"] },
    { nome: "Plano x Execução", fundo: 4, textos: ["O plano", "A execução"] },
    { nome: "Segunda x Sexta", fundo: 3, textos: ["Segunda", "Sexta"] },
    { nome: "Começo x Fim do mês", fundo: 4, textos: ["Eu no começo do mês", "Eu no fim do mês"] },
    { nome: "Professor: / A turma:", fundo: 1, textos: ["Professor: alguma dúvida?", "A turma:"] },
    { nome: "Meu chefe: / Eu:", fundo: 1, textos: ["Meu chefe: é rapidinho", "Eu 3 horas depois:"] },
    { nome: "Meus planos / O ano:", fundo: 4, textos: ["Meus planos", "O ano:"] },
    { nome: "Mãe: / Eu:", fundo: 2, textos: ["Mãe: tem comida em casa", "Eu:"] },
    { nome: "Ninguém me perguntou, mas...", fundo: 0, textos: ["Ninguém me perguntou, mas...", "pão de queijo é melhor que pizza"] },
    { nome: "Eu tentando...", fundo: 5, textos: ["Eu tentando", "ser uma pessoa organizada"] },
    { nome: "Spoiler:", fundo: 2, textos: ["Vou começar a dieta segunda", "Spoiler: não vou"] },
    { nome: "Ninguém: / Meu gato:", fundo: 0, textos: ["Ninguém:", "Meu gato às 4 da manhã:"] },
  ];

  // ---------- fotos engraçadas de bichos (Unsplash, licença gratuita) ----------
  const FOTO = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1080&q=80`;
  const MINI = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=220&h=220&q=60`;
  const FOTOS = [
    { id: "1515536765-9b2a70c4b333", nome: "Cavalo rindo" },
    { id: "1722501011971-ba07f6a5e435", nome: "Vaca mostrando a língua" },
    { id: "1541364983171-a8ba01e95cfc", nome: "Pug sério" },
    { id: "1533738363-b7f9aef128ce", nome: "Gato de óculos" },
    { id: "1766107283245-3d2c073081b4", nome: "Lêmure assustado" },
    { id: "1638231366498-adf341fa6f31", nome: "Cabra gritando" },
    { id: "1438283173091-5dbf5c5a3206", nome: "Cavalo gritando" },
    { id: "1552053831-71594a27632d", nome: "Cachorro comendo flor" },
    { id: "1758503455332-f5d970316074", nome: "Gato caubói" },
    { id: "1583511655826-05700d52f4d9", nome: "Cachorro de pijama" },
    { id: "1726562520505-c625d5dc9717", nome: "Burro curioso" },
    { id: "1734984400916-d51a7348da39", nome: "Camelo de perto" },
    { id: "1730041822286-c6c2b579a7d9", nome: "Gato estiloso" },
    { id: "1556997685-309989c1aa82", nome: "Boi encarando" },
    { id: "1777432736524-0f15d2d65bed", nome: "Panda de cabeça para baixo" },
    { id: "1639192602482-f6d1b4bb54b7", nome: "Macaco de boca aberta" },
    { id: "1552474705-dd8183e00901", nome: "Alpaca descabelada" },
    { id: "1787456916243-86a3c069c303", nome: "Esquilo com laranja" },
  ];

  // formatos de conversa (faixa branca em cima + foto)
  FORMATOS.unshift(
    { nome: "💬 Conversa: Mãe / Eu", legenda: true, foto: 0, textos: ["- Mãe, vou sair", "- Volta cedo", "- Pode deixar, mãe...", "Eu chegando às 4 da manhã:"] },
    { nome: "💬 Quando você...", legenda: true, foto: 2, textos: ["Quando você fala que vai dormir cedo e alguém manda \"só mais um episódio\""] },
    { nome: "💬 Minha amiga: / Eu:", legenda: true, foto: 4, textos: ["Minha amiga: \"tô falando sério, nunca mais fico com ele\"", "Eu:"] },
    { nome: "💬 Amor, ouvi um barulho", legenda: true, foto: 10, textos: ["- Amor, ouvi um barulho no quintal", "- Solta o cachorro pra ver", "O cachorro:"] },
    { nome: "💬 Quando a pessoa aparece", legenda: true, foto: 5, textos: ["Quando você tá falando mal da pessoa e ela aparece"] },
  );

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

  // ---------- modo legenda: faixa branca em cima com o texto (estilo conversa) ----------
  const FONTE_LEGENDA = '"Helvetica Neue", Arial, sans-serif';
  const modoLegenda = () => campo("legenda").checked;

  function layoutLegenda(w) {
    const e = estilo();
    const tam = Math.round(e.tamanho * 0.62 * (w / LADO));
    ctx.font = `${tam}px ${FONTE_LEGENDA}`;
    const texto = estado.textos.map((t) => t.texto).filter((t) => t.trim()).join("\n");
    const linhas = texto ? quebrarLinhas(texto, w * 0.9) : [];
    const altLinha = tam * 1.3;
    const margem = tam * 0.9;
    const altura = linhas.length ? Math.round(linhas.length * altLinha + margem * 2) : 0;
    return { tam, linhas, altLinha, margem, altura };
  }

  function tamanhoFoto() {
    if (estado.imagem) {
      const prop = estado.imagem.height / estado.imagem.width;
      return { w: LADO, h: Math.round(Math.min(Math.max(LADO * prop, LADO * 0.4), LADO * 2)) };
    }
    return { w: estado.modelo.w, h: estado.modelo.h };
  }

  function desenhar({ semSelecao = false } = {}) {
    const foto = tamanhoFoto();
    const w = foto.w;
    const legenda = modoLegenda() ? layoutLegenda(w) : null;
    const topoFoto = legenda ? legenda.altura : 0;
    const h = foto.h + topoFoto;
    if (tela.width !== w || tela.height !== h) { tela.width = w; tela.height = h; }

    ctx.clearRect(0, 0, w, h);

    // faixa branca com o texto em cima
    if (legenda) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, topoFoto);
      ctx.fillStyle = "#111111";
      ctx.font = `${legenda.tam}px ${FONTE_LEGENDA}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      legenda.linhas.forEach((l, n) => ctx.fillText(l, w * 0.05, legenda.margem + n * legenda.altLinha));
    }

    // foto ou fundo pronto
    ctx.save();
    ctx.translate(0, topoFoto);
    if (estado.imagem) ctx.drawImage(estado.imagem, 0, 0, foto.w, foto.h);
    else estado.modelo.desenhar(ctx, foto.w, foto.h);
    ctx.restore();

    caixas = [];

    // figurinhas (posição relativa à imagem inteira)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    estado.figurinhas.forEach((f, i) => {
      const cx = f.x * w, cy = f.y * h;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((f.giro * Math.PI) / 180);
      if (f.pers) ctx.drawImage(f.pers.imagem, -f.tam / 2, -f.tam / 2, f.tam, f.tam);
      else { ctx.font = `${f.tam}px ${FONTE_EMOJI}`; ctx.fillText(f.emoji, 0, f.tam * 0.05); }
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

    // no modo legenda o texto já está na faixa branca
    if (legenda) return;

    // textos no estilo clássico (em cima da foto, com borda)
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
    const total = Math.max(estado.textos.length, i + 1);
    // com mais de dois textos, eles se espalham de cima para baixo
    if (total > 2) return { x: 0.5, y: 0.1 + (i * 0.8) / (total - 1) };
    if (i === 0) return { x: 0.5, y: 0.12 };
    if (i === 1) return { x: 0.5, y: 0.88 };
    return { x: 0.5, y: 0.5 };
  }

  // ao desligar a legenda, os textos voltam para cima da foto sem se amontoar
  campo("legenda").addEventListener("change", () => {
    if (!campo("legenda").checked) estado.textos.forEach((t, i) => Object.assign(t, posicaoPadrao(i)));
    desenhar();
  });

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

  const GRUPO_PERSONAGENS = "⭐ Exclusivas";

  function mostrarGrupo(nome) {
    [...abasFig.children].forEach((b) => b.setAttribute("aria-pressed", b.dataset.grupo === nome));
    gradeFig.innerHTML = "";
    gradeFig.classList.toggle("personagens", nome === GRUPO_PERSONAGENS);
    if (nome === GRUPO_PERSONAGENS) {
      PERSONAGENS.forEach((p) => {
        const b = document.createElement("button");
        b.type = "button";
        b.title = p.nome;
        b.setAttribute("aria-label", `Colocar figurinha ${p.nome}`);
        const img = document.createElement("img");
        img.src = p.src;
        img.alt = "";
        b.appendChild(img);
        b.addEventListener("click", () => colocarFigurinha({ pers: p }));
        gradeFig.appendChild(b);
      });
      return;
    }
    FIGURINHAS[nome].split(" ").forEach((emoji) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = emoji;
      b.setAttribute("aria-label", `Colocar figurinha ${emoji}`);
      b.addEventListener("click", () => colocarFigurinha({ emoji }));
      gradeFig.appendChild(b);
    });
  }

  // os personagens originais vêm primeiro
  [GRUPO_PERSONAGENS, ...Object.keys(FIGURINHAS)].forEach((nome, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = nome;
    b.dataset.grupo = nome;
    b.addEventListener("click", () => mostrarGrupo(nome));
    abasFig.appendChild(b);
    if (i === 0) mostrarGrupo(nome);
  });

  function colocarFigurinha(tipo) {
    // cada nova figurinha aparece num lugar um pouco diferente
    const n = estado.figurinhas.length;
    estado.figurinhas.push({ ...tipo, x: 0.5 + ((n % 3) - 1) * 0.18, y: 0.5 + ((Math.floor(n / 3) % 3) - 1) * 0.12, tam: tipo.pers ? 320 : 220, giro: 0 });
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

  // ---------- formatos famosos ----------
  const caixaFormatos = campo("formatos");
  FORMATOS.forEach((f) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = f.nome;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", async () => {
      campo("legenda").checked = !!f.legenda;
      if (f.legenda) {
        avisar("Carregando a foto...");
        try { await usarImagem(FOTO(FOTOS[f.foto].id)); }
        catch (e) { avisar("Não consegui carregar a foto. Verifique a internet."); return; }
        estado.textos = f.textos.map((texto, i) => ({ texto, ...posicaoPadrao(i) }));
        estado.figurinhas = [];
        selecionarFigurinha(-1);
        montarLista();
        desenhar();
        [...caixaFormatos.children].forEach((x) => x.setAttribute("aria-pressed", x === b));
        avisar(`Formato "${f.nome.replace("💬 ", "")}" pronto. Troque o texto ou a foto!`);
        return;
      }
      escolherModelo(MODELOS[f.fundo]);
      estado.textos = f.textos.map((texto, i) => ({ texto, ...posicaoPadrao(i) }));
      if (f.unico) estado.textos[0].y = 0.15;
      montarLista();
      desenhar();
      [...caixaFormatos.children].forEach((x) => x.setAttribute("aria-pressed", x === b));
      avisar(`Formato "${f.nome}" pronto. Troque o texto e coloque uma figurinha!`);
    });
    caixaFormatos.appendChild(b);
  });

  // ---------- galeria de fotos de bichos ----------
  const caixaFotos = campo("fotos");
  FOTOS.forEach((f) => {
    const b = document.createElement("button");
    b.type = "button";
    b.title = f.nome;
    b.setAttribute("aria-label", `Usar foto: ${f.nome}`);
    b.setAttribute("aria-pressed", "false");
    const img = document.createElement("img");
    img.src = MINI(f.id);
    img.alt = "";
    img.loading = "lazy";
    b.appendChild(img);
    b.addEventListener("click", async () => {
      avisar("Carregando a foto...");
      try {
        await usarImagem(FOTO(f.id), `Foto "${f.nome}" pronta. Escreva o texto!`);
        [...caixaFotos.children].forEach((x) => x.setAttribute("aria-pressed", x === b));
      } catch (e) { avisar("Não consegui carregar a foto. Verifique a internet."); }
    });
    caixaFotos.appendChild(b);
  });

  // ---------- foto (botão, arrastar e soltar, colar) ----------
  async function usarImagem(src, avisoTexto) {
    const img = new Image();
    img.decoding = "async";
    if (/^https?:/i.test(src)) img.crossOrigin = "anonymous";
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

  // colar o link de uma imagem da internet
  campo("form-link").addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = campo("link-imagem").value.trim();
    if (!/^https?:\/\//i.test(url)) { avisar("Cole um link que comece com http ou https."); return; }
    avisar("Carregando a imagem...");
    try {
      // baixa a imagem para o aparelho; assim o meme pode ser salvo depois
      const resposta = await fetch(url, { mode: "cors" });
      if (!resposta.ok) throw new Error("falhou");
      const blob = await resposta.blob();
      if (!blob.type.startsWith("image/")) throw new Error("não é imagem");
      await usarImagem(URL.createObjectURL(blob), "Imagem carregada. Agora escreva o texto!");
      campo("link-imagem").value = "";
    } catch (erro) {
      avisar("Esse site não deixa usar a imagem pelo link. Salve a imagem no aparelho e use Enviar foto.");
    }
  });
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
  ["tamanho", "cor", "borda", "maiusculas", "sombra", "legenda"].forEach((id) => campo(id).addEventListener("input", () => desenhar()));
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
    fotos: FOTOS,
    personagens: PERSONAGENS.map((p) => p.src),
    urlFoto: (id, largura = 640) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${largura}&h=${largura}&q=75`,
  };

  // ---------- começa com um exemplo pronto ----------
  escolherModelo(MODELOS[0]);
  document.fonts.load('80px "Anton"').then(() => desenhar()).catch(() => {});
})();
