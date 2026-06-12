const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate SVG placeholders with colors matching the categories
const categoryColors = {
  'sante-solidarite': { bg: '#fce7f3', accent: '#db2777', icon: '🩺' },
  'environnement': { bg: '#dcfce7', accent: '#16a34a', icon: '🌱' },
  'jeunesse': { bg: '#fef3c7', accent: '#ca8a04', icon: '🎯' },
  'securite': { bg: '#dbeafe', accent: '#2563eb', icon: '🚔' },
  'vie-citoyenne': { bg: '#d1fae5', accent: '#047857', icon: '🏘️' },
  'urbanisme': { bg: '#ede9fe', accent: '#6d28d9', icon: '🏗️' },
  'education': { bg: '#ccfbf1', accent: '#0d9488', icon: '📚' },
  'services-publics': { bg: '#e0f2fe', accent: '#0369a1', icon: '🏛️' },
  'developpement-local': { bg: '#ffedd5', accent: '#ea580c', icon: '🌾' },
  'culture': { bg: '#faf5ff', accent: '#9333ea', icon: '🎨' },
  'general': { bg: '#f1f5f9', accent: '#475569', icon: '📰' }
};

// Create SVG files for each category
Object.keys(categoryColors).forEach(category => {
  const { bg, accent, icon } = categoryColors[category];
  
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="grad-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${accent}22;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#grad-${category})"/>
  
  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="60" fill="${accent}" opacity="0.1"/>
  <circle cx="700" cy="400" r="100" fill="${accent}" opacity="0.08"/>
  <circle cx="650" cy="150" r="40" fill="${accent}" opacity="0.12"/>
  
  <!-- Center icon/text -->
  <text x="400" y="250" font-size="150" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  <text x="400" y="320" font-size="24" font-family="Arial, sans-serif" fill="${accent}" text-anchor="middle" font-weight="bold">${category.replace('-', ' & ')}</text>
</svg>
  `.trim();

  fs.writeFileSync(path.join(imagesDir, `${category}.svg`), svgContent);
  console.log(`✅ Created: ${category}.svg`);
});

console.log('🎉 All placeholder images generated successfully!');
