'use client'

import { useState, useEffect } from 'react'
import { Search, Loader2, Leaf, Flame, Zap, Plus } from 'lucide-react'
import { FoodLog } from '@/lib/stores/nutrition-store'

// Comprehensive Longevity Food Database with Biohacking Metrics
// Data sourced from USDA, scientific literature on longevity nutrition
export interface LongevityFood {
  id: string
  name: string
  category: 'protein' | 'healthy-fat' | 'complex-carb' | 'superfood' | 'vegetable' | 'fruit' | 'fermented' | 'beverage'
  
  // Core Macros (per 100g unless noted)
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  
  // Longevity Metrics
  glycemicIndex: number        // 0-100
  inflammationScore: number    // -10 (anti-inflammatory) to +10 (pro-inflammatory)
  antioxidantScore: number     // 0-100 scale based on ORAC
  
  // Key Micronutrients
  omega3: number               // mg per 100g
  omega6: number               // mg per 100g
  vitaminD: number             // IU
  vitaminB12: number           // mcg
  magnesium: number            // mg
  zinc: number                 // mg
  iron: number                 // mg
  selenium: number             // mcg
  potassium: number            // mg
  
  // Longevity Benefits
  longevityBenefits: string[]
  bestTimeToEat: 'morning' | 'midday' | 'evening' | 'anytime'
  servingSize: string
}

