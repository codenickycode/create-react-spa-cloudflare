1. [Sign up for Sentry](https://sentry.io/welcome/) for free!

2. From the Projects tab, Click "+ Create Project"

![1 create project](./img/1%20create%20project.jpg)

3. Select "React", name your project, and click "Create Project"

![2 create project](./img/2%20create%20project.jpg)

4. Select your new project to enter the project overview page

![3 select project](./img/3%20select%20project.jpg)

5. Click the gear icon in the top right to edit project settings

![4 click settings](./img/4%20click%20settings.jpg)

6. In the "Client Keys (DSN)" tab, copy your DSN.

![5 copy dsn](./img/5%20copy%20dsn.jpg)

7. Paste this into the `SENTRY_DSN` const in [client/src/services/monitor.tsx](../client/src/services/monitor.tsx)

8. Generate an auth token for sourcemap uploads:
   https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/#configuration

![6 generate token](./img/6%20generate%20token.jpg)

9. Add your `SENTRY_AUTH_TOKEN` in [client/.env](../client/.env)

10. Add your `org` and `project` values to Sentry Vite plugin in [client/vite.config.ts](../client/vite.config.ts)
