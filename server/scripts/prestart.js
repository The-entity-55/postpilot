const { exec } = require('child_process');
const os = require('os');

const platform = os.platform();
const command = platform === 'win32'
  ? 'taskkill /F /IM node.exe /T'
  : 'pkill -f node || true';

exec(command, (error) => {
  if (error && !error.message.includes('no process found')) {
    console.error('Error cleaning up processes:', error);
  }
});