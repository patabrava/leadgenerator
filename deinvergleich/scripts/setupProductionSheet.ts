/**
 * Production Google Sheets Setup and Test Script
 * Task 13.1: Create Production Google Sheet
 */

import { config } from 'dotenv';
import { initClient } from '../src/lib/googleSheets';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function setupProductionSheet() {
  console.log('🚀 Starting Production Google Sheets Setup...\n');

  try {
    // Step 1: Test Authentication
    console.log('1️⃣ Testing Google Sheets Authentication...');
    const sheets = await initClient();
    console.log('✅ Authentication successful!\n');

    // Step 2: Verify Sheet Access
    console.log('2️⃣ Verifying Sheet Access...');
    const spreadsheetId = process.env['GOOGLE_SHEETS_ID'];
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID not found in environment variables');
    }

    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    console.log(`✅ Sheet accessible: "${response.data.properties?.title}"`);
    console.log(`📊 Sheet ID: ${spreadsheetId}`);
    console.log(`🔗 Sheet URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}\n`);

    // Step 3: Check/Create Headers
    console.log('3️⃣ Checking Sheet Headers...');
    const headerRange = 'A1:J1';
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: headerRange,
    });

    const expectedHeaders = [
      'Unternehmen',
      'PLZ',
      'Land', 
      'Name',
      'Telefonnummer',
      'E-Mail-Adresse',
      'DSB vorhanden',
      'Projektstart',
      'Unternehmensgröße',
      'Zeitstempel'
    ];

    const existingHeaders = headerResponse.data.values?.[0] || [];
    
    if (existingHeaders.length === 0) {
      console.log('📝 No headers found. Creating headers...');
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: headerRange,
        valueInputOption: 'RAW',
        requestBody: {
          values: [expectedHeaders],
        },
      });
      console.log('✅ Headers created successfully!');
    } else {
      console.log('✅ Headers already exist:');
      existingHeaders.forEach((header, index) => {
        const expected = expectedHeaders[index];
        const status = header === expected ? '✅' : '⚠️';
        console.log(`   ${status} Column ${index + 1}: "${header}" ${header !== expected ? `(expected: "${expected}")` : ''}`);
      });
    }

    // Step 4: Test Data Write
    console.log('\n4️⃣ Testing Data Write...');
    const testData = [
      'Test Unternehmen GmbH',
      '10115',
      'Deutschland',
      'Max Mustermann',
      '030 12345678',
      'test@example.com',
      'Ja',
      '2025-09-01',
      '11-50 Mitarbeiter',
      new Date().toISOString()
    ];

    const writeResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:J',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [testData],
      },
    });

    console.log('✅ Test data written successfully!');
    console.log(`📝 Updated range: ${writeResponse.data.updates?.updatedRange}`);
    console.log(`📊 Rows added: ${writeResponse.data.updates?.updatedRows}\n`);

    // Step 5: Verify Data Read
    console.log('5️⃣ Verifying Data Read...');
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: writeResponse.data.updates?.updatedRange || 'A2:J2',
    });

    const writtenData = readResponse.data.values?.[0] || [];
    console.log('✅ Data verification successful:');
    expectedHeaders.forEach((header, index) => {
      console.log(`   ${header}: ${writtenData[index] || 'N/A'}`);
    });

    console.log('\n🎉 Production Google Sheets Setup Complete!');
    console.log('\n📋 Summary:');
    console.log(`   • Sheet ID: ${spreadsheetId}`);
    console.log(`   • Sheet URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
    console.log(`   • Headers: ✅ Configured`);
    console.log(`   • Write Access: ✅ Confirmed`);
    console.log(`   • Read Access: ✅ Confirmed`);
    console.log(`   • Service Account: ${process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL']}`);

  } catch (error) {
    console.error('❌ Production Sheet Setup Failed:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5).join('\n')
      });
    }

    // Provide troubleshooting steps
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('1. Verify GOOGLE_SHEETS_ID is correct');
    console.log('2. Check service account has edit access to the sheet');
    console.log('3. Ensure GOOGLE_PRIVATE_KEY format is correct');
    console.log('4. Verify Google Sheets API is enabled in Google Cloud Console');
    
    process.exit(1);
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupProductionSheet().catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });
}

export { setupProductionSheet };
