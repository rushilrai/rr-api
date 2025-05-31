FROM denoland/deno:2.3.3

EXPOSE 8000

WORKDIR /app

COPY . .

RUN mkdir -p ./logs && \
    touch ./logs/app.log && \
    chmod 644 ./logs/app.log && \
    chmod 755 ./logs && \
    chown -R deno:deno ./logs

USER deno

RUN deno task cache

CMD ["task", "start"]