import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CustomDialogComponent } from '@app/@shared/modal/customDialog/customDialog.component';
import { ModalService } from '@app/@core/modal/modal.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private modalService: ModalService, private messageService: MessageService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  openProductForm(type: string): void {
    this.modalService
      .custom(CustomDialogComponent, {
        title: 'Add Product',
        modalType: 'add-product',
      })
      .pipe(take(1)) // take() manages unsubscription for us
      .subscribe((result: any) => {
        if (result) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is added succesfully.' });
        }
      });
  }
}
