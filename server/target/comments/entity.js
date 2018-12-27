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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../tickets/entity");
const entity_2 = require("../users/entity");
const class_validator_1 = require("class-validator");
let Comment = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, ticket => ticket.comments, { onDelete: 'CASCADE' }),
    __metadata("design:type", entity_1.default)
], Comment.prototype, "ticket", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_2.default, user => user.comments, { eager: true }),
    __metadata("design:type", entity_2.default)
], Comment.prototype, "user", void 0);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.default = Comment;
//# sourceMappingURL=entity.js.map