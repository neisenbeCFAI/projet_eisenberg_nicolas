import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MonservService} from "../monserv.service";
import {Observable} from "rxjs";
import {Produit} from "../models/produit";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
    constructor(private monservService: MonservService) {}

    public filter_arg: Produit | undefined

    catalogue$: Observable<Array<Produit>> | undefined;

    ngOnInit() {
        this.catalogue$ = this.monservService.getCatalogue();
        this.filter_arg = new Produit(0,"",0,"","")
    }

}
