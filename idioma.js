// ===== Versão em português e em inglês =====
const TEXTOS = {
  pt: {
    "titulo.pagina": "Rodrigo Elias | Desenvolvedor em Campinas, SP",
    "intro.texto": "Bem-vindo ao meu portfólio digital",
    "intro.nome": "Rodrigo Elias · Desenvolvedor",
    "intro.pular": "toque para entrar",
    "menu.sobre": "Sobre",
    "menu.hab": "Habilidades",
    "menu.contato": "Contato",
    "topo.ola": "Olá, eu sou",
    "topo.cargo": "Desenvolvedor / Campinas, SP",
    "topo.frase": "Eu faço a parte difícil.",
    "sobre.titulo": "Sobre mim",
    "sobre.resumo": "Sou o Rodrigo Elias, desenvolvedor em Campinas, São Paulo. Faço o site que aparece no Google, o app que vai para a loja e o sistema que tira a empresa da planilha. E quando precisar desenhar placa, eu escrevo o firmware também.",
    "sobre.explorar": "Explorar",
    "serv.sites.t": "Sites",
    "serv.sites.p": "Sites rápidos e bonitos, feitos para aparecer no Google e trazer clientes.",
    "serv.dev.t": "Desenvolvimento",
    "serv.dev.p": "Apps que vão para a loja e sistemas que tiram a sua empresa da planilha.",
    "serv.fw.p": "Placa desenhada? Eu escrevo o código que roda nela. Quem responde sou eu, não sou um robô.",
    "hab.titulo": "Habilidades",
    "hab.usando": "Usando agora:",
    "hab.entrego": "O que eu entrego:",
    "entrega.sites": "Sites",
    "entrega.sistemas": "Sistemas",
    "exemplos.aviso": "Projetos de demonstração que eu criei para mostrar como trabalho. As empresas e os dados são fictícios. Clique para ver funcionando.",
    "exemplos.ver": "Ver funcionando →",
    "contato.titulo": "Contato",
    "contato.texto": "Me conta o que você precisa. A mensagem chega direto no meu WhatsApp.",
    "form.nome": "Seu nome",
    "form.contato": "Seu e-mail ou telefone",
    "form.msg": "Mensagem",
    "form.enviar": "Enviar pelo WhatsApp",
    "whats.ola": "Olá Rodrigo! Vim pelo seu site.",
    "whats.nome": "Nome",
    "whats.contato": "Contato",
    "rodape.frase": "“Jesus é meu pastor e nada me faltará.”",
    "janela.computador": "Computador",
    "janela.celular": "Celular",
    "botao.idioma": "EN",
    "botao.idioma.rotulo": "Switch to English",
  },
  en: {
    "titulo.pagina": "Rodrigo Elias | Developer in Campinas, Brazil",
    "intro.texto": "Welcome to my digital portfolio",
    "intro.nome": "Rodrigo Elias · Developer",
    "intro.pular": "tap to enter",
    "menu.sobre": "About",
    "menu.hab": "Skills",
    "menu.contato": "Contact",
    "topo.ola": "Hi, I am",
    "topo.cargo": "Developer / Campinas, Brazil",
    "topo.frase": "I do the hard part.",
    "sobre.titulo": "About me",
    "sobre.resumo": "I'm Rodrigo Elias, a developer based in Campinas, São Paulo, Brazil. I build the website that shows up on Google, the app that goes to the store and the system that takes your business off spreadsheets. And when you need a circuit board, I write the firmware too.",
    "sobre.explorar": "Explore",
    "serv.sites.t": "Websites",
    "serv.sites.p": "Fast, good-looking websites built to show up on Google and bring in customers.",
    "serv.dev.t": "Development",
    "serv.dev.p": "Apps that go to the store and systems that take your business off spreadsheets.",
    "serv.fw.p": "Got a circuit board? I write the code that runs on it. You talk to me, not a robot.",
    "hab.titulo": "Skills",
    "hab.usando": "Using now:",
    "hab.entrego": "What I deliver:",
    "entrega.sites": "Websites",
    "entrega.sistemas": "Systems",
    "exemplos.aviso": "Demo projects I built to show how I work. The companies and data are fictional, and the demos themselves are in Portuguese. Click to see them working.",
    "exemplos.ver": "See it working →",
    "contato.titulo": "Contact",
    "contato.texto": "Tell me what you need. Your message goes straight to my WhatsApp.",
    "form.nome": "Your name",
    "form.contato": "Your email or phone",
    "form.msg": "Message",
    "form.enviar": "Send via WhatsApp",
    "whats.ola": "Hi Rodrigo! I found you through your website.",
    "whats.nome": "Name",
    "whats.contato": "Contact",
    "rodape.frase": "“The Lord is my shepherd; I shall not want.”",
    "janela.computador": "Desktop",
    "janela.celular": "Mobile",
    "botao.idioma": "PT",
    "botao.idioma.rotulo": "Mudar para português",
  },
};