// COMPREHENSIVE LONGEVITY FOOD DATABASE - 80+ ITEMS
const LONGEVITY_FOODS: LongevityFood[] = [
  // ═══════════════════════════════════════════════════════════════
  // PROTEINS (Longevity-Optimized)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'wild-salmon',
    name: 'Wild-Caught Salmon',
    category: 'protein',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0,
    sodium: 59,
    glycemicIndex: 0,
    inflammationScore: -8,
    antioxidantScore: 65,
    omega3: 2260,
    omega6: 172,
    vitaminD: 526,
    vitaminB12: 3.2,
    magnesium: 27,
    zinc: 0.4,
    iron: 0.3,
    selenium: 36.5,
    potassium: 363,
    longevityBenefits: ['omega-3', 'astaxanthin', 'brain-health', 'anti-inflammatory'],
    bestTimeToEat: 'midday',
    servingSize: '150g fillet'
  },
  {
    id: 'sardines',
    name: 'Sardines (Wild)',
    category: 'protein',
    calories: 208,
    protein: 25,
    carbs: 0,
    fat: 11,
    fiber: 0,
    sugar: 0,
    sodium: 307,
    glycemicIndex: 0,
    inflammationScore: -9,
    antioxidantScore: 55,
    omega3: 1480,
    omega6: 110,
    vitaminD: 272,
    vitaminB12: 8.9,
    magnesium: 39,
    zinc: 1.3,
    iron: 2.9,
    selenium: 52.7,
    potassium: 397,
    longevityBenefits: ['omega-3', 'vitamin-d', 'calcium', 'coq10'],
    bestTimeToEat: 'midday',
    servingSize: '100g can'
  },
  {
    id: 'pasture-eggs',
    name: 'Pasture-Raised Eggs',
    category: 'protein',
    calories: 147,
    protein: 13,
    carbs: 0.7,
    fat: 10,
    fiber: 0,
    sugar: 0.4,
    sodium: 142,
    glycemicIndex: 0,
    inflammationScore: -2,
    antioxidantScore: 35,
    omega3: 225,
    omega6: 594,
    vitaminD: 87,
    vitaminB12: 1.1,
    magnesium: 12,
    zinc: 1.3,
    iron: 1.8,
    selenium: 30.8,
    potassium: 138,
    longevityBenefits: ['choline', 'lutein', 'complete-protein', 'brain-health'],
    bestTimeToEat: 'morning',
    servingSize: '2 large eggs'
  },
  {
    id: 'beef-liver',
    name: 'Grass-Fed Beef Liver',
    category: 'protein',
    calories: 135,
    protein: 20,
    carbs: 3.9,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 69,
    glycemicIndex: 0,
    inflammationScore: -3,
    antioxidantScore: 70,
    omega3: 84,
    omega6: 261,
    vitaminD: 49,
    vitaminB12: 59.3,
    magnesium: 18,
    zinc: 4,
    iron: 4.9,
    selenium: 39.7,
    potassium: 313,
    longevityBenefits: ['b12', 'iron', 'coq10', 'retinol', 'copper'],
    bestTimeToEat: 'midday',
    servingSize: '85g serving'
  },
  {
    id: 'wild-mackerel',
    name: 'Wild Mackerel',
    category: 'protein',
    calories: 205,
    protein: 19,
    carbs: 0,
    fat: 14,
    fiber: 0,
    sugar: 0,
    sodium: 90,
    glycemicIndex: 0,
    inflammationScore: -8,
    antioxidantScore: 50,
    omega3: 2670,
    omega6: 219,
    vitaminD: 643,
    vitaminB12: 8.7,
    magnesium: 76,
    zinc: 0.6,
    iron: 1.6,
    selenium: 44.1,
    potassium: 314,
    longevityBenefits: ['omega-3', 'vitamin-d', 'selenium', 'anti-inflammatory'],
    bestTimeToEat: 'midday',
    servingSize: '150g fillet'
  },
  {
    id: 'chicken-breast',
    name: 'Organic Chicken Breast',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    glycemicIndex: 0,
    inflammationScore: -1,
    antioxidantScore: 15,
    omega3: 70,
    omega6: 610,
    vitaminD: 5,
    vitaminB12: 0.3,
    magnesium: 29,
    zinc: 1,
    iron: 1,
    selenium: 27.6,
    potassium: 256,
    longevityBenefits: ['lean-protein', 'selenium', 'b-vitamins'],
    bestTimeToEat: 'midday',
    servingSize: '150g breast'
  },
  {
    id: 'grass-fed-beef',
    name: 'Grass-Fed Beef (Sirloin)',
    category: 'protein',
    calories: 217,
    protein: 26,
    carbs: 0,
    fat: 12,
    fiber: 0,
    sugar: 0,
    sodium: 54,
    glycemicIndex: 0,
    inflammationScore: 1,
    antioxidantScore: 20,
    omega3: 80,
    omega6: 270,
    vitaminD: 7,
    vitaminB12: 2.6,
    magnesium: 23,
    zinc: 4.5,
    iron: 2.1,
    selenium: 26,
    potassium: 342,
    longevityBenefits: ['creatine', 'carnosine', 'cla', 'zinc', 'b12'],
    bestTimeToEat: 'midday',
    servingSize: '150g steak'
  },
  {
    id: 'bone-broth',
    name: 'Bone Broth (Beef)',
    category: 'protein',
    calories: 31,
    protein: 5,
    carbs: 1.7,
    fat: 0.2,
    fiber: 0,
    sugar: 0,
    sodium: 344,
    glycemicIndex: 0,
    inflammationScore: -5,
    antioxidantScore: 25,
    omega3: 12,
    omega6: 8,
    vitaminD: 0,
    vitaminB12: 0.1,
    magnesium: 7,
    zinc: 0.5,
    iron: 0.4,
    selenium: 2,
    potassium: 180,
    longevityBenefits: ['collagen', 'glycine', 'gut-health', 'joint-support'],
    bestTimeToEat: 'morning',
    servingSize: '240ml cup'
  },

  // ═══════════════════════════════════════════════════════════════
  // HEALTHY FATS (Brain & Heart)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    category: 'healthy-fat',
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sugar: 0,
    sodium: 2,
    glycemicIndex: 0,
    inflammationScore: -9,
    antioxidantScore: 85,
    omega3: 761,
    omega6: 9763,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 0,
    zinc: 0,
    iron: 0.6,
    selenium: 0,
    potassium: 1,
    longevityBenefits: ['polyphenols', 'oleocanthal', 'heart-health', 'anti-inflammatory'],
    bestTimeToEat: 'anytime',
    servingSize: '15ml tablespoon'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'healthy-fat',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    fiber: 7,
    sugar: 0.7,
    sodium: 7,
    glycemicIndex: 15,
    inflammationScore: -6,
    antioxidantScore: 45,
    omega3: 111,
    omega6: 1689,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 29,
    zinc: 0.6,
    iron: 0.6,
    selenium: 0.4,
    potassium: 485,
    longevityBenefits: ['potassium', 'fiber', 'monounsaturated-fat', 'lutein'],
    bestTimeToEat: 'morning',
    servingSize: '100g (half avocado)'
  },
  {
    id: 'mct-oil',
    name: 'MCT Oil',
    category: 'healthy-fat',
    calories: 862,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    glycemicIndex: 0,
    inflammationScore: -3,
    antioxidantScore: 10,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 0,
    zinc: 0,
    iron: 0,
    selenium: 0,
    potassium: 0,
    longevityBenefits: ['ketones', 'brain-fuel', 'energy', 'metabolism'],
    bestTimeToEat: 'morning',
    servingSize: '15ml tablespoon'
  },
  {
    id: 'macadamia-nuts',
    name: 'Macadamia Nuts',
    category: 'healthy-fat',
    calories: 718,
    protein: 8,
    carbs: 14,
    fat: 76,
    fiber: 9,
    sugar: 5,
    sodium: 5,
    glycemicIndex: 10,
    inflammationScore: -5,
    antioxidantScore: 40,
    omega3: 206,
    omega6: 1296,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 130,
    zinc: 1.3,
    iron: 3.7,
    selenium: 3.6,
    potassium: 368,
    longevityBenefits: ['omega-7', 'magnesium', 'low-omega6-ratio'],
    bestTimeToEat: 'anytime',
    servingSize: '30g handful'
  },
  {
    id: 'walnuts',
    name: 'Walnuts',
    category: 'healthy-fat',
    calories: 654,
    protein: 15,
    carbs: 14,
    fat: 65,
    fiber: 7,
    sugar: 3,
    sodium: 2,
    glycemicIndex: 15,
    inflammationScore: -6,
    antioxidantScore: 75,
    omega3: 9080,
    omega6: 38092,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 158,
    zinc: 3.1,
    iron: 2.9,
    selenium: 4.9,
    potassium: 441,
    longevityBenefits: ['ala-omega3', 'polyphenols', 'brain-health', 'melatonin'],
    bestTimeToEat: 'evening',
    servingSize: '30g handful'
  },
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'healthy-fat',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    fiber: 12,
    sugar: 4,
    sodium: 1,
    glycemicIndex: 15,
    inflammationScore: -4,
    antioxidantScore: 45,
    omega3: 6,
    omega6: 12066,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 270,
    zinc: 3.1,
    iron: 3.7,
    selenium: 4.1,
    potassium: 733,
    longevityBenefits: ['vitamin-e', 'magnesium', 'prebiotic-fiber'],
    bestTimeToEat: 'anytime',
    servingSize: '30g handful'
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    category: 'healthy-fat',
    calories: 486,
    protein: 17,
    carbs: 42,
    fat: 31,
    fiber: 34,
    sugar: 0,
    sodium: 16,
    glycemicIndex: 1,
    inflammationScore: -7,
    antioxidantScore: 80,
    omega3: 17830,
    omega6: 5785,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 335,
    zinc: 4.6,
    iron: 7.7,
    selenium: 55.2,
    potassium: 407,
    longevityBenefits: ['omega-3', 'fiber', 'antioxidants', 'blood-sugar'],
    bestTimeToEat: 'morning',
    servingSize: '28g (2 tbsp)'
  },
  {
    id: 'flaxseeds',
    name: 'Flaxseeds (Ground)',
    category: 'healthy-fat',
    calories: 534,
    protein: 18,
    carbs: 29,
    fat: 42,
    fiber: 27,
    sugar: 2,
    sodium: 30,
    glycemicIndex: 0,
    inflammationScore: -7,
    antioxidantScore: 70,
    omega3: 22813,
    omega6: 5911,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 392,
    zinc: 4.3,
    iron: 5.7,
    selenium: 25.4,
    potassium: 813,
    longevityBenefits: ['lignans', 'ala-omega3', 'fiber', 'hormone-balance'],
    bestTimeToEat: 'morning',
    servingSize: '15g tablespoon'
  },

  // ═══════════════════════════════════════════════════════════════
  // COMPLEX CARBS (Low Glycemic)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'complex-carb',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    fiber: 3,
    sugar: 4.2,
    sodium: 55,
    glycemicIndex: 63,
    inflammationScore: -4,
    antioxidantScore: 60,
    omega3: 0,
    omega6: 8,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 25,
    zinc: 0.3,
    iron: 0.6,
    selenium: 0.6,
    potassium: 337,
    longevityBenefits: ['beta-carotene', 'fiber', 'vitamin-a', 'gut-health'],
    bestTimeToEat: 'midday',
    servingSize: '150g medium'
  },
  {
    id: 'quinoa',
    name: 'Quinoa (Cooked)',
    category: 'complex-carb',
    calories: 120,
    protein: 4.4,
    carbs: 21,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    sodium: 7,
    glycemicIndex: 53,
    inflammationScore: -3,
    antioxidantScore: 35,
    omega3: 52,
    omega6: 970,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 64,
    zinc: 1.1,
    iron: 1.5,
    selenium: 2.8,
    potassium: 172,
    longevityBenefits: ['complete-protein', 'magnesium', 'quercetin'],
    bestTimeToEat: 'midday',
    servingSize: '185g cooked cup'
  },
  {
    id: 'steel-cut-oats',
    name: 'Steel-Cut Oats',
    category: 'complex-carb',
    calories: 379,
    protein: 13,
    carbs: 68,
    fat: 6.5,
    fiber: 10,
    sugar: 1,
    sodium: 6,
    glycemicIndex: 42,
    inflammationScore: -4,
    antioxidantScore: 45,
    omega3: 111,
    omega6: 2424,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 138,
    zinc: 3.6,
    iron: 4.2,
    selenium: 28.9,
    potassium: 362,
    longevityBenefits: ['beta-glucan', 'fiber', 'blood-sugar', 'cholesterol'],
    bestTimeToEat: 'morning',
    servingSize: '40g dry'
  },
  {
    id: 'black-rice',
    name: 'Black Rice (Cooked)',
    category: 'complex-carb',
    calories: 130,
    protein: 3,
    carbs: 28,
    fat: 1,
    fiber: 2,
    sugar: 0,
    sodium: 1,
    glycemicIndex: 42,
    inflammationScore: -5,
    antioxidantScore: 85,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 44,
    zinc: 1.2,
    iron: 1.8,
    selenium: 11,
    potassium: 154,
    longevityBenefits: ['anthocyanins', 'antioxidants', 'fiber'],
    bestTimeToEat: 'midday',
    servingSize: '195g cooked cup'
  },
  {
    id: 'lentils',
    name: 'Lentils (Cooked)',
    category: 'complex-carb',
    calories: 116,
    protein: 9,
    carbs: 20,
    fat: 0.4,
    fiber: 8,
    sugar: 2,
    sodium: 2,
    glycemicIndex: 32,
    inflammationScore: -4,
    antioxidantScore: 40,
    omega3: 37,
    omega6: 271,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 36,
    zinc: 1.3,
    iron: 3.3,
    selenium: 2.8,
    potassium: 369,
    longevityBenefits: ['resistant-starch', 'fiber', 'folate', 'plant-protein'],
    bestTimeToEat: 'midday',
    servingSize: '198g cooked cup'
  },
  {
    id: 'chickpeas',
    name: 'Chickpeas (Cooked)',
    category: 'complex-carb',
    calories: 164,
    protein: 9,
    carbs: 27,
    fat: 2.6,
    fiber: 8,
    sugar: 5,
    sodium: 7,
    glycemicIndex: 28,
    inflammationScore: -3,
    antioxidantScore: 35,
    omega3: 43,
    omega6: 1113,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 48,
    zinc: 1.5,
    iron: 2.9,
    selenium: 3.7,
    potassium: 291,
    longevityBenefits: ['fiber', 'folate', 'plant-protein', 'blood-sugar'],
    bestTimeToEat: 'midday',
    servingSize: '164g cooked cup'
  },

  // ═══════════════════════════════════════════════════════════════
  // SUPERFOODS (Anti-Aging)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'blueberries',
    name: 'Blueberries',
    category: 'superfood',
    calories: 57,
    protein: 0.7,
    carbs: 14,
    fat: 0.3,
    fiber: 2.4,
    sugar: 10,
    sodium: 1,
    glycemicIndex: 53,
    inflammationScore: -8,
    antioxidantScore: 95,
    omega3: 58,
    omega6: 88,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 6,
    zinc: 0.2,
    iron: 0.3,
    selenium: 0.1,
    potassium: 77,
    longevityBenefits: ['pterostilbene', 'anthocyanins', 'brain-health', 'dna-repair'],
    bestTimeToEat: 'morning',
    servingSize: '150g cup'
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate Seeds',
    category: 'superfood',
    calories: 83,
    protein: 1.7,
    carbs: 19,
    fat: 1.2,
    fiber: 4,
    sugar: 14,
    sodium: 3,
    glycemicIndex: 35,
    inflammationScore: -7,
    antioxidantScore: 90,
    omega3: 35,
    omega6: 79,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 12,
    zinc: 0.4,
    iron: 0.3,
    selenium: 0.5,
    potassium: 236,
    longevityBenefits: ['urolithin-a', 'punicalagins', 'mitochondrial', 'anti-aging'],
    bestTimeToEat: 'morning',
    servingSize: '174g cup'
  },
  {
    id: 'matcha',
    name: 'Matcha Green Tea',
    category: 'superfood',
    calories: 3,
    protein: 0.3,
    carbs: 0.4,
    fat: 0,
    fiber: 0.4,
    sugar: 0,
    sodium: 0,
    glycemicIndex: 0,
    inflammationScore: -9,
    antioxidantScore: 98,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 2,
    zinc: 0,
    iron: 0.2,
    selenium: 0,
    potassium: 27,
    longevityBenefits: ['egcg', 'l-theanine', 'autophagy', 'brain-health'],
    bestTimeToEat: 'morning',
    servingSize: '2g powder'
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate (85%+)',
    category: 'superfood',
    calories: 599,
    protein: 8,
    carbs: 46,
    fat: 43,
    fiber: 11,
    sugar: 24,
    sodium: 20,
    glycemicIndex: 23,
    inflammationScore: -5,
    antioxidantScore: 85,
    omega3: 27,
    omega6: 378,
    vitaminD: 0,
    vitaminB12: 0.3,
    magnesium: 228,
    zinc: 3.3,
    iron: 11.9,
    selenium: 6.8,
    potassium: 715,
    longevityBenefits: ['flavanols', 'magnesium', 'mood', 'cardiovascular'],
    bestTimeToEat: 'evening',
    servingSize: '30g square'
  },
  {
    id: 'turmeric',
    name: 'Turmeric (Ground)',
    category: 'superfood',
    calories: 354,
    protein: 8,
    carbs: 65,
    fat: 10,
    fiber: 21,
    sugar: 3,
    sodium: 38,
    glycemicIndex: 0,
    inflammationScore: -10,
    antioxidantScore: 95,
    omega3: 45,
    omega6: 890,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 193,
    zinc: 4.3,
    iron: 41.4,
    selenium: 4.5,
    potassium: 2525,
    longevityBenefits: ['curcumin', 'anti-inflammatory', 'brain-health', 'joint-health'],
    bestTimeToEat: 'anytime',
    servingSize: '3g teaspoon'
  },
  {
    id: 'ginger',
    name: 'Fresh Ginger',
    category: 'superfood',
    calories: 80,
    protein: 1.8,
    carbs: 18,
    fat: 0.8,
    fiber: 2,
    sugar: 1.7,
    sodium: 13,
    glycemicIndex: 15,
    inflammationScore: -8,
    antioxidantScore: 70,
    omega3: 34,
    omega6: 119,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 43,
    zinc: 0.3,
    iron: 0.6,
    selenium: 0.7,
    potassium: 415,
    longevityBenefits: ['gingerols', 'anti-inflammatory', 'digestion', 'nausea'],
    bestTimeToEat: 'morning',
    servingSize: '10g slice'
  },
  {
    id: 'spirulina',
    name: 'Spirulina',
    category: 'superfood',
    calories: 290,
    protein: 57,
    carbs: 24,
    fat: 8,
    fiber: 4,
    sugar: 3,
    sodium: 1048,
    glycemicIndex: 0,
    inflammationScore: -7,
    antioxidantScore: 90,
    omega3: 823,
    omega6: 1254,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 195,
    zinc: 2,
    iron: 28.5,
    selenium: 7.2,
    potassium: 1363,
    longevityBenefits: ['phycocyanin', 'chlorophyll', 'detox', 'immune'],
    bestTimeToEat: 'morning',
    servingSize: '7g tablespoon'
  },
  {
    id: 'lions-mane',
    name: "Lion's Mane Mushroom",
    category: 'superfood',
    calories: 35,
    protein: 2.5,
    carbs: 7,
    fat: 0.3,
    fiber: 3,
    sugar: 0,
    sodium: 1,
    glycemicIndex: 0,
    inflammationScore: -6,
    antioxidantScore: 55,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 12,
    zinc: 0.7,
    iron: 0.5,
    selenium: 2.1,
    potassium: 443,
    longevityBenefits: ['ngf', 'bdnf', 'neurogenesis', 'cognitive'],
    bestTimeToEat: 'morning',
    servingSize: '100g fresh'
  },
  {
    id: 'reishi',
    name: 'Reishi Mushroom (Powder)',
    category: 'superfood',
    calories: 25,
    protein: 1.5,
    carbs: 5,
    fat: 0.2,
    fiber: 2,
    sugar: 0,
    sodium: 5,
    glycemicIndex: 0,
    inflammationScore: -7,
    antioxidantScore: 65,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 8,
    zinc: 0.5,
    iron: 0.4,
    selenium: 1.5,
    potassium: 150,
    longevityBenefits: ['beta-glucans', 'triterpenes', 'immune', 'sleep'],
    bestTimeToEat: 'evening',
    servingSize: '3g powder'
  },
  {
    id: 'cacao-nibs',
    name: 'Raw Cacao Nibs',
    category: 'superfood',
    calories: 443,
    protein: 14,
    carbs: 49,
    fat: 43,
    fiber: 33,
    sugar: 0,
    sodium: 21,
    glycemicIndex: 0,
    inflammationScore: -6,
    antioxidantScore: 95,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 499,
    zinc: 6.8,
    iron: 13.9,
    selenium: 14.3,
    potassium: 1524,
    longevityBenefits: ['theobromine', 'magnesium', 'flavanols', 'mood'],
    bestTimeToEat: 'morning',
    servingSize: '28g ounce'
  },

  // ═══════════════════════════════════════════════════════════════
  // VEGETABLES (Nutrient Dense)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'broccoli-sprouts',
    name: 'Broccoli Sprouts',
    category: 'vegetable',
    calories: 35,
    protein: 2,
    carbs: 5.6,
    fat: 0.5,
    fiber: 2.3,
    sugar: 0.4,
    sodium: 6,
    glycemicIndex: 15,
    inflammationScore: -9,
    antioxidantScore: 92,
    omega3: 25,
    omega6: 35,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 15,
    zinc: 0.3,
    iron: 0.5,
    selenium: 0.6,
    potassium: 280,
    longevityBenefits: ['sulforaphane', 'nrf2-activation', 'detox', 'cancer-prevention'],
    bestTimeToEat: 'morning',
    servingSize: '100g cup'
  },
  {
    id: 'spinach',
    name: 'Spinach (Raw)',
    category: 'vegetable',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    sodium: 79,
    glycemicIndex: 15,
    inflammationScore: -6,
    antioxidantScore: 75,
    omega3: 138,
    omega6: 26,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 79,
    zinc: 0.5,
    iron: 2.7,
    selenium: 1,
    potassium: 558,
    longevityBenefits: ['nitrates', 'folate', 'lutein', 'blood-pressure'],
    bestTimeToEat: 'midday',
    servingSize: '100g'
  },
  {
    id: 'kale',
    name: 'Kale',
    category: 'vegetable',
    calories: 49,
    protein: 4.3,
    carbs: 9,
    fat: 0.9,
    fiber: 3.6,
    sugar: 2.3,
    sodium: 38,
    glycemicIndex: 15,
    inflammationScore: -7,
    antioxidantScore: 80,
    omega3: 180,
    omega6: 138,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 47,
    zinc: 0.6,
    iron: 1.5,
    selenium: 0.9,
    potassium: 491,
    longevityBenefits: ['vitamin-k', 'lutein', 'sulforaphane', 'bone-health'],
    bestTimeToEat: 'midday',
    servingSize: '100g'
  },
  {
    id: 'arugula',
    name: 'Arugula',
    category: 'vegetable',
    calories: 25,
    protein: 2.6,
    carbs: 3.7,
    fat: 0.7,
    fiber: 1.6,
    sugar: 2,
    sodium: 27,
    glycemicIndex: 15,
    inflammationScore: -5,
    antioxidantScore: 60,
    omega3: 170,
    omega6: 130,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 47,
    zinc: 0.5,
    iron: 1.5,
    selenium: 0.3,
    potassium: 369,
    longevityBenefits: ['nitrates', 'glucosinolates', 'cardiovascular'],
    bestTimeToEat: 'midday',
    servingSize: '100g'
  },
  {
    id: 'red-cabbage',
    name: 'Red Cabbage',
    category: 'vegetable',
    calories: 31,
    protein: 1.4,
    carbs: 7,
    fat: 0.2,
    fiber: 2.1,
    sugar: 4,
    sodium: 27,
    glycemicIndex: 15,
    inflammationScore: -6,
    antioxidantScore: 70,
    omega3: 40,
    omega6: 17,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 16,
    zinc: 0.2,
    iron: 0.8,
    selenium: 0.6,
    potassium: 243,
    longevityBenefits: ['anthocyanins', 'vitamin-c', 'gut-health'],
    bestTimeToEat: 'midday',
    servingSize: '100g'
  },
  {
    id: 'garlic',
    name: 'Garlic',
    category: 'vegetable',
    calories: 149,
    protein: 6.4,
    carbs: 33,
    fat: 0.5,
    fiber: 2.1,
    sugar: 1,
    sodium: 17,
    glycemicIndex: 30,
    inflammationScore: -8,
    antioxidantScore: 75,
    omega3: 20,
    omega6: 107,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 25,
    zinc: 1.2,
    iron: 1.7,
    selenium: 14.2,
    potassium: 401,
    longevityBenefits: ['allicin', 'immune', 'cardiovascular', 'anti-microbial'],
    bestTimeToEat: 'anytime',
    servingSize: '3g clove'
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetable',
    calories: 40,
    protein: 1.1,
    carbs: 9,
    fat: 0.1,
    fiber: 1.7,
    sugar: 4.2,
    sodium: 4,
    glycemicIndex: 15,
    inflammationScore: -5,
    antioxidantScore: 55,
    omega3: 4,
    omega6: 13,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 10,
    zinc: 0.2,
    iron: 0.2,
    selenium: 0.5,
    potassium: 146,
    longevityBenefits: ['quercetin', 'prebiotic', 'gut-health'],
    bestTimeToEat: 'anytime',
    servingSize: '100g medium'
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'vegetable',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.7,
    sodium: 33,
    glycemicIndex: 15,
    inflammationScore: -7,
    antioxidantScore: 70,
    omega3: 21,
    omega6: 17,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 21,
    zinc: 0.4,
    iron: 0.7,
    selenium: 2.5,
    potassium: 316,
    longevityBenefits: ['sulforaphane', 'dim', 'i3c', 'detox'],
    bestTimeToEat: 'midday',
    servingSize: '150g cup'
  },
  {
    id: 'asparagus',
    name: 'Asparagus',
    category: 'vegetable',
    calories: 20,
    protein: 2.2,
    carbs: 3.9,
    fat: 0.1,
    fiber: 2.1,
    sugar: 1.9,
    sodium: 2,
    glycemicIndex: 15,
    inflammationScore: -5,
    antioxidantScore: 50,
    omega3: 7,
    omega6: 8,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 14,
    zinc: 0.5,
    iron: 2.1,
    selenium: 2.3,
    potassium: 202,
    longevityBenefits: ['prebiotic', 'folate', 'glutathione'],
    bestTimeToEat: 'midday',
    servingSize: '134g cup'
  },

  // ═══════════════════════════════════════════════════════════════
  // FRUITS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'raspberries',
    name: 'Raspberries',
    category: 'fruit',
    calories: 52,
    protein: 1.2,
    carbs: 12,
    fat: 0.7,
    fiber: 6.5,
    sugar: 4.4,
    sodium: 1,
    glycemicIndex: 32,
    inflammationScore: -7,
    antioxidantScore: 85,
    omega3: 126,
    omega6: 249,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 22,
    zinc: 0.4,
    iron: 0.7,
    selenium: 0.2,
    potassium: 151,
    longevityBenefits: ['ellagic-acid', 'fiber', 'ketones', 'low-sugar'],
    bestTimeToEat: 'morning',
    servingSize: '125g cup'
  },
  {
    id: 'blackberries',
    name: 'Blackberries',
    category: 'fruit',
    calories: 43,
    protein: 1.4,
    carbs: 10,
    fat: 0.5,
    fiber: 5.3,
    sugar: 4.9,
    sodium: 1,
    glycemicIndex: 25,
    inflammationScore: -7,
    antioxidantScore: 88,
    omega3: 94,
    omega6: 186,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 20,
    zinc: 0.5,
    iron: 0.6,
    selenium: 0.4,
    potassium: 162,
    longevityBenefits: ['anthocyanins', 'vitamin-c', 'fiber', 'brain-health'],
    bestTimeToEat: 'morning',
    servingSize: '145g cup'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    category: 'fruit',
    calories: 29,
    protein: 1.1,
    carbs: 9,
    fat: 0.3,
    fiber: 2.8,
    sugar: 2.5,
    sodium: 2,
    glycemicIndex: 20,
    inflammationScore: -5,
    antioxidantScore: 55,
    omega3: 26,
    omega6: 63,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 8,
    zinc: 0.1,
    iron: 0.6,
    selenium: 0.4,
    potassium: 138,
    longevityBenefits: ['vitamin-c', 'limonene', 'alkalizing', 'digestion'],
    bestTimeToEat: 'morning',
    servingSize: '100g'
  },
  {
    id: 'grapefruit',
    name: 'Grapefruit',
    category: 'fruit',
    calories: 42,
    protein: 0.8,
    carbs: 11,
    fat: 0.1,
    fiber: 1.6,
    sugar: 7,
    sodium: 0,
    glycemicIndex: 25,
    inflammationScore: -4,
    antioxidantScore: 50,
    omega3: 22,
    omega6: 35,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 9,
    zinc: 0.1,
    iron: 0.1,
    selenium: 0.1,
    potassium: 135,
    longevityBenefits: ['naringenin', 'vitamin-c', 'metabolism', 'insulin-sensitivity'],
    bestTimeToEat: 'morning',
    servingSize: '123g half'
  },
  {
    id: 'apple',
    name: 'Apple (with skin)',
    category: 'fruit',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    sugar: 10,
    sodium: 1,
    glycemicIndex: 36,
    inflammationScore: -3,
    antioxidantScore: 45,
    omega3: 9,
    omega6: 44,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 5,
    zinc: 0,
    iron: 0.1,
    selenium: 0,
    potassium: 107,
    longevityBenefits: ['quercetin', 'pectin', 'prebiotic', 'gut-health'],
    bestTimeToEat: 'anytime',
    servingSize: '182g medium'
  },

  // ═══════════════════════════════════════════════════════════════
  // FERMENTED FOODS (Gut Health)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'kimchi',
    name: 'Kimchi',
    category: 'fermented',
    calories: 15,
    protein: 1.1,
    carbs: 2.4,
    fat: 0.5,
    fiber: 1.6,
    sugar: 1.1,
    sodium: 498,
    glycemicIndex: 15,
    inflammationScore: -6,
    antioxidantScore: 55,
    omega3: 18,
    omega6: 25,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 14,
    zinc: 0.2,
    iron: 0.5,
    selenium: 0.5,
    potassium: 151,
    longevityBenefits: ['probiotics', 'vitamin-k2', 'gut-health', 'immune'],
    bestTimeToEat: 'midday',
    servingSize: '100g'
  },
  {
    id: 'sauerkraut',
    name: 'Sauerkraut (Raw)',
    category: 'fermented',
    calories: 19,
    protein: 0.9,
    carbs: 4.3,
    fat: 0.1,
    fiber: 2.9,
    sugar: 1.8,
    sodium: 661,
    glycemicIndex: 15,
    inflammationScore: -5,
    antioxidantScore: 45,
    omega3: 12,
    omega6: 16,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 13,
    zinc: 0.2,
    iron: 1.5,
    selenium: 0.6,
    potassium: 170,
    longevityBenefits: ['probiotics', 'vitamin-c', 'gut-health'],
    bestTimeToEat: 'midday',
    servingSize: '100g'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (Full Fat)',
    category: 'fermented',
    calories: 97,
    protein: 9,
    carbs: 3.6,
    fat: 5,
    fiber: 0,
    sugar: 3.6,
    sodium: 47,
    glycemicIndex: 11,
    inflammationScore: -3,
    antioxidantScore: 20,
    omega3: 23,
    omega6: 98,
    vitaminD: 0,
    vitaminB12: 0.8,
    magnesium: 11,
    zinc: 0.5,
    iron: 0.1,
    selenium: 9.7,
    potassium: 141,
    longevityBenefits: ['probiotics', 'protein', 'calcium', 'satiety'],
    bestTimeToEat: 'morning',
    servingSize: '170g container'
  },
  {
    id: 'kefir',
    name: 'Kefir (Full Fat)',
    category: 'fermented',
    calories: 61,
    protein: 3.3,
    carbs: 4.5,
    fat: 3.5,
    fiber: 0,
    sugar: 4.5,
    sodium: 40,
    glycemicIndex: 15,
    inflammationScore: -4,
    antioxidantScore: 25,
    omega3: 34,
    omega6: 89,
    vitaminD: 40,
    vitaminB12: 0.3,
    magnesium: 12,
    zinc: 0.4,
    iron: 0.1,
    selenium: 3.6,
    potassium: 157,
    longevityBenefits: ['diverse-probiotics', 'calcium', 'vitamin-k2', 'gut-health'],
    bestTimeToEat: 'morning',
    servingSize: '240ml cup'
  },
  {
    id: 'miso',
    name: 'Miso Paste',
    category: 'fermented',
    calories: 199,
    protein: 12,
    carbs: 26,
    fat: 6,
    fiber: 5,
    sugar: 6,
    sodium: 3728,
    glycemicIndex: 25,
    inflammationScore: -4,
    antioxidantScore: 40,
    omega3: 76,
    omega6: 1242,
    vitaminD: 0,
    vitaminB12: 0.1,
    magnesium: 48,
    zinc: 2.6,
    iron: 2.5,
    selenium: 7,
    potassium: 210,
    longevityBenefits: ['probiotics', 'isoflavones', 'gut-health'],
    bestTimeToEat: 'morning',
    servingSize: '18g tablespoon'
  },
  {
    id: 'natto',
    name: 'Natto',
    category: 'fermented',
    calories: 212,
    protein: 18,
    carbs: 14,
    fat: 11,
    fiber: 5,
    sugar: 5,
    sodium: 7,
    glycemicIndex: 25,
    inflammationScore: -7,
    antioxidantScore: 50,
    omega3: 645,
    omega6: 6270,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 115,
    zinc: 3,
    iron: 8.6,
    selenium: 8.8,
    potassium: 729,
    longevityBenefits: ['vitamin-k2', 'nattokinase', 'bone-health', 'cardiovascular'],
    bestTimeToEat: 'morning',
    servingSize: '100g'
  },

  // ═══════════════════════════════════════════════════════════════
  // BEVERAGES (Longevity)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'green-tea',
    name: 'Green Tea (Brewed)',
    category: 'beverage',
    calories: 1,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 1,
    glycemicIndex: 0,
    inflammationScore: -7,
    antioxidantScore: 75,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 1,
    zinc: 0,
    iron: 0,
    selenium: 0,
    potassium: 8,
    longevityBenefits: ['egcg', 'l-theanine', 'autophagy', 'metabolism'],
    bestTimeToEat: 'morning',
    servingSize: '240ml cup'
  },
  {
    id: 'black-coffee',
    name: 'Black Coffee',
    category: 'beverage',
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 5,
    glycemicIndex: 0,
    inflammationScore: -4,
    antioxidantScore: 60,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 7,
    zinc: 0,
    iron: 0,
    selenium: 0,
    potassium: 116,
    longevityBenefits: ['chlorogenic-acid', 'autophagy', 'cognitive', 'longevity'],
    bestTimeToEat: 'morning',
    servingSize: '240ml cup'
  },
  {
    id: 'herbal-tea',
    name: 'Chamomile Tea',
    category: 'beverage',
    calories: 1,
    protein: 0,
    carbs: 0.2,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 1,
    glycemicIndex: 0,
    inflammationScore: -5,
    antioxidantScore: 40,
    omega3: 0,
    omega6: 0,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 1,
    zinc: 0,
    iron: 0.1,
    selenium: 0,
    potassium: 9,
    longevityBenefits: ['apigenin', 'sleep', 'relaxation', 'anti-inflammatory'],
    bestTimeToEat: 'evening',
    servingSize: '240ml cup'
  },

  // ═══════════════════════════════════════════════════════════════
  // EVERYDAY COMMON FOODS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'white-rice',
    name: 'White Rice (Cooked)',
    category: 'complex-carb',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    sugar: 0,
    sodium: 1,
    glycemicIndex: 73,
    inflammationScore: 2,
    antioxidantScore: 5,
    omega3: 0,
    omega6: 24,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 12,
    zinc: 0.5,
    iron: 0.2,
    selenium: 7.5,
    potassium: 35,
    longevityBenefits: ['energy', 'easy-digestion'],
    bestTimeToEat: 'midday',
    servingSize: '158g cup'
  },
  {
    id: 'pasta-cooked',
    name: 'Pasta (Cooked)',
    category: 'complex-carb',
    calories: 131,
    protein: 5,
    carbs: 25,
    fat: 1.1,
    fiber: 1.8,
    sugar: 0.6,
    sodium: 1,
    glycemicIndex: 55,
    inflammationScore: 1,
    antioxidantScore: 8,
    omega3: 8,
    omega6: 280,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 18,
    zinc: 0.5,
    iron: 0.5,
    selenium: 26.4,
    potassium: 44,
    longevityBenefits: ['energy', 'b-vitamins'],
    bestTimeToEat: 'midday',
    servingSize: '140g cup'
  },
  {
    id: 'whole-wheat-bread',
    name: 'Whole Wheat Bread',
    category: 'complex-carb',
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 4.2,
    fiber: 6,
    sugar: 6,
    sodium: 400,
    glycemicIndex: 51,
    inflammationScore: 0,
    antioxidantScore: 25,
    omega3: 45,
    omega6: 1050,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 82,
    zinc: 1.9,
    iron: 2.4,
    selenium: 31,
    potassium: 254,
    longevityBenefits: ['fiber', 'b-vitamins', 'whole-grains'],
    bestTimeToEat: 'morning',
    servingSize: '43g slice'
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'fruit',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12,
    sodium: 1,
    glycemicIndex: 51,
    inflammationScore: -2,
    antioxidantScore: 30,
    omega3: 27,
    omega6: 46,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 27,
    zinc: 0.2,
    iron: 0.3,
    selenium: 1,
    potassium: 358,
    longevityBenefits: ['potassium', 'energy', 'prebiotic', 'vitamin-b6'],
    bestTimeToEat: 'morning',
    servingSize: '118g medium'
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'fruit',
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.1,
    fiber: 2.4,
    sugar: 9,
    sodium: 0,
    glycemicIndex: 40,
    inflammationScore: -4,
    antioxidantScore: 60,
    omega3: 7,
    omega6: 16,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 10,
    zinc: 0.1,
    iron: 0.1,
    selenium: 0.5,
    potassium: 181,
    longevityBenefits: ['vitamin-c', 'flavonoids', 'fiber'],
    bestTimeToEat: 'morning',
    servingSize: '131g medium'
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    category: 'fruit',
    calories: 32,
    protein: 0.7,
    carbs: 8,
    fat: 0.3,
    fiber: 2,
    sugar: 5,
    sodium: 1,
    glycemicIndex: 40,
    inflammationScore: -6,
    antioxidantScore: 80,
    omega3: 65,
    omega6: 90,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 13,
    zinc: 0.1,
    iron: 0.4,
    selenium: 0.4,
    potassium: 153,
    longevityBenefits: ['vitamin-c', 'anthocyanins', 'ellagic-acid'],
    bestTimeToEat: 'morning',
    servingSize: '152g cup'
  },
  {
    id: 'whole-milk',
    name: 'Whole Milk',
    category: 'protein',
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    fiber: 0,
    sugar: 5,
    sodium: 43,
    glycemicIndex: 27,
    inflammationScore: 0,
    antioxidantScore: 10,
    omega3: 34,
    omega6: 98,
    vitaminD: 40,
    vitaminB12: 0.5,
    magnesium: 10,
    zinc: 0.4,
    iron: 0,
    selenium: 3.7,
    potassium: 132,
    longevityBenefits: ['calcium', 'vitamin-d', 'protein'],
    bestTimeToEat: 'anytime',
    servingSize: '244ml cup'
  },
  {
    id: 'cheddar-cheese',
    name: 'Cheddar Cheese',
    category: 'protein',
    calories: 403,
    protein: 25,
    carbs: 1.3,
    fat: 33,
    fiber: 0,
    sugar: 0.5,
    sodium: 621,
    glycemicIndex: 0,
    inflammationScore: 1,
    antioxidantScore: 15,
    omega3: 104,
    omega6: 577,
    vitaminD: 24,
    vitaminB12: 0.8,
    magnesium: 28,
    zinc: 3.1,
    iron: 0.7,
    selenium: 13.9,
    potassium: 98,
    longevityBenefits: ['calcium', 'protein', 'vitamin-k2'],
    bestTimeToEat: 'midday',
    servingSize: '28g slice'
  },
  {
    id: 'pizza-cheese',
    name: 'Pizza (Cheese)',
    category: 'complex-carb',
    calories: 266,
    protein: 11,
    carbs: 33,
    fat: 10,
    fiber: 2.3,
    sugar: 3.6,
    sodium: 598,
    glycemicIndex: 60,
    inflammationScore: 3,
    antioxidantScore: 12,
    omega3: 45,
    omega6: 520,
    vitaminD: 4,
    vitaminB12: 0.6,
    magnesium: 22,
    zinc: 1.5,
    iron: 2.1,
    selenium: 15,
    potassium: 184,
    longevityBenefits: ['protein', 'calcium'],
    bestTimeToEat: 'midday',
    servingSize: '107g slice'
  },
  {
    id: 'hamburger',
    name: 'Hamburger (with bun)',
    category: 'protein',
    calories: 295,
    protein: 17,
    carbs: 24,
    fat: 14,
    fiber: 1.3,
    sugar: 5,
    sodium: 378,
    glycemicIndex: 66,
    inflammationScore: 4,
    antioxidantScore: 8,
    omega3: 35,
    omega6: 520,
    vitaminD: 1,
    vitaminB12: 2.1,
    magnesium: 26,
    zinc: 4.8,
    iron: 2.8,
    selenium: 20,
    potassium: 320,
    longevityBenefits: ['protein', 'iron', 'b12'],
    bestTimeToEat: 'midday',
    servingSize: '110g burger'
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    category: 'complex-carb',
    calories: 312,
    protein: 3.4,
    carbs: 41,
    fat: 15,
    fiber: 3.8,
    sugar: 0.3,
    sodium: 210,
    glycemicIndex: 75,
    inflammationScore: 5,
    antioxidantScore: 15,
    omega3: 45,
    omega6: 2100,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 35,
    zinc: 0.5,
    iron: 0.8,
    selenium: 0.4,
    potassium: 579,
    longevityBenefits: ['potassium'],
    bestTimeToEat: 'midday',
    servingSize: '117g medium'
  },
  {
    id: 'ice-cream-vanilla',
    name: 'Vanilla Ice Cream',
    category: 'complex-carb',
    calories: 207,
    protein: 3.5,
    carbs: 24,
    fat: 11,
    fiber: 0.7,
    sugar: 21,
    sodium: 80,
    glycemicIndex: 61,
    inflammationScore: 4,
    antioxidantScore: 8,
    omega3: 47,
    omega6: 270,
    vitaminD: 25,
    vitaminB12: 0.4,
    magnesium: 14,
    zinc: 0.7,
    iron: 0.1,
    selenium: 2.5,
    potassium: 199,
    longevityBenefits: ['calcium'],
    bestTimeToEat: 'evening',
    servingSize: '132g cup'
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    category: 'healthy-fat',
    calories: 588,
    protein: 25,
    carbs: 20,
    fat: 50,
    fiber: 6,
    sugar: 9,
    sodium: 459,
    glycemicIndex: 14,
    inflammationScore: 1,
    antioxidantScore: 35,
    omega3: 27,
    omega6: 4325,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 154,
    zinc: 2.8,
    iron: 1.7,
    selenium: 4.1,
    potassium: 649,
    longevityBenefits: ['protein', 'magnesium', 'resveratrol'],
    bestTimeToEat: 'morning',
    servingSize: '32g (2 tbsp)'
  },
  {
    id: 'hummus',
    name: 'Hummus',
    category: 'healthy-fat',
    calories: 166,
    protein: 8,
    carbs: 14,
    fat: 10,
    fiber: 6,
    sugar: 0.3,
    sodium: 379,
    glycemicIndex: 6,
    inflammationScore: -4,
    antioxidantScore: 40,
    omega3: 102,
    omega6: 2230,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 29,
    zinc: 1.3,
    iron: 2.4,
    selenium: 3.4,
    potassium: 228,
    longevityBenefits: ['fiber', 'plant-protein', 'olive-oil'],
    bestTimeToEat: 'midday',
    servingSize: '100g serving'
  },
  {
    id: 'salmon-smoked',
    name: 'Smoked Salmon',
    category: 'protein',
    calories: 117,
    protein: 18,
    carbs: 0,
    fat: 4.3,
    fiber: 0,
    sugar: 0,
    sodium: 784,
    glycemicIndex: 0,
    inflammationScore: -6,
    antioxidantScore: 45,
    omega3: 1520,
    omega6: 125,
    vitaminD: 526,
    vitaminB12: 3.3,
    magnesium: 18,
    zinc: 0.3,
    iron: 0.9,
    selenium: 32.4,
    potassium: 175,
    longevityBenefits: ['omega-3', 'protein', 'vitamin-d', 'astaxanthin'],
    bestTimeToEat: 'morning',
    servingSize: '85g serving'
  },
  {
    id: 'turkey-breast',
    name: 'Turkey Breast (Roasted)',
    category: 'protein',
    calories: 135,
    protein: 30,
    carbs: 0,
    fat: 0.7,
    fiber: 0,
    sugar: 0,
    sodium: 46,
    glycemicIndex: 0,
    inflammationScore: -1,
    antioxidantScore: 12,
    omega3: 50,
    omega6: 280,
    vitaminD: 1,
    vitaminB12: 0.4,
    magnesium: 32,
    zinc: 1.5,
    iron: 0.7,
    selenium: 32.1,
    potassium: 293,
    longevityBenefits: ['lean-protein', 'selenium', 'tryptophan'],
    bestTimeToEat: 'midday',
    servingSize: '85g serving'
  },
  {
    id: 'shrimp',
    name: 'Shrimp (Cooked)',
    category: 'protein',
    calories: 99,
    protein: 24,
    carbs: 0.2,
    fat: 0.3,
    fiber: 0,
    sugar: 0,
    sodium: 111,
    glycemicIndex: 0,
    inflammationScore: -3,
    antioxidantScore: 30,
    omega3: 540,
    omega6: 28,
    vitaminD: 3,
    vitaminB12: 1.4,
    magnesium: 39,
    zinc: 1.6,
    iron: 0.5,
    selenium: 38.2,
    potassium: 220,
    longevityBenefits: ['protein', 'selenium', 'astaxanthin', 'iodine'],
    bestTimeToEat: 'midday',
    servingSize: '85g serving'
  },
  {
    id: 'tuna-canned',
    name: 'Tuna (Canned in Water)',
    category: 'protein',
    calories: 116,
    protein: 26,
    carbs: 0,
    fat: 0.8,
    fiber: 0,
    sugar: 0,
    sodium: 287,
    glycemicIndex: 0,
    inflammationScore: -5,
    antioxidantScore: 25,
    omega3: 270,
    omega6: 22,
    vitaminD: 82,
    vitaminB12: 2.5,
    magnesium: 27,
    zinc: 0.6,
    iron: 1.1,
    selenium: 65,
    potassium: 237,
    longevityBenefits: ['protein', 'omega-3', 'vitamin-d', 'selenium'],
    bestTimeToEat: 'midday',
    servingSize: '85g can'
  },
  {
    id: 'cottage-cheese',
    name: 'Cottage Cheese (Low Fat)',
    category: 'protein',
    calories: 72,
    protein: 12,
    carbs: 2.7,
    fat: 1,
    fiber: 0,
    sugar: 2.7,
    sodium: 406,
    glycemicIndex: 10,
    inflammationScore: -1,
    antioxidantScore: 8,
    omega3: 12,
    omega6: 28,
    vitaminD: 0,
    vitaminB12: 0.4,
    magnesium: 6,
    zinc: 0.4,
    iron: 0.1,
    selenium: 9,
    potassium: 84,
    longevityBenefits: ['casein-protein', 'calcium', 'satiety'],
    bestTimeToEat: 'evening',
    servingSize: '113g serving'
  },
  {
    id: 'tofu',
    name: 'Tofu (Firm)',
    category: 'protein',
    calories: 144,
    protein: 17,
    carbs: 3,
    fat: 8,
    fiber: 2,
    sugar: 0,
    sodium: 14,
    glycemicIndex: 15,
    inflammationScore: -4,
    antioxidantScore: 35,
    omega3: 583,
    omega6: 4500,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 60,
    zinc: 1.6,
    iron: 2.7,
    selenium: 17.4,
    potassium: 237,
    longevityBenefits: ['plant-protein', 'isoflavones', 'calcium', 'iron'],
    bestTimeToEat: 'midday',
    servingSize: '126g serving'
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice (Cooked)',
    category: 'complex-carb',
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5,
    glycemicIndex: 50,
    inflammationScore: -2,
    antioxidantScore: 30,
    omega3: 9,
    omega6: 292,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 43,
    zinc: 0.8,
    iron: 0.4,
    selenium: 9.8,
    potassium: 79,
    longevityBenefits: ['fiber', 'magnesium', 'manganese', 'whole-grain'],
    bestTimeToEat: 'midday',
    servingSize: '195g cup'
  },
  {
    id: 'oatmeal',
    name: 'Oatmeal (Cooked)',
    category: 'complex-carb',
    calories: 68,
    protein: 2.4,
    carbs: 12,
    fat: 1.4,
    fiber: 1.7,
    sugar: 0.3,
    sodium: 49,
    glycemicIndex: 55,
    inflammationScore: -3,
    antioxidantScore: 40,
    omega3: 8,
    omega6: 428,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 26,
    zinc: 0.6,
    iron: 0.7,
    selenium: 5.3,
    potassium: 61,
    longevityBenefits: ['beta-glucan', 'fiber', 'heart-health'],
    bestTimeToEat: 'morning',
    servingSize: '234g cup'
  },
  {
    id: 'corn',
    name: 'Sweet Corn (Cooked)',
    category: 'vegetable',
    calories: 96,
    protein: 3.4,
    carbs: 21,
    fat: 1.5,
    fiber: 2.4,
    sugar: 4.5,
    sodium: 1,
    glycemicIndex: 52,
    inflammationScore: 0,
    antioxidantScore: 35,
    omega3: 2,
    omega6: 658,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 26,
    zinc: 0.5,
    iron: 0.5,
    selenium: 0.2,
    potassium: 218,
    longevityBenefits: ['lutein', 'zeaxanthin', 'fiber'],
    bestTimeToEat: 'midday',
    servingSize: '164g cup'
  },
  {
    id: 'green-peas',
    name: 'Green Peas (Cooked)',
    category: 'vegetable',
    calories: 84,
    protein: 5.4,
    carbs: 16,
    fat: 0.2,
    fiber: 4.4,
    sugar: 5.7,
    sodium: 3,
    glycemicIndex: 51,
    inflammationScore: -3,
    antioxidantScore: 45,
    omega3: 17,
    omega6: 75,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 36,
    zinc: 1.2,
    iron: 1.5,
    selenium: 1.3,
    potassium: 271,
    longevityBenefits: ['plant-protein', 'fiber', 'vitamin-k'],
    bestTimeToEat: 'midday',
    servingSize: '160g cup'
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper (Red)',
    category: 'vegetable',
    calories: 31,
    protein: 1,
    carbs: 6,
    fat: 0.3,
    fiber: 2.1,
    sugar: 4.2,
    sodium: 4,
    glycemicIndex: 15,
    inflammationScore: -5,
    antioxidantScore: 75,
    omega3: 25,
    omega6: 42,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 12,
    zinc: 0.3,
    iron: 0.4,
    selenium: 0.1,
    potassium: 211,
    longevityBenefits: ['vitamin-c', 'vitamin-a', 'lycopene'],
    bestTimeToEat: 'anytime',
    servingSize: '149g medium'
  },
  {
    id: 'tomato',
    name: 'Tomato (Raw)',
    category: 'vegetable',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    sugar: 2.6,
    sodium: 5,
    glycemicIndex: 15,
    inflammationScore: -5,
    antioxidantScore: 65,
    omega3: 3,
    omega6: 80,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 11,
    zinc: 0.2,
    iron: 0.3,
    selenium: 0,
    potassium: 237,
    longevityBenefits: ['lycopene', 'vitamin-c', 'potassium'],
    bestTimeToEat: 'anytime',
    servingSize: '123g medium'
  },
  {
    id: 'carrot',
    name: 'Carrot (Raw)',
    category: 'vegetable',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    fiber: 2.8,
    sugar: 4.7,
    sodium: 69,
    glycemicIndex: 35,
    inflammationScore: -4,
    antioxidantScore: 70,
    omega3: 2,
    omega6: 115,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 12,
    zinc: 0.2,
    iron: 0.3,
    selenium: 0.1,
    potassium: 320,
    longevityBenefits: ['beta-carotene', 'vitamin-a', 'fiber'],
    bestTimeToEat: 'anytime',
    servingSize: '61g medium'
  },
  {
    id: 'celery',
    name: 'Celery (Raw)',
    category: 'vegetable',
    calories: 14,
    protein: 0.7,
    carbs: 3,
    fat: 0.2,
    fiber: 1.6,
    sugar: 1.3,
    sodium: 80,
    glycemicIndex: 15,
    inflammationScore: -4,
    antioxidantScore: 45,
    omega3: 8,
    omega6: 66,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 11,
    zinc: 0.1,
    iron: 0.2,
    selenium: 0.4,
    potassium: 260,
    longevityBenefits: ['apigenin', 'luteolin', 'hydration'],
    bestTimeToEat: 'anytime',
    servingSize: '101g cup'
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower (Raw)',
    category: 'vegetable',
    calories: 25,
    protein: 1.9,
    carbs: 5,
    fat: 0.3,
    fiber: 2,
    sugar: 1.9,
    sodium: 30,
    glycemicIndex: 15,
    inflammationScore: -6,
    antioxidantScore: 55,
    omega3: 37,
    omega6: 11,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 15,
    zinc: 0.3,
    iron: 0.4,
    selenium: 0.6,
    potassium: 299,
    longevityBenefits: ['sulforaphane', 'vitamin-c', 'fiber'],
    bestTimeToEat: 'midday',
    servingSize: '107g cup'
  },
  {
    id: 'grapes-red',
    name: 'Red Grapes',
    category: 'fruit',
    calories: 69,
    protein: 0.7,
    carbs: 18,
    fat: 0.2,
    fiber: 0.9,
    sugar: 16,
    sodium: 2,
    glycemicIndex: 53,
    inflammationScore: -4,
    antioxidantScore: 70,
    omega3: 11,
    omega6: 43,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 7,
    zinc: 0.1,
    iron: 0.4,
    selenium: 0.1,
    potassium: 191,
    longevityBenefits: ['resveratrol', 'quercetin', 'anthocyanins'],
    bestTimeToEat: 'anytime',
    servingSize: '151g cup'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    category: 'fruit',
    calories: 30,
    protein: 0.6,
    carbs: 8,
    fat: 0.2,
    fiber: 0.4,
    sugar: 6,
    sodium: 1,
    glycemicIndex: 72,
    inflammationScore: -3,
    antioxidantScore: 50,
    omega3: 24,
    omega6: 27,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 10,
    zinc: 0.1,
    iron: 0.2,
    selenium: 0.4,
    potassium: 112,
    longevityBenefits: ['lycopene', 'citrulline', 'hydration'],
    bestTimeToEat: 'morning',
    servingSize: '154g cup'
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    category: 'fruit',
    calories: 50,
    protein: 0.5,
    carbs: 13,
    fat: 0.1,
    fiber: 1.4,
    sugar: 10,
    sodium: 1,
    glycemicIndex: 59,
    inflammationScore: -4,
    antioxidantScore: 45,
    omega3: 17,
    omega6: 14,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 12,
    zinc: 0.1,
    iron: 0.3,
    selenium: 0.1,
    potassium: 109,
    longevityBenefits: ['bromelain', 'vitamin-c', 'manganese'],
    bestTimeToEat: 'morning',
    servingSize: '165g cup'
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'fruit',
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fat: 0.4,
    fiber: 1.6,
    sugar: 14,
    sodium: 1,
    glycemicIndex: 51,
    inflammationScore: -3,
    antioxidantScore: 60,
    omega3: 51,
    omega6: 19,
    vitaminD: 0,
    vitaminB12: 0,
    magnesium: 10,
    zinc: 0.1,
    iron: 0.2,
    selenium: 0.6,
    potassium: 168,
    longevityBenefits: ['vitamin-c', 'vitamin-a', 'polyphenols'],
    bestTimeToEat: 'morning',
    servingSize: '165g cup'
  }
]

