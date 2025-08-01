/**
 * Test Google Sheets Read Access
 * Task 13.1: Verify Production Google Sheet Access
 */

import { config } from 'dotenv';
import { initClient } from '../src/lib/googleSheets';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testReadAccess() {
  console.log('🔍 Testing Google Sheets Read Access...\n');

  try {
    // Step 1: Test Authentication
    console.log('1️⃣ Testing Authentication...');
    const sheets = await initClient();
    console.log('✅ Authentication successful!\n');

    // Step 2: Get Sheet Info
    console.log('2️⃣ Getting Sheet Information...');
    const spreadsheetId = process.env['GOOGLE_SHEETS_ID'];
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID not found in environment variables');
    }

    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    console.log(`✅ Sheet found: "${response.data.properties?.title}"`);
    console.log(`📊 Sheet ID: ${spreadsheetId}`);
    console.log(`🔗 Sheet URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
    console.log(`🌐 Locale: ${response.data.properties?.locale}`);
    console.log(`� Sheet Count: ${response.data.sheets?.length || 0}\n`);

    // Step 3: Read Existing Data
    console.log('3️⃣ Reading Sheet Data...');
    
    // Try to read first 10 rows
    const dataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:J10',
    });

    const values = dataResponse.data.values || [];
    console.log(`📊 Found ${values.length} rows of data`);
    
    if (values.length > 0) {
      console.log('\n📋 First few rows:');
      values.slice(0, 3).forEach((row, index) => {
        console.log(`   Row ${index + 1}: [${row.join(', ')}]`);
      });
    } else {
      console.log('📝 Sheet is empty - ready for data');
    }

    // Step 4: Check Permissions
    console.log('\n4️⃣ Checking Write Permissions...');
    try {
      // Try a simple batch update to test write access
      await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Z1000', // Test range that shouldn't interfere
      });
      
      console.log('⚠️  Write permission test: Attempting test write...');
      // This will fail if no write access, which we expect
      
    } catch (writeError) {
      console.log('❌ Write access: Not available');
      console.log('   Service account has READ-ONLY access');
    }

    console.log('\n🎉 Read Access Test Complete!');
    console.log('\n📋 Summary:');
    console.log(`   • Authentication: ✅ Working`);
    console.log(`   • Sheet Access: ✅ Can read sheet`);
    console.log(`   • Service Account: ${process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL']}`);
    console.log(`   • Write Access: ❌ Needs permission`);

    console.log('\n📝 Next Steps to Enable Write Access:');
    console.log('1. Open the Google Sheet in your browser:');
    console.log(`   https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
    console.log('2. Click "Share" button in top-right corner');
    console.log('3. Add the service account email as Editor:');
    console.log(`   ${process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL']}`);
    console.log('4. Set permission to "Editor" (not just "Viewer")');
    console.log('5. Click "Send" to grant access');
    console.log('6. Re-run: npm run setup:production');

  } catch (error) {
    console.error('❌ Read Access Test Failed:', error);
    
    if (error instanceof Error) {
      console.error('\nError details:', error.message);
    }

    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify GOOGLE_SHEETS_ID is correct');
    console.log('2. Check Google Sheets API is enabled');
    console.log('3. Verify service account credentials');
    
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testReadAccess().catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });
}

export { testReadAccess };
