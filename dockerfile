FROM node:18 AS build
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

# Intentar la construcción
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
