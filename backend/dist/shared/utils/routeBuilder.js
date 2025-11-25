"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGroupedRoutes = buildGroupedRoutes;
const express_1 = require("express");
function buildGroupedRoutes(router, groups) {
    groups.forEach(group => {
        const subRouter = (0, express_1.Router)();
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
//# sourceMappingURL=routeBuilder.js.map