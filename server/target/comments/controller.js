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
const entity_3 = require("../tickets/entity");
const entity_4 = require("../events/entity");
let CommentController = class CommentController {
    async createComment({ text }, ticketId, eventId, user) {
        const currentTicket = await entity_3.default.findOne({ where: { id: ticketId } });
        if (!currentTicket)
            throw new routing_controllers_1.NotFoundError(`No Ticket found`);
        await entity_1.default.create({
            text,
            user,
            ticket: currentTicket
        }).save();
        const eventNewComment = await entity_4.default.findOne({ where: { id: eventId } });
        if (!eventNewComment)
            throw new routing_controllers_1.NotFoundError(`No Event found`);
        return eventNewComment;
    }
};
__decorate([
    routing_controllers_1.Post('/events/:eventid/tickets/:ticketid'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Param('ticketid')),
    __param(2, routing_controllers_1.Param('eventid')),
    __param(3, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default, Number, Number, entity_2.default]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
CommentController = __decorate([
    routing_controllers_1.JsonController()
], CommentController);
exports.default = CommentController;
//# sourceMappingURL=controller.js.map