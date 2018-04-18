FROM node:8.9.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN yarn install
RUN yarn global add react-scripts@1.1.4

CMD ["yarn", "start"]
