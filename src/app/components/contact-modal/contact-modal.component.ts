import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Product } from '../../models/product.model'
import { LeadService } from '../../lead.service'

@Component({
  selector: 'app-contact-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() product: Product | null = null;
  @Output() closed = new EventEmitter<void>();

  contactForm!: FormGroup
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService
  ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    })
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close()
    }
  }

  close() {
    this.isOpen = false
    this.submitted = false
    this.loading = false
    this.contactForm.reset()
    this.closed.emit()
  }

  onSubmit() {
    if (this.contactForm.valid && !this.loading) {
      this.loading = true

      const leadData = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        productId: this.product?.id
      }

      this.leadService.submitLead(leadData).subscribe({
        next: () => {
          this.loading = false
          this.submitted = true
        },
        error: () => {
          this.loading = false
          // Handle error - could show error message
        }
      })
    }
  }
}
