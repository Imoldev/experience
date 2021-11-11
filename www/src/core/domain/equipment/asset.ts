import {Extension} from "./extension";
import { Logger } from '@nestjs/common';

export class Asset {
    public readonly name: string;
    private extensions: Map<string, {extension: Extension, count: number}>

    constructor(name: string) {
        this.name = name;
    }

    addExtension  (extension: Extension, count: number) {
        this.extensions.set(extension.name, {extension: extension, count: count});
    }
}