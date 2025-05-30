import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../feature/users/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private _Router: Router,
    private _UserService: UserService,
    private _ToastrService: ToastrService,
    private renderer: Renderer2
  ) {}

  private destroy$ = new Subject<void>();
  isMenuOpen = false;
  userId!: number;
  registered: string | null = null;
  userName: string = '';
  userPicture: string = '';
  userRole: string = '';
  @ViewChild('responsiveDesign') mobileMenu!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('Token')) {
        this._UserService.registered.next(localStorage.getItem('Token')!);
      }
      if (localStorage.getItem('name')) {
        this._UserService.userName.next(localStorage.getItem('name')!);
      }
      if (localStorage.getItem('image_url')) {
        this._UserService.image.next(localStorage.getItem('image_url')!);
      }
      if (localStorage.getItem('id')) {
        this._UserService.userId.next(parseInt(localStorage.getItem('id')!));
      }
      if (localStorage.getItem('role')) {
        this._UserService.role.next(localStorage.getItem('role')!);
      }
    }

    this._UserService.registered
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.registered = data;
      });

    this._UserService.userId
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.userId = data;
      });

    this._UserService.userName
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.userName = data;
      });

    this._UserService.image
      .pipe(takeUntil(this.destroy$))
      .subscribe((image) => {
        this.userPicture = image;
      });

    this._UserService.role.pipe(takeUntil(this.destroy$)).subscribe((role) => {
      this.userRole = role;
    });

    if (typeof window !== 'undefined') {
      const token: string | null = localStorage.getItem('Token');
      if (token) {
        this._UserService.registered.next(token);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit() {
    this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    this.renderer.setStyle(
      this.mobileMenu.nativeElement,
      'transform',
      'translateX(0)'
    );
    this.renderer.setStyle(this.mobileMenu.nativeElement, 'opacity', '1');
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.renderer.setStyle(
      this.mobileMenu.nativeElement,
      'transform',
      'translateX(-100%)'
    );
    this.renderer.setStyle(this.mobileMenu.nativeElement, 'opacity', '0');
  }

  handleLogout(): void {
    this._Router.navigate(['/home']);
    this._UserService
      .logoutConfirmation()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          localStorage.clear();
          this._UserService.userId.next(0);
          this._UserService.image.next('');
          this._UserService.userName.next('');
          this._UserService.registered.next('');
          this._UserService.role.next('');
          this._ToastrService.success(res.message);
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error('something went wrong try again later !');
        },
        complete: () => {
          this._UserService.registered
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
              this.registered = data;
            });
        },
      });
  }
}
