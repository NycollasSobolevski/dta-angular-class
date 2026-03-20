export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const menu: FoodItem[] = [
  {
    id: 1,
    name: "Hambúrguer Clássico",
    description: "Pão, carne bovina, queijo, alface e tomate",
    price: 25.9,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela e manjericão",
    price: 39.9,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Sushi Combo",
    description: "Seleção de sushis e sashimis variados",
    price: 54.9,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Salada Caesar",
    description: "Alface, frango grelhado, croutons e molho caesar",
    price: 29.9,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Macarrão à Bolonhesa",
    description: "Massa com molho de carne e tomate",
    price: 34.5,
    image: "https://images.unsplash.com/photo-1621996311210-99c14d5ce290?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Taco Mexicano",
    description: "Tortilla com carne, queijo e vegetais",
    price: 22.0,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Frango Grelhado",
    description: "Peito de frango com legumes salteados",
    price: 31.0,
    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Batata Frita",
    description: "Porção de batatas crocantes",
    price: 15.5,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Açaí na Tigela",
    description: "Açaí com banana, granola e mel",
    price: 18.9,
    image: "https://images.unsplash.com/photo-1590134746323-87556094fc54?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Milkshake de Chocolate",
    description: "Bebida cremosa com sorvete e chocolate",
    price: 16.0,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
  },
];