// textos das seções Minha história, Como eu trabalho, Serviços, Monte seu pedido e Perguntas frequentes
Object.assign(TEXTOS.pt, {
  "menu.servicos": "Serviços",
  "hist.titulo": "Minha história",
  "hist.p1": "Desde cedo eu quis entender como as coisas funcionam no mundo digital. Esse interesse virou paixão, e hoje é o meu trabalho.",
  "hist.p2": "Estou no começo da carreira e encaro isso como vantagem: cada projeto recebe toda a minha atenção, e eu estudo todos os dias para entregar mais e melhor.",
  "hist.p3": "Minha meta é transformar essa paixão em algo grande, sempre com honestidade e com Deus na frente.",
  "hist.github": "Ver meu GitHub",
  "proc.titulo": "Como eu trabalho",
  "proc.1t": "Conversa", "proc.1p": "Você me conta a ideia pelo WhatsApp. Eu faço perguntas para entender o que o seu negócio precisa.",
  "proc.2t": "Proposta", "proc.2p": "Mando o que vou fazer, o prazo e o valor, tudo por escrito e sem surpresa.",
  "proc.3t": "Desenvolvimento", "proc.3p": "Construo o projeto e te mostro o andamento. Você acompanha e pede ajustes no caminho.",
  "proc.4t": "Entrega", "proc.4p": "Coloco no ar, te ensino a usar e continuo por perto se precisar de suporte.",
  "pac.titulo": "Serviços",
  "pac.sub": "Escolha um ponto de partida. O valor sai na proposta, de acordo com o que você precisa.",
  "pac.botao": "Pedir orçamento",
  "pac.selo": "Mais pedido",
  "pac.1t": "Site essencial", "pac.1p": "Para quem precisa estar na internet com uma página bonita e fácil de achar.",
  "pac.1a": "Página única com seus serviços", "pac.1b": "Botão de WhatsApp", "pac.1c": "Funciona no celular",
  "pac.2t": "Site + Google", "pac.2p": "Para quem quer ser encontrado por clientes que procuram no Google.",
  "pac.2a": "Tudo do Site essencial", "pac.2b": "Várias páginas", "pac.2c": "Preparado para o Google", "pac.2d": "Formulário de contato",
  "pac.3t": "Sob medida", "pac.3p": "Para quem precisa de um app, um sistema ou firmware feito para o seu caso.",
  "pac.3a": "App, sistema ou firmware", "pac.3b": "Feito do zero para você", "pac.3c": "Suporte depois da entrega",
  "pac.msg": "Olá Rodrigo! Tenho interesse no pacote",
  "monte.titulo": "Monte seu pedido",
  "monte.sub": "Marque o que você precisa. Eu recebo a lista no WhatsApp e respondo com a proposta.",
  "monte.o1": "Site novo", "monte.o2": "Aparecer no Google", "monte.o3": "Loja virtual", "monte.o4": "App para celular",
  "monte.o5": "Sistema para a empresa", "monte.o6": "Firmware para placa", "monte.o7": "Manutenção de site existente",
  "monte.o8": "Ainda não sei, quero conversar",
  "monte.enviar": "Enviar minha lista",
  "monte.msg": "Olá Rodrigo! Montei meu pedido no seu site:",
  "faq.titulo": "Perguntas frequentes",
  "faq.1q": "Quanto tempo leva para ficar pronto?", "faq.1a": "Depende do tamanho do projeto. Um site simples fica pronto mais rápido que um app ou sistema. O prazo certo vai por escrito na proposta.",
  "faq.2q": "Quanto custa?", "faq.2a": "Cada projeto é diferente, então eu monto o valor depois de entender o que você precisa. Use o Monte seu pedido e eu te respondo com a proposta.",
  "faq.3q": "Você atende fora de Campinas?", "faq.3a": "Sim. Eu moro em Campinas, mas atendo pela internet clientes de qualquer lugar.",
  "faq.4q": "E depois que o site fica pronto?", "faq.4a": "Eu te ensino a usar e continuo disponível para ajustes e manutenção.",
  "faq.5q": "Com quem eu falo?", "faq.5a": "Comigo, direto. Quem responde sou eu, não sou um robô.",
  "whats.flutuante": "Falar no WhatsApp",
});

