# Getting Started

1. install pnpm (>=9)

2. install node (>=20.10.0)

3. install

# Debug

```
 ENOENT  Command failed with ENOENT: create-react-spa-cloudflare
spawn create-react-spa-cloudflare ENOENT

pnpm: Command failed with ENOENT: create-react-spa-cloudflare
spawn create-react-spa-cloudflare ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:286:19)
    at onErrorNT (node:internal/child_process:484:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
```

You forgot to add a version:

```
pnpm create react-spa-cloudflare@latest
```
