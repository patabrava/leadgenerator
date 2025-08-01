import { google } from 'googleapis';
import type { sheets_v4 } from 'googleapis';

import type { FormData } from '@/schemas/formSchema';

// Interface for Google Sheets configuration
interface SheetsConfig {
  spreadsheetId: string;
  serviceAccountEmail: string;
  privateKey: string;
}

// Interface for sheet row data
interface SheetRowData {
  unternehmen: string;
  plz: string;
  land: string;
  name: string;
  telefonnummer: string;
  emailadresse: string;
  dsbVorhanden: string;
  start: string;
  unternehmensgroesse: string;
  timestamp: string;
}

// Error types for better error handling
export class GoogleSheetsError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'GoogleSheetsError';
  }
}

export class AuthenticationError extends GoogleSheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'AUTHENTICATION_ERROR', originalError);
  }
}

export class NetworkError extends GoogleSheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'NETWORK_ERROR', originalError);
  }
}

export class QuotaError extends GoogleSheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'QUOTA_ERROR', originalError);
  }
}

export class ValidationError extends GoogleSheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'VALIDATION_ERROR', originalError);
  }
}

// Validate environment variables
function validateConfig(): SheetsConfig {
  const spreadsheetId = process.env['GOOGLE_SHEETS_ID'];
  const serviceAccountEmail = process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL'];
  const privateKey = process.env['GOOGLE_PRIVATE_KEY'];

  if (!spreadsheetId) {
    throw new ValidationError('GOOGLE_SHEETS_ID environment variable is required');
  }

  if (!serviceAccountEmail) {
    throw new ValidationError('GOOGLE_SERVICE_ACCOUNT_EMAIL environment variable is required');
  }

  if (!privateKey) {
    throw new ValidationError('GOOGLE_PRIVATE_KEY environment variable is required');
  }

  return {
    spreadsheetId,
    serviceAccountEmail,
    privateKey: privateKey.replace(/\\n/g, '\n'), // Handle escaped newlines
  };
}

// Initialize Google Sheets client
let sheetsClient: sheets_v4.Sheets | null = null;
let config: SheetsConfig | null = null;

export async function initClient(): Promise<sheets_v4.Sheets> {
  if (sheetsClient && config) {
    return sheetsClient;
  }

  try {
    config = validateConfig();

    // Create JWT auth
    const auth = new google.auth.JWT({
      email: config.serviceAccountEmail,
      key: config.privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Test authentication
    await auth.authorize();

    // Create sheets client
    sheetsClient = google.sheets({ version: 'v4', auth });

    return sheetsClient;
  } catch (error) {
    console.error('Failed to initialize Google Sheets client:', error);
    
    if (error instanceof ValidationError) {
      throw error;
    }
    
    throw new AuthenticationError(
      'Failed to authenticate with Google Sheets API',
      error
    );
  }
}

// Validate form data before writing to sheet
function validateFormData(data: Partial<FormData>): SheetRowData {
  const requiredFields: (keyof FormData)[] = [
    'unternehmen',
    'plz',
    'land',
    'name',
    'telefonnummer',
    'emailadresse',
    'dsbVorhanden',
    'start',
    'unternehmensgroesse',
  ];

  // Check for required fields
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new ValidationError(`Required field '${field}' is missing`);
    }
  }

  // Validate field lengths
  const maxLengths: Partial<Record<keyof FormData, number>> = {
    unternehmen: 100,
    plz: 5,
    land: 3,
    name: 50,
    telefonnummer: 20,
    emailadresse: 100,
    dsbVorhanden: 20,
    start: 10,
    unternehmensgroesse: 20,
  };

  for (const [field, maxLength] of Object.entries(maxLengths)) {
    const value = data[field as keyof FormData];
    if (typeof value === 'string' && value.length > maxLength) {
      throw new ValidationError(
        `Field '${field}' exceeds maximum length of ${maxLength} characters`
      );
    }
  }

  return {
    unternehmen: data.unternehmen!,
    plz: data.plz!,
    land: data.land!,
    name: data.name!,
    telefonnummer: data.telefonnummer!,
    emailadresse: data.emailadresse!,
    dsbVorhanden: data.dsbVorhanden!,
    start: data.start!,
    unternehmensgroesse: data.unternehmensgroesse!,
    timestamp: new Date().toISOString(),
  };
}

// Convert form data to sheet row values
function formatRowData(data: SheetRowData): string[] {
  return [
    data.unternehmen,
    data.plz,
    data.land,
    data.name,
    data.telefonnummer,
    data.emailadresse,
    data.dsbVorhanden,
    data.start,
    data.unternehmensgroesse,
    data.timestamp,
  ];
}

// Append a lead row to the Google Sheet
export async function appendLeadRow(formData: Partial<FormData>): Promise<void> {
  try {
    // Validate form data
    const validatedData = validateFormData(formData);
    
    // Initialize client
    const sheets = await initClient();
    
    if (!config) {
      throw new ValidationError('Google Sheets configuration not initialized');
    }

    // Format data for sheet
    const rowValues = formatRowData(validatedData);

    // Append row to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: 'A:J', // Assuming columns A through J
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowValues],
      },
    });

    console.log('Successfully appended row to Google Sheet:', response.data);
  } catch (error) {
    console.error('Error appending row to Google Sheet:', error);

    // Handle specific Google API errors
    if (error && typeof error === 'object' && 'code' in error) {
      const apiError = error as { code: number; message: string };
      
      switch (apiError.code) {
        case 401:
        case 403:
          throw new AuthenticationError(
            'Failed to authenticate with Google Sheets API. Please check your credentials.',
            error
          );
        case 404:
          throw new ValidationError(
            'Google Sheet not found. Please check the GOOGLE_SHEETS_ID.',
            error
          );
        case 429:
          throw new QuotaError(
            'Google Sheets API quota exceeded. Please try again later.',
            error
          );
        case 500:
        case 502:
        case 503:
          throw new NetworkError(
            'Google Sheets API is temporarily unavailable. Please try again later.',
            error
          );
        default:
          throw new GoogleSheetsError(
            `Google Sheets API error: ${apiError.message}`,
            'API_ERROR',
            error
          );
      }
    }

    // Handle network errors
    if (error && typeof error === 'object' && 'code' in error) {
      const networkError = error as { code: string };
      if (['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT'].includes(networkError.code)) {
        throw new NetworkError(
          'Network error occurred while connecting to Google Sheets API',
          error
        );
      }
    }

    // Re-throw validation errors
    if (error instanceof ValidationError) {
      throw error;
    }

    // Generic error
    throw new GoogleSheetsError(
      'An unexpected error occurred while writing to Google Sheets',
      'UNKNOWN_ERROR',
      error
    );
  }
}

// Helper function to create sheet headers (for initial setup)
export async function createSheetHeaders(): Promise<void> {
  try {
    const sheets = await initClient();
    
    if (!config) {
      throw new ValidationError('Google Sheets configuration not initialized');
    }

    const headers = [
      'Unternehmen',
      'PLZ',
      'Land',
      'Name',
      'Telefonnummer',
      'E-Mail-Adresse',
      'Externer DSB vorhanden',
      'Start',
      'Unternehmensgröße',
      'Timestamp',
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: config.spreadsheetId,
      range: 'A1:J1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    });

    console.log('Successfully created sheet headers');
  } catch (error) {
    console.error('Error creating sheet headers:', error);
    throw error;
  }
}
