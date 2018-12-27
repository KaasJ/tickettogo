"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const typeorm_1 = require("typeorm");
let EventController = class EventController {
    async createEvent({ description, name, startDate, endDate, image }) {
        const event = await entity_1.default.create({
            description,
            name,
            startDate,
            endDate,
            endDateInDays: Math.ceil(Date.parse(endDate.toString()) / 8.64e7),
            image
        }).save();
        return event;
    }
    async allEvents(take, skip) {
        const [events, count] = await entity_1.default.findAndCount({ take, skip, order: { startDate: "ASC" }, where: { endDateInDays: typeorm_1.MoreThan(Math.floor(Date.now() / 8.64e7)) } });
        if (!events)
            throw new routing_controllers_1.NotFoundError(`No events found`);
        return { events, count };
    }
    async getEvent(id) {
        const event = await entity_1.default.findOne({ where: { id } });
        if (!event)
            throw new routing_controllers_1.NotFoundError(`No event found`);
        return event;
    }
    async updateEvent(id, { name, startDate, endDate, image }) {
        const event = await entity_1.default.findOne({ where: { id } });
        if (!event)
            throw new routing_controllers_1.NotFoundError('No event found');
        if (name)
            event.name = name;
        if (startDate)
            event.startDate = startDate;
        if (endDate)
            event.endDate = endDate;
        if (image)
            event.image = image;
        return event.save();
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/events'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    routing_controllers_1.Get('/events'),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.QueryParam('take')),
    __param(1, routing_controllers_1.QueryParam('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "allEvents", null);
__decorate([
    routing_controllers_1.Get('/events/:id'),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEvent", null);
__decorate([
    routing_controllers_1.Put('/events/:id'),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body({ validate: { skipMissingProperties: true } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_1.default]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
EventController = __decorate([
    routing_controllers_1.JsonController()
], EventController);
exports.default = EventController;
//# sourceMappingURL=controller.js.map