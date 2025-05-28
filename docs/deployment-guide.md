# Deployment Guide

## Overview

This guide covers deploying the Red Hanky Popper Zine to various hosting platforms, with specific focus on Vercel (recommended) and alternative options.

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub/GitLab repository
- Vercel account
- Node.js 18+ locally for testing

### Automatic Deployment
1. **Connect Repository**
   - Import project from GitHub/GitLab in Vercel dashboard
   - Vercel auto-detects Next.js configuration

2. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: \`npm run build\`
   - Output Directory: \`.next\`
   - Install Command: \`npm install\`

3. **Environment Variables**
   - Currently no environment variables required
   - Add any future API keys or configuration here

### Manual Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Production deployment
vercel --prod
\`\`\`

### Custom Domain
1. Add domain in Vercel dashboard
2. Configure DNS records as instructed
3. SSL certificates are automatically provisioned

## Alternative Hosting Platforms

### Netlify
\`\`\`bash
# Build settings
Build command: npm run build
Publish directory: out
\`\`\`

Add \`next.config.js\` for static export:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
\`\`\`

### GitHub Pages
1. Enable static export in \`next.config.js\`
2. Use GitHub Actions for automated deployment
3. Configure custom domain if needed

### Self-Hosted (Docker)
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Performance Optimization

### Build Optimization
\`\`\`bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
\`\`\`

### CDN Configuration
- **Static Assets**: Automatically optimized on Vercel
- **Font Loading**: Self-hosted fonts for performance
- **Image Optimization**: Next.js Image component (if images added)

### Caching Strategy
- **Static Generation**: Pages are statically generated
- **Client-side Caching**: LocalStorage for user preferences
- **CDN Caching**: Automatic with Vercel/Netlify

## Monitoring & Analytics

### Performance Monitoring
\`\`\`javascript
// Add to _app.tsx for Web Vitals
export function reportWebVitals(metric) {
  console.log(metric)
  // Send to analytics service
}
\`\`\`

### Error Tracking
Consider integrating:
- **Sentry**: Error monitoring and performance
- **LogRocket**: Session replay and debugging
- **Vercel Analytics**: Built-in performance insights

### User Analytics
Privacy-focused options:
- **Plausible**: Privacy-friendly analytics
- **Fathom**: Simple, privacy-focused tracking
- **Self-hosted**: Umami or similar solutions

## Security Considerations

### Content Security Policy
\`\`\`javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
\`\`\`

### HTTPS Enforcement
- Automatic with Vercel/Netlify
- Configure redirects for custom domains

### Privacy Compliance
- **No cookies**: Application uses only LocalStorage
- **No tracking**: Privacy-focused by design
- **Data retention**: User controls all stored data

## Backup & Recovery

### Code Backup
- **Git repository**: Primary backup method
- **Multiple remotes**: Consider GitLab/GitHub mirrors
- **Tagged releases**: Version control for deployments

### User Data
- **LocalStorage**: User-controlled, no server backup needed
- **Export functionality**: Future feature for user data export

### Deployment Rollback
\`\`\`bash
# Vercel rollback
vercel rollback [deployment-url]

# Git-based rollback
git revert [commit-hash]
git push origin main
\`\`\`

## Troubleshooting

### Common Build Issues
1. **Font loading errors**: Check font file paths
2. **CSS import errors**: Verify CSS module paths
3. **TypeScript errors**: Run \`npm run type-check\`

### Runtime Issues
1. **LocalStorage errors**: Check browser compatibility
2. **Animation performance**: Verify CSS optimization
3. **State persistence**: Check Zustand configuration

### Performance Issues
1. **Large bundle size**: Analyze with bundle analyzer
2. **Slow page transitions**: Check animation performance
3. **Memory leaks**: Monitor effect cleanup

## Maintenance

### Regular Updates
- **Dependencies**: Monthly security updates
- **Next.js**: Follow LTS release schedule
- **Browser testing**: Test on latest browser versions

### Performance Monitoring
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle size**: Track growth over time
- **User feedback**: Monitor for performance issues

### Content Updates
- **Content versioning**: Track content changes
- **A/B testing**: Test content variations
- **User engagement**: Monitor reading patterns
\`\`\`
