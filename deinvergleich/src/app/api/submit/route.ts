import { NextRequest, NextResponse } from 'next/server';

import { appendLeadRow, GoogleSheetsError } from '@/lib/googleSheets';
import { formSchema } from '@/schemas/formSchema';

// API response types
interface SuccessResponse {
  success: true;
  message: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

type ApiResponse = SuccessResponse | ErrorResponse;

// Handle POST requests
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
        },
        { status: 400 }
      );
    }

    // Validate request body against schema
    const validation = await formSchema.safeParseAsync(body);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field && typeof field === 'string') {
          errors[field] = issue.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      );
    }

    // Append data to Google Sheets
    try {
      await appendLeadRow(validation.data);
    } catch (error) {
      console.error('Google Sheets error:', error);

      if (error instanceof GoogleSheetsError) {
        // Handle specific Google Sheets errors
        switch (error.code) {
          case 'AUTHENTICATION_ERROR':
            return NextResponse.json(
              {
                success: false,
                message: 'Service temporarily unavailable. Please try again later.',
              },
              { status: 503 }
            );
          
          case 'VALIDATION_ERROR':
            return NextResponse.json(
              {
                success: false,
                message: 'Invalid data provided.',
              },
              { status: 400 }
            );
          
          case 'QUOTA_ERROR':
            return NextResponse.json(
              {
                success: false,
                message: 'Service temporarily unavailable due to high demand. Please try again later.',
              },
              { status: 429 }
            );
          
          case 'NETWORK_ERROR':
            return NextResponse.json(
              {
                success: false,
                message: 'Network error occurred. Please try again.',
              },
              { status: 502 }
            );
          
          default:
            return NextResponse.json(
              {
                success: false,
                message: 'An error occurred while processing your request.',
              },
              { status: 500 }
            );
        }
      }

      // Generic server error
      return NextResponse.json(
        {
          success: false,
          message: 'An unexpected error occurred. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unexpected API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}

export async function PUT(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}

export async function DELETE(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}

export async function PATCH(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}
