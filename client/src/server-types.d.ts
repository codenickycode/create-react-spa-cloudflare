declare module "types" {
    import type { KVNamespace } from '@cloudflare/workers-types';
    import type { Context as HonoContext } from 'hono';
    export interface Env {
        ALLOWED_HOST: string;
        DB: KVNamespace;
        LOCAL_DB: KVNamespace;
        TEST_DB: KVNamespace;
        ENV: 'dev' | 'prod' | 'stage' | 'test';
        GITHUB_REF_NAME: string;
        GITHUB_SHA: string;
    }
    export type Context = HonoContext<{
        Bindings: Env;
    }>;
}
declare module "test" {
    import type { Env } from "types";
    export const testRoute: import("hono/hono-base").HonoBase<{
        Bindings: Env;
    }, {
        "/reset": {
            $post: {
                input: {};
                output: {};
                outputFormat: string;
                status: import("hono/utils/http-status").StatusCode;
            };
        };
    }, "/">;
}
declare module "index" {
    import type { Env } from "types";
    const app: import("hono/hono-base").HonoBase<{
        Bindings: Env;
    }, ({
        "*": {};
    } & {
        "/": {
            $get: {
                input: {};
                output: "ok";
                outputFormat: "text";
                status: 200;
            };
        };
    }) | import("hono/types").MergeSchemaPath<{
        "/reset": {
            $post: {
                input: {};
                output: {};
                outputFormat: string;
                status: import("hono/utils/http-status").StatusCode;
            };
        };
    }, "/test">, "/">;
    export default app;
}
declare module "types.shared" {
    import type app from "index";
    export type ServerApi = typeof app;
}
