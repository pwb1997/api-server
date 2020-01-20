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
let Company = class Company extends template_model_1.DefaultEntity {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_group_model_1.default, (userGroup) => userGroup.company),
    __metadata("design:type", Array)
], Company.prototype, "userGroups", void 0);
Company = __decorate([
    typeorm_1.Entity('company')
], Company);
exports.default = Company;
