# Projeto CRUD com DynamoDB

## Requisitos
- **Node.js**: Versão 21.1.0
- **Java**: Necessário para rodar o banco de dados DynamoDB localmente

## Instalação e Configuração

### 1. Configurar o Ambiente
Certifique-se de que você tem a versão correta do Node.js instalada. Você pode verificar com o seguinte comando:
```bash
node -v
```

Se a versão não for 21.1.0, instale a versão correta através do [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm):
```bash
nvm install 21.1.0
nvm use 21.1.0
```

### 2. Instalar as Dependências do Projeto
Instale as dependências com o gerenciador de pacotes `npm` ou `yarn`:
```bash
npm install
```

### 3. Subir o Banco de Dados DynamoDB Localmente
O projeto usa uma instância local do DynamoDB para testes e desenvolvimento. Para iniciar o banco de dados:
1. Navegue até a pasta `.dynamodb`.
2. Execute o seguinte comando para iniciar o DynamoDB local:
```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

### 4. Configurar Credenciais da AWS
Para usar o DynamoDB local ou na própria AWS, configure suas credenciais de acesso AWS no arquivo `~/.aws/credentials` ou usando variáveis de ambiente:

#### Arquivo de Credenciais
Crie ou edite o arquivo `~/.aws/credentials` com as seguintes informações:
```
[default]
aws_access_key_id = SUA_ACCESS_KEY
aws_secret_access_key = SUA_SECRET_KEY
```

#### Variáveis de Ambiente
Configure as credenciais diretamente no terminal:
```bash
export AWS_ACCESS_KEY_ID=SUA_ACCESS_KEY
export AWS_SECRET_ACCESS_KEY=SUA_SECRET_KEY
```

## Sobre o Projeto
Este projeto é uma API CRUD que utiliza os verbos HTTP básicos:
- **GET**: Recupera informações de um ou mais recursos.
- **POST**: Cria novos recursos.
- **PUT**: Atualiza recursos existentes.
- **DELETE**: Remove recursos.

### Endpoints
1. **GET /clients**: Retorna todos os clientes.
2. **GET /clients/{clientId}**: Retorna um cliente específico.
3. **POST /clients**: Cria um novo cliente.
4. **PUT /clients/{clientId}**: Atualiza um cliente existente.
5. **DELETE /clients/{clientId}**: Remove um cliente.

## Testes
Os testes unitários foram escritos utilizando Jest. Para executar os testes:
```bash
npm test
```

## Observações
- Certifique-se de que o DynamoDB local esteja rodando antes de testar ou usar a aplicação.
- Configure corretamente suas credenciais AWS para usar o DynamoDB remoto, se necessário.
