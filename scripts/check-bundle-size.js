#!/usr/bin/env node
/**
 * Performance Budget Enforcement
 * Checks build output sizes and fails if budgets are exceeded
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

// Performance budgets (in KB)
const BUDGETS = {
  totalJS: 250,      // Total JS bundle size
  totalCSS: 50,      // Total CSS size
  largestJS: 100,    // Any single JS file
  largestCSS: 30,    // Any single CSS file
  images: 2500,      // Total image size (generous for hero images)
};

function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function getAllFiles(dir, ext, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, ext, files);
    } else if (entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function checkBudgets() {
  if (!fs.existsSync(distDir)) {
    console.error('❌ Build directory not found. Run `pnpm build` first.');
    process.exit(1);
  }

  const jsFiles = getAllFiles(distDir, '.js');
  const cssFiles = getAllFiles(distDir, '.css');
  const imageFiles = [
    ...getAllFiles(distDir, '.jpg'),
    ...getAllFiles(distDir, '.png'),
    ...getAllFiles(distDir, '.webp'),
  ];

  const totalJS = jsFiles.reduce((sum, file) => sum + getFileSizeKB(file), 0);
  const totalCSS = cssFiles.reduce((sum, file) => sum + getFileSizeKB(file), 0);
  const totalImages = imageFiles.reduce((sum, file) => sum + getFileSizeKB(file), 0);
  
  const largestJS = Math.max(...jsFiles.map(getFileSizeKB), 0);
  const largestCSS = Math.max(...cssFiles.map(getFileSizeKB), 0);

  let failed = false;

  console.log('\n📊 Performance Budget Check\n');

  // Check total JS
  const jsStatus = totalJS <= BUDGETS.totalJS ? '✅' : '❌';
  console.log(`${jsStatus} Total JavaScript: ${totalJS} KB / ${BUDGETS.totalJS} KB`);
  if (totalJS > BUDGETS.totalJS) failed = true;

  // Check total CSS
  const cssStatus = totalCSS <= BUDGETS.totalCSS ? '✅' : '❌';
  console.log(`${cssStatus} Total CSS: ${totalCSS} KB / ${BUDGETS.totalCSS} KB`);
  if (totalCSS > BUDGETS.totalCSS) failed = true;

  // Check largest JS file
  const largestJSStatus = largestJS <= BUDGETS.largestJS ? '✅' : '❌';
  console.log(`${largestJSStatus} Largest JS file: ${largestJS} KB / ${BUDGETS.largestJS} KB`);
  if (largestJS > BUDGETS.largestJS) failed = true;

  // Check largest CSS file
  const largestCSSStatus = largestCSS <= BUDGETS.largestCSS ? '✅' : '❌';
  console.log(`${largestCSSStatus} Largest CSS file: ${largestCSS} KB / ${BUDGETS.largestCSS} KB`);
  if (largestCSS > BUDGETS.largestCSS) failed = true;

  // Check total images
  const imagesStatus = totalImages <= BUDGETS.images ? '✅' : '❌';
  console.log(`${imagesStatus} Total Images: ${totalImages} KB / ${BUDGETS.images} KB`);
  if (totalImages > BUDGETS.images) failed = true;

  console.log('');

  if (failed) {
    console.error('❌ Performance budget exceeded! Optimize assets before deploying.\n');
    process.exit(1);
  }

  console.log('✅ All performance budgets met!\n');
}

checkBudgets();
