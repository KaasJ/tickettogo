"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./users/controller");
const controller_2 = require("./logins/controller");
const controller_3 = require("./events/controller");
const controller_4 = require("./tickets/controller");
const controller_5 = require("./comments/controller");
const routing_controllers_2 = require("routing-controllers");
const jwt_1 = require("./jwt");
const entity_1 = require("./users/entity");
const app = routing_controllers_1.createKoaServer({
    cors: true,
    controllers: [
        controller_5.default,
        controller_4.default,
        controller_3.default,
        controller_1.default,
        controller_2.default
    ],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, jwt] = header.split(' ');
            try {
                return !!(jwt && jwt_1.verify(jwt));
            }
            catch (err) {
                throw new routing_controllers_2.BadRequestError(err);
            }
        }
        return false;
    },
    currentUserChecker: async (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, jwt] = header.split(' ');
            if (jwt) {
                const { id } = jwt_1.verify(jwt);
                return entity_1.default.findOne({ where: { id } });
            }
        }
        return undefined;
    }
});
db_1.default()
    .then(_ => app.listen(4000, () => console.log('Listening on port 4000')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map