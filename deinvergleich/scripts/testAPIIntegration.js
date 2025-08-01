/**
 * Test Production API Integration
 * Task 13.1: Verify end-to-end API to Google Sheets flow
 */

const testData = {
  unternehmen: "API Integration Test GmbH",
  plz: "10119", 
  land: "DE", // Use country code, not full name
  name: "Integration Tester",
  telefonnummer: "01711111111", // Valid German mobile format
  emailadresse: "integration@test.com", // Correct field name
  dsbVorhanden: "ja", // Use enum value, not boolean
  start: "2025-09-20", // Correct field name
  unternehmensgroesse: "11-50", // Use enum value
  gdprConsent: true
};

async function testAPIIntegration() {
  console.log('🧪 Testing Production API Integration...\n');

  try {
    console.log('📤 Sending test data to API...');
    console.log('Data:', JSON.stringify(testData, null, 2));

    const response = await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log(`\n📡 Response Status: ${response.status} ${response.statusText}`);

    const result = await response.json();
    console.log('📄 Response Body:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('\n✅ API Integration Test SUCCESSFUL!');
      console.log('🎉 Form data successfully sent to Google Sheets!');
      console.log('\n📊 Check the Google Sheet to verify the data was written:');
      console.log('https://docs.google.com/spreadsheets/d/1lde1UR0etOfakj4xrq_OoxQ08LBC1GKF3bfDtenct3U');
    } else {
      console.log('\n❌ API Integration Test FAILED');
      console.log('Error:', result);
    }

  } catch (error) {
    console.error('❌ API Integration Test FAILED:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure development server is running: npm run dev');
    console.log('2. Check if Google Sheets service is accessible');
    console.log('3. Verify environment variables are correct');
  }
}

// Run the test
testAPIIntegration();
