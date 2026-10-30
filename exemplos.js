// ===== Sites de exemplo (empresas fictícias, criadas para demonstração) =====
const EXEMPLOS = [
  {
    id: "padaria",
    categoria: "sites",
    titulo: "Padaria Trigo de Ouro",
    tipo: "Site institucional",
    descricao: "Página de padaria com cardápio, horários e pedido pelo WhatsApp.",
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Georgia,"Times New Roman",serif;background:#fbf6ee;color:#3b2a1a;line-height:1.6}
a{color:inherit}
header{display:flex;justify-content:space-between;align-items:center;padding:18px 6%;background:#3b2a1a;color:#fbf6ee}
header b{font-size:1.3rem;letter-spacing:.04em}
header nav{display:flex;gap:22px;font-family:Arial,sans-serif;font-size:.85rem}
header nav a{text-decoration:none;opacity:.85}
.hero{padding:90px 6% 80px;background:linear-gradient(120deg,#e9c98b,#d9a55a);text-align:center}
.hero small{font-family:Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;font-size:.75rem}
.hero h1{font-size:clamp(2.2rem,6vw,3.8rem);line-height:1.1;margin:12px 0}
.hero p{max-width:520px;margin:0 auto 26px}
.btn{display:inline-block;background:#3b2a1a;color:#fbf6ee;padding:12px 28px;border-radius:999px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;font-size:.9rem}
section{padding:60px 6%}
h2{font-size:2rem;text-align:center;margin-bottom:30px}
.menu{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;max-width:900px;margin:0 auto}
.item{background:#fff;border-radius:14px;padding:22px;box-shadow:0 6px 20px rgba(59,42,26,.08)}
.item .emoji{font-size:2rem}
.item h3{margin:8px 0 4px}
.item p{font-size:.9rem;color:#6b5843}
.item b{display:block;margin-top:10px;color:#a8641c;font-family:Arial,sans-serif}
.info{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:900px;margin:0 auto;text-align:center}
.info div{background:#f3e6cf;border-radius:14px;padding:24px}
footer{background:#3b2a1a;color:#e9c98b;text-align:center;padding:26px;font-family:Arial,sans-serif;font-size:.8rem}
@media(max-width:600px){header nav{display:none}}
</style></head><body>
<header><b>🌾 Trigo de Ouro</b><nav><a href="#cardapio">Cardápio</a><a href="#horarios">Horários</a><a href="#contato">Contato</a></nav></header>
<div class="hero"><small>Padaria artesanal desde 1998</small><h1>Pão quentinho<br>toda manhã</h1><p>Fermentação natural, ingredientes selecionados e aquele cheirinho que você sente da esquina.</p><a class="btn" href="#cardapio">Ver cardápio</a></div>
<section id="cardapio"><h2>Mais pedidos</h2><div class="menu">
<div class="item"><span class="emoji">🥖</span><h3>Pão francês</h3><p>Casquinha crocante, miolo macio.</p><b>R$ 0,90 a unidade</b></div>
<div class="item"><span class="emoji">🥐</span><h3>Croissant de manteiga</h3><p>Massa folhada feita na casa.</p><b>R$ 8,50</b></div>
<div class="item"><span class="emoji">🍰</span><h3>Bolo de cenoura</h3><p>Com cobertura de chocolate.</p><b>R$ 32,00 inteiro</b></div>
<div class="item"><span class="emoji">☕</span><h3>Café coado</h3><p>Grãos do sul de Minas.</p><b>R$ 5,00</b></div>
</div></section>
<section id="horarios"><h2>Venha nos visitar</h2><div class="info">
<div><h3>Horários</h3><p>Seg a sáb: 6h às 20h<br>Dom: 6h às 13h</p></div>
<div><h3>Endereço</h3><p>Bairro Cambuí<br>Campinas, SP</p></div>
<div id="contato"><h3>Encomendas</h3><p>Bolos e salgados para festas.</p><br><a class="btn" href="#contato">Pedir pelo WhatsApp</a></div>
</div></section>
<footer>Padaria Trigo de Ouro · empresa fictícia · site de demonstração</footer>
</body></html>`
  },
  {
    id: "academia",
    categoria: "sites",
    titulo: "Força Total Academia",
    tipo: "Landing page",
    descricao: "Página de vendas para academia, com planos e aula experimental.",
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Arial Black",Arial,sans-serif;background:#0d0d0f;color:#f2f2f2;line-height:1.5}
header{display:flex;justify-content:space-between;align-items:center;padding:18px 6%}
header b{font-size:1.2rem;letter-spacing:.08em}
header b span{color:#e8ff3a}
.cta{background:#e8ff3a;color:#0d0d0f;padding:11px 22px;border-radius:6px;text-decoration:none;font-size:.85rem;text-transform:uppercase}
.hero{padding:80px 6% 70px;background:radial-gradient(circle at 80% 30%,#2b2f12,transparent 55%)}
.hero h1{font-size:clamp(2.6rem,8vw,5.2rem);line-height:.95;text-transform:uppercase}
.hero h1 span{color:#e8ff3a}
.hero p{font-family:Arial,sans-serif;max-width:460px;margin:22px 0 30px;color:#bdbdbd}
.numeros{display:flex;gap:40px;flex-wrap:wrap;margin-top:40px}
.numeros b{display:block;font-size:2rem;color:#e8ff3a}
.numeros small{font-family:Arial,sans-serif;color:#9a9a9a}
section{padding:60px 6%}
h2{font-size:2rem;text-transform:uppercase;margin-bottom:28px}
.planos{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}
.plano{border:1px solid #2c2c30;border-radius:12px;padding:26px;background:#151518}
.plano.destaque{border-color:#e8ff3a;box-shadow:0 0 0 1px #e8ff3a}
.plano h3{text-transform:uppercase;font-size:1rem}
.plano .preco{font-size:2.4rem;margin:10px 0}
.plano .preco small{font-size:.9rem;color:#9a9a9a}
.plano ul{list-style:none;font-family:Arial,sans-serif;color:#bdbdbd;font-size:.9rem;margin-bottom:20px}
.plano li{padding:4px 0}
.plano li::before{content:"✓ ";color:#e8ff3a}
footer{border-top:1px solid #2c2c30;text-align:center;padding:24px;font-family:Arial,sans-serif;font-size:.8rem;color:#777}
</style></head><body>
<header><b>FORÇA<span>TOTAL</span></b><a class="cta" href="#planos">Aula grátis</a></header>
<div class="hero"><h1>Treine de<br><span>verdade.</span></h1><p>Musculação, funcional e lutas com professores que acompanham você do primeiro ao último treino.</p><a class="cta" href="#planos">Agendar aula experimental</a>
<div class="numeros"><div><b>24h</b><small>aberta todos os dias</small></div><div><b>40+</b><small>aulas por semana</small></div><div><b>1.200 m²</b><small>de área de treino</small></div></div></div>
<section id="planos"><h2>Planos</h2><div class="planos">
<div class="plano"><h3>Mensal</h3><div class="preco">R$ 119<small>/mês</small></div><ul><li>Musculação</li><li>Avaliação física</li></ul><a class="cta" href="#planos">Assinar</a></div>
<div class="plano destaque"><h3>Semestral</h3><div class="preco">R$ 99<small>/mês</small></div><ul><li>Musculação</li><li>Aulas coletivas</li><li>App de treino</li></ul><a class="cta" href="#planos">Assinar</a></div>
<div class="plano"><h3>Anual</h3><div class="preco">R$ 89<small>/mês</small></div><ul><li>Tudo do semestral</li><li>Lutas</li><li>2 convidados por mês</li></ul><a class="cta" href="#planos">Assinar</a></div>
</div></section>
<footer>Força Total Academia · empresa fictícia · site de demonstração</footer>
</body></html>`
  },
  {
    id: "sistema",
    categoria: "sistemas",
    titulo: "Estoque Fácil",
    tipo: "Sistema de gestão",
    descricao: "Painel para controlar estoque e vendas, no lugar da planilha.",
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI",Arial,sans-serif;background:#f3f5f9;color:#1d2433;display:flex;min-height:100vh}
aside{width:210px;background:#1d2433;color:#c9d1e3;padding:22px 16px;flex-shrink:0}
aside b{display:block;color:#fff;font-size:1.1rem;margin-bottom:28px}
aside b span{color:#4f8cff}
aside a{display:block;padding:9px 12px;border-radius:8px;text-decoration:none;color:inherit;font-size:.9rem;margin-bottom:4px}
aside a.ativo{background:#2c3550;color:#fff}
main{flex:1;padding:26px;min-width:0}
.topo{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;gap:12px;flex-wrap:wrap}
.topo h1{font-size:1.4rem}
.btn{background:#4f8cff;color:#fff;border:0;padding:9px 16px;border-radius:8px;font-weight:600;font-size:.85rem}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:22px}
.card{background:#fff;border-radius:12px;padding:18px;box-shadow:0 2px 8px rgba(29,36,51,.06)}
.card small{color:#6b7489;font-size:.78rem}
.card b{display:block;font-size:1.6rem;margin-top:4px}
.sobe{color:#1a9b5b;font-size:.78rem}
.desce{color:#d64545;font-size:.78rem}
.painel{background:#fff;border-radius:12px;padding:18px;box-shadow:0 2px 8px rgba(29,36,51,.06);overflow-x:auto}
.painel h2{font-size:1rem;margin-bottom:12px}
table{width:100%;border-collapse:collapse;font-size:.88rem;min-width:480px}
th{text-align:left;color:#6b7489;font-weight:600;padding:8px;border-bottom:1px solid #e6e9f0}
td{padding:10px 8px;border-bottom:1px solid #f0f2f6}
.tag{padding:3px 10px;border-radius:999px;font-size:.75rem;font-weight:600}
.ok{background:#e3f6ec;color:#1a9b5b}.baixo{background:#fdecec;color:#d64545}.medio{background:#fff4e0;color:#b7791f}
.barras{display:flex;align-items:flex-end;gap:10px;height:120px;margin:10px 0 22px}
.barras div{flex:1;background:#4f8cff;border-radius:6px 6px 0 0;opacity:.85}
@media(max-width:700px){aside{display:none}}
</style></head><body>
<aside><b>Estoque<span>Fácil</span></b><a class="ativo" href="#">Painel</a><a href="#">Produtos</a><a href="#">Vendas</a><a href="#">Fornecedores</a><a href="#">Relatórios</a></aside>
<main>
<div class="topo"><h1>Painel de hoje</h1><button class="btn">+ Nova venda</button></div>
<div class="cards">
<div class="card"><small>Vendas do dia</small><b>R$ 4.870</b><span class="sobe">▲ 12% sobre ontem</span></div>
<div class="card"><small>Pedidos</small><b>63</b><span class="sobe">▲ 8 a mais</span></div>
<div class="card"><small>Produtos em falta</small><b>4</b><span class="desce">repor esta semana</span></div>
<div class="card"><small>Ticket médio</small><b>R$ 77</b><span class="sobe">▲ 3%</span></div>
</div>
<div class="painel"><h2>Vendas da semana</h2>
<div class="barras"><div style="height:45%"></div><div style="height:60%"></div><div style="height:52%"></div><div style="height:78%"></div><div style="height:66%"></div><div style="height:95%"></div><div style="height:70%"></div></div>
<h2>Estoque</h2>
<table><thead><tr><th>Produto</th><th>Quantidade</th><th>Preço</th><th>Situação</th></tr></thead><tbody>
<tr><td>Camiseta básica P</td><td>142</td><td>R$ 39,90</td><td><span class="tag ok">Em dia</span></td></tr>
<tr><td>Boné aba reta</td><td>8</td><td>R$ 59,90</td><td><span class="tag baixo">Acabando</span></td></tr>
<tr><td>Moletom canguru M</td><td>27</td><td>R$ 129,90</td><td><span class="tag medio">Atenção</span></td></tr>
<tr><td>Calça jogger G</td><td>64</td><td>R$ 99,90</td><td><span class="tag ok">Em dia</span></td></tr>
</tbody></table></div>
<p style="margin-top:16px;font-size:.75rem;color:#8a92a6">Estoque Fácil · sistema fictício · dados de demonstração</p>
</main></body></html>`
  },
  {
    id: "app-delivery",
    categoria: "apps",
    formato: "celular",
    titulo: "Rango Já",
    tipo: "App de delivery",
    descricao: "App para pedir comida dos restaurantes do bairro e acompanhar a entrega.",
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#222;max-width:430px;margin:0 auto;min-height:100vh;padding-bottom:70px}
.barra{display:flex;justify-content:space-between;align-items:center;padding:16px 18px 6px}
.barra small{color:#888;font-size:.75rem}
.barra b{display:block;font-size:.95rem}
.avatar{width:36px;height:36px;border-radius:50%;background:#ff4b2b;color:#fff;display:grid;place-items:center;font-weight:700}
.busca{margin:12px 18px;padding:12px 14px;border-radius:12px;background:#f2f2f4;color:#999;font-size:.9rem}
.cats{display:flex;gap:10px;overflow-x:auto;padding:4px 18px 10px}
.cats span{flex:0 0 auto;padding:8px 14px;border-radius:999px;background:#f2f2f4;font-size:.82rem}
.cats span.on{background:#ff4b2b;color:#fff}
.promo{margin:8px 18px 16px;padding:18px;border-radius:16px;background:linear-gradient(120deg,#ff4b2b,#ff9a3c);color:#fff}
.promo b{font-size:1.2rem;display:block}
h2{font-size:1rem;margin:6px 18px 10px}
.rest{display:flex;gap:12px;align-items:center;margin:0 18px 12px;padding:10px;border-radius:14px;box-shadow:0 2px 10px rgba(0,0,0,.06)}
.rest .foto{width:64px;height:64px;border-radius:12px;display:grid;place-items:center;font-size:2rem;flex-shrink:0}
.rest b{display:block;font-size:.95rem}
.rest small{color:#777;font-size:.78rem}
.rest .nota{color:#ff9a3c;font-weight:700;font-size:.8rem}
.entrega{margin:6px 18px 0;padding:14px;border-radius:14px;background:#fff6f2;border:1px solid #ffd9cc;font-size:.85rem}
.trilha{height:6px;border-radius:9px;background:#ffe1d6;margin-top:8px;overflow:hidden}
.trilha div{width:65%;height:100%;background:#ff4b2b}
nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;display:flex;justify-content:space-around;padding:12px 0 16px;background:#fff;border-top:1px solid #eee;font-size:.72rem;color:#999;text-align:center}
nav .on{color:#ff4b2b;font-weight:700}
nav i{display:block;font-style:normal;font-size:1.2rem}
</style></head><body>
<div class="barra"><div><small>Entregar em</small><b>Rua das Flores, 120 ▾</b></div><div class="avatar">A</div></div>
<div class="busca">🔍 Buscar pratos ou restaurantes</div>
<div class="cats"><span class="on">🍔 Lanches</span><span>🍕 Pizza</span><span>🍣 Japonesa</span><span>🥗 Saudável</span><span>🍨 Doces</span></div>
<div class="promo"><b>Frete grátis hoje</b>Em pedidos acima de R$ 40</div>
<h2>Perto de você</h2>
<div class="rest"><div class="foto" style="background:#fff1e6">🍔</div><div><b>Burger da Esquina</b><small>Lanches · 25-35 min · R$ 4,99</small><div class="nota">★ 4,8</div></div></div>
<div class="rest"><div class="foto" style="background:#ffeaea">🍕</div><div><b>Forno a Lenha</b><small>Pizza · 35-45 min · Grátis</small><div class="nota">★ 4,7</div></div></div>
<div class="rest"><div class="foto" style="background:#eaf7ee">🥗</div><div><b>Verde Vivo</b><small>Saudável · 20-30 min · R$ 3,99</small><div class="nota">★ 4,9</div></div></div>
<div class="entrega"><b>Seu pedido está a caminho 🛵</b><br>Chega em cerca de 12 minutos<div class="trilha"><div></div></div></div>
<nav><span class="on"><i>🏠</i>Início</span><span><i>🔍</i>Buscar</span><span><i>🧾</i>Pedidos</span><span><i>👤</i>Perfil</span></nav>
</body></html>`
  },
  {
    id: "app-agenda",
    categoria: "apps",
    formato: "celular",
    titulo: "Agenda Bela",
    tipo: "App de agendamento",
    descricao: "App para salão de beleza: o cliente escolhe o serviço, o dia e o horário.",
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI",Arial,sans-serif;background:#faf7f5;color:#2d2330;max-width:430px;margin:0 auto;min-height:100vh;padding:18px}
.topo{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.topo b{font-size:1.25rem;color:#8e3b6b}
.topo span{font-size:1.3rem}
h1{font-size:1.4rem;margin-bottom:4px}
p.sub{color:#8a7f8d;font-size:.88rem;margin-bottom:18px}
h2{font-size:.95rem;margin:18px 0 10px}
.servicos{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.serv{background:#fff;border-radius:14px;padding:14px;border:2px solid transparent;box-shadow:0 2px 8px rgba(45,35,48,.06);font-size:.85rem}
.serv.on{border-color:#8e3b6b}
.serv i{font-style:normal;font-size:1.4rem;display:block;margin-bottom:6px}
.serv small{color:#8a7f8d;display:block}
.dias{display:flex;gap:8px;overflow-x:auto}
.dia{flex:0 0 56px;text-align:center;padding:10px 0;border-radius:14px;background:#fff;font-size:.75rem;color:#8a7f8d;box-shadow:0 2px 8px rgba(45,35,48,.05)}
.dia b{display:block;font-size:1.1rem;color:#2d2330}
.dia.on{background:#8e3b6b;color:#f6dce9}.dia.on b{color:#fff}
.horas{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.hora{text-align:center;padding:10px 0;border-radius:10px;background:#fff;font-size:.85rem;box-shadow:0 2px 8px rgba(45,35,48,.05)}
.hora.off{opacity:.35;text-decoration:line-through}
.hora.on{background:#8e3b6b;color:#fff}
.resumo{margin-top:20px;background:#fff;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(45,35,48,.07);font-size:.88rem}
.resumo div{display:flex;justify-content:space-between;padding:4px 0}
.btn{display:block;width:100%;margin-top:14px;padding:15px;border:0;border-radius:14px;background:#8e3b6b;color:#fff;font-size:1rem;font-weight:700}
</style></head><body>
<div class="topo"><b>Agenda Bela</b><span>🔔</span></div>
<h1>Olá, Carla 👋</h1><p class="sub">Vamos marcar seu horário?</p>
<h2>Serviço</h2>
<div class="servicos">
<div class="serv on"><i>✂️</i>Corte<small>45 min · R$ 70</small></div>
<div class="serv"><i>💅</i>Manicure<small>40 min · R$ 35</small></div>
<div class="serv"><i>🎨</i>Coloração<small>2 h · R$ 180</small></div>
<div class="serv"><i>💆</i>Hidratação<small>50 min · R$ 60</small></div>
</div>
<h2>Dia</h2>
<div class="dias"><div class="dia">seg<b>10</b></div><div class="dia on">ter<b>11</b></div><div class="dia">qua<b>12</b></div><div class="dia">qui<b>13</b></div><div class="dia">sex<b>14</b></div><div class="dia">sáb<b>15</b></div></div>
<h2>Horário</h2>
<div class="horas"><div class="hora off">09:00</div><div class="hora">10:00</div><div class="hora on">11:00</div><div class="hora">13:30</div><div class="hora off">14:30</div><div class="hora">15:30</div><div class="hora">16:30</div><div class="hora off">17:30</div></div>
<div class="resumo"><div><span>Corte</span><b>R$ 70,00</b></div><div><span>Terça, 11 às 11:00</span><span>com Júlia</span></div></div>
<button class="btn">Confirmar agendamento</button>
</body></html>`
  },
  {
    id: "sistema-clinica",
    categoria: "sistemas",
    titulo: "Clínica Bem Cuidar",
    tipo: "Sistema de agenda",
    descricao: "Sistema para recepção de clínica: consultas do dia, pacientes e confirmações.",
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI",Arial,sans-serif;background:#f4f8f7;color:#16302b}
header{display:flex;justify-content:space-between;align-items:center;padding:14px 24px;background:#fff;border-bottom:1px solid #e1ebe8;gap:12px;flex-wrap:wrap}
header b{color:#0f8a6d;font-size:1.1rem}
header nav{display:flex;gap:18px;font-size:.88rem;color:#5b7570}
header nav .on{color:#0f8a6d;font-weight:700}
main{padding:22px 24px;display:grid;grid-template-columns:2fr 1fr;gap:18px}
.painel{background:#fff;border-radius:14px;padding:18px;box-shadow:0 2px 8px rgba(22,48,43,.06);min-width:0}
h1{font-size:1.25rem;margin-bottom:4px}
.sub{color:#5b7570;font-size:.85rem;margin-bottom:16px}
.consulta{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #eef3f1}
.consulta .h{width:56px;font-weight:700;color:#0f8a6d}
.consulta .p{flex:1;min-width:0}
.consulta .p small{display:block;color:#5b7570;font-size:.78rem}
.st{padding:4px 10px;border-radius:999px;font-size:.72rem;font-weight:700;white-space:nowrap}
.conf{background:#dff5ee;color:#0f8a6d}.esp{background:#fff3dc;color:#a46a00}.atend{background:#e3ecff;color:#3459c4}
.mini{display:grid;gap:12px}
.num{background:#fff;border-radius:14px;padding:16px;box-shadow:0 2px 8px rgba(22,48,43,.06)}
.num small{color:#5b7570;font-size:.8rem}
.num b{display:block;font-size:1.7rem}
.btn{display:block;text-align:center;background:#0f8a6d;color:#fff;border-radius:10px;padding:12px;font-weight:700;font-size:.9rem}
.nota{grid-column:1/-1;font-size:.75rem;color:#86a09a}
@media(max-width:760px){main{grid-template-columns:1fr}header nav{display:none}}
</style></head><body>
<header><b>✚ Bem Cuidar</b><nav><span class="on">Agenda</span><span>Pacientes</span><span>Financeiro</span><span>Relatórios</span></nav></header>
<main>
<div class="painel"><h1>Consultas de hoje</h1><p class="sub">Terça-feira · 12 consultas</p>
<div class="consulta"><span class="h">08:00</span><div class="p">Mariana Souza<small>Clínico geral · Dr. Paulo</small></div><span class="st atend">Atendido</span></div>
<div class="consulta"><span class="h">08:30</span><div class="p">José Almeida<small>Cardiologia · Dra. Lúcia</small></div><span class="st atend">Atendido</span></div>
<div class="consulta"><span class="h">09:00</span><div class="p">Fernanda Lima<small>Pediatria · Dr. André</small></div><span class="st esp">Na espera</span></div>
<div class="consulta"><span class="h">09:30</span><div class="p">Ricardo Nunes<small>Clínico geral · Dr. Paulo</small></div><span class="st conf">Confirmado</span></div>
<div class="consulta"><span class="h">10:00</span><div class="p">Beatriz Costa<small>Dermatologia · Dra. Lúcia</small></div><span class="st conf">Confirmado</span></div>
</div>
<div class="mini">
<div class="num"><small>Na sala de espera</small><b>3</b></div>
<div class="num"><small>Confirmaram pelo WhatsApp</small><b>9 de 12</b></div>
<div class="num"><small>Faltas este mês</small><b>2%</b></div>
<span class="btn">+ Marcar consulta</span>
</div>
<p class="nota">Clínica Bem Cuidar · sistema fictício · nomes e dados de demonstração</p>
</main></body></html>`
  },
  {
    id: "firmware-sensor",
    categoria: "firmware",
    titulo: "Estufa Monitorada",
    tipo: "Firmware + painel",
    descricao: "Sensor de temperatura e umidade com ESP32 e painel ao vivo no navegador.",
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI",Arial,sans-serif;background:#0b1410;color:#d8efe2;min-height:100vh;padding:24px}
.topo{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:22px}
.topo b{font-size:1.2rem;color:#5ee6a0}
.status{font-size:.8rem;color:#8fb5a1}.status i{display:inline-block;width:9px;height:9px;border-radius:50%;background:#5ee6a0;margin-right:6px;animation:pisca 1.6s infinite}
@keyframes pisca{50%{opacity:.25}}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:18px}
.card{background:#12211a;border:1px solid #1f3a2c;border-radius:14px;padding:18px}
.card small{color:#8fb5a1;font-size:.78rem}
.card b{display:block;font-size:2.1rem;margin-top:4px;color:#fff}
.card span{font-size:.75rem;color:#5ee6a0}
.grafico{background:#12211a;border:1px solid #1f3a2c;border-radius:14px;padding:18px;margin-bottom:18px}
.grafico h2,.codigo h2{font-size:.95rem;margin-bottom:12px}
svg{width:100%;height:140px}
.codigo{background:#07100c;border:1px solid #1f3a2c;border-radius:14px;padding:18px;font-family:Consolas,monospace;font-size:.8rem;line-height:1.6;overflow-x:auto}
.c{color:#5d7a6b}.k{color:#5ee6a0}.n{color:#ffcf6b}
.nota{margin-top:14px;font-size:.72rem;color:#5d7a6b}
</style></head><body>
<div class="topo"><b>🌱 Estufa Monitorada</b><span class="status"><i></i>ESP32 conectado · atualizado agora</span></div>
<div class="cards">
<div class="card"><small>Temperatura</small><b id="temp">24,6 °C</b><span>dentro do ideal</span></div>
<div class="card"><small>Umidade do ar</small><b id="umid">68%</b><span>dentro do ideal</span></div>
<div class="card"><small>Irrigação</small><b>Desligada</b><span>liga abaixo de 55%</span></div>
</div>
<div class="grafico"><h2>Temperatura nas últimas 12 horas</h2>
<svg viewBox="0 0 300 100" preserveAspectRatio="none"><polyline fill="none" stroke="#5ee6a0" stroke-width="2" points="0,70 25,66 50,60 75,52 100,45 125,40 150,38 175,42 200,48 225,55 250,58 275,57 300,54"/><line x1="0" y1="30" x2="300" y2="30" stroke="#ffcf6b" stroke-dasharray="4 4" stroke-width="1"/></svg></div>
<div class="codigo"><h2 style="font-family:Segoe UI,Arial">Trecho do firmware</h2>
<span class="c">// lê o sensor e liga a irrigação quando o ar fica seco</span><br>
<span class="k">void</span> loop() {<br>
&nbsp;&nbsp;<span class="k">float</span> umidade = dht.readHumidity();<br>
&nbsp;&nbsp;<span class="k">if</span> (umidade &lt; <span class="n">55</span>) digitalWrite(RELE, HIGH);<br>
&nbsp;&nbsp;<span class="k">else</span> digitalWrite(RELE, LOW);<br>
&nbsp;&nbsp;enviarParaPainel(umidade);<br>
&nbsp;&nbsp;delay(<span class="n">5000</span>);<br>
}</div>
<p class="nota">Estufa Monitorada · projeto fictício · dados de demonstração</p>
<script>
let t=24.6,u=68;setInterval(()=>{t+=(Math.random()-.5)*.3;u+=(Math.random()-.5)*1.2;document.getElementById("temp").textContent=t.toFixed(1).replace(".",",")+" °C";document.getElementById("umid").textContent=Math.round(u)+"%"},2000);
</script>
</body></html>`
  }
];
// textos dos cartões em inglês (os exemplos em si continuam em português)
const EXEMPLOS_EN = {
  "padaria": { tipo: "Business website", descricao: "Bakery website with menu, opening hours and ordering via WhatsApp." },
  "academia": { tipo: "Landing page", descricao: "Sales page for a gym, with plans and a free trial class." },
  "sistema": { tipo: "Management system", descricao: "Dashboard to track stock and sales instead of a spreadsheet." },
  "app-delivery": { tipo: "Delivery app", descricao: "App to order food from local restaurants and track the delivery." },
  "app-agenda": { tipo: "Booking app", descricao: "Beauty salon app: the client picks the service, day and time." },
  "sistema-clinica": { tipo: "Scheduling system", descricao: "Front desk system for a clinic: today's appointments, patients and confirmations." },
  "firmware-sensor": { tipo: "Firmware + dashboard", descricao: "ESP32 temperature and humidity sensor with a live web panel." },
};
const textoExemplo = (ex, campo) =>
  (typeof idiomaAtual === "function" && idiomaAtual() === "en" && EXEMPLOS_EN[ex.id]?.[campo]) || ex[campo];

// ===== Exemplos abaixo dos ícones (clicar abre, clicar de novo fecha) e janela do exemplo =====
(() => {
  const painel = document.getElementById("painel-exemplos");
  const grade = document.getElementById("grade-exemplos");
  const janela = document.getElementById("janela-exemplo");
  if (!painel || !grade || !janela) return;

  const icones = document.querySelectorAll("[data-abrir]");
  const moldura = janela.querySelector("iframe");
  const titulo = janela.querySelector(".janela-titulo");
  const tela = janela.querySelector(".janela-tela");
  const botoesTamanho = janela.querySelectorAll("[data-tamanho]");
  let aberta = null; // categoria que está aparecendo
  let focoAntes = null;

  // miniatura dos sites acompanha a largura do cartão
  function ajustarMiniaturas() {
    grade.querySelectorAll(".exemplo:not(.exemplo-app) .exemplo-mini").forEach((m) => {
      if (m.clientWidth) m.style.setProperty("--escala", m.clientWidth / 1280);
    });
  }

  function mostrar(categoria) {
    grade.innerHTML = "";
    EXEMPLOS.filter((ex) => ex.categoria === categoria).forEach((ex) => {
      const cartao = document.createElement("button");
      cartao.type = "button";
      cartao.className = "exemplo" + (ex.formato === "celular" ? " exemplo-app" : "");
      cartao.setAttribute("aria-label", `Abrir exemplo: ${ex.titulo}`);
      cartao.innerHTML = `
        <span class="exemplo-mini"><iframe tabindex="-1" aria-hidden="true"></iframe></span>
        <span class="exemplo-info">
          <small>${textoExemplo(ex, "tipo")}</small>
          <strong>${ex.titulo}</strong>
          <span>${textoExemplo(ex, "descricao")}</span>
          <em>${typeof t === "function" ? t("exemplos.ver") : "Ver funcionando →"}</em>
        </span>`;
      cartao.querySelector("iframe").srcdoc = ex.html;
      cartao.addEventListener("click", () => abrirExemplo(ex));
      grade.appendChild(cartao);
    });
    painel.hidden = false;
    aberta = categoria;
    requestAnimationFrame(ajustarMiniaturas);
  }

  function esconder() {
    painel.hidden = true;
    grade.innerHTML = "";
    aberta = null;
  }

  // clique no ícone: abre; no mesmo ícone de novo: fecha; em outro: troca
  icones.forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = a.dataset.abrir;
      if (aberta === cat) esconder();
      else mostrar(cat);
      icones.forEach((i) => {
        const ativo = i.dataset.abrir === aberta;
        i.classList.toggle("ativo", ativo);
        i.setAttribute("aria-expanded", ativo);
      });
    })
  );
  icones.forEach((i) => { i.setAttribute("aria-expanded", "false"); i.setAttribute("aria-controls", "painel-exemplos"); });

  function tamanho(t) {
    tela.dataset.tamanho = t;
    botoesTamanho.forEach((b) => b.setAttribute("aria-pressed", b.dataset.tamanho === t));
  }

  function abrirExemplo(ex) {
    focoAntes = document.activeElement;
    titulo.textContent = ex.titulo;
    moldura.srcdoc = ex.html;
    tamanho(ex.formato === "celular" || window.innerWidth < 720 ? "celular" : "computador");
    janela.hidden = false;
    document.body.classList.add("janela-aberta");
    janela.querySelector(".janela-fechar").focus();
  }

  function fecharExemplo() {
    janela.hidden = true;
    moldura.srcdoc = "";
    document.body.classList.remove("janela-aberta");
    if (focoAntes) focoAntes.focus();
  }

  botoesTamanho.forEach((b) => b.addEventListener("click", () => tamanho(b.dataset.tamanho)));
  janela.querySelector(".janela-fechar").addEventListener("click", fecharExemplo);
  janela.addEventListener("click", (e) => { if (e.target === janela) fecharExemplo(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !janela.hidden) fecharExemplo(); });
  window.addEventListener("resize", ajustarMiniaturas);
  document.addEventListener("idioma-mudou", () => { if (aberta) mostrar(aberta); });
})();