Object.assign(TEXTOS.en, {
  "menu.servicos": "Services",
  "hist.titulo": "My story",
  "hist.p1": "Ever since I was young I wanted to understand how things work in the digital world. That curiosity became a passion, and today it is my job.",
  "hist.p2": "I'm early in my career and I see that as an advantage: every project gets my full attention, and I study every day to deliver more and better.",
  "hist.p3": "My goal is to turn this passion into something big, always with honesty and with God first.",
  "hist.github": "See my GitHub",
  "proc.titulo": "How I work",
  "proc.1t": "Talk", "proc.1p": "You tell me your idea on WhatsApp. I ask questions to understand what your business needs.",
  "proc.2t": "Proposal", "proc.2p": "I send what I'll build, the timeline and the price, all in writing with no surprises.",
  "proc.3t": "Development", "proc.3p": "I build the project and show you the progress. You follow along and ask for changes as we go.",
  "proc.4t": "Delivery", "proc.4p": "I put it online, show you how to use it and stay around if you need support.",
  "pac.titulo": "Services",
  "pac.sub": "Pick a starting point. The price comes in the proposal, based on what you need.",
  "pac.botao": "Get a quote",
  "pac.selo": "Most popular",
  "pac.1t": "Essential website", "pac.1p": "For anyone who needs to be online with a good-looking page that is easy to find.",
  "pac.1a": "Single page with your services", "pac.1b": "WhatsApp button", "pac.1c": "Works on phones",
  "pac.2t": "Website + Google", "pac.2p": "For anyone who wants to be found by customers searching on Google.",
  "pac.2a": "Everything in Essential", "pac.2b": "Multiple pages", "pac.2c": "Ready for Google", "pac.2d": "Contact form",
  "pac.3t": "Custom", "pac.3p": "For anyone who needs an app, a system or firmware built for their case.",
  "pac.3a": "App, system or firmware", "pac.3b": "Built from scratch for you", "pac.3c": "Support after delivery",
  "pac.msg": "Hi Rodrigo! I'm interested in the package",
  "monte.titulo": "Build your request",
  "monte.sub": "Check what you need. I get the list on WhatsApp and reply with a proposal.",
  "monte.o1": "New website", "monte.o2": "Show up on Google", "monte.o3": "Online store", "monte.o4": "Mobile app",
  "monte.o5": "Business system", "monte.o6": "Firmware for a board", "monte.o7": "Maintenance of an existing site",
  "monte.o8": "Not sure yet, I want to talk",
  "monte.enviar": "Send my list",
  "monte.msg": "Hi Rodrigo! I built my request on your website:",
  "faq.titulo": "FAQ",
  "faq.1q": "How long does it take?", "faq.1a": "It depends on the size of the project. A simple website is ready sooner than an app or a system. The exact timeline goes in writing in the proposal.",
  "faq.2q": "How much does it cost?", "faq.2a": "Every project is different, so I set the price after I understand what you need. Use Build your request and I'll reply with a proposal.",
  "faq.3q": "Do you work with clients outside Campinas?", "faq.3a": "Yes. I live in Campinas, but I work online with clients anywhere.",
  "faq.4q": "What happens after the site is ready?", "faq.4a": "I show you how to use it and stay available for changes and maintenance.",
  "faq.5q": "Who will I be talking to?", "faq.5a": "Me, directly. You talk to me, not a robot.",
  "whats.flutuante": "Chat on WhatsApp",
});

