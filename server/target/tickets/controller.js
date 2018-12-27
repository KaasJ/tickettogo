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
const entity_2 = require("../users/entity");
const entity_3 = require("../events/entity");
const logic_1 = require("./logic");
let TicketController = class TicketController {
    async createEventTicket(user, { price, description, image }, id) {
        const currentEvent = await entity_3.default.findOne({ where: { id } });
        await entity_1.default.create({
            user,
            event: currentEvent,
            price,
            description,
            image,
            riskPercentage: await logic_1.calculateInitialRiskPercentage(user, currentEvent, price)
        }).save();
        const eventWithNewTicket = await entity_3.default.findOne({ where: { id } });
        return eventWithNewTicket;
    }
    async updateTicket(ticketid, eventid, { event, price, description, image }) {
        const ticket = await entity_1.default.findOne({ where: { id: ticketid } });
        if (!ticket)
            throw new routing_controllers_1.NotFoundError('No ticket found');
        if (event)
            ticket.event = event;
        if (description)
            ticket.description = description;
        if (price)
            ticket.price = price;
        if (image)
            ticket.image = image;
        await ticket.save();
        const eventWithUpdatedTicket = await entity_3.default.findOne({ where: { id: eventid } });
        return eventWithUpdatedTicket;
    }
    async allTickets() {
        const tickets = await entity_1.default.find();
        if (!tickets)
            throw new routing_controllers_1.NotFoundError(`No events found`);
        return tickets;
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/events/:id/tickets'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.CurrentUser()),
    __param(1, routing_controllers_1.Body()),
    __param(2, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_2.default,
        entity_1.default, Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createEventTicket", null);
__decorate([
    routing_controllers_1.Put('/events/:eventid/tickets/:ticketid'),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.Param('ticketid')),
    __param(1, routing_controllers_1.Param('eventid')),
    __param(2, routing_controllers_1.Body({ validate: { skipMissingProperties: true } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, entity_1.default]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateTicket", null);
__decorate([
    routing_controllers_1.Get('/tickets'),
    routing_controllers_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "allTickets", null);
TicketController = __decorate([
    routing_controllers_1.JsonController()
], TicketController);
exports.default = TicketController;
//# sourceMappingURL=controller.js.map