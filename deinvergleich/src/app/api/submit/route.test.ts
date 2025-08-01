import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST, GET, PUT, DELETE, PATCH } from './route';
import { NextRequest } from 'next/server';
import * as googleSheetsModule from '@/lib/googleSheets';

// Mock the googleSheets module
vi.mock('@/lib/googleSheets', () => ({
  appendLeadRow: vi.fn(),
  GoogleSheetsError: class GoogleSheetsError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'GoogleSheetsError';
    }
  }
}));

const mockAppendLeadRow = vi.mocked(googleSheetsModule.appendLeadRow);

describe('API Route: /api/submit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const createValidFormData = () => ({
    unternehmen: 'Test GmbH',
    plz: '12345',
    land: 'DE',
    name: 'Max Mustermann', 
    telefonnummer: '017612345678',
    emailadresse: 'max@test.com',
    dsbVorhanden: 'nein',
    start: '2025-12-01',
    unternehmensgroesse: '11-50',
    gdprConsent: true
  });

  const createMockRequest = (body: any, method = 'POST') => {
    return new NextRequest('http://localhost:3000/api/submit', {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  describe('POST Requests', () => {
    it('should accept valid form data and return success', async () => {
      const validData = createValidFormData();
      mockAppendLeadRow.mockResolvedValueOnce(undefined);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('erfolgreich übermittelt');
      expect(mockAppendLeadRow).toHaveBeenCalledWith(validData);
    });

    it('should reject requests with invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/submit', {
        method: 'POST',
        body: 'invalid json{',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Invalid JSON in request body');
    });

    it('should validate required fields', async () => {
      const incompleteData = {
        unternehmen: 'Test GmbH',
        // Missing required fields
      };

      const request = createMockRequest(incompleteData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Validation failed');
      expect(data.errors).toBeDefined();
      expect(Object.keys(data.errors!).length).toBeGreaterThan(0);
    });

    it('should validate field formats', async () => {
      const invalidData = {
        ...createValidFormData(),
        emailadresse: 'invalid-email',
        plz: '123', // too short
        telefonnummer: 'invalid-phone',
      };

      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors).toBeDefined();
      expect(data.errors!.emailadresse).toBeDefined();
      expect(data.errors!.plz).toBeDefined();
      expect(data.errors!.telefonnummer).toBeDefined();
    });

    it('should validate GDPR consent', async () => {
      const dataWithoutConsent = {
        ...createValidFormData(),
        gdprConsent: false,
      };

      const request = createMockRequest(dataWithoutConsent);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors!.gdprConsent).toContain('Datenschutzerklärung');
    });

    it('should handle authentication errors from Google Sheets', async () => {
      const validData = createValidFormData();
      const authError = new googleSheetsModule.GoogleSheetsError('Auth failed', 'AUTHENTICATION_ERROR');
      mockAppendLeadRow.mockRejectedValueOnce(authError);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Service temporarily unavailable');
    });

    it('should handle validation errors from Google Sheets', async () => {
      const validData = createValidFormData();
      const validationError = new googleSheetsModule.GoogleSheetsError('Invalid data', 'VALIDATION_ERROR');
      mockAppendLeadRow.mockRejectedValueOnce(validationError);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Invalid data provided.');
    });

    it('should handle quota errors from Google Sheets', async () => {
      const validData = createValidFormData();
      const quotaError = new googleSheetsModule.GoogleSheetsError('Quota exceeded', 'QUOTA_ERROR');
      mockAppendLeadRow.mockRejectedValueOnce(quotaError);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.success).toBe(false);
      expect(data.message).toContain('high demand');
    });

    it('should handle network errors from Google Sheets', async () => {
      const validData = createValidFormData();
      const networkError = new googleSheetsModule.GoogleSheetsError('Network failed', 'NETWORK_ERROR');
      mockAppendLeadRow.mockRejectedValueOnce(networkError);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(502);
      expect(data.success).toBe(false);
      expect(data.message).toContain('Network error');
    });

    it('should handle unknown Google Sheets errors', async () => {
      const validData = createValidFormData();
      const unknownError = new googleSheetsModule.GoogleSheetsError('Unknown error', 'UNKNOWN_ERROR');
      mockAppendLeadRow.mockRejectedValueOnce(unknownError);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain('error occurred while processing');
    });

    it('should handle generic errors', async () => {
      const validData = createValidFormData();
      const genericError = new Error('Generic error');
      mockAppendLeadRow.mockRejectedValueOnce(genericError);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain('unexpected error occurred');
    });

    it('should validate enum fields correctly', async () => {
      const dataWithInvalidEnums = {
        ...createValidFormData(),
        land: 'US', // invalid country
        dsbVorhanden: 'maybe', // invalid DSB option
        unternehmensgroesse: 'huge', // invalid company size
      };

      const request = createMockRequest(dataWithInvalidEnums);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors!.land).toBeDefined();
      expect(data.errors!.dsbVorhanden).toBeDefined();
      expect(data.errors!.unternehmensgroesse).toBeDefined();
    });

    it('should validate date format and future requirement', async () => {
      const dataWithInvalidDate = {
        ...createValidFormData(),
        start: '2020-01-01', // past date
      };

      const request = createMockRequest(dataWithInvalidDate);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors!.start).toContain('Zukunft');
    });
  });

  describe('Unsupported HTTP Methods', () => {
    it('should return 405 for GET requests', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Method not allowed');
    });

    it('should return 405 for PUT requests', async () => {
      const response = await PUT();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Method not allowed');
    });

    it('should return 405 for DELETE requests', async () => {
      const response = await DELETE();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Method not allowed');
    });

    it('should return 405 for PATCH requests', async () => {
      const response = await PATCH();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Method not allowed');
    });
  });

  describe('Response Format Validation', () => {
    it('should return consistent success response format', async () => {
      const validData = createValidFormData();
      mockAppendLeadRow.mockResolvedValueOnce(undefined);

      const request = createMockRequest(validData);
      const response = await POST(request);
      const data = await response.json();

      expect(data).toHaveProperty('success');
      expect(data).toHaveProperty('message');
      expect(data.success).toBe(true);
      expect(typeof data.message).toBe('string');
    });

    it('should return consistent error response format', async () => {
      const invalidData = { unternehmen: 'A' }; // too short

      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();

      expect(data).toHaveProperty('success');
      expect(data).toHaveProperty('message');
      expect(data.success).toBe(false);
      expect(typeof data.message).toBe('string');
      if (data.errors) {
        expect(typeof data.errors).toBe('object');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty request body', async () => {
      const request = createMockRequest({});
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Validation failed');
    });

    it('should handle null values in request', async () => {
      const dataWithNulls = {
        unternehmen: null,
        plz: null,
        land: null,
        name: null,
        telefonnummer: null,
        emailadresse: null,
        dsbVorhanden: null,
        start: null,
        unternehmensgroesse: null,
        gdprConsent: null,
      };

      const request = createMockRequest(dataWithNulls);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should handle extra fields in request', async () => {
      const dataWithExtraFields = {
        ...createValidFormData(),
        extraField: 'should be ignored',
        anotherExtra: 123,
      };

      mockAppendLeadRow.mockResolvedValueOnce(undefined);

      const request = createMockRequest(dataWithExtraFields);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      
      // Verify only valid fields were passed to appendLeadRow
      const expectedData = createValidFormData();
      expect(mockAppendLeadRow).toHaveBeenCalledWith(expectedData);
    });
  });
});
