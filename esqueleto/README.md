# Esqueleto visual Avery

Base pronta para comecar um codigo novo com a mesma casca do
**Controle Hora por Hora**: logo Avery, nome de quem esta logado,
fontes do design system, sidebar e estilos de grafico.

Nao leva regra de negocio (ingestao, OEE, plano, epoxy). So o visual.

## O que ja vem

- Logo Avery na sidebar (sem CDN)
- Cartao com nome, e-mail e iniciais de quem abriu o app
- Menu lateral recolhivel + menu no topo no celular
- Fonte do sistema (`Segoe UI` / `Inter` / `Roboto` / `-apple-system`)
- Tokens de cor Avery (`--marca #E4002B`, verde / ambar / vermelho)
- Medidor circular, barras de hora, tendencia e ranking / Pareto
- KPI, cartao, tabela, formulario, aviso, pilula, botao

## Como usar no navegador

Abra `esqueleto/index.html` no Chrome. Sem servidor. O nome aparece
como **Visitante** porque nao ha conta Google no arquivo local.

Paginas de exemplo:

- **Inicio** — KPI + cartao + medidor + barras
- **Graficos** — medidor, tendencia e ranking
- **Sua pagina** — vazio de proposito: comece o codigo aqui

## Como usar no Apps Script

Duas formas:

1. **Um arquivo so.** Cole `esqueleto/Appscript.txt` num projeto novo
   (Extensoes > Apps Script) e publique como aplicativo da Web.
2. **Arquivos separados.** Copie o conteudo de `esqueleto/apps-script/`:
   `Codigo.gs`, `Index.html`, `Estilos.html`, `App.html`.

Na Web App o nome na tela vem da conta Google
(`Session.getActiveUser().getEmail()`).

## Onde mexer para um codigo novo

| Arquivo | O que trocar |
|---|---|
| `app.js` → `APP` | Nome, subtitulo e versao |
| `app.js` → `VISTAS` | Itens do menu |
| `app.js` → `desenharPagina_()` | HTML da sua tela |
| `app.js` → `chamarApi()` | Chamadas `google.script.run` |
| `apps-script/Codigo.gs` | `apiContexto` e endpoints novos |

As funcoes `medidor()`, `faixaBarras()`, `tendencia()` e `ranking()`
ja montam o SVG / HTML com as cores do Hora por Hora.

## Arquivos

```
esqueleto/
  index.html          preview local
  estilos.css         design system extraido
  app.js              casca + paginas de exemplo
  logo-avery.png      logo (tambem embutido no CSS)
  Appscript.txt       pacote de um arquivo so
  apps-script/        arquivos para o editor do Apps Script
```
