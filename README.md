# [Redu Bootstrap / UI Components](http://developers.redu.com.br/ui-components/)

Este repositório tem como objetivo implementar os elementos de interface gráfica descritos no documento *GUI: Guidelines & Elements versão 1.3.2*.

## Organização dos diretórios

O repositório está organizado da seguinte maneira:

 * `/`: arquivos HTML compilados da documentação e arquivos de configuração do Compass e Grunt.
 * `/docs/`: arquivos em geral relacionados a documentação:
 * `/docs/assets/`: recursos usados somente na documentação;
 * `/docs/build/`: arquivos usados para compilar os templates da documentação em HTML;
 * `/docs/templates/`: templates das páginas da documentação.
 * `/css/`: arquivos SCSS e arquivos finais compilados em CSS.
 * `/img/`: arquivos de imagens em geral como thumbnails, ícones e sprites:
 * `/img/icon/`: arquivos dos ícones usados para geração do sprite de ícones;
 * `/img/sprite/`: arquivos de imagens usados para geração de sprites mais gerais.
 * `/js/`: arquivos JavaScript:
 * `/js/vendor/`: arquivos JavaScripts de externos.
 * `/layout/`: arquivos HTML onde os elementos são construídos e revisados.

## Funcionamento das branchs

Atualmente o repositório conta com três branchs:

 * `master`: branch com a última vesão estável;
 * `contributing`: branch de contribuições para versões futuras;
 * `gh-pages`: branch com os arquivos estáticos da documentação.

Todas as contribuições, como pedidos de pull requests, devem ser feitas na branch `contributing`. Quando uma versão estável é fechada, as modificações na branch de contribuição são passadas para a branch `master`.

## Dependências para o desenvolvimento

Para desenvolver dentro do projeto, se faz necessário a instalação das seguintes ferramentas:

 * [Ruby 1.9.3 ou maior](http://www.ruby-lang.org/en/downloads/): para executar as gems;
 * [Bundler](http://gembundler.com/): para o gerenciamento de gems;
 * **[Compass](http://compass-style.org/)**: instalado através do Bundler. É um framework para Sass, usado principalmente para compilar os arquivos Sass em CSS;
 * [Node.js](http://nodejs.org/download/) e [npm](https://npmjs.org/): gerenciador de módulos feitos para o Node.js, necessário para a instalação do Grunt;
 * **[Grunt](http://gruntjs.com/)**: instalado através do npm. É uma ferramenta de linha de comando bas para projetos em JavaScript. Usado para linting, concatenação e minificação dos arquivos JavaScript.vos JavaScript.

As duas ferramentas principais são o Compass e o Grunt. É preciso que essas duas ferramentas estejam rodando em modo `watch` nos terminais para que as modificações feitas individualmente nos arquivos Sass e JavaScript sejam automaticamente compilados nos arquivos CSS e JavaScript finais, uma vez salvas.

Para executar o Compass no modo `watch`, digite o seguinte no terminal:

    bundle exec compass watch

Todas as modificações feitas nos arquivos importados pelo `css/bootstrap-redu.scss`, serão compiladas no arquivo final `css/bootstrap-redu.css`.

Para executar o Grunt no modo `watch`, digite o seguinte no terminal:

    grunt watch

Os arquivos JavaScript observados pelo Grunt estão definidos no arquivo de configuração [`/Gruntfile.js`](https://github.com/redu/ui-components/blob/master/Gruntfile.js#L2), basta modificá-lo para adicionar novos arquivos.

## Compilando para produção

Para utilizar o projeto em produção, se faz necessário somente os arquivos:

 * `/css/bootstrap-redu.css`: arquivo CSS final, compilado dos arquivos Scss;
 * `/js/bootstrap-redu.js`: arquivo JavaScript final, compilado dos arquivos individuais JavaScript;
 * `/js/vendor/*.js`: bibliotecas/frameworks/plugins em JavaScript externos utilizados pelo projeto;
 * `/img/*.png`: todos os arquivos de imagens e sprites gerais (`sprite-xxx.png`) e de ícones (`icon-xxx.png`). Não é necessário ter os outros diretórios que estão dentro deste.

Para gerar a versão minificada do CSS final, digite o seguinte no terminal:

    bundle exec compass compile -e production --force

Para gerar a versão minificada do JavaScript final, digite o seguinte no terminal:

    grunt uglify

Para alguns outros requisitos, como por exemplo, suporte específico ao IE9+, suporte de CSS3 através do [Modernizr](http://modernizr.com/) e suporte as fontes usadas através do [Typekit](https://typekit.com/colophons/lpo4rgu), leia rapidamente as instruções da [documentação](http://developers.redu.com.br/ui-components/).

### Compilando para aplicação Rails

Para facilitar a integração com uma aplicação Rails, onde todos os assets do CSS final ficarão em `/assets/`, utilize o seguinte comando:

    bundle exec compass compile -c config_rails.rb --force

## O que precisa ser feito

 * Definir um guia para formatação dos arquivos CSS/Scss que deverá ser seguida por todo o projeto.

## Contribuindo

 1. Fork o repositório;
 2. Utilize a branch de contribuição (`git checkout contributing`);
 3. Crie sua branch com a modificação (`git checkout -b my-new-feature`);
 4. Commit suas mudanças (`git commit -am 'Add some feature'`);
 5. Push para o branch (`git push origin my-new-feature`);
 6. Crie um pull request para a branch `contributing`.


<img src="https://github.com/downloads/redu/redupy/redutech-marca.png" alt="Redu Educational Technologies" width="300">

This project is maintained and funded by [Redu Educational Techologies](http://tech.redu.com.br).

# Copyright

Copyright (c) 2012 Redu Educational Technologies

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
