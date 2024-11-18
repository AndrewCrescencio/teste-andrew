<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Teste para RediRedi</h1>

  <p align="center">
    Aplicação front-end de gerenciamento de categorias
    <br />
    <!-- <a href="">View Demo</a> -->
  </p>
</div>

<details>
  <summary>Índice</summary>
  <ol>
      <a href="#clonando-o-projeto">Clonando o projeto</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <ul>
        <li><a href="#servidor-de-desenvolvimento">Servidor de desenvolvimento</a></li>
        <li><a href="#produção">Produção</a></li>
      </ul>
    </li>
  </ol>
</details>

[![Preview][product-screenshot]]()

## Clonando o Projeto

### Pré-requisitos

- npm
- API token

<br/>

Clone o repositório

```bash
git clone https://github.com/AndrewCrescencio/teste-andrew.git
```

Crie um arquivo .env e use sua chave API (.env.example como exemplo)

```env
VITE_BASE_URL=http://localhost:3000
VITE_API_BASE_URL=URL_DA_API
VITE_API_TOKEN=TOKEN_DA_API
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Setup

Certifique-se de instalar as dependências

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Servidor de desenvolvimento

Inicie o servidor de desenvolvimento em `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Produção

Builde a versão para produção:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

Visualize localmente a versão de produção:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: public/preview.webp
[Nuxt.js]: https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82
[Nuxt-url]: https://nuxt.com/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Sass]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[Sass-url]: https://sass-lang.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
