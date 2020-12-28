import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  message = 'open';
  sidenavValue = true;
  selectedIndex: number = null;

  @Output() sidenavMessageEvent = new EventEmitter<string>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {}

  openSidenav(): void {
    if (this.message === 'open') {
      this.message = 'close';
    } else {
      this.message = 'open';
    }
    this.sidenavMessageEvent.emit(this.message);
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
