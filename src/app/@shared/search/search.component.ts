import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../table/productservice';
import { Product } from '../table/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() isLoading = false;
  @Input() message: string;
  selectedProduct: string = null;
  productList: any[];
  cloneProductList: any[];
  filteredProductList: any[];
  productData: any;
  productOriginalData: any;

  constructor(private productService: ProductService) {}

  ngOnDestroy(): void {
    this.productData.unsubscribe();
    this.productOriginalData.unsubscribe();
  }

  ngOnInit() {
    this.productData = this.productService.currentProductSource.subscribe((product) => {
      this.productList = product;
    });
    this.productOriginalData = this.productService.currentProductOriginalSource.subscribe((product) => {
      this.cloneProductList = [...product];
      this.selectedProduct = null;
    });
  }

  filterProduct(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let query = event.query;
    this.filteredProductList = this.cloneProductList.filter((o) =>
      o['name'].toLowerCase().includes(query.toLowerCase())
    );
    this.productService.changeProductSource(this.filteredProductList);
  }

  onSelectProductFunc(product: Product): void {
    this.productService.changeProductSource([product]);
  }

  onUnSelectProductFunc(): void {
    this.productService.changeProductSource(this.cloneProductList);
  }
}
