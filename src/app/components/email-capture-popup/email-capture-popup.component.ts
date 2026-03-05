import { Component, inject, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailCaptureService } from '../../services/email-capture.service';
import { ToastService } from '../../services/toast.service';

declare let gtag: Function;

@Component({
  selector: 'app-email-capture-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-capture-popup.component.html',
  styleUrls: ['./email-capture-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailCapturePopupComponent {
  private emailCaptureService = inject(EmailCaptureService);
  private toastService = inject(ToastService);

  // State signals
  email = signal<string>('');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  isVisible = signal<boolean>(true);
  showSuccessState = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.showSuccessState()) {
        setTimeout(() => {
          this.closeModal();
        }, 2000);
      }
    });
  }

  onSubmit(): void {
    const trimmedEmail = this.email().trim();

    if (!this.emailCaptureService.validateEmail(trimmedEmail)) {
      this.errorMessage.set('Please enter a valid email address');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const payload = this.emailCaptureService.createPayload(
      trimmedEmail,
      'calculator',
      undefined
    );

    this.emailCaptureService.submitEmail(payload).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.showSuccessState.set(true);
          this.toastService.success('Email captured successfully!');

          if (typeof gtag !== 'undefined') {
            gtag('event', 'email_captured', {
              email_domain: trimmedEmail.split('@')[1],
            });
          }
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message);
        this.toastService.error(error.message);
      },
    });
  }

  closeModal(): void {
    this.isVisible.set(false);
  }

  onBackdropClick(): void {
    this.closeModal();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}
