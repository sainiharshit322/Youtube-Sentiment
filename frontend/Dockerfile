# Stage 1: Build the app
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
