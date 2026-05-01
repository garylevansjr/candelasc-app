export interface Home {
  slug: string
  address: string
  city: string
  builder: string
  modelSize: string
  correctScent: string
}

export const homes: Home[] = [
  // Coventry Homes
  {
    slug: '8614-gleaming-village-way-coventry',
    address: '8614 Gleaming Village Way',
    city: 'Richmond, TX 77406',
    builder: 'Coventry Homes',
    modelSize: "40' North",
    correctScent: 'Mandarin Coriander',
  },
  {
    slug: '8610-gleaming-village-way-coventry',
    address: '8610 Gleaming Village Way',
    city: 'Richmond, TX 77406',
    builder: 'Coventry Homes',
    modelSize: "50' North",
    correctScent: 'Apple Orchards',
  },
  {
    slug: '26539-gleaming-dawn-way',
    address: '26539 Gleaming Dawn Way',
    city: 'Richmond, TX 77406',
    builder: 'Coventry Homes',
    modelSize: "60' North",
    correctScent: 'Pacific Aqua',
  },
  {
    slug: '26540-gleaming-dawn-way',
    address: '26540 Gleaming Dawn Way',
    city: 'Richmond, TX 77406',
    builder: 'Coventry Homes',
    modelSize: "60' South",
    correctScent: 'Linens & Surf',
  },
  // Perry Homes
  {
    slug: '26507-gleaming-dawn-way',
    address: '26507 Gleaming Dawn Way',
    city: 'Richmond, TX 77406',
    builder: 'Perry Homes',
    modelSize: "40' North",
    correctScent: 'Capri Blue Volcano',
  },
  {
    slug: '8606-gleaming-village-way',
    address: '8606 Gleaming Village Way',
    city: 'Richmond, TX 77406',
    builder: 'Perry Homes',
    modelSize: "40' South",
    correctScent: 'White Tea',
  },
  {
    slug: '8602-gleaming-village-way',
    address: '8602 Gleaming Village Way',
    city: 'Richmond, TX 77406',
    builder: 'Perry Homes',
    modelSize: "50' North",
    correctScent: 'Yuzu Citron',
  },
  {
    slug: '26535-gleaming-dawn-way',
    address: '26535 Gleaming Dawn Way',
    city: 'Richmond, TX 77406',
    builder: 'Perry Homes',
    modelSize: "60' North",
    correctScent: 'Cranberry Fizz',
  },
  // Westin Homes
  {
    slug: '8614-gleaming-village-way-westin',
    address: '8614 Gleaming Village Way',
    city: 'Richmond, TX 77406',
    builder: 'Westin Homes',
    modelSize: "40' South",
    correctScent: 'Peony Blush',
  },
  {
    slug: '8610-gleaming-village-way-westin',
    address: '8610 Gleaming Village Way',
    city: 'Richmond, TX 77406',
    builder: 'Westin Homes',
    modelSize: "50' South",
    correctScent: 'Juicy Acai',
  },
  {
    slug: '26531-gleaming-dawn-way',
    address: '26531 Gleaming Dawn Way',
    city: 'Richmond, TX 77406',
    builder: 'Westin Homes',
    modelSize: "60' South",
    correctScent: 'Washed Linen',
  },
  {
    slug: '26515-gleaming-dawn-way',
    address: '26515 Gleaming Dawn Way',
    city: 'Richmond, TX 77406',
    builder: 'Westin Homes',
    modelSize: "40' North",
    correctScent: 'Sea Salt Grapefruit',
  },
  {
    slug: '26523-gleaming-dawn-way',
    address: '26523 Gleaming Dawn Way',
    city: 'Richmond, TX 77406',
    builder: 'Westin Homes',
    modelSize: "50' North",
    correctScent: 'Coconut Sugar',
  },
]

export const SCENTS: string[] = [...new Set(homes.map((h) => h.correctScent))].sort()

export const BUILDERS = ['Coventry Homes', 'Perry Homes', 'Westin Homes'] as const

export function getHomeBySlug(slug: string): Home | undefined {
  return homes.find((h) => h.slug === slug)
}
