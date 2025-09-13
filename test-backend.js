// Simple test script to verify backend is working
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function testBackend() {
  try {
    console.log('🧪 Testing KMRL Portal Backend...\n');

    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);

    // Test 2: File upload (create a test file)
    console.log('\n2. Testing file upload endpoint...');
    
    // Create a simple test file
    const testContent = 'This is a test document for KMRL Portal file upload feature.';
    fs.writeFileSync('test-document.txt', testContent);

    const formData = new FormData();
    formData.append('file', fs.createReadStream('test-document.txt'));

    const uploadResponse = await fetch('http://localhost:3001/api/upload-summary', {
      method: 'POST',
      body: formData,
    });

    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json();
      console.log('✅ File upload successful!');
      console.log('📄 Summary preview:', uploadData.summary.substring(0, 100) + '...');
    } else {
      console.log('❌ File upload failed:', uploadResponse.status);
    }

    // Cleanup
    fs.unlinkSync('test-document.txt');
    console.log('\n🎉 Backend test completed successfully!');

  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 3001');
    console.log('   Run: cd server && npm run dev');
  }
}

testBackend();