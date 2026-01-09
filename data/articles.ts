export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  readTime: number
  publishedAt: string
  tags: string[]
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'art-of-plating',
    title: 'The Art of Plating: Creating Visual Masterpieces',
    excerpt: 'Discover how professional chefs transform simple ingredients into stunning visual presentations that elevate the dining experience.',
    content: `
# The Art of Plating: Creating Visual Masterpieces

Plating is more than just arranging food on a plate—it's an art form that engages all the senses. As a private chef, I've learned that presentation can make or break a dining experience.

## The Foundation: Color and Contrast

The first rule of plating is understanding color theory. A well-plated dish should have a harmonious color palette that creates visual interest. Think of your plate as a canvas, and each ingredient as a brushstroke.

### Key Principles:

1. **Odd Numbers**: Grouping elements in odd numbers (3, 5, 7) creates visual balance
2. **Height and Depth**: Build upward, not just flat
3. **Negative Space**: Let the plate breathe—don't overcrowd
4. **Sauce as Art**: Use squeeze bottles and spoons to create elegant sauce designs

## Modern Techniques

Contemporary plating often incorporates:
- **Deconstructed presentations** that tell a story
- **Molecular gastronomy** elements for texture contrast
- **Garden-to-plate** aesthetics with edible flowers and microgreens

Remember, the goal is to create anticipation before the first bite. When guests see a beautifully plated dish, their expectations rise, and the flavors seem to taste even better.

*Chef Adrian*
    `,
    image: '/images/plating.jpg',
    category: 'Cooking Techniques',
    author: {
      name: 'Chef Adrian',
      avatar: '/images/chef-avatar.jpg',
      bio: '15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition.',
    },
    readTime: 5,
    publishedAt: '2024-01-10',
    tags: ['plating', 'technique', 'presentation'],
  },
  {
    id: '2',
    slug: 'nutrition-wellness',
    title: 'Nutrition and Wellness: A Chef\'s Perspective',
    excerpt: 'How fine dining can be both indulgent and nourishing, balancing flavor with health.',
    content: `
# Nutrition and Wellness: A Chef's Perspective

As a chef trained in both culinary arts and nutrition, I believe that exceptional dining should never compromise on health. Every dish I create considers both flavor and nutritional value.

## The Balance

Fine dining doesn't have to mean heavy, calorie-laden meals. Modern techniques allow us to create dishes that are:
- **Nutrient-dense** without sacrificing taste
- **Lower in processed ingredients** while maintaining complexity
- **Mindful of dietary needs** without compromising the experience

## Key Strategies

1. **Whole Ingredients**: Start with the best quality, unprocessed ingredients
2. **Cooking Methods**: Steaming, roasting, and sous-vide preserve nutrients
3. **Portion Control**: Elegant presentation with appropriate serving sizes
4. **Plant-Forward**: Incorporate more vegetables as the star, not just sides

## The Result

When done right, guests leave feeling satisfied, energized, and nourished—not heavy or sluggish. That's the true mark of exceptional private chef service.

*Chef Adrian*
    `,
    image: '/images/nutrition.jpg',
    category: 'Nutrition & Health',
    author: {
      name: 'Chef Adrian',
      avatar: '/images/chef-avatar.jpg',
      bio: '15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition.',
    },
    readTime: 4,
    publishedAt: '2024-01-15',
    tags: ['nutrition', 'wellness', 'health'],
  },
]
