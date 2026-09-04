(function () {
  'use strict';

  /* ========================================================================
     Esqueleto visual Avery.
     Troque APP, VISTAS e desenharVista_() para comecar um codigo novo.
     A casca (logo, usuario logado, sidebar, fontes, graficos) ja vem pronta.
     ======================================================================== */

  var APP = {
    nome: 'Esqueleto Avery',
    subtitulo: 'Base visual para um codigo novo',
    versao: '1.0.0'
  };

  var Estado = {
    contexto: null,
    vista: ((window.PARAMETROS && PARAMETROS.view) || 'inicio').toLowerCase(),
    sidebarRecolhida: false,
    idioma: 'pt-BR'
  };

  /* Paginas do menu. id = chave da vista; pronta = clicavel. */
  var VISTAS = [
    { id: 'inicio', rotulo: 'Inicio', icone: 'monitor', pronta: true },
    { id: 'graficos', rotulo: 'Graficos', icone: 'grafico', pronta: true },
    { id: 'pagina', rotulo: 'Sua pagina', icone: 'grade', pronta: true }
  ];

  var TEXTOS = {
    'pt-BR': {
      secaoVisoes: 'Visoes',
      atualizar: 'Atualizar',
      telaCheia: 'Tela cheia',
      recolherMenu: 'Recolher menu',
      expandirMenu: 'Expandir menu',
      online: 'Online',
      demo: 'Preview local',
      inicioTitulo: 'Inicio',
      inicioSub: 'Casca pronta: logo, usuario e componentes',
      graficosTitulo: 'Estilos de grafico',
      graficosSub: 'Medidor, barras, tendencia e ranking',
      paginaTitulo: 'Sua pagina',
      paginaSub: 'Comece o codigo daqui',
      paginaVazio: 'Esta pagina e o ponto de partida. Troque o HTML em desenharPagina_().',
      uptime: 'Uptime'
    },
    en: {
      secaoVisoes: 'Views',
      atualizar: 'Refresh',
      telaCheia: 'Full screen',
      recolherMenu: 'Collapse menu',
      expandirMenu: 'Expand menu',
      online: 'Online',
      demo: 'Local preview',
      inicioTitulo: 'Home',
      inicioSub: 'Ready shell: logo, user and components',
      graficosTitulo: 'Chart styles',
      graficosSub: 'Gauge, bars, trend and ranking',
      paginaTitulo: 'Your page',
      paginaSub: 'Start the code here',
      paginaVazio: 'This page is the starting point. Replace the HTML in desenharPagina_().',
      uptime: 'Uptime'
    }
  };

  var ICONES = {
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    grade: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    grafico: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
    engrenagem: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.2A1.6 1.6 0 0 0 7.5 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.6H3a2 2 0 1 1 0-4h.2A1.6 1.6 0 0 0 4.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4 1.2z"/>',
    recarregar: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
    expandir: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>',
    painelRecolher: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M16 15l-3-3 3-3"/>',
    painelExpandir: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M14 9l3 3-3 3"/>'
  };


  /* ----------------------------------------------------------- utilitarios */

  function el(id) { return document.getElementById(id); }

  function t(chave) {
    var idioma = (Estado.contexto && Estado.contexto.idioma) || Estado.idioma;
    var dic = TEXTOS[idioma] || TEXTOS['pt-BR'];
    return dic[chave] || chave;
  }

  function esc(valor) {
    return String(valor === null || valor === undefined ? '' : valor)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function icone(nome, tamanho) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
      'stroke-linecap="round" stroke-linejoin="round"' +
      (tamanho ? ' style="width:' + tamanho + 'px;height:' + tamanho + 'px"' : '') +
      '>' + (ICONES[nome] || '') + '</svg>';
  }

  function pct(valor) {
    if (valor === null || valor === undefined || isNaN(valor)) return '--';
    return (Math.round(valor * 10) / 10).toLocaleString(
      (Estado.contexto && Estado.contexto.idioma) || 'pt-BR',
      { minimumFractionDigits: 0, maximumFractionDigits: 1 }
    ) + '%';
  }

  function classePct(valor, limiares) {
    if (valor === null || valor === undefined) return 'pct-neutro';
    var p = limiares || (Estado.contexto && Estado.contexto.preferencias) || {
      limiarVerde: 95, limiarAmarelo: 80
    };
    if (valor >= p.limiarVerde) return 'pct-verde';
    if (valor >= p.limiarAmarelo) return 'pct-ambar';
    return 'pct-vermelho';
  }


  /* ------------------------------------------ backend ou preview local */

  function chamarApi(nome, args, ok, falha) {
    if (window.google && google.script && google.script.run) {
      var r = google.script.run.withSuccessHandler(ok).withFailureHandler(falha);
      r[nome].apply(r, args || []);
      return;
    }
    if (nome === 'apiContexto') {
      ok(contextoLocal_());
      return;
    }
    if (falha) falha({ message: 'API indisponivel no preview local: ' + nome });
  }

  function contextoLocal_() {
    var idioma = 'pt-BR';
    try { idioma = localStorage.getItem('esqueleto-avery.idioma') || idioma; } catch (e) {}
    return {
      app: { nome: APP.nome, versao: APP.versao },
      usuario: { nome: 'Visitante', email: '', iniciais: 'VI' },
      plantas: [{ id: 'demo', nome: 'Preview local' }],
      idioma: idioma,
      idiomasDisponiveis: [
        { id: 'pt-BR', rotulo: 'PT' },
        { id: 'en', rotulo: 'EN' }
      ],
      preferencias: { limiarVerde: 95, limiarAmarelo: 80 },
      local: true
    };
  }


  /* -------------------------------------------------------------- casca */

  function montarMoldura() {
    var c = Estado.contexto;
    el('marca-nome').textContent = c.app.nome || APP.nome;
    el('marca-sub').textContent = APP.subtitulo;
    el('usuario-nome').textContent = c.usuario.nome;
    el('usuario-nome').title = c.usuario.email || '';
    el('usuario-iniciais').textContent = c.usuario.iniciais;
    el('usuario-planta').textContent = (c.plantas[0] && c.plantas[0].nome) || '';
    el('rodape-versao').textContent = (c.app.nome || APP.nome) + ' v' + c.app.versao;
    el('rodape-fonte').textContent = c.usuario.email || '';
    document.title = c.app.nome || APP.nome;

    var itensNav = VISTAS.map(function (v) {
      return '<button type="button" class="nav-item' +
        (v.id === Estado.vista ? ' ativo' : '') +
        (v.pronta ? '' : ' desabilitado') +
        '" data-vista="' + v.id + '" title="' + esc(v.rotulo) + '">' +
        icone(v.icone) +
        '<span>' + esc(rotuloVista_(v)) + '</span>' +
      '</button>';
    }).join('');

    el('nav').innerHTML =
      '<div class="nav-titulo">' + esc(t('secaoVisoes')) + '</div>' + itensNav;

    var navTopo = el('nav-topo');
    if (navTopo) navTopo.innerHTML = itensNav;

    Array.prototype.forEach.call(document.querySelectorAll('[data-vista]'), function (item) {
      item.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        irPara(item.getAttribute('data-vista'));
      };
    });

    el('botao-atualizar').innerHTML = icone('recarregar') + '<span>' + esc(t('atualizar')) + '</span>';
    el('botao-atualizar').onclick = function () { desenhar(); };

    el('botao-tela').innerHTML = icone('expandir');
    el('botao-tela').title = t('telaCheia');
    el('botao-tela').onclick = alternarTelaCheia;

    var botaoSidebar = el('botao-sidebar');
    if (botaoSidebar) botaoSidebar.onclick = alternarSidebar;
    aplicarSidebar();
    montarSeletorIdioma();
    definirPilula(c.local ? '' : 'ok', c.local ? t('demo') : t('online'));
  }

  function rotuloVista_(v) {
    if (v.id === 'inicio') return t('inicioTitulo');
    if (v.id === 'graficos') return t('graficosTitulo');
    if (v.id === 'pagina') return t('paginaTitulo');
    return v.rotulo;
  }

  function montarSeletorIdioma() {
    var caixa = el('seletor-idioma');
    if (!caixa) return;
    var atual = Estado.contexto.idioma;
    var lista = Estado.contexto.idiomasDisponiveis || [];
    caixa.innerHTML = lista.map(function (item) {
      var id = item.id || item;
      var rotulo = item.rotulo || id;
      return '<button type="button" class="' + (id === atual ? 'ativo' : '') +
        '" data-idioma="' + esc(id) + '">' + esc(rotulo) + '</button>';
    }).join('');
    Array.prototype.forEach.call(caixa.querySelectorAll('[data-idioma]'), function (botao) {
      botao.addEventListener('click', function () {
        trocarIdioma(botao.getAttribute('data-idioma'));
      });
    });
  }

  function trocarIdioma(codigo) {
    if (!codigo || (Estado.contexto && Estado.contexto.idioma === codigo)) return;
    try { localStorage.setItem('esqueleto-avery.idioma', codigo); } catch (e) {}
    Estado.idioma = codigo;
    chamarApi('apiContexto', [codigo], function (contexto) {
      aplicarContexto(contexto);
      montarMoldura();
      desenhar();
    }, function () {
      Estado.contexto.idioma = codigo;
      montarMoldura();
      desenhar();
    });
  }

  function aplicarContexto(contexto) {
    Estado.contexto = contexto;
    Estado.idioma = contexto.idioma || 'pt-BR';
    document.documentElement.lang = Estado.idioma;
  }

  function aplicarSidebar() {
    var casca = el('casca');
    if (casca) casca.classList.toggle('sidebar-recolhida', !!Estado.sidebarRecolhida);
    atualizarBotaoSidebar();
  }

  function atualizarBotaoSidebar() {
    var botao = el('botao-sidebar');
    if (!botao) return;
    botao.innerHTML = icone(Estado.sidebarRecolhida ? 'painelExpandir' : 'painelRecolher');
    botao.title = t(Estado.sidebarRecolhida ? 'expandirMenu' : 'recolherMenu');
  }

  function alternarSidebar() {
    Estado.sidebarRecolhida = !Estado.sidebarRecolhida;
    try { localStorage.setItem('esqueleto-avery.sidebar', Estado.sidebarRecolhida ? '1' : '0'); } catch (e) {}
    aplicarSidebar();
  }

  function alternarTelaCheia() {
    var alvo = document.documentElement;
    if (!document.fullscreenElement && alvo.requestFullscreen) alvo.requestFullscreen();
    else if (document.exitFullscreen) document.exitFullscreen();
  }

  function definirPilula(classe, texto) {
    var pilula = el('pilula-estado');
    if (!pilula) return;
    pilula.className = 'pilula' + (classe ? ' ' + classe : '');
    var noTexto = el('pilula-texto');
    if (noTexto) noTexto.textContent = texto || '';
  }

  function irPara(vista) {
    var achou = VISTAS.filter(function (v) { return v.id === vista && v.pronta; })[0];
    if (!achou) return;
    Estado.vista = vista;
    Array.prototype.forEach.call(document.querySelectorAll('.nav-item'), function (item) {
      item.classList.toggle('ativo', item.getAttribute('data-vista') === vista);
    });
    desenhar();
  }


  /* ------------------------------------------------------- graficos */

  function medidor(percentual, legenda) {
    var raio = 52;
    var circunferencia = 2 * Math.PI * raio;
    var fracao = percentual === null || percentual === undefined
      ? 0
      : Math.max(0, Math.min(percentual, 130)) / 130;
    var traco = circunferencia * fracao;
    var prefs = (Estado.contexto && Estado.contexto.preferencias) || {};
    var verde = prefs.limiarVerde || 95;
    var amarelo = prefs.limiarAmarelo || 80;
    var cor = 'var(--cinza)';
    if (percentual !== null && percentual !== undefined) {
      cor = percentual >= verde ? 'var(--verde)'
          : percentual >= amarelo ? 'var(--ambar)'
          : 'var(--vermelho)';
    }
    return '<div class="medidor">' +
      '<svg viewBox="0 0 120 120" width="100%" height="100%">' +
        '<circle cx="60" cy="60" r="' + raio + '" fill="none" ' +
          'stroke="var(--superficie-3)" stroke-width="11"/>' +
        '<circle cx="60" cy="60" r="' + raio + '" fill="none" stroke="' + cor + '" ' +
          'stroke-width="11" stroke-linecap="round" ' +
          'stroke-dasharray="' + traco.toFixed(1) + ' ' + circunferencia.toFixed(1) + '"/>' +
      '</svg>' +
      '<div class="medidor-centro">' +
        '<div class="medidor-valor num" style="color:' + cor + '">' + esc(pct(percentual)) + '</div>' +
        '<div class="medidor-legenda">' + esc(legenda || t('uptime')) + '</div>' +
      '</div>' +
    '</div>';
  }

  function faixaBarras(pontos) {
    var maximo = pontos.reduce(function (acc, p) {
      return Math.max(acc, p.valor || 0);
    }, 1);
    return '<div class="faixa-barras">' + pontos.map(function (p) {
      var h = Math.max(8, Math.round(((p.valor || 0) / maximo) * 100));
      return '<div class="barra-slot">' +
        '<div class="barra-wrap" style="height:' + h + '%">' +
          '<div class="barra ' + esc(p.classe || 'b-PRODUZINDO') + '"></div>' +
        '</div>' +
        '<div class="dica"><b>' + esc(p.rotulo) + '</b>' + esc(p.dica || '') + '</div>' +
        '<div class="barra-hora">' + esc(p.rotulo) + '</div>' +
      '</div>';
    }).join('') + '</div>';
  }

  function tendencia(pontos) {
    var maximo = pontos.reduce(function (acc, p) {
      return Math.max(acc, p.valor || 0);
    }, 1);
    return '<div class="tendencia">' + pontos.map(function (p) {
      var h = Math.max(6, Math.round(((p.valor || 0) / maximo) * 100));
      return '<div class="tend-slot">' +
        '<div class="tend-barra ' + esc(p.classe || 'neutro') + '" style="height:' + h + '%"></div>' +
        '<div class="tend-dia">' + esc(p.rotulo) + '</div>' +
      '</div>';
    }).join('') + '</div>';
  }

  function ranking(linhas) {
    var maximo = linhas.reduce(function (acc, l) {
      return Math.max(acc, l.valor || 0);
    }, 1);
    return linhas.map(function (l) {
      var w = Math.round(((l.valor || 0) / maximo) * 100);
      return '<div class="rank-linha">' +
        '<div class="rank-nome">' + esc(l.nome) + '</div>' +
        '<div class="rank-trilha"><div class="rank-fill ' + esc(l.classe || '') +
          '" style="width:' + w + '%"></div></div>' +
        '<div class="rank-val num">' + esc(l.rotulo || String(l.valor)) + '</div>' +
      '</div>';
    }).join('');
  }


  /* ------------------------------------------------------- paginas */

  function desenhar() {
    var vista = VISTAS.filter(function (v) { return v.id === Estado.vista; })[0] || VISTAS[0];
    el('topo-titulo').textContent = rotuloVista_(vista);
    el('topo-sub').textContent = subVista_(vista);
    if (vista.id === 'graficos') el('conteudo').innerHTML = desenharGraficos_();
    else if (vista.id === 'pagina') el('conteudo').innerHTML = desenharPagina_();
    else el('conteudo').innerHTML = desenharInicio_();
  }

  function subVista_(vista) {
    if (vista.id === 'inicio') return t('inicioSub');
    if (vista.id === 'graficos') return t('graficosSub');
    if (vista.id === 'pagina') return t('paginaSub');
    return '';
  }

  function desenharInicio_() {
    var horas = [
      { rotulo: '08', valor: 92, classe: 'b-PRODUZINDO', dica: '92% uptime' },
      { rotulo: '09', valor: 88, classe: 'b-PRODUZINDO', dica: '88% uptime' },
      { rotulo: '10', valor: 74, classe: 'b-ATENCAO', dica: '74% uptime' },
      { rotulo: '11', valor: 41, classe: 'b-ABAIXO', dica: '41% uptime' },
      { rotulo: '12', valor: 20, classe: 'b-SETUP', dica: 'Setup' },
      { rotulo: '13', valor: 96, classe: 'b-PRODUZINDO', dica: '96% uptime' },
      { rotulo: '14', valor: 90, classe: 'b-PRODUZINDO', dica: '90% uptime' },
      { rotulo: '15', valor: 35, classe: 'b-PARADA_PLANEJADA', dica: 'Parada planejada' }
    ];
    return (
      '<div class="grade-kpi">' +
        kpi_('KPI exemplo', '1.284', 'un', 'destaque') +
        kpi_('Meta', '1.400', 'un', '') +
        kpi_('Uptime', '91,4%', '', 'verde') +
        kpi_('Pendencias', '3', '', 'ambar') +
      '</div>' +
      '<div class="cartao maquina">' +
        '<div class="maquina-topo">' +
          '<div><div class="maquina-nome">Cartao exemplo</div>' +
          '<div class="maquina-setor">Use as classes .cartao .maquina .medidor</div></div>' +
          '<span class="selo-estado e-PRODUZINDO">Produzindo</span>' +
        '</div>' +
        '<div class="maquina-corpo">' +
          '<div class="bloco-atual">' +
            '<div class="rotulo">Valor atual</div>' +
            '<div class="valor num">128</div>' +
            '<div class="contra">meta 140</div>' +
          '</div>' +
          medidor(91.4) +
        '</div>' +
        '<div class="faixa">' +
          '<div class="faixa-cabecalho"><span>Ultimas horas</span></div>' +
          faixaBarras(horas) +
        '</div>' +
      '</div>'
    );
  }

  function desenharGraficos_() {
    var dias = [
      { rotulo: 'Seg', valor: 96, classe: 'verde' },
      { rotulo: 'Ter', valor: 88, classe: 'verde' },
      { rotulo: 'Qua', valor: 72, classe: 'ambar' },
      { rotulo: 'Qui', valor: 54, classe: 'vermelho' },
      { rotulo: 'Sex', valor: 91, classe: 'verde' },
      { rotulo: 'Sab', valor: 30, classe: 'neutro' },
      { rotulo: 'Dom', valor: 12, classe: 'neutro' }
    ];
    var rank = [
      { nome: 'Motivo A', valor: 42, rotulo: '42 min', classe: 'parada' },
      { nome: 'Motivo B', valor: 28, rotulo: '28 min', classe: 'setup' },
      { nome: 'Motivo C', valor: 15, rotulo: '15 min', classe: 'perda' },
      { nome: 'Motivo D', valor: 9, rotulo: '9 min', classe: '' }
    ];
    return (
      '<div class="grade-kpi">' +
        '<div class="cartao kpi verde" style="display:flex;align-items:center;gap:16px">' +
          medidor(97.2, 'OEE') +
          '<div><div class="kpi-rotulo">Medidor</div>' +
          '<div class="kpi-apoio">Verde / ambar / vermelho pelos limiares 95 e 80</div></div>' +
        '</div>' +
        '<div class="cartao kpi" style="padding:16px 18px 12px">' +
          '<div class="kpi-rotulo">Tendencia</div>' + tendencia(dias) +
        '</div>' +
      '</div>' +
      '<div class="cartao pareto-cartao">' +
        '<div class="pareto-topo"><div><h3>Ranking / Pareto</h3>' +
        '<div class="pareto-sub">Barras horizontais com as cores do design system</div></div></div>' +
        ranking(rank) +
      '</div>'
    );
  }

  /* Ponto de partida de um codigo novo: substitua este HTML. */
  function desenharPagina_() {
    return (
      '<div class="cartao vazio-estado">' +
        '<h3>' + esc(t('paginaTitulo')) + '</h3>' +
        '<p>' + esc(t('paginaVazio')) + '</p>' +
      '</div>'
    );
  }

  function kpi_(rotulo, valor, unidade, classe) {
    return '<div class="cartao kpi' + (classe ? ' ' + classe : '') + '">' +
      '<div class="kpi-rotulo">' + esc(rotulo) + '</div>' +
      '<div class="kpi-valor num">' + esc(valor) +
        (unidade ? '<span class="kpi-unidade">' + esc(unidade) + '</span>' : '') +
      '</div>' +
    '</div>';
  }


  /* -------------------------------------------------------------- boot */

  function iniciar() {
    try {
      Estado.sidebarRecolhida = localStorage.getItem('esqueleto-avery.sidebar') === '1';
    } catch (e) {}

    var idioma = 'pt-BR';
    try { idioma = localStorage.getItem('esqueleto-avery.idioma') || idioma; } catch (e) {}

    chamarApi('apiContexto', [idioma], function (contexto) {
      aplicarContexto(contexto);
      montarMoldura();
      desenhar();
    }, function () {
      aplicarContexto(contextoLocal_());
      montarMoldura();
      desenhar();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
