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
const user_model_1 = __importDefault(require("./user.model"));
let Archive = class Archive extends template_model_1.DefaultEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Archive.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Archive.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], Archive.prototype, "numberProduct", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_model_1.default, (user) => user.archives, { nullable: false, cascade: true }),
    __metadata("design:type", user_model_1.default)
], Archive.prototype, "user", void 0);
Archive = __decorate([
    typeorm_1.Entity('archive')
], Archive);
exports.default = Archive;
