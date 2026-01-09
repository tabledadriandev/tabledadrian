export interface HealthCondition {
  id: string
  name: string
  description: string
  dietaryFocus?: string[]
  avoid?: string[]
  color: string
  severity?: 'critical' | 'moderate' | 'mild'
  category: string
}

export interface HealthCategory {
  label: string
  icon: string
  conditions: HealthCondition[]
}

export const healthCategories: Record<string, HealthCategory> = {
  metabolic: {
    label: 'Metabolic Health',
    icon: 'Activity',
    conditions: [
      {
        id: 'diabetes-type2',
        name: 'Type 2 Diabetes',
        description: 'Low glycemic, balanced macros',
        dietaryFocus: ['low-glycemic', 'high-fiber', 'lean-protein'],
        avoid: ['refined-sugars', 'white-flour', 'processed-foods'],
        color: 'blue',
        category: 'metabolic',
      },
      {
        id: 'diabetes-type1',
        name: 'Type 1 Diabetes',
        description: 'Carb-conscious with flexibility',
        dietaryFocus: ['consistent-carbs', 'whole-foods'],
        avoid: ['hidden-sugars'],
        color: 'blue',
        category: 'metabolic',
      },
      {
        id: 'prediabetes',
        name: 'Prediabetes',
        description: 'Prevention-focused nutrition',
        dietaryFocus: ['low-glycemic', 'weight-management'],
        avoid: ['refined-carbs', 'sugary-drinks'],
        color: 'blue',
        category: 'metabolic',
      },
    ],
  },
  cardiovascular: {
    label: 'Heart Health',
    icon: 'Heart',
    conditions: [
      {
        id: 'hypertension',
        name: 'High Blood Pressure',
        description: 'DASH-inspired, low sodium',
        dietaryFocus: ['low-sodium', 'potassium-rich', 'whole-grains'],
        avoid: ['processed-foods', 'excess-salt', 'red-meat'],
        color: 'red',
        category: 'cardiovascular',
      },
      {
        id: 'high-cholesterol',
        name: 'High Cholesterol',
        description: 'Heart-protective fats',
        dietaryFocus: ['omega-3', 'fiber', 'plant-sterols'],
        avoid: ['saturated-fats', 'trans-fats'],
        color: 'red',
        category: 'cardiovascular',
      },
    ],
  },
  digestive: {
    label: 'Digestive Health',
    icon: 'Flame',
    conditions: [
      {
        id: 'celiac',
        name: 'Celiac Disease',
        description: '100% gluten-free',
        dietaryFocus: ['gluten-free', 'whole-foods'],
        avoid: ['wheat', 'barley', 'rye', 'cross-contamination'],
        color: 'amber',
        severity: 'critical',
        category: 'digestive',
      },
      {
        id: 'gluten-sensitivity',
        name: 'Gluten Sensitivity',
        description: 'Gluten-free comfort',
        dietaryFocus: ['gluten-free'],
        avoid: ['gluten'],
        color: 'amber',
        category: 'digestive',
      },
      {
        id: 'ibs',
        name: 'IBS',
        description: 'Low-FODMAP friendly',
        dietaryFocus: ['low-fodmap', 'easy-digest'],
        avoid: ['high-fodmap', 'trigger-foods'],
        color: 'green',
        category: 'digestive',
      },
    ],
  },
  allergies: {
    label: 'Food Allergies',
    icon: 'AlertTriangle',
    conditions: [
      {
        id: 'dairy-free',
        name: 'Dairy Allergy/Intolerance',
        description: 'Completely dairy-free',
        avoid: ['milk', 'cheese', 'butter', 'cream', 'whey', 'casein'],
        color: 'teal',
        severity: 'critical',
        category: 'allergies',
      },
      {
        id: 'nut-free',
        name: 'Tree Nut Allergy',
        description: 'Nut-safe cooking',
        avoid: ['tree-nuts', 'nut-oils', 'cross-contamination'],
        color: 'teal',
        severity: 'critical',
        category: 'allergies',
      },
      {
        id: 'gluten-free',
        name: 'Gluten-Free',
        description: 'Gluten-free diet',
        avoid: ['wheat', 'barley', 'rye'],
        color: 'amber',
        category: 'allergies',
      },
    ],
  },
  lifestyle: {
    label: 'Lifestyle Diets',
    icon: 'Leaf',
    conditions: [
      {
        id: 'vegan',
        name: 'Vegan',
        description: 'Plant-based excellence',
        dietaryFocus: ['plant-based', 'whole-foods'],
        avoid: ['all-animal-products'],
        color: 'emerald',
        category: 'lifestyle',
      },
      {
        id: 'vegetarian',
        name: 'Vegetarian',
        description: 'Meat-free variety',
        dietaryFocus: ['plant-forward'],
        avoid: ['meat', 'fish'],
        color: 'emerald',
        category: 'lifestyle',
      },
      {
        id: 'keto',
        name: 'Ketogenic',
        description: 'Ultra low-carb, high-fat',
        dietaryFocus: ['high-fat', 'moderate-protein', 'very-low-carb'],
        avoid: ['carbs', 'sugars', 'grains'],
        color: 'pink',
        category: 'lifestyle',
      },
    ],
  },
  goals: {
    label: 'Health Goals',
    icon: 'Target',
    conditions: [
      {
        id: 'weight-loss',
        name: 'Weight Loss',
        description: 'Calorie-conscious, satisfying',
        dietaryFocus: ['high-protein', 'high-fiber', 'volume-eating'],
        color: 'rose',
        category: 'goals',
      },
      {
        id: 'muscle-gain',
        name: 'Muscle Building',
        description: 'High-protein, nutrient-dense',
        dietaryFocus: ['high-protein', 'complex-carbs', 'recovery'],
        color: 'rose',
        category: 'goals',
      },
      {
        id: 'anti-aging',
        name: 'Longevity/Anti-Aging',
        description: 'Antioxidant-rich, anti-inflammatory',
        dietaryFocus: ['antioxidants', 'omega-3', 'polyphenols'],
        color: 'fuchsia',
        category: 'goals',
      },
    ],
  },
}

// Flatten all conditions for easy access
export const allConditions: HealthCondition[] = Object.values(healthCategories).flatMap(
  (category) => category.conditions
)
