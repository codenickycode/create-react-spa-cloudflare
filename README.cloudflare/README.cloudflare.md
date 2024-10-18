1. [Sign up for Cloudflare](https://www.cloudflare.com/) (they have a free tier)

2. Create a Pages app to host the React client. From the Workers & Pages screen, choose "Create".
   ![](./img/1%20-%20create%20pages.jpg)

3. Select the "Pages" tab and click "Upload assets" from the "Create using direct upload" section.
   ![](./img/2%20-%20direct%20upload.jpg)

4. Name your app and click "Create". Note: You do not need to upload any assets and click "Deploy". The Wrangler CLI and GitHub actions will take care of that later.

   ![](./img/3a%20-%20name%20project.jpg)

5. Each time you add an app, you will see it appear in your "Workers & Pages" Overview:
   ![](./img/4%20-%20dashboard.jpg)

6. Add the following variables under "Variables and Secrets" so that the build command can run in the correct environment:
   | Type | Name | Value |
   | --- | --- | --- |
   | Plaintext | NODE_VERSION | 22.9.0 |
   | Plaintext | PNPM_VERSION | 9 |

7. Create a Workers app to host the prod server. From the Workers & Pages Overview page, click "Create" (like step 2), and then from the "Workers" tab, click "Create Worker".
   ![](./img/7%20-%20create%20worker.jpg)

8. Name your worker and click "Deploy". Note: Ignore the `worker.js` code, as it will be overwritten by our app when we run our deploy script.
   ![](./img/8%20-%20name%20worker%20and%20deploy.jpg)

9. Add a KV namespace for your prod server storage. Navigate to Workers & Pages - KV, and click "Create a namespace".
   ![](./img/9%20-%20create%20namespace.jpg)

10. Enter a name for your prod server kv namespace, and click "Add".
    ![](./img/10%20-%20add%20namespace.jpg)

11. Repeat steps 7-10 for your stage server and kv storage. Note: It might be useful to use suffix `-stage` in your naming.

12. On the right hand side of the Workers & Pages Overview screen, you can find your Account ID, as well as a link to "Manage API tokens":
    ![](./img/11%20-%20account%20id.jpg)

13. Create an API token for "Edit Cloudflare Workers", using the provided template.
    ![](./img/12%20-%20edit%20workers%20token.jpg)

14. Add your Cloudflare API Token and Account ID in [.env](../.env). This will enable the Wrangler CLI to deploy the app locally.

15. Add your Cloudflare API Token and Account ID to your repository secrets in GitHub. This will enable deploy from GitHub actions.
    ![](./img/13%20-%20gh%20vars.jpg)

16. Configure `ENV` and `getServerUrl` in [client/src/config.ts](../client/src/config.ts). Note: This is just a suggestion, and you may choose another method of determining your app's runtime environment.

17. Update [server/wrangler.toml](../server/wrangler.toml) with your app names and IDs. Eg:

```diff
[env.stage]
- name = "todo-rename-stage"
+ name = "my-app-stage"
workers_dev = true
- vars = { ALLOWED_HOST = "todo:rename to stage host", ENV = "stage" }
+ vars = { ALLOWED_HOST = "my-app-stage.pages.dev", ENV = "stage" }
[[env.stage.kv_namespaces]]
binding = "DB"
- id = "e0c5eee53ed34ff69c4d8303f818adca"
+ id = "fThh47jB971c4GP452h75cP7jqE499mL"
```

18. Update the deploy scripts in [client/package.json](../client/package.json) to use your project name. Note: Pages allows a "Preview" branch, for all branches besides main. We use the same app name but provide `--branch "stage"` for our staging branch:

```diff
-    "deploy:stage": "pnpm wrangler pages deploy ./dist --project-name todo-rename --branch \"stage\"...,
+    "deploy:stage": "pnpm wrangler pages deploy ./dist --project-name my-app --branch \"stage\"...,
-    "deploy:prod": "pnpm wrangler pages deploy ./dist --project-name todo-rename",
+    "deploy:prod": "pnpm wrangler pages deploy ./dist --project-name my-app",
```
