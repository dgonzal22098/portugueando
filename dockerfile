FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Crear directorios si no existen
RUN mkdir -p src/assets/logos

# Crear imágenes temporales si no existen
RUN if [ ! -f src/assets/logos/logoUEANblanco.png ]; then \
    echo "Creando imagen temporal..." && \
    touch src/assets/logos/logoUEANblanco.png; \
    fi

# Instalar dependencias adicionales
RUN npm install socket.io-client
RUN npm install @tanstack/react-query
RUN npm install framer-motion
RUN npm audit fix

# Exponer el puerto
EXPOSE 5173

# Comando por defecto
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
