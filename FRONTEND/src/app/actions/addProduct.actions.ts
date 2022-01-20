import { Produit } from "src/app/models/produit";

export class AddProduct {
    static readonly type = "[Cart] Add Product";

    constructor(public product: Produit) { }
}
