import { Pipe, PipeTransform } from '@angular/core';
import {Produit} from "../models/produit";

@Pipe({
    name: 'myfilter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Produit[], filter: Produit): any {
        if (!items || !filter) {
            return items;
        }
        // @ts-ignore
        return items.filter((item): item is Produit => item !== undefined && item?.title.indexOf(filter?.title) !== -1);
    }
}
