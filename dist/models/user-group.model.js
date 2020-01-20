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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const assert_1 = __importStar(require("assert"));
const company_model_1 = __importDefault(require("./company.model"));
const country_model_1 = __importDefault(require("./country.model"));
const template_model_1 = require("./template.model");
const price_type_model_1 = __importDefault(require("./price-type.model"));
const user_model_1 = __importDefault(require("./user.model"));
var UserGroupType;
(function (UserGroupType) {
    UserGroupType["ADMIN"] = "admin";
    UserGroupType["BU"] = "businessUnit";
})(UserGroupType = exports.UserGroupType || (exports.UserGroupType = {}));
let UserGroup = class UserGroup extends template_model_1.DefaultEntity {
    async validate() {
        try {
            if (this.type === UserGroupType.BU) {
                assert_1.default.notEqual(this.company, undefined);
                assert_1.default.notEqual(this.country, undefined);
            }
        }
        catch {
            throw new assert_1.AssertionError({
                message: `company and country can't be null`,
            });
        }
    }
};
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], UserGroup.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'enum', enum: UserGroupType }),
    __metadata("design:type", String)
], UserGroup.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_model_1.default, (user) => user.userGroup),
    __metadata("design:type", Array)
], UserGroup.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => company_model_1.default, (company) => company.userGroups, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", company_model_1.default)
], UserGroup.prototype, "company", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => country_model_1.default, (country) => country.userGroups, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", country_model_1.default)
], UserGroup.prototype, "country", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => price_type_model_1.default, (priceType) => priceType.userGroups),
    typeorm_1.JoinTable({ name: 'priceTypeAccess' }),
    __metadata("design:type", Array)
], UserGroup.prototype, "priceTypes", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserGroup.prototype, "validate", null);
UserGroup = __decorate([
    typeorm_1.Entity('userGroup')
], UserGroup);
exports.default = UserGroup;
