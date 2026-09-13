const https = require('https');

const check = (url, label) => {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          console.log(`✓ [${label}] Status: ${res.statusCode} — ${json.app || json.message || 'OK'}`);
        } catch {
          console.log(`✓ [${label}] Status: ${res.statusCode} — HTML page served`);
        }
        resolve(true);
      });
    });
    req.on('error', (e) => {
      console.log(`✗ [${label}] Error: ${e.message}`);
      resolve(false);
    });
    req.setTimeout(15000, () => {
      console.log(`⚠ [${label}] Timeout — server may still be starting up (Render cold boot)`);
      req.destroy();
      resolve(false);
    });
  });
};

const main = async () => {
  console.log('\n🌐 Verifying live deployment URLs...\n');
  await check('https://connectserve-api.onrender.com/api/health', 'Backend API (Render)');
  await check('https://connectserve.vercel.app', 'Frontend App (Vercel)');
  console.log('\nDone!\n');
};

main();
