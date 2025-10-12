#!/usr/bin/env node

/**
 * Authentication Feature Validation Script
 * 
 * This script validates the core authentication logic by checking:
 * 1. All required files exist
 * 2. Proper exports are in place
 * 3. Key functions and classes are properly defined
 */

const fs = require('fs');
const path = require('path');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;
let warnings = 0;

function checkFileExists(filePath, description) {
  const fullPath = path.join(__dirname, '../src', filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`${GREEN}✓${RESET} ${description}`);
    passed++;
    return true;
  } else {
    console.log(`${RED}✗${RESET} ${description} - File not found: ${filePath}`);
    failed++;
    return false;
  }
}

function checkFileContains(filePath, searchString, description) {
  const fullPath = path.join(__dirname, '../src', filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(searchString)) {
      console.log(`${GREEN}✓${RESET} ${description}`);
      passed++;
      return true;
    } else {
      console.log(`${YELLOW}⚠${RESET} ${description} - String not found in ${filePath}`);
      warnings++;
      return false;
    }
  } else {
    console.log(`${RED}✗${RESET} ${description} - File not found: ${filePath}`);
    failed++;
    return false;
  }
}

console.log('\n🔐 Authentication Feature Validation\n');
console.log('=' .repeat(50) + '\n');

console.log('📁 Core Services:\n');
checkFileExists('features/auth/services/TokenService.ts', 'TokenService exists');
checkFileExists('features/auth/services/AuthService.ts', 'AuthService exists');
checkFileContains('features/auth/services/TokenService.ts', 'class TokenService', 'TokenService is properly defined');
checkFileContains('features/auth/services/TokenService.ts', 'hasValidAuth', 'TokenService has hasValidAuth method');
checkFileContains('features/auth/services/AuthService.ts', 'processLoginResponse', 'AuthService has processLoginResponse');
checkFileContains('features/auth/services/AuthService.ts', 'processLogout', 'AuthService has processLogout');

console.log('\n📦 State Management:\n');
checkFileExists('features/auth/store/authSlice.ts', 'Auth Redux slice exists');
checkFileExists('store/hooks.ts', 'Redux typed hooks exist');
checkFileContains('features/auth/store/authSlice.ts', 'setUser', 'authSlice has setUser action');
checkFileContains('features/auth/store/authSlice.ts', 'setTokens', 'authSlice has setTokens action');
checkFileContains('features/auth/store/authSlice.ts', 'clearAuth', 'authSlice has clearAuth action');
checkFileContains('store/hooks.ts', 'useAppDispatch', 'Typed useAppDispatch exists');
checkFileContains('store/hooks.ts', 'useAppSelector', 'Typed useAppSelector exists');

console.log('\n🔌 API Integration:\n');
checkFileExists('features/auth/api/authApi.ts', 'Auth API endpoints exist');
checkFileExists('infrastructure/api/client/baseQuery.ts', 'Base query configuration exists');
checkFileContains('features/auth/api/authApi.ts', 'login:', 'Login endpoint defined');
checkFileContains('features/auth/api/authApi.ts', 'logout:', 'Logout endpoint defined');
checkFileContains('infrastructure/api/client/baseQuery.ts', 'tokenService', 'Base query uses tokenService');

console.log('\n🪝 Authentication Hooks:\n');
checkFileExists('features/auth/hooks/useLogin.ts', 'useLogin hook exists');
checkFileExists('features/auth/hooks/useLogout.ts', 'useLogout hook exists');
checkFileExists('features/auth/hooks/useAuthInit.ts', 'useAuthInit hook exists');
checkFileExists('features/auth/hooks/index.ts', 'Auth hooks index exports exist');
checkFileContains('features/auth/hooks/useLogin.ts', 'handleLogin', 'useLogin has handleLogin function');
checkFileContains('features/auth/hooks/useLogout.ts', 'handleLogout', 'useLogout has handleLogout function');
checkFileContains('features/auth/hooks/useAuthInit.ts', 'useEffect', 'useAuthInit uses useEffect for initialization');

console.log('\n🛡️ Route Guards:\n');
checkFileExists('routing/guards/AuthGuard.tsx', 'AuthGuard exists');
checkFileExists('routing/guards/GuestGuard.tsx', 'GuestGuard exists');
checkFileExists('routing/guards/RoleGuard.tsx', 'RoleGuard exists');
checkFileContains('routing/guards/AuthGuard.tsx', 'isAuthenticated', 'AuthGuard checks authentication');
checkFileContains('routing/guards/GuestGuard.tsx', 'isAuthenticated', 'GuestGuard checks authentication');
checkFileContains('routing/guards/RoleGuard.tsx', 'allowedRoles', 'RoleGuard checks roles');

console.log('\n🚀 Application Integration:\n');
checkFileExists('app/App.tsx', 'App component exists');
checkFileContains('app/App.tsx', 'useAuthInit', 'App uses useAuthInit for session restoration');

console.log('\n🔧 Configuration:\n');
checkFileExists('routing/config/routePaths.ts', 'Route paths configuration exists');
checkFileContains('routing/config/routePaths.ts', 'AUTH', 'Route paths include AUTH routes');

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Results:\n`);
console.log(`${GREEN}✓ Passed:${RESET} ${passed}`);
console.log(`${YELLOW}⚠ Warnings:${RESET} ${warnings}`);
console.log(`${RED}✗ Failed:${RESET} ${failed}`);

if (failed === 0 && warnings === 0) {
  console.log(`\n${GREEN}🎉 All authentication checks passed!${RESET}\n`);
  process.exit(0);
} else if (failed === 0) {
  console.log(`\n${YELLOW}⚠ Authentication checks passed with warnings.${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${RED}❌ Some authentication checks failed.${RESET}\n`);
  process.exit(1);
}
