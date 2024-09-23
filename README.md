# Getting Started

1. install pnpm (>=9)

2. install node (>=20.10.0)

3. install

```
pnpm create react-spa-cloudflare@latest
```

4. complete all todos

5. test client

6. test server

7. test e2e

# Debug

## Server starts on wrong port locally

Sometimes the server fails to shutdown, leaving an instance listening to port 8787. The next time you run `pnpm run server dev`, it will start a new instance and listen to a random port. Running `killall workerd` does not seem to fix it. Instead, get any `workerd` process ID listening to port 8787 (there may be several) and kill it. On macOS:

```sh
lsof -i :8787
kill -9 <pid>
```
