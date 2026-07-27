const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const styleCssPath = path.join(rootDir, 'style.css');

if (!fs.existsSync(styleCssPath)) {
  console.error('style.css not found!');
  process.exit(1);
}

const cssContent = fs.readFileSync(styleCssPath, 'utf8');
const isInline = process.argv.includes('--inline');

const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Processing ${htmlFiles.length} HTML files...`);

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace hello@yemijeff.com with yemijefff@gmail.com if present
  if (html.includes('hello@yemijeff.com')) {
    html = html.replace(/hello@yemijeff\.com/g, 'yemijefff@gmail.com');
  }

  if (isInline) {
    // Replace <link rel="stylesheet" href="style.css"> with <style>...</style>
    const linkRegex = /<link\s+rel=["']stylesheet["']\s+href=["']style\.css["']\s*\/?>/gi;
    if (linkRegex.test(html)) {
      html = html.replace(linkRegex, `<style>\n${cssContent}\n</style>`);
    } else if (html.includes('<style>') && html.includes('</style>')) {
      const parts = html.split('<style>');
      const endParts = parts[1].split('</style>');
      html = parts[0] + '<style>\n' + cssContent + '\n</style>' + endParts.slice(1).join('</style>');
    }
  } else {
    // Replace <style>...</style> block with <link rel="stylesheet" href="style.css">
    if (html.includes('<style>') && html.includes('</style>')) {
      const beforeStyle = html.split('<style>')[0];
      const afterStyle = html.split('</style>')[1];
      html = beforeStyle + '<link rel="stylesheet" href="style.css">' + afterStyle;
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Updated ${file} (${isInline ? 'inlined' : 'linked style.css'})`);
});

console.log('Done!');
