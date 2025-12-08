const http = require('http');

async function testAPI() {
  return new Promise((resolve, reject) => {
    console.log('\n========== TEST API LOGIN ==========');
    
    const data = JSON.stringify({
      email: 'admin@weddingplanner.vn',
      password: '123'
    });
    
    console.log('API URL: http://localhost:4000/api/auth/login');
    console.log('Request data:', data);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = http.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        console.log('\nStatus:', res.statusCode);
        console.log('Response:', body);
        
        if (res.statusCode === 200) {
          console.log('\n✅ LOGIN THÀNH CÔNG!');
          const parsed = JSON.parse(body);
          if (parsed.data?.token) {
            console.log('Token:', parsed.data.token.substring(0, 50) + '...');
          }
        } else {
          console.log('\n❌ LOGIN THẤT BẠI!');
        }
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.log('\n❌ KHÔNG KẾT NỐI ĐƯỢC SERVER!');
      console.log('Error:', error.message);
      console.log('\n⚠️  Kiểm tra:');
      console.log('  1. Server có đang chạy không? (npm run dev)');
      console.log('  2. Port 3000 có đúng không?');
      reject(error);
    });
    
    req.write(data);
    req.end();
  });
}

testAPI().catch(console.error);
