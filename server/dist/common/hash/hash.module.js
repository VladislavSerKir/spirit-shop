"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const hash_service_1 = require("./hash.service");
let HashModule = class HashModule {
};
exports.HashModule = HashModule;
exports.HashModule = HashModule = __decorate([
    (0, common_1.Module)({
        providers: [hash_service_1.HashService],
        imports: [config_1.ConfigModule.forRoot()],
        exports: [hash_service_1.HashService],
    })
], HashModule);
//# sourceMappingURL=hash.module.js.map