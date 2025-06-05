# Social Media Sharing

## Overview

The Red Hanky Popper Zine includes simple social media sharing functionality that allows users to share the zine on various platforms.

## Features

- **Static Social Media Card**: A custom SVG image used for all social shares
- **Share Button**: Easy access to sharing on Twitter, Facebook, and LinkedIn
- **URL Copying**: One-click URL copying for sharing via other means
- **Basic Open Graph Tags**: Standard metadata for social media platforms

## Implementation

### Social Media Card

The project uses a static SVG image located at `/public/images/social-card.png` for all social media shares. This image includes:

- Project title
- Tagline
- Author information
- Visual styling consistent with the zine aesthetic

### Open Graph Tags

Basic Open Graph and Twitter Card meta tags are included in the layout:

\`\`\`html
<meta property="og:title" content="Red Hanky Popper Zine - Bottom Epistemology" />
<meta property="og:description" content="A Single Page Application in Bottom Epistemology..." />
<meta property="og:image" content="/images/social-card.png" />
<meta name="twitter:card" content="summary_large_image" />
<!-- Additional tags... -->
\`\`\`

### Share Button

A floating share button in the bottom-left corner provides access to:

- Twitter sharing
- Facebook sharing
- LinkedIn sharing
- URL copying with confirmation

## Usage

1. Click the share button (bottom-left corner)
2. Select the desired platform
3. Complete the sharing process on the selected platform

## Customization

### Changing the Social Card Image

To update the social card image:

1. Edit the SVG file at `/public/images/social-card.png`
2. Ensure dimensions remain 1200×630 pixels for optimal display

### Modifying Share Text

To change the default share text:

1. Edit the `handleShare` function in `components/social/SimpleShareButton.tsx`
2. Update the text parameter in the Twitter share URL

## Testing

Test your social cards using these validation tools:

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
\`\`\`
