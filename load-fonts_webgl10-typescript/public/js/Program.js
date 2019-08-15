"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene_1 = require("./Scene");
var EngineCore_1 = require("./Engine/EngineCore");
var Program = /** @class */ (function () {
    function Program() {
    }
    Program.Main = function () {
        var scene = new Scene_1.default();
        EngineCore_1.default.Instance.Initialize("renderCanvas", scene);
    };
    return Program;
}());
// Debug Version
// Program.Main();
// Release Version
window.onload = function () { return Program.Main(); };
