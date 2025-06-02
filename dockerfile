FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Crear directorios necesarios
RUN mkdir -p src/assets/logos

# Crear imágenes temporales si no existen
RUN touch src/assets/logos/logoUEANblanco.png

# Instalar dependencias adicionales
RUN npm install socket.io-client @tanstack/react-query framer-motion

# Exponer el puerto
EXPOSE 5173

# Configurar variables de entorno
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=5173

# Modificar el comando para usar nodemon
CMD ["sh", "-c", "npm install -g nodemon && nodemon -L --watch src --exec 'npm run dev -- --host 0.0.0.0'"]