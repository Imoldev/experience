import {Asset} from "./asset";

export class Equipment {
    public readonly tenantId: bigint;
    private readonly assets: Map<string, Asset> = new Map();

    constructor(tenantId: bigint) {
        this.tenantId = tenantId;
    }

    addAsset(asset: Asset) {
        this.assets.set(asset.name, asset);
    }
}