import { Produit } from "src/app/models/produit";

export class RemoveOneProduct {
    static readonly type = "[Cart] Remove One Product";

    constructor(public product: Produit) { }
}
