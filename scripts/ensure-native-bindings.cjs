#!/usr/bin/env node

/**
 * Ensures native bindings are installed on Linux
 * Only installs if packages are missing to avoid breaking dependency trees
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');
const { platform } = require('os');
/* eslint-enable @typescript-eslint/no-require-imports */

// Only run on Linux
if (platform() !== 'linux') {
  console.log(`Skipping native binding installation (platform: ${platform()})`);
  process.exit(0);
}

// Skip if we're in GitHub Actions (packages are installed in workflow step)
if (process.env.GITHUB_ACTIONS === 'true') {
  console.log('Skipping native binding installation (GitHub Actions handles this)');
  process.exit(0);
}

// Package names to check (mapping to their node_modules paths)
const packagesToCheck = [
  { name: '@rollup/rollup-linux-x64-gnu', path: 'node_modules/@rollup/rollup-linux-x64-gnu' },
  { name: 'lightningcss-linux-x64-gnu', path: 'node_modules/lightningcss-linux-x64-gnu' },
  { name: '@tailwindcss/oxide-linux-x64-gnu', path: 'node_modules/@tailwindcss/oxide-linux-x64-gnu' },
  { name: '@rolldown/binding-linux-x64-gnu', path: 'node_modules/@rolldown/binding-linux-x64-gnu' },
];

// Package names with versions for installation
const packagesToInstall = [
  '@rollup/rollup-linux-x64-gnu',
  'lightningcss-linux-x64-gnu@1.30.2',
  '@tailwindcss/oxide-linux-x64-gnu@4.1.17',
  '@rolldown/binding-linux-x64-gnu@1.0.0-beta.47',
];

let needsInstall = false;

// Check if any packages are missing by checking filesystem
for (const pkg of packagesToCheck) {
  const pkgPath = join(process.cwd(), pkg.path);
  if (!existsSync(pkgPath)) {
    needsInstall = true;
    console.log(`Missing: ${pkg.name}`);
    break;
  }
}

if (needsInstall) {
  console.log('Some native bindings are missing, installing...');
  try {
    execSync(`npm install --no-save ${packagesToInstall.join(' ')}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { ...process.env, npm_config_optional: 'false' },
    });
    console.log('✓ Successfully installed native bindings');
  } catch (error) {
    console.warn('⚠ Failed to install native bindings:', error.message);
    // Don't fail the build
    process.exit(0);
  }
} else {
  console.log('✓ All native bindings are already installed');
}

