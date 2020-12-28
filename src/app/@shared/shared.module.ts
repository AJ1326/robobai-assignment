import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './loader/loader.component';
import { SearchComponent } from './search/search.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmDialogComponent } from './modal/confirmDialog/confirmDialog.component';
import { CustomDialogComponent } from './modal/customDialog/customDialog.component';
import { AddProductComponent } from './modal/addProduct/addProduct.component';
import { TableComponent } from './table/table.component';
import { SpinnerService } from './spinner/spinner.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// PrimeNg
import { ProductService } from './table/productservice';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    AutoCompleteModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    TranslateModule,
  ],
  declarations: [
    LoaderComponent,
    ConfirmDialogComponent,
    CustomDialogComponent,
    SpinnerComponent,
    AddProductComponent,
    SearchComponent,
    TableComponent,
  ],
  exports: [LoaderComponent, SearchComponent, CustomDialogComponent, ConfirmDialogComponent, TableComponent],
  providers: [ProductService, SpinnerService, MessageService],
})
export class SharedModule {}
