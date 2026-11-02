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

  // ---------- desenha o mural ----------
  function mostrar() {
    const lista = filtrados();
    const nomes = { curtidos: "Top Memes", meus: "Meu perfil", favoritos: "Favoritos" };
    textoMural.textContent = nomes[aba] || "Novos Memes";

    // "Memes em alta" só aparece no Início: os 3 mais curtidos
    const mostrarAlta = aba === "inicio";
    secaoAlta.hidden = !mostrarAlta;
    alta.innerHTML = "";
    let resto = lista;
    if (mostrarAlta) {
      const top = [...lista].sort((a, b) => totalCurtidas(b) - totalCurtidas(a)).slice(0, 3);
      top.forEach((p, i) => alta.appendChild(cartao(p, i + 1)));
      textoAlta.textContent = categoria === "todos" ? "Memes em alta" : "Em alta nesta categoria";
      resto = lista.filter((p) => !top.includes(p));
    }

    mural.innerHTML = "";
    resto.forEach((p) => mural.appendChild(cartao(p)));
    vazio.hidden = resto.length > 0 || (mostrarAlta && alta.children.length > 0);
    vazio.textContent =
      aba === "meus" ? "Você ainda não publicou nenhum meme. Crie o primeiro lá embaixo!" :
      aba === "favoritos" ? "Você ainda não curtiu nenhum meme. Toque no 🤍 para guardar aqui." :
      "Nenhum meme encontrado. Que tal criar um?";
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
    montarEnfeites();
    aba = "meus";
    categoria = "todos";
    atualizarAbas();
    mostrar();
    editor.avisar("Publicado! Ele aparece no seu Perfil, aqui no seu aparelho.");
    document.getElementById("inicio").scrollIntoView({ behavior: "smooth" });
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

  document.querySelectorAll("[data-aba]").forEach((b) =>
    b.addEventListener("click", () => {
      aba = b.dataset.aba;
      atualizarAbas();
      mostrar();
      fecharMenu();
      const alvo = aba === "inicio" ? "inicio" : "novos";
      document.getElementById(alvo).scrollIntoView({ behavior: "smooth", block: "start" });
    })
  );
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
        el.innerHTML = `<img src="${figs[qual] || figs[0]}" alt="">`;
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
