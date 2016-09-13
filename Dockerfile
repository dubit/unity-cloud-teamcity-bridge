FROM node:6.5.0

RUN useradd --user-group --create-home --shell /bin/false dubit

ENV HOME=/home/dubit

COPY package.json $HOME/app/package.json
RUN chown -R dubit:dubit $HOME/app

USER dubit
WORKDIR $HOME/app

RUN npm install

USER root
COPY . $HOME/app
RUN chown -R dubit:dubit $HOME/app/*

USER dubit

ENV SERVER_PORT=8080
EXPOSE ${SERVER_PORT}

USER root

RUN npm run build

CMD ["npm", "start"]