interface FoodSearchProps {
  onFoodSelected: (
    food: {
      name: string
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber?: number
      sugar?: number
      sodium?: number
      glycemicIndex?: number
      inflammationScore?: number
      omega3?: number
      omega6?: number
    },
    quantity: number,
    unit: string,
    mealType: FoodLog['mealType'],
    photoUrl?: string,
    barcode?: string
  ) => void
}

export function FoodSearch({ onFoodSelected }: FoodSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LongevityFood[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFood, setSelectedFood] = useState<LongevityFood | null>(null)
  const [quantity, setQuantity] = useState(100)
  const [unit, setUnit] = useState('g')
  const [mealType, setMealType] = useState<FoodLog['mealType']>('lunch')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Foods' },
    { id: 'protein', label: 'Proteins' },
    { id: 'healthy-fat', label: 'Healthy Fats' },
    { id: 'complex-carb', label: 'Carbs' },
    { id: 'superfood', label: 'Superfoods' },
    { id: 'vegetable', label: 'Vegetables' },
    { id: 'fruit', label: 'Fruits' },
    { id: 'fermented', label: 'Fermented' },
    { id: 'beverage', label: 'Beverages' },
  ]

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let filtered = LONGEVITY_FOODS

      // Apply category filter
      if (categoryFilter !== 'all') {
        filtered = filtered.filter((food) => food.category === categoryFilter)
      }

      // Apply search query
      if (query.length > 0) {
        const searchTerms = query.toLowerCase().split(' ')
        filtered = filtered.filter((food) =>
          searchTerms.every(term =>
            food.name.toLowerCase().includes(term) ||
            food.category.toLowerCase().includes(term) ||
            food.longevityBenefits.some(b => b.toLowerCase().includes(term))
          )
        )
      }

      // Sort by relevance - exact matches first
      if (query.length > 0) {
        filtered.sort((a, b) => {
          const aExact = a.name.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1
          const bExact = b.name.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1
          return aExact - bExact
        })
      }

      setResults(filtered.slice(0, 30))
      setLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [query, categoryFilter])

  const handleSelect = (food: LongevityFood) => {
    setSelectedFood(food)
    setQuery(food.name)
  }

  const handleSubmit = () => {
    if (selectedFood) {
      onFoodSelected(
        {
          name: selectedFood.name,
          calories: selectedFood.calories,
          protein: selectedFood.protein,
          carbs: selectedFood.carbs,
          fat: selectedFood.fat,
          fiber: selectedFood.fiber,
          sugar: selectedFood.sugar,
          sodium: selectedFood.sodium,
          glycemicIndex: selectedFood.glycemicIndex,
          inflammationScore: selectedFood.inflammationScore,
          omega3: selectedFood.omega3,
          omega6: selectedFood.omega6,
        },
        quantity,
        unit,
        mealType
      )
      setSelectedFood(null)
      setQuery('')
      setQuantity(100)
    }
  }

  const getInflammationColor = (score: number) => {
    if (score <= -5) return 'text-green-600'
    if (score <= 0) return 'text-green-500'
    if (score <= 3) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getInflammationLabel = (score: number) => {
    if (score <= -5) return 'Anti-inflammatory'
    if (score <= 0) return 'Neutral'
    if (score <= 3) return 'Mild'
    return 'Pro-inflammatory'
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedFood(null)
          }}
          placeholder="Search longevity foods, benefits..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-foreground/10 rounded focus:outline-none focus:ring-2 focus:ring-primary font-body"
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-primary" size={20} />
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setCategoryFilter(cat.id)
              setSelectedFood(null)
            }}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-all
              ${categoryFilter === cat.id
                ? 'bg-primary text-white'
                : 'bg-foreground/5 text-foreground-muted hover:bg-foreground/10'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      {!selectedFood && results.length > 0 && (
        <p className="text-sm text-foreground-muted">
          {results.length} foods found {query && `for "${query}"`}
        </p>
      )}

      {/* Search Results */}
      {!selectedFood && results.length > 0 && (
        <div className="space-y-2">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => handleSelect(food)}
              className="w-full p-3 bg-white border border-gray-200 rounded-md text-left hover:border-primary hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <p className="font-display font-semibold group-hover:text-primary transition-colors">{food.name}</p>
                    <span className="text-xs px-2 py-0.5 bg-foreground/5 rounded-md capitalize">
                      {food.category.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-foreground-muted">
                    <span className="font-medium text-foreground">{food.calories} cal</span>
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>F: {food.fat}g</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                    <span className={`flex items-center gap-1 ${getInflammationColor(food.inflammationScore)}`}>
                      <Flame size={12} />
                      {getInflammationLabel(food.inflammationScore)}
                    </span>
                    <span className="flex items-center gap-1 text-blue-500">
                      <Zap size={12} />
                      GI: {food.glycemicIndex}
                    </span>
                    {food.omega3 > 500 && (
                      <span className="flex items-center gap-1 text-green-500">
                        <Leaf size={12} />
                        High Omega-3
                      </span>
                    )}
                    {food.antioxidantScore > 70 && (
                      <span className="flex items-center gap-1 text-purple-500">
                        Antioxidant Rich
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-2 text-gray-400 group-hover:text-primary transition-colors">
                  <Plus size={20} />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {!selectedFood && query.length > 0 && results.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-foreground-muted">No foods found for "{query}"</p>
          <p className="text-sm text-foreground-muted mt-1">Try a different search term or browse by category</p>
        </div>
      )}

      {/* Selected Food Form */}
      {selectedFood && (
        <div className="bg-white rounded-md border border-gray-200 shadow-sm"
        >
          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display font-bold text-lg">{selectedFood.name}</h3>
                <p className="text-sm text-foreground-muted">
                  {selectedFood.calories} cal per 100g | {selectedFood.servingSize}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedFood(null)
                  setQuery('')
                }}
                className="p-1.5 hover:bg-foreground/5 rounded-md text-foreground-muted"
                aria-label="Clear selection"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Longevity Benefits */}
            <div className="flex flex-wrap gap-1.5">
              {selectedFood.longevityBenefits.slice(0, 4).map((benefit) => (
                <span
                  key={benefit}
                  className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-md capitalize"
                >
                  {benefit.replace('-', ' ')}
                </span>
              ))}
            </div>

            {/* Longevity Metrics - Compact */}
            <div className="grid grid-cols-3 gap-2 p-2 bg-foreground/5 rounded-md text-center">
              <div>
                <p className="text-[10px] text-foreground-muted">Inflammation</p>
                <p className={`text-sm font-bold ${getInflammationColor(selectedFood.inflammationScore)}`}>
                  {selectedFood.inflammationScore > 0 ? '+' : ''}{selectedFood.inflammationScore}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-foreground-muted">Glycemic</p>
                <p className="text-sm font-bold text-blue-600">{selectedFood.glycemicIndex}</p>
              </div>
              <div>
                <p className="text-[10px] text-foreground-muted">Antioxidant</p>
                <p className="text-sm font-bold text-purple-600">{selectedFood.antioxidantScore}</p>
              </div>
            </div>

            {/* Key Micronutrients - More Compact */}
            {(selectedFood.omega3 > 100 || selectedFood.magnesium > 20 || selectedFood.vitaminD > 10 || selectedFood.selenium > 5) && (
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {selectedFood.omega3 > 100 && (
                  <div className="p-1.5 bg-blue-50 rounded-md text-center">
                    <p className="text-[10px] text-foreground-muted">Omega-3</p>
                    <p className="font-bold text-blue-600">{selectedFood.omega3}mg</p>
                  </div>
                )}
                {selectedFood.magnesium > 20 && (
                  <div className="p-1.5 bg-purple-50 rounded-md text-center">
                    <p className="text-[10px] text-foreground-muted">Magnesium</p>
                    <p className="font-bold text-purple-600">{selectedFood.magnesium}mg</p>
                  </div>
                )}
                {selectedFood.vitaminD > 10 && (
                  <div className="p-1.5 bg-yellow-50 rounded-md text-center">
                    <p className="text-[10px] text-foreground-muted">Vitamin D</p>
                    <p className="font-bold text-yellow-600">{selectedFood.vitaminD}IU</p>
                  </div>
                )}
                {selectedFood.selenium > 5 && (
                  <div className="p-1.5 bg-green-50 rounded-md text-center">
                    <p className="text-[10px] text-foreground-muted">Selenium</p>
                    <p className="font-bold text-green-600">{selectedFood.selenium}mcg</p>
                  </div>
                )}
              </div>
            )}

            {/* Quantity and Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="food-quantity" className="block text-xs font-medium mb-1">Quantity</label>
                <input
                  id="food-quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-foreground/10 rounded-md font-body text-sm"
                  min="1"
                  aria-label="Food quantity"
                />
              </div>
              <div>
                <label htmlFor="food-unit" className="block text-xs font-medium mb-1">Unit</label>
                <select
                  id="food-unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-foreground/10 rounded-md font-body text-sm"
                  aria-label="Unit of measurement"
                >
                  <option value="g">grams (g)</option>
                  <option value="oz">ounces (oz)</option>
                  <option value="cup">cup</option>
                  <option value="tbsp">tablespoon</option>
                  <option value="piece">piece</option>
                  <option value="serving">serving</option>
                </select>
              </div>
            </div>

            {/* Meal Type */}
            <div>
              <label className="block text-xs font-medium mb-1.5" id="meal-type-label">Meal Type</label>
              <div className="grid grid-cols-4 gap-1.5" role="group" aria-labelledby="meal-type-label">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMealType(type)}
                    aria-label={`Select ${type} as meal type`}
                    data-selected={mealType === type}
                    className={`
                      px-2 py-2 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                      ${mealType === type
                        ? 'bg-primary text-white'
                        : 'bg-foreground/5 border border-foreground/10 hover:border-primary'
                      }
                    `}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Optimal Timing - Compact */}
            <div className="p-2 bg-amber-50 rounded-md text-xs">
              <p className="text-amber-800">
                <span className="font-medium">Optimal:</span>{' '}
                {selectedFood.bestTimeToEat === 'morning' && 'Morning for best absorption'}
                {selectedFood.bestTimeToEat === 'midday' && 'Midday when metabolism peaks'}
                {selectedFood.bestTimeToEat === 'evening' && 'Evening for relaxation'}
                {selectedFood.bestTimeToEat === 'anytime' && 'Any time of day'}
              </p>
            </div>

            {/* Estimated Nutrition - Compact inline */}
            <div className="p-2 bg-foreground/5 rounded-md">
              <p className="text-[10px] text-foreground-muted mb-1">Estimated for {quantity}{unit}:</p>
              <div className="flex items-center justify-between text-sm">
                <span><strong>{Math.round((selectedFood.calories * quantity) / 100)}</strong> cal</span>
                <span><strong>{((selectedFood.protein * quantity) / 100).toFixed(1)}g</strong> P</span>
                <span><strong>{((selectedFood.carbs * quantity) / 100).toFixed(1)}g</strong> C</span>
                <span><strong>{((selectedFood.fat * quantity) / 100).toFixed(1)}g</strong> F</span>
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add to Log
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
