# SalesForm

Este é um projeto de exemplo que demonstra um CRUD (Create, Read, Update, Delete) básico utilizando React.js. O objetivo deste projeto é criar um formulário de vendas onde os usuários podem adicionar, visualizar, atualizar e excluir registros de vendas.

**Demo**: [SalesForm Demo](https://salesform.netlify.app/)

## Funcionalidades

O SalesForm possui as seguintes funcionalidades:

- Adicionar uma venda: Os usuários podem preencher um formulário com informações sobre a venda, como o nome do cliente, o vendedor e o valor da venda. Após preencher o formulário, eles podem adicionar entregas fracionadas a venda e ela será exibida na lista de detalhes das vendas.
- Visualizar vendas: Todas as vendas adicionadas são exibidas em uma lista, mostrando as informações básicas, como o nome do cliente, nome do vendedor e o valor da venda.
- Atualizar uma venda: Os usuários podem editar as informações de uma venda existente. Eles podem clicar em um botão de edição abaixo de cada venda na pagina de detalhes, o que abrirá um formulário com opção de adicionar uma entrega a essa venda. Eles podem fazer as alterações necessárias e salvar as atualizações.
- Excluir uma venda: Os usuários podem remover uma venda da lista clicando em um botão de exclusão ao lado de cada venda.

## Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- React.js: Uma biblioteca JavaScript para construir interfaces de usuário.
- HTML: Linguagem de marcação utilizada para estruturar a página web.
- Tailwind CSS: Um framework CSS utilizado para estilizar a página web de forma rápida e eficiente.

## Estrutura do projeto

A estrutura do projeto é organizada da seguinte forma:
SalesForm/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
| ├── pages/
│ │ ├── HomePage.jsx
│ │ ├── SaleDetail.jsx
│ | ├── App.jsx
├── README.md
├── package.json

- O diretório src/ contém os componentes React utilizados para construir o formulário de vendas, a navbar e a lista de vendas.
- O arquivo src/App.js contém a lógica principal do aplicativo, incluindo o estado do componente e as funções para adicionar, editar e excluir vendas.
- O arquivo src/index.js é o ponto de entrada do aplicativo React.

## Contribuição

Sinta-se à vontade para contribuir com melhorias para este projeto. Se você tiver alguma sugestão, abra uma nova issue ou envie um pull request com suas alterações.

Espero que este README.md tenha fornecido uma visão geral clara do projeto SalesForm e como executá-lo. Se você tiver alguma dúvida adicional, não hesite em perguntar.
