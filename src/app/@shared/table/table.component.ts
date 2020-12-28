import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from './productservice';
import { Product } from './product';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProviderDataValidators as Validators } from '@app/modules/data-valiidator';
import { take } from 'rxjs/operators';
import { ModalService } from '@app/@core/modal/modal.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() isLoading = false;
  @Input() message: string;
  products: Product[];
  allProductList: Product[];
  statuses: SelectItem[];
  clonedProducts: { [s: string]: Product } = {};
  productData: any;
  first = 0;
  rows = 5;
  showWrongNameMessage = '';
  showWrongSpriceMessage = '';
  productRowIndex: number = null;
  productRowPriceIndex: number = null;
  productOriginalData: any;
  values = '';

  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private messageService: MessageService,
    private spinnerService: SpinnerService
  ) {}

  ngOnDestroy(): void {
    this.productData.unsubscribe();
    this.productOriginalData.unsubscribe();
  }

  resetMappingCredentials(): void {
    this.productRowIndex = null;
    this.productRowPriceIndex = null;
    this.showWrongNameMessage = '';
    this.showWrongSpriceMessage = '';
  }

  getIndex(arr: any, product: Product) {
    let index = arr.map((item: any) => item.id).indexOf(product['id']);
    return index;
  }

  updateProductValue(product: Product, index: any, newValue: string, key: string): void {
    //in a real application, make a request to a remote url with the query and return updated product list
    let productIndex = this.getIndex(this.products, product);
    let productOriginnalIndex = this.getIndex(this.allProductList, product);
    this.products[productIndex][key] = newValue;
    this.allProductList[productOriginnalIndex][key] = newValue;
    this.productService.changeProductSource(this.products);
    this.productService.changeProductOriginalSource(this.allProductList);
    this.resetMappingCredentials();
  }

  changeProductName(product: Product, event: any, index: any): void {
    let isChangeNameValid = Validators.alphaNumeric(event);
    this.productRowIndex = index;
    if (isChangeNameValid.alphaNumeric.value) {
      this.showWrongNameMessage = '';
      this.updateProductValue(product, index, event, 'name');
    } else {
      this.showWrongNameMessage = isChangeNameValid.alphaNumeric.msg;
    }
  }

  changeProductSprice(product: Product, event: any, index: any): void {
    let isChangeSpriceValid = Validators.priceValidator(product.price, event);
    this.productRowPriceIndex = index;
    if (isChangeSpriceValid.priceCheck.value) {
      this.showWrongSpriceMessage = '';
      this.updateProductValue(product, index, event, 'sprice');
    } else {
      this.showWrongSpriceMessage = isChangeSpriceValid.priceCheck.msg;
    }
  }

  ngOnInit() {
    this.productData = this.productService.currentProductSource.subscribe((product) => {
      this.products = [...product];
    });
    this.productOriginalData = this.productService.currentProductOriginalSource.subscribe((product) => {
      this.allProductList = [...product];
    });
    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    ];
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.products ? this.first === this.products.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
  }

  deleteProduct(product: Product): void {
    this.modalService
      .confirm('Are you sure that you want to remove ' + product['name'])
      .pipe(take(1))
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.spinnerService.show();
          // It's just added to show th effect of spinner and how it will reacct if an api call is made.
          setTimeout(() => {
            this.removeProduct(product);
          }, 2000);
        }
      });
  }

  removeProduct(product: Product): void {
    //in a real application, make a request to a remote url with the query and return updated product list
    let removeIndex = this.getIndex(this.allProductList, product);
    this.allProductList.splice(removeIndex, 1);
    this.productService.changeProductSource(this.allProductList);
    this.productService.changeProductOriginalSource(this.allProductList);
    this.spinnerService.hide();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: product['name'] + ' is deleted successfully',
    });
  }
}
