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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const template_model_1 = require("./template.model");
const user_group_model_1 = __importDefault(require("./user-group.model"));
let PriceType = class PriceType extends template_model_1.DefaultEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], PriceType.prototype, "label", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], PriceType.prototype, "symbol", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => user_group_model_1.default, (userGroup) => userGroup.priceTypes),
    __metadata("design:type", Array)
], PriceType.prototype, "userGroups", void 0);
PriceType = __decorate([
    typeorm_1.Entity('priceType')
], PriceType);
exports.default = PriceType;
