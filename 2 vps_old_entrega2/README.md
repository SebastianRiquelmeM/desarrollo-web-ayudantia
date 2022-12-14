# 2 vps app con base de datos

Tener en consideración que se debe crear la db para que funcione correctamente, pronto la dejaré aquí para que la usen.

## Base del proyecto

Para este proyecto se usa como base
[express-handlebars
](https://www.npmjs.com/package/express-handlebars).

Además se añade mongoDB como base de datos, para instalar mongoDB usar los siguientes comandos:

```console
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

sudo apt-get update

echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list

sudo apt-get update

sudo apt-get install libssl1.1

sudo rm /etc/apt/sources.list.d/focal-security.list

sudo apt-get install mongodb-org


sudo mkdir -p /data/db/

sudo chown `id -u` /data/db

sudo systemctl enable mongod.service

sudo systemctl status mongod.service

sudo systemctl start mongod.service
```

También puede ver la guía oficial para ubuntu en [Install mongoDB
](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/). Tenga en consideración que los comandos anteriores incluyen una solución a un error de dependencia faltante en ubuntu 22.04.

## Instalar dependencias

En el directorio actual usar:

```console
npm i
```

## Iniciar proyecto

Para ejecutar el proyecto, en el directorio actual usar:

```console
npm start
```

Luego entrar a [http://localhost:3000
](http://localhost:3000) si está en un servidor remoto, puede reemplazar localhost por la IP de su servidor y debe tener el puerto 3000 abierto. También puede apuntar nginx como reverse proxy a la direccción anterior.
