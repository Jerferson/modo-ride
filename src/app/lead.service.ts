import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { hubspotConfig, hubspotFormFields } from '../environments/hubspot.config';

export interface Lead {
  name: string;
  email: string;
  phone: string;
  productId?: number;
  createdAt: Date;
}

export interface HubSpotResponse {
  success: boolean;
  message?: string;
  contactId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private leads: Lead[] = [];

  constructor() {}

  submitLead(lead: Omit<Lead, 'createdAt'>): Observable<boolean> {
    const newLead: Lead = {
      ...lead,
      createdAt: new Date()
    };

    this.leads.push(newLead);
    console.log('📝 Lead capturado:', newLead.email);

    // Tentar enviar para HubSpot via API direta
    this.sendToHubSpot(newLead).then(success => {
      if (!success) {
        // Se falhar, tentar fallback com embed
        this.fallbackHubSpotEmbed(newLead);
      }
    });

    return of(true).pipe(delay(100));
  }

  private async sendToHubSpot(lead: Lead): Promise<boolean> {
    try {
      const formData = {
        fields: [
          {
            name: hubspotFormFields.firstName,
            value: lead.name.split(' ')[0]
          },
          {
            name: hubspotFormFields.lastName,
            value: lead.name.split(' ').slice(1).join(' ') || ''
          },
          {
            name: hubspotFormFields.email,
            value: lead.email
          },
          {
            name: hubspotFormFields.phone,
            value: lead.phone
          }
        ]
      };

      // Adicionar campo do produto se informado
      if (lead.productId) {
        formData.fields.push({
          name: hubspotFormFields.productInterest,
          value: `Product ID: ${lead.productId}`
        });
      }

      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotConfig.portalId}/${hubspotConfig.formId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('✅ Lead enviado para HubSpot:', lead.email);
        return true;
      } else {
        console.error('⚠️ Erro ao enviar para HubSpot:', response.status);
        return false;
      }
    } catch (error) {
      console.error('⚠️ Erro ao enviar para HubSpot:', error);
      return false;
    }
  }

  private fallbackHubSpotEmbed(lead: Lead): void {
    try {
      // Verificar se o script do HubSpot está carregado
      if (typeof (window as any).hbspt !== 'undefined') {
        // Criar formulário temporário e invisível
        const tempContainer = document.createElement('div');
        tempContainer.id = 'temp-hubspot-form-' + Date.now();
        tempContainer.style.display = 'none';
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        document.body.appendChild(tempContainer);

        (window as any).hbspt.forms.create({
          region: hubspotConfig.region,
          portalId: hubspotConfig.portalId,
          formId: hubspotConfig.formId,
          target: `#${tempContainer.id}`,
          onFormReady: function() {
            setTimeout(() => {
              const form = tempContainer.querySelector('form');
              if (form) {
                // Preencher campos automaticamente
                const fields = {
                  [hubspotFormFields.firstName]: lead.name.split(' ')[0],
                  [hubspotFormFields.lastName]: lead.name.split(' ').slice(1).join(' ') || '',
                  [hubspotFormFields.email]: lead.email,
                  [hubspotFormFields.phone]: lead.phone
                };

                Object.entries(fields).forEach(([fieldName, value]) => {
                  const field = form.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"], textarea[name="${fieldName}"]`) as HTMLInputElement;
                  if (field) {
                    field.value = value;
                  }
                });

                // Submeter automaticamente
                setTimeout(() => {
                  const submitButton = form.querySelector('input[type="submit"], button[type="submit"]') as HTMLInputElement;
                  if (submitButton) {
                    submitButton.click();
                  } else {
                    console.error('❌ Botão de submit não encontrado');
                  }
                }, 1000);
              } else {
                console.error('❌ Formulário não encontrado no container');
              }
            }, 500);
          },
          onFormSubmit: function() {
            console.log('✅ Lead enviado para HubSpot via embed: ' + lead.email);
            // Remover formulário temporário
            setTimeout(() => {
              if (tempContainer && tempContainer.parentNode) {
                tempContainer.parentNode.removeChild(tempContainer);
              }
            }, 2000);
          },
          onFormSubmitError: function(error: any) {
            console.error('❌ Erro ao submeter formulário HubSpot:', error);
            // Remover formulário temporário mesmo com erro
            if (tempContainer && tempContainer.parentNode) {
              tempContainer.parentNode.removeChild(tempContainer);
            }
          }
        });
      } else {
        console.warn('⚠️ Script HubSpot não disponível. Lead salvo localmente.');
      }
    } catch (error) {
      console.error('❌ Erro no fallback HubSpot embed:', error);
    }
  }

  getLeads(): Observable<Lead[]> {
    return of(this.leads);
  }

  // Método para testar a conectividade com HubSpot
  testHubSpotConnection(): void {
    console.log('🔍 Testando conectividade com HubSpot...');
    console.log('Portal ID:', hubspotConfig.portalId);
    console.log('Form ID:', hubspotConfig.formId);
    console.log('Região:', hubspotConfig.region);

    // Verificar se o script está carregado
    if (typeof (window as any).hbspt !== 'undefined') {
      console.log('✅ Script HubSpot carregado');
    } else {
      console.log('❌ Script HubSpot NÃO carregado');
    }

    // Testar se a URL do formulário é acessível
    const testUrl = `https://forms.hubspot.com/${hubspotConfig.portalId}/${hubspotConfig.formId}`;
    console.log('🌐 URL de teste:', testUrl);
    console.log('💡 Dica: Verifique se o formulário está público e ativo no HubSpot');
  }

  // Método para verificar leads enviados
  getLeadsSummary(): void {
    console.log('📊 RESUMO DOS LEADS:', this.leads.length + ' leads capturados');

    this.leads.forEach((lead, index) => {
      console.log(`Lead #${index + 1}: ${lead.name} (${lead.email})`);
    });

    if (this.leads.length > 0) {
      console.log('🌐 Verifique no HubSpot: https://app-eu1.hubspot.com/contacts/146939296/contacts');
    }
  }
}
