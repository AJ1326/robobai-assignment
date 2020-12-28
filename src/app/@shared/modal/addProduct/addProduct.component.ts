import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderDataValidators as Validators } from '@app/modules/data-valiidator';
import { ProductService } from '@app/@shared/table/productservice';
import { Product } from '@app/@shared/table/product';
import { SpinnerService } from '@app/@shared/spinner/spinner.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  submitted = false;
  success: boolean;
  // multiselect dropdown
  dropdownList: { item_id: string; item_text: string }[] = null;
  selectedItems: any = [];
  dropdownSettings = {};
  isLoading = false;
  isInventorySelected = false;
  productOriginalData: any;
  allProductList: Product[];

  @Input() title_tag: string;
  @Input() formType: string;
  @Input() form_data: [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private spinnerService: SpinnerService
  ) {}

  ngOnDestroy(): void {
    this.productOriginalData.unsubscribe();
  }

  ngOnInit() {
    this.productOriginalData = this.productService.currentProductOriginalSource.subscribe((product) => {
      this.allProductList = product;
    });
    this.getAddPeopleForm();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      enableCheckAll: false,
      allowSearchFilter: false,
    };
    this.dropdownList = this.productService.getInventoryList();
    this.selectedItems = [{ item_id: 'INSTOCK', item_text: 'In Stock' }];
    this.getAddPeopleForm();
  }

  onItemSelect(item: any) {
    this.checkInventorySelection();
  }

  onItemDeSelect(items: any) {
    this.checkInventorySelection();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.productForm.controls;
  }

  save() {
    let inventory: any = [];
    this.submitted = true;
    if (this.selectedItems.length > 0 && this.productForm.valid) {
      inventory = this.selectedItems.map((item: any) => {
        return item.item_id;
      });
      const productData = this.productForm.value;
      productData['inventoryStatus'] = inventory[0];
      productData['id'] = this.productService.generateId();
      productData['code'] = this.productService.generateId();
      this.isLoading = true;
      this.spinnerService.show();
      // It's just added to show th effect of spinner and how it will reacct if an api call is made.
      setTimeout(() => {
        this.submitAddProduct(productData);
      }, 2000);
    } else {
      return;
    }
  }

  submitAddProduct(productData: Product): void {
    this.allProductList.push(productData);
    this.productService.changeProductSource(this.allProductList);
    this.productService.changeProductOriginalSource(this.allProductList);
    this.isLoading = false;
    this.submitted = false;
    this.activeModal.close(true);
    this.spinnerService.hide();
  }

  checkInventorySelection() {
    this.selectedItems.length > 0 ? (this.isInventorySelected = false) : (this.isInventorySelected = true);
  }

  getAddPeopleForm() {
    this.productForm = this.formBuilder.group(
      {
        name: ['', [Validators.required()]],
        description: ['', []],
        category: ['', []],
        quantity: ['', [Validators.numberRequired()]],
        price: ['', [Validators.numberRequired()]],
        sprice: ['', [Validators.numberRequired()]],
      },
      {
        validator: [Validators.MustSpriceGreatThanPrice('price', 'sprice')],
      }
    );
  }
}
