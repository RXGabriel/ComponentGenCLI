# ComponentGenCLI

## Objetivo

Este é um projeto Node.js que permite os usuários criarem automaticamente o esqueleto de código para um componente específico. Ele gera as camadas de Repository, Service e Factory com base no nome do componente fornecido pelo usuário.

## Características

- Geração Automática de Camadas: O ComponentGenCLI automatiza a criação das camadas de Repository, Service e Factory com base no nome do componente fornecido pelo usuário.
- Configuração Flexível: Os usuários têm a flexibilidade de configurar o diretório principal e outras opções com base em variáveis de ambiente ou em opções de linha de comando.
- Suporte a Múltiplos Componentes: O CLI permite aos usuários especificar vários nomes de componentes em um único comando, gerando esqueletos de código para cada um deles.

## Instalação

1. Clone o repositório:

```bash
   git https://github.com/RXGabriel/ComponentGenCLI.git
   cd ComponentGenCLI
```

2. Instale as dependências:

```bash
npm install
```

## Uso
Para usar o ComponentGenCLI, você pode executar os seguintes comandos no terminal:

- Para criar o esqueleto do projeto para um único componente:

```bash
codegen skeleton --component-name nome-do-componente
```


- Para criar o esqueleto do projeto para múltiplos componentes:

```bash
codegen skeleton -c componente1 -c componente2 -c componente3
```

- Exemplo: Se você quiser criar o esqueleto de código para um componente chamado User, você executaria o seguinte comando:

```bash
codegen skeleton -c User
```
Isso geraria as camadas de Repository, Service e Factory para o componente User.

## Iniciar o ComponentGenCLI:

iniciar o servidor:
```bash
  npm run start
```
rodar os testes:
```bash
npm run test
```
gerar relatório de cobertura de teste:
```bash
npm run cov
```