// rótulos lidos por leitores de tela e dicas ao passar o mouse
Object.assign(TEXTOS.pt, {
  "a11y.temaTitulo": "Versão clara / escura",
  "a11y.temaEscuro": "Trocar para a versão escura",
  "a11y.temaClaro": "Trocar para a versão clara",
  "a11y.abrirMenu": "Abrir menu",
  "a11y.fecharMenu": "Fechar menu",
  "a11y.foto": "Foto do Rodrigo Elias de terno",
  "a11y.exSites": "Ver exemplos de sites",
  "a11y.exApps": "Ver exemplos de apps",
  "a11y.exSistemas": "Ver exemplos de sistemas",
  "a11y.exFirmware": "Ver exemplo de firmware",
  "a11y.tamanho": "Tamanho da tela",
  "a11y.fechar": "Fechar exemplo",
  "a11y.exemploAberto": "Exemplo aberto",
  "a11y.abrirExemplo": "Abrir exemplo:",
});
Object.assign(TEXTOS.en, {
  "a11y.temaTitulo": "Light / dark mode",
  "a11y.temaEscuro": "Switch to dark mode",
  "a11y.temaClaro": "Switch to light mode",
  "a11y.abrirMenu": "Open menu",
  "a11y.fecharMenu": "Close menu",
  "a11y.foto": "Photo of Rodrigo Elias wearing a suit",
  "a11y.exSites": "See website examples",
  "a11y.exApps": "See app examples",
  "a11y.exSistemas": "See system examples",
  "a11y.exFirmware": "See firmware example",
  "a11y.tamanho": "Screen size",
  "a11y.fechar": "Close example",
  "a11y.exemploAberto": "Open example",
  "a11y.abrirExemplo": "Open example:",
});

// itens extras do menu do celular
Object.assign(TEXTOS.pt, { "menu.historia": "Minha história", "menu.processo": "Como eu trabalho", "menu.faq": "Perguntas frequentes" });
Object.assign(TEXTOS.en, { "menu.historia": "My story", "menu.processo": "How I work", "menu.faq": "FAQ" });

// link do projeto MemesLab
Object.assign(TEXTOS.pt, { "hist.memes": "Ver meu projeto Rodrigo Memes" });
Object.assign(TEXTOS.en, { "hist.memes": "See my Rodrigo Memes project" });

// idioma atual e tradução de uma chave
function idiomaAtual() {
  return document.documentElement.getAttribute("data-idioma") === "en" ? "en" : "pt";
}
function t(chave) {
  return TEXTOS[idiomaAtual()][chave] ?? TEXTOS.pt[chave] ?? "";
}

function aplicarIdioma(idioma) {
  const raiz = document.documentElement;
  raiz.setAttribute("data-idioma", idioma);
  raiz.setAttribute("lang", idioma === "en" ? "en" : "pt-br");
  document.title = t("titulo.pagina");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const texto = t(el.dataset.i18n);
    if (texto) el.textContent = texto;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => el.setAttribute("alt", t(el.dataset.i18nAlt)));
  document.querySelectorAll("[data-i18n-title]").forEach((el) => el.setAttribute("title", t(el.dataset.i18nTitle)));

  // texto animado da tela de boas-vindas (montado depois pelo script.js)
  const intro = document.querySelector(".intro-texto");
  if (intro) intro.dataset.texto = t("intro.texto");

  const botao = document.getElementById("idioma-botao");
  if (botao) {
    botao.textContent = t("botao.idioma");
    botao.setAttribute("aria-label", t("botao.idioma.rotulo"));
  }

  // avisa as outras partes (exemplos e WhatsApp) para se atualizarem
  document.dispatchEvent(new CustomEvent("idioma-mudou", { detail: idioma }));
}

aplicarIdioma(idiomaAtual());

document.getElementById("idioma-botao")?.addEventListener("click", () => {
  const novo = idiomaAtual() === "en" ? "pt" : "en";
  aplicarIdioma(novo);
  try { localStorage.setItem("idioma", novo); } catch (e) {}
});
