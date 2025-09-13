#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting KMRL Portal with File Upload Feature...\n');

// Check if backend dependencies are installed
const serverNodeModules = join(__dirname, 'server', 'node_modules');
if (!existsSync(serverNodeModules)) {
  console.log('📦 Installing backend dependencies...');
  const install = spawn('npm', ['install'], {
    cwd: join(__dirname, 'server'),
    stdio: 'inherit',
    shell: true
  });
  
  install.on('close', (code) => {
    if (code === 0) {
      startServers();
    } else {
      console.error('❌ Failed to install backend dependencies');
      process.exit(1);
    }
  });
} else {
  startServers();
}

function startServers() {
  // Start backend server
  console.log('📡 Starting backend server on port 3001...');
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: join(__dirname, 'server'),
    stdio: 'pipe',
    shell: true
  });

  backend.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`[Backend] ${output.trim()}`);
    
    // Start frontend when backend is ready
    if (output.includes('running on port 5000')) {
      setTimeout(() => {
        console.log('🌐 Starting frontend server on port 5173...');
        const frontend = spawn('npm', ['run', 'dev'], {
          cwd: __dirname,
          stdio: 'pipe',
          shell: true
        });

        frontend.stdout.on('data', (data) => {
          const output = data.toString();
          console.log(`[Frontend] ${output.trim()}`);
        });

        frontend.stderr.on('data', (data) => {
          const output = data.toString();
          if (!output.includes('EADDRINUSE')) {
            console.error(`[Frontend Error] ${output.trim()}`);
          }
        });

        // Handle process termination
        process.on('SIGINT', () => {
          console.log('\n🛑 Shutting down servers...');
          backend.kill();
          frontend.kill();
          process.exit(0);
        });

        frontend.on('close', (code) => {
          console.log(`Frontend server exited with code ${code}`);
          backend.kill();
        });

      }, 1000);
    }
  });

  backend.stderr.on('data', (data) => {
    const output = data.toString();
    if (!output.includes('EADDRINUSE')) {
      console.error(`[Backend Error] ${output.trim()}`);
    }
  });

  backend.on('close', (code) => {
    console.log(`Backend server exited with code ${code}`);
  });
}