FROM node:20-alpine3.18
WORKDIR /app
ADD . /app
RUN yarn
ENV PORT=3000
EXPOSE 3000
ENV OPENAI_API_KEY="sk-<your-key>"

CMD ["node", "main.mjs"]
