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

export function buildGroupedRoutes(router: Router, groups: RouteGroup[]): Router {
  groups.forEach(group => {
    const subRouter = Router();

    // Apply group-level middlewares if any
    if (group.middlewares && group.middlewares.length > 0) {
      subRouter.use(...group.middlewares);
    }

    // Register routes
    group.routes.forEach(route => {
      const handlers = route.middlewares 
        ? [...route.middlewares, route.handler]
        : [route.handler];
      
      subRouter[route.method](route.path, ...handlers);
    });

    router.use(group.basePath, subRouter);
  });

  return router;
}
