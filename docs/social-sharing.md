# Social Media Card Generation Guide

## Overview

The Red Hanky Popper Zine includes comprehensive social media card generation functionality, allowing content to be shared effectively across platforms like Twitter, Facebook, and LinkedIn. This guide explains how the system works and how to customize it.

## Features

- **Dynamic OG Image Generation**: Server-side generation of Open Graph images
- **Page-Specific Metadata**: Each zine page has unique social sharing metadata
- **Preview Tool**: Built-in preview for social media cards
- **Share Buttons**: Easy sharing to major social platforms
- **Client-Side Updates**: Metadata updates when navigating between pages

## Implementation Details

### 1. Metadata Configuration

The metadata system is configured in `lib/metadata-config.ts` and includes:

- Default social card configuration
- Page-specific metadata generation
- Next.js Metadata API integration

\`\`\`typescript
// Default configuration
export const DEFAULT_SOCIAL_CARD: SocialCardConfig = {
  title: "Red Hanky Popper Zine - Bottom Epistemology",
  description: "A Single Page Application in Bottom Epistemology...",
  image: "/api/og?page=1",
  url: "https://red-hanky-zine.vercel.app",
  // ...
}

// Generate page-specific metadata
export function getPageSocialCard(pageId: number): SocialCardConfig {
  // ...
}
\`\`\`

### 2. OG Image Generation

Dynamic Open Graph images are generated using Next.js Edge Runtime:

- Located at `app/api/og/route.tsx`
- Uses the `ImageResponse` API from Next.js
- Generates custom images based on page content
- Includes page title, subtitle, and a representative quote

### 3. Client-Side Metadata Updates

Since this is a client-side SPA with navigation, we use:

- `DynamicMetaUpdater` component to update meta tags when pages change
- Updates document title, meta description, and OG/Twitter tags
- Maintains canonical URL for proper SEO

### 4. Social Sharing UI

The UI components for social sharing include:

- `SocialShareButton`: Floating action button for sharing
- `SocialCardPreview`: Modal to preview how cards will appear
- `SettingsPanel`: Includes social card preview option

## Customization

### Modifying Default Values

To change the default social card values:

1. Edit `DEFAULT_SOCIAL_CARD` in `lib/metadata-config.ts`
2. Update site name, default description, and URL

### Customizing OG Images

To modify the OG image generation:

1. Edit `app/api/og/route.tsx`
2. Customize the JSX structure for the image
3. Adjust colors, typography, and layout

### Adding New Platforms

To add support for additional social platforms:

1. Add new share methods to `SocialShareButton.tsx`
2. Include appropriate icons and share URLs
3. Update the preview component if needed

## Testing Social Cards

### Preview Tool

1. Open the settings panel by clicking the gear icon
2. Click "Preview Social Media Card"
3. View how the card will appear on different platforms

### External Validation

Use these tools to validate your social cards:

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Troubleshooting

Common issues and solutions:

1. **Images not appearing**: Ensure the OG image URL is absolute
2. **Metadata not updating**: Check the DynamicMetaUpdater component
3. **Preview not matching actual cards**: Clear cache in validation tools

## Best Practices

1. **Keep titles concise**: Aim for 50-60 characters
2. **Write compelling descriptions**: 140-160 characters is ideal
3. **Use high-contrast images**: Ensure text is readable on OG images
4. **Test across platforms**: Different platforms may display cards differently
5. **Update metadata for significant content changes**: Keep social cards current

## Technical Reference

### Meta Tag Structure

\`\`\`html
<!-- Essential Open Graph Tags -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/page" />

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://example.com/image.jpg" />
\`\`\`

### Image Dimensions

- **OG Image**: 1200×630 pixels (1.91:1 ratio)
- **Twitter Card**: 1200×628 pixels (summary_large_image)
- **LinkedIn**: 1200×627 pixels (1.91:1 ratio)

### Character Limits

| Platform | Title | Description |
|----------|-------|-------------|
| Facebook | 60-90 chars | 160 chars |
| Twitter | 70 chars | 200 chars |
| LinkedIn | 70 chars | 250 chars |
\`\`\`
