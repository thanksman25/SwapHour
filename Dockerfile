# Menggunakan versi Node.js yang ringan
FROM node:18-alpine

# Membuat folder kerja di dalam server
WORKDIR /app

# Menginstal dependensi
COPY package*.json ./
RUN npm install

# Menyalin seluruh kode kita
COPY . .

# Melakukan build (untuk aplikasi TypeScript)
RUN npm run build

# Menjalankan aplikasi
CMD ["npm", "start"]