import { Router, RequestHandler } from 'express';
type RouteMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export interface RouteDefinition {
    method: RouteMethod;
    path: string;
    handler: RequestHandler;
    middlewares?: RequestHandler[];
}
export interface RouteGroup {
    basePath: string;
    routes: RouteDefinition[];
    middlewares?: RequestHandler[];
}
export declare function buildGroupedRoutes(router: Router, groups: RouteGroup[]): Router;
export {};
//# sourceMappingURL=routeBuilder.d.ts.map