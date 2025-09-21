// 🔐 HubSpot Configuration
// ⚠️  IMPORTANTE: Estas credenciais são PÚBLICAS e SEGURAS para uso no frontend
// ✅  Portal ID e Form ID são IDs públicos do HubSpot Forms API
// ❌  NUNCA colocar API Keys, Private Tokens ou Secrets aqui!

export const hubspotConfig = {
  // IDs públicos do formulário HubSpot
  portalId: '146939296',
  formId: '8386d9fc-a80f-449e-ae8f-b60e21722292',
  region: 'eu1',

  // URLs públicas da API
  formsApiUrl: 'https://api.hsforms.com/submissions/v3/integration/submit',
  jsEmbedUrl: '//js-eu1.hsforms.net/forms/embed/v2.js'
};

export const hubspotFormFields = {
  // Campos padrão do HubSpot (públicos)
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'email',
  phone: 'phone',

  // Campos personalizados (criar no HubSpot se necessário)
  productInterest: 'product_interest',
  leadSource: 'hs_lead_source',
  message: 'message'
};

// Tipos para TypeScript
export interface HubSpotFormSubmission {
  fields: HubSpotField[];
  context?: HubSpotContext;
}

export interface HubSpotField {
  objectTypeId: string;
  name: string;
  value: string;
}

export interface HubSpotContext {
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
  hutk?: string; // HubSpot user token
}
