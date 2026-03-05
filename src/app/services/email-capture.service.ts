import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface EmailCapturePayload {
  email: string;
  source: 'calculator' | 'footer' | 'blog';
  calculationData?: {
    homePrice: number;
    loanAmount: number;
    interestRate: number;
    extraPayment: number;
    savingsAmount: number;
    yearsSaved: number;
  };
  timestamp: Date;
  userAgent: string;
  referrer: string;
}

export interface EmailCaptureResponse {
  success: boolean;
  message: string;
  subscriberId?: string;
}

@Injectable({ providedIn: 'root' })
export class EmailCaptureService {
  private http = inject(HttpClient);
  private apiUrl = '/api/email-capture';

  /**
   * Submit email for capture
   * Uses retry strategy with exponential backoff (3 attempts)
   */
  submitEmail(payload: EmailCapturePayload): Observable<EmailCaptureResponse> {
    return this.http
      .post<EmailCaptureResponse>(this.apiUrl, payload)
      .pipe(
        retry({ count: 3, delay: 1000 }),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Create email capture payload with all required data
   */
  createPayload(
    email: string,
    source: 'calculator' | 'footer' | 'blog',
    calculationData?: EmailCapturePayload['calculationData']
  ): EmailCapturePayload {
    return {
      email,
      source,
      calculationData,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    };
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Handle HTTP errors with user-friendly messages
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = 'Unable to connect. Please check your internet.';
    } else if (error.status === 0) {
      // Network error
      errorMessage = 'Network error. Please check your connection.';
    } else if (error.status === 400) {
      // Validation error
      errorMessage = error.error?.message || 'Please enter a valid email address.';
    } else if (error.status === 429) {
      // Rate limiting
      errorMessage = 'Too many attempts. Please try again in a moment.';
    } else if (error.status >= 500) {
      // Server error
      errorMessage = 'Server error. Please try again later.';
    }

    console.error('Email capture error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
