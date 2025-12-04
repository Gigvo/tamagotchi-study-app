// /app/shop/page.tsx
'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Heart, Zap, Brain } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'food' | 'outfit' | 'accessory' | 'decoration';
  effect?: 'happiness' | 'energy' | 'intelligence';
}

const mockProducts: Product[] = [
  { id: '1', name: 'Wizard Hat', price: 150, image: '🧙', category: 'outfit', effect: 'intelligence' },
  { id: '2', name: 'Pizza Slice', price: 50, image: '🍕', category: 'food', effect: 'happiness' },
  { id: '3', name: 'Sunglasses', price: 80, image: '😎', category: 'accessory', effect: 'happiness' },
  { id: '4', name: 'Energy Drink', price: 45, image: '🥤', category: 'food', effect: 'energy' },
  { id: '5', name: 'Book Set', price: 120, image: '📚', category: 'decoration', effect: 'intelligence' },
  { id: '6', name: 'Party Hat', price: 60, image: '🎉', category: 'outfit', effect: 'happiness' },
  { id: '7', name: 'Coffee', price: 35, image: '☕', category: 'food', effect: 'energy' },
  { id: '8', name: 'Crown', price: 200, image: '👑', category: 'outfit', effect: 'happiness' },
];

export default function ShopPage() {
  const [points] = useState(500);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const addToCart = (product: Product) => {
    if (points >= product.price) {
      setCart([...cart, product]);
    }
  };

  const categories = [
    { id: 'all', label: 'All', emoji: '🛒' },
    { id: 'food', label: 'Food', emoji: '🍕' },
    { id: 'outfit', label: 'Outfits', emoji: '👕' },
    { id: 'accessory', label: 'Accessories', emoji: '😎' },
    { id: 'decoration', label: 'Decor', emoji: '🖼️' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === selectedCategory);

  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            Shop
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Buy items for your Tamagotchi</p>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-bold">{points}</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {filteredProducts.map((product) => {
            const canBuy = points >= product.price;
            const effectIcon = {
              happiness: <Heart className="h-4 w-4 text-pink-500" />,
              energy: <Zap className="h-4 w-4 text-yellow-500" />,
              intelligence: <Brain className="h-4 w-4 text-blue-500" />,
            }[product.effect || 'happiness'];

            return (
              <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-5xl text-center mb-2">{product.image}</div>
                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {effectIcon}
                    <span className="text-sm text-gray-600">
                      {product.effect || 'happiness'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-bold">{product.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={!canBuy}
                  className={`w-full mt-3 py-2 rounded-lg font-medium ${
                    canBuy
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canBuy ? 'Buy Now' : 'Need More ⭐'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200">
            <h3 className="font-bold text-gray-800 mb-3">Your Cart ({cart.length})</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.image}</span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold">Total:</span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-lg font-bold">{totalCost}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Checkout ({totalCost} ⭐)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}