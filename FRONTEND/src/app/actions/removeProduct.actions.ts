import { Produit } from "src/app/models/produit";

export class RemoveProduct {
    static readonly type = "[Cart] Remove Product";

    constructor(public product: Produit) { }
}
