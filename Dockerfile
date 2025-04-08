# Imagen base oficial de Python
FROM python:3.9

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN pip install --no-cache-dir -r requiriments.txt

# Expone el puerto donde corre Flask
EXPOSE 5000

# Comando para ejecutar la app Flask
CMD ["python", "backend/main.py"]
