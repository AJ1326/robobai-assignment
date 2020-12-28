import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-document',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentComponent implements OnInit {
  version: string | null = environment.version;
  constructor() {}
  ngOnInit() {}

  openDocumentation(): void {
    let url = 'https://docs.google.com/document/d/1KaIkWkkL-V7cz8mO3ZMRq5OrWabA_na4mRhAO53HPyw/edit?usp=sharing';
    window.open(url, '_blank');
  }
}
