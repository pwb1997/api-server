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
const archive_model_1 = __importDefault(require("./archive.model"));
const template_model_1 = require("./template.model");
const user_group_model_1 = __importDefault(require("./user-group.model"));
let User = class User extends template_model_1.DefaultEntity {
};
__decorate([
    typeorm_1.Column({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_group_model_1.default, (userGroup) => userGroup.users, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    __metadata("design:type", user_group_model_1.default)
], User.prototype, "userGroup", void 0);
__decorate([
    typeorm_1.OneToMany((type) => archive_model_1.default, (archive) => archive.user),
    __metadata("design:type", Array)
], User.prototype, "archives", void 0);
User = __decorate([
    typeorm_1.Entity('user')
], User);
exports.default = User;
