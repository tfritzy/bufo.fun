"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var BufoData_1 = require("./BufoData");
var sharp_1 = require("sharp");
var fs_2 = require("fs");
var outputDirectory = "../../site/public/bufoData.json";
var allTheBufoDirectory = "../all-the-bufo/all-the-bufo";
var bufoFiles = (0, fs_1.readdirSync)(allTheBufoDirectory);
var bufosWithMetadata = [];
for (var _i = 0, BufoMetadata_1 = BufoData_1.BufoMetadata; _i < BufoMetadata_1.length; _i++) {
    var bufoMetadata = BufoMetadata_1[_i];
    if (bufoFiles.includes(bufoMetadata.name) && !bufoMetadata.skip) {
        bufosWithMetadata.push(bufoMetadata);
    }
}
if ((0, fs_1.existsSync)(outputDirectory)) {
    (0, fs_1.rmdirSync)(outputDirectory, { recursive: true });
}
var bufoImageData = {};
for (var _a = 0, bufosWithMetadata_1 = bufosWithMetadata; _a < bufosWithMetadata_1.length; _a++) {
    var bufo = bufosWithMetadata_1[_a];
    var imageType = bufo.name.split(".").pop();
    var imageData = void 0;
    if (imageType !== "gif") {
        var buffer = (0, sharp_1.default)("".concat(allTheBufoDirectory, "/").concat(bufo.name))
            .resize(64, 64)
            .png()
            .toBuffer();
        imageData = "data:image/png;base64,".concat((await buffer).toString("base64"));
    }
    else {
        var buffer = fs_2.default.readFileSync("".concat(allTheBufoDirectory, "/").concat(bufo.name));
        imageData = "data:image/".concat(imageType, ";base64,").concat(buffer.toString("base64"));
    }
    bufoImageData[bufo.name] = {
        name: bufo.name,
        tags: bufo.tags,
        image: imageData,
    };
}
(0, fs_1.writeFileSync)(outputDirectory, JSON.stringify(bufoImageData));
