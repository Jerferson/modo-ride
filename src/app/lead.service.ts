import { Injectable } from '@angular/core'
import { Observable, of, delay } from 'rxjs'

export interface Lead {
  name: string
  email: string
  phone: string
  productId?: number
  createdAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private leads: Lead[] = [];

  submitLead(lead: Omit<Lead, 'createdAt'>): Observable<boolean> {
    const newLead: Lead = {
      ...lead,
      createdAt: new Date()
    }

    this.leads.push(newLead)
    console.log('Lead captured:', newLead)

    // Simulate API call delay
    return of(true).pipe(delay(1000))
  }

  getLeads(): Observable<Lead[]> {
    return of(this.leads)
  }
}
