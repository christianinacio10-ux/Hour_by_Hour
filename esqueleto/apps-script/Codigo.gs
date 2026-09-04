/**
 * Esqueleto visual Avery.
 * Cole este arquivo + Index.html + Estilos.html + App.html num projeto
 * novo do Apps Script e publique como aplicativo da Web.
 *
 * O nome na tela vem da conta Google logada (Session.getActiveUser).
 */

const APP = {
  nome: 'Esqueleto Avery',
  versao: '1.0.0',
};

function doGet(e) {
  const parametros = (e && e.parameter) || {};
  const pagina = HtmlService.createTemplateFromFile('Index');
  pagina.parametros = parametros;

  return pagina.evaluate()
    .setTitle(APP.nome)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(nome) {
  return HtmlService.createHtmlOutputFromFile(nome).getContent();
}

function apiContexto(idioma) {
  const escolhido = idioma === 'en' ? 'en' : 'pt-BR';
  return {
    app: { nome: APP.nome, versao: APP.versao },
    usuario: identificarUsuario_(),
    plantas: [],
    idioma: escolhido,
    idiomasDisponiveis: [
      { id: 'pt-BR', rotulo: 'PT' },
      { id: 'en', rotulo: 'EN' },
    ],
    preferencias: { limiarVerde: 95, limiarAmarelo: 80 },
  };
}

function identificarUsuario_() {
  let email = '';
  try {
    email = Session.getActiveUser().getEmail() || '';
  } catch (e) {
    email = '';
  }

  const nome = email
    ? email.split('@')[0].split(/[._-]/).map(function (parte) {
        return parte.charAt(0).toUpperCase() + parte.slice(1);
      }).join(' ')
    : 'Visitante';

  return { email: email, nome: nome, iniciais: iniciais_(nome) };
}

function iniciais_(nome) {
  const partes = String(nome).trim().split(/\s+/);
  if (!partes[0]) return '?';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}
