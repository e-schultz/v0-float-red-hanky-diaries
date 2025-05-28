# Content Management Guide

## Content Structure

The Red Hanky Popper Zine uses a structured content system that separates presentation from data, allowing for easy content updates without code changes.

## Content Types

### Page Structure
\`\`\`typescript
interface ZinePage {
  id: number
  title: string
  subtitle: string
  content: {
    sections: ContentSection[]
  }
}
\`\`\`

### Available Section Types

#### 1. Header Sections
\`\`\`typescript
{
  type: "header",
  data: {
    title: "Section Title",
    sigil: "{∿}",           // Optional symbol
    className: "shimmer-text" // Optional CSS class
  }
}
\`\`\`

#### 2. Manifesto Text
\`\`\`typescript
{
  type: "manifesto",
  data: {
    paragraphs: [
      "Text with <span class=\"highlight\">highlighted content</span>",
      "Additional paragraphs..."
    ]
  }
}
\`\`\`

#### 3. Quote Blocks
\`\`\`typescript
{
  type: "quote",
  data: {
    text: "Quote content here",
    className: "glitch-text" // Optional animation class
  }
}
\`\`\`

#### 4. Card Grids
\`\`\`typescript
{
  type: "grid",
  data: {
    cards: [
      {
        title: "Card Title",
        content: "Card description content"
      }
    ]
  }
}
\`\`\`

#### 5. Code Blocks
\`\`\`typescript
{
  type: "code",
  data: {
    content: "// Code content here\nconst example = true;"
  }
}
\`\`\`

#### 6. Ritual Instructions
\`\`\`typescript
{
  type: "ritual",
  data: {
    title: "Ritual Title",
    content: "Ritual description with <span class=\"highlight\">formatting</span>"
  }
}
\`\`\`

#### 7. Methodology Lists
\`\`\`typescript
{
  type: "list",
  data: {
    items: [
      {
        title: "Item Title",
        description: "Item description"
      }
    ]
  }
}
\`\`\`

## Content Editing

### Location
Content is stored in \`data/zine-content.ts\` as a TypeScript array.

### Adding New Pages
1. Add a new page object to the \`ZINE_CONTENT\` array
2. Update \`ZINE_CONFIG.totalPages\` in \`lib/zine-config.ts\`
3. Ensure the page ID is sequential

### Modifying Existing Content
1. Locate the page in \`data/zine-content.ts\`
2. Edit the relevant section data
3. HTML content is supported in text fields
4. Use CSS classes for styling (see Style Guide)

## Styling Content

### Available CSS Classes

#### Text Styling
- \`.highlight\`: Gradient text effect (red to pink)
- \`.shimmer-text\`: Animated shimmer effect
- \`.glitch-text\`: Glitch animation effect

#### Layout Classes
- \`.ethics-grid\`: Responsive card grid layout
- \`.quote-block\`: Styled quote formatting
- \`.code-block\`: Monospace code formatting

#### Animation Classes
- \`.animate-shimmer\`: Shimmer animation
- \`.animate-glitch\`: Glitch animation
- \`.animate-sigil-pulse\`: Pulsing effect for symbols

### Custom Styling
Add new styles to the appropriate CSS module in \`styles/components/\`.

## Content Guidelines

### Writing Style
- **Philosophical tone**: Academic yet accessible
- **Experimental language**: Creative and unconventional phrasing
- **Technical integration**: Blend theory with digital medium

### HTML Usage
- **Safe HTML**: Only use trusted HTML in content
- **Semantic markup**: Use appropriate HTML elements
- **Accessibility**: Include alt text and proper structure

### Performance Considerations
- **Content length**: Balance depth with loading performance
- **Image usage**: Optimize any embedded media
- **Animation moderation**: Don't overuse animated effects

## Content Validation

### Type Safety
The content system includes TypeScript validation to ensure:
- Correct section types
- Required data fields
- Proper nesting structure

### Runtime Validation
Consider adding runtime validation for:
- HTML content sanitization
- Required field checking
- Content length limits

## Future Content Features

### Planned Enhancements
- **Dynamic content loading**: External content sources
- **User-generated content**: Community contributions
- **Content versioning**: Track changes over time
- **Multilingual support**: Translation system
- **Rich media**: Video and audio integration

### Content Management System
Future development may include:
- **Admin interface**: GUI for content editing
- **Preview system**: Live content preview
- **Workflow management**: Editorial approval process
- **Analytics integration**: Content performance tracking
\`\`\`
