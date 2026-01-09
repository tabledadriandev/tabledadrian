export interface Recipe {
  id: string
  slug: string
  title: string
  description: string
  image: string
  category: 'appetizer' | 'main' | 'dessert' | 'healthy' | 'quick'
  dietary: string[]
  suitableFor?: string[] // Health condition IDs
  notSuitableFor?: string[] // Health condition IDs
  allergenFree?: string[] // Allergens this recipe is free from
  prepTime: number
  cookTime: number
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  ingredients: {
    item: string
    amount: number
    unit: string
    notes?: string
    substitutes?: {
      for: string // condition ID
      replacement: string
      notes: string
    }[]
  }[]
  instructions: {
    step: number
    text: string
    duration?: number
    tip?: string
  }[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    glycemicIndex?: number
  }
  chefNotes?: string
  createdAt: string
}

export const recipes: Recipe[] = [
  {
    id: '1',
    slug: 'pan-seared-duck-breast',
    title: 'Pan-Seared Duck Breast with Cherry Glaze',
    description: 'A luxurious main course featuring perfectly seared duck breast with a rich cherry reduction.',
    image: '/images/duck-breast.jpg',
    category: 'main',
    dietary: [],
    suitableFor: ['weight-loss', 'muscle-gain'],
    notSuitableFor: ['vegan', 'vegetarian', 'pescatarian'],
    allergenFree: ['gluten-free', 'nut-free'],
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { item: 'Duck breast', amount: 4, unit: 'pieces' },
      { item: 'Fresh cherries', amount: 200, unit: 'g' },
      { item: 'Red wine', amount: 100, unit: 'ml' },
      { item: 'Shallots', amount: 2, unit: 'pieces' },
      { item: 'Butter', amount: 30, unit: 'g' },
      { item: 'Thyme', amount: 4, unit: 'sprigs' },
    ],
    instructions: [
      { step: 1, text: 'Score the duck skin in a crisscross pattern, being careful not to cut into the meat.' },
      { step: 2, text: 'Season both sides with salt and pepper. Place skin-side down in a cold pan.' },
      { step: 3, text: 'Cook over medium heat for 8-10 minutes until skin is golden and crispy.', duration: 10 },
      { step: 4, text: 'Flip and cook for 4-5 minutes for medium-rare.', duration: 5 },
      { step: 5, text: 'Remove duck and rest. In the same pan, sauté shallots, add cherries and wine.' },
      { step: 6, text: 'Reduce by half, finish with butter and thyme. Serve over duck.' },
    ],
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 15,
      fat: 22,
      fiber: 2,
    },
    chefNotes: 'Let the duck rest for at least 5 minutes before slicing to retain juices.',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'quinoa-salad',
    title: 'Mediterranean Quinoa Salad',
    description: 'A healthy, vibrant salad packed with fresh vegetables and herbs.',
    image: '/images/quinoa-salad.jpg',
    category: 'healthy',
    dietary: ['vegetarian', 'gluten-free', 'vegan'],
    suitableFor: ['vegan', 'vegetarian', 'weight-loss', 'anti-aging', 'diabetes-type2', 'hypertension', 'celiac', 'gluten-sensitivity'],
    allergenFree: ['gluten-free', 'nut-free', 'dairy-free'],
    prepTime: 20,
    cookTime: 15,
    servings: 6,
    difficulty: 'easy',
    ingredients: [
      { item: 'Quinoa', amount: 200, unit: 'g' },
      { item: 'Cherry tomatoes', amount: 300, unit: 'g' },
      { item: 'Cucumber', amount: 1, unit: 'piece' },
      { item: 'Red onion', amount: 1, unit: 'piece' },
      { item: 'Feta cheese', amount: 150, unit: 'g', notes: 'optional for vegan' },
      { item: 'Olive oil', amount: 60, unit: 'ml' },
      { item: 'Lemon juice', amount: 30, unit: 'ml' },
      { item: 'Fresh basil', amount: 20, unit: 'g' },
    ],
    instructions: [
      { step: 1, text: 'Rinse quinoa thoroughly and cook according to package instructions.', duration: 15 },
      { step: 2, text: 'Let quinoa cool completely. Dice cucumber and red onion.' },
      { step: 3, text: 'Halve cherry tomatoes. Crumble feta if using.' },
      { step: 4, text: 'Whisk together olive oil, lemon juice, salt, and pepper.' },
      { step: 5, text: 'Combine all ingredients in a large bowl. Toss with dressing.' },
      { step: 6, text: 'Garnish with fresh basil leaves before serving.' },
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 35,
      fat: 12,
      fiber: 4,
    },
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    slug: 'chocolate-souffle',
    title: 'Dark Chocolate Soufflé',
    description: 'An elegant dessert that rises to perfection with a rich, molten center.',
    image: '/images/souffle.jpg',
    category: 'dessert',
    dietary: ['vegetarian'],
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: 'hard',
    ingredients: [
      { item: 'Dark chocolate', amount: 150, unit: 'g' },
      { item: 'Butter', amount: 40, unit: 'g' },
      { item: 'Eggs', amount: 4, unit: 'pieces' },
      { item: 'Sugar', amount: 60, unit: 'g' },
      { item: 'Flour', amount: 20, unit: 'g' },
      { item: 'Cocoa powder', amount: 10, unit: 'g' },
    ],
    instructions: [
      { step: 1, text: 'Melt chocolate and butter in a double boiler. Let cool slightly.' },
      { step: 2, text: 'Separate eggs. Whisk yolks with half the sugar until pale.' },
      { step: 3, text: 'Fold chocolate into yolks. Beat whites with remaining sugar to stiff peaks.' },
      { step: 4, text: 'Gently fold whites into chocolate mixture in three additions.' },
      { step: 5, text: 'Fill buttered and sugared ramekins 3/4 full.', tip: 'Run thumb around rim for clean rise' },
      { step: 6, text: 'Bake at 200°C for 12-14 minutes until risen. Serve immediately.', duration: 14 },
    ],
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 28,
      fat: 20,
      sugar: 22,
    },
    chefNotes: 'Timing is crucial - serve immediately as soufflés collapse quickly.',
    createdAt: '2024-01-25',
  },
]
