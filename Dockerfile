# Use a imagem base oficial do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo de configuração do package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação para o contêiner
COPY . .

# Defina a variável de ambiente para a porta
ENV PORT=8080

# Exponha a porta usada pela aplicação
EXPOSE 8080

# Comando para iniciar o servidor da aplicação
CMD ["npm", "start"]
