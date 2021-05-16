FROM node:15-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["yarn.lock","package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent --pure-lockfile #&& mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
