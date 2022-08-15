import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PatientAuthService } from 'src/app/core/service/patient-auth/patient-auth.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('loginModal') loginModal: ElementRef | undefined;
  @ViewChild('registerModal') registerModal: ElementRef | undefined;

  isLoggedin: boolean = false;

  closeResult: string = '';

  loginForm: any = {
    email: '',
    password: '',
  };

  registerForm: any = {
    email: '',
    password: '',
    confirmPassword: '',
    cin: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  loginError: boolean = false;
  loginErrorMessage: String = '';
  loginSuccess: boolean = false;
  loginSuccessMessage: String = '';

  registerError: boolean = false;
  registerErrorMessage: String = '';
  registerSuccess: boolean = false;
  registerSuccessMessage: String = '';

  constructor(
    private patientAuthService: PatientAuthService,
    private storageService: StorageService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('NavbarComponent');
    console.log(this.storageService.isLoggedIn());
    if (this.storageService.isLoggedIn()) {
      // User role ROLE_PATIENT
      if (this.storageService.getRoles().includes('ROLE_PATIENT')) {
        this.isLoggedin = true;
      }
    }
  }

  loginSubmit() {
    const data = {
      username: this.loginForm.email,
      password: this.loginForm.password,
    };

    this.patientAuthService.login(data).subscribe({
      next: (result) => {
        this.storageService.saveUser(result);
        this.isLoggedin = true;
        this.loginSuccess = true;
        this.loginSuccessMessage = 'Login successful';

        this.loginError = false;

        // Close modal
        this.modalService.dismissAll();

        this.router.navigate(['/patient']);
      },
      error: (err) => {
        this.loginError = true;
        if (err.error.message) {
          this.loginErrorMessage = err.error.message;
        } else {
          this.loginErrorMessage = 'Login failed';
        }
      },
    });
  }

  registerSubmit() {
    const data = {
      username: this.registerForm.email,
      email: this.registerForm.email,
      password: this.registerForm.password,
      confirmPassword: this.registerForm.confirmPassword,
      cin: this.registerForm.cin,
      firstName: this.registerForm.firstName,
      lastName: this.registerForm.lastName,
      phoneNumber: this.registerForm.phoneNumber,
    };

    this.patientAuthService.register(data).subscribe({
      next: (result) => {
        this.registerSuccess = true;
        this.registerSuccessMessage = 'Registration successful';
        this.registerError = false;

        // Close modal
        this.modalService.dismissAll();

        // Open login modal
        this.open(this.loginModal);

        this.loginForm.email = this.registerForm.email;

        this.loginSuccess = true;
        this.loginSuccessMessage = 'Registration successful, please login';
      },
      error: (err) => {
        this.registerError = true;
        if (err.error.message) {
          this.registerErrorMessage = err.error.message;
        } else {
          this.registerErrorMessage = 'Registration failed';
        }
      },
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: '' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
