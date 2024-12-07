FROM denoland/deno:2.0.2
EXPOSE 8000
WORKDIR /app
COPY . .
RUN mkdir -p ./logs && \
    touch ./logs/app.log && \
    chmod 644 ./logs/app.log && \
    chmod 755 ./logs && \
    chown -R deno:deno ./logs
USER deno
RUN deno cache src/main.ts
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "src/main.ts"]