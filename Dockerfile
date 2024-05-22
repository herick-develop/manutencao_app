FROM node:alpine AS build

WORKDIR /application

COPY . .

RUN npm i --quiet --no-optional --no-fund --loglevel=error && \
    npm run build


FROM node:alpine

WORKDIR /application

COPY --from=build /application/package.json /application/
COPY --from=build /application/.next /application/.next/
COPY --from=build /application/node_modules /application/node_modules/

EXPOSE 3006

CMD [ "npm", "run", "start" ]
