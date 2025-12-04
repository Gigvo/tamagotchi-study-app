// /app/inventory/page.tsx
'use client';

import { useState } from 'react';
import { Package, CheckCircle, XCircle, Heart, Zap, Brain } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  type: 'hat' | 'top' | 'bottom' | 'accessory' | 'food';
  equipped: boolean;
  image: string;
  effect?: 'happiness' | 'energy' | 'intelligence';
}

const mockInventory: Item[] = [
  { id: '1', name: 'Wizard Hat', type: 'hat', equipped: true, image: '🧙', effect: 'intelligence' },
  { id: '2', name: 'Sunglasses', type: 'accessory', equipped: true, image: '😎', effect: 'happiness' },
  { id: '3', name: 'Red Shirt', type: 'top', equipped: false, image: '👕', effect: 'happiness' },
  { id: '4', name: 'Blue Pants', type: 'bottom', equipped: false, image: '👖', effect: 'happiness' },
  { id: '5', name: 'Pizza Slice', type: 'food', equipped: false, image: '🍕', effect: 'happiness' },
  { id: '6', name: 'Coffee', type: 'food', equipped: false, image: '☕', effect: 'energy' },
  { id: '7', name: 'Party Hat', type: 'hat', equipped: false, image: '🎉', effect: 'happiness' },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(mockInventory);
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = [
    { id: 'all', label: 'All', emoji: '📦' },
    { id: 'hat', label: 'Hats', emoji: '🧢' },
    { id: 'top', label: 'Tops', emoji: '👕' },
    { id: 'bottom', label: 'Bottoms', emoji: '👖' },
    { id: 'accessory', label: 'Accessories', emoji: '😎' },
    { id: 'food', label: 'Food', emoji: '🍕' },
  ];

  const filteredItems = selectedType === 'all'
    ? inventory
    : inventory.filter(item => item.type === selectedType);

  const equippedItems = inventory.filter(item => item.equipped);

  const toggleEquip = (id: string) => {
    setInventory(items =>
      items.map(item => {
        if (item.id === id) {
          // If this item is of a type that can only have one equipped (not food),
          // and we're equipping it, unequip others of same type
          if (!item.equipped && item.type !== 'food') {
            return {
              ...item,
              equipped: true
            };
          }
          return { ...item, equipped: !item.equipped };
        }
        // For non-food items, if we're equipping a new item, unequip others of same type
        if (!item.equipped && item.type !== 'food') {
          return item;
        }
        return item;
      })
    );
  };

  const useItem = (id: string) => {
    if (window.confirm('Use this item?')) {
      setInventory(items => items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Package className="h-8 w-8 text-green-600" />
            Inventory
          </h1>
          <p className="text-gray-600">Manage your items</p>
        </div>

        {/* Currently Equipped */}
        {equippedItems.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border">
            <h2 className="font-bold text-gray-800 mb-3">Currently Wearing</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {equippedItems.map((item) => {
                const effectIcon = {
                  happiness: <Heart className="h-4 w-4 text-pink-500" />,
                  energy: <Zap className="h-4 w-4 text-yellow-500" />,
                  intelligence: <Brain className="h-4 w-4 text-blue-500" />,
                }[item.effect || 'happiness'];

                return (
                  <div key={item.id} className="flex-shrink-0 bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                    <div className="text-4xl mb-1">{item.image}</div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {effectIcon}
                      <span className="text-xs text-gray-600">
                        {item.effect || 'happiness'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Type Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedType === type.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <span>{type.emoji}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No items in this category</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const effectIcon = {
                happiness: <Heart className="h-4 w-4 text-pink-500" />,
                energy: <Zap className="h-4 w-4 text-yellow-500" />,
                intelligence: <Brain className="h-4 w-4 text-blue-500" />,
              }[item.effect || 'happiness'];

              return (
                <div key={item.id} className={`bg-white rounded-xl p-4 shadow-sm border ${
                  item.equipped ? 'ring-2 ring-green-400' : ''
                }`}>
                  <div className="text-5xl text-center mb-2">{item.image}</div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {effectIcon}
                      <span className="text-sm text-gray-600">
                        {item.effect || 'happiness'}
                      </span>
                    </div>
                    {item.equipped ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleEquip(item.id)}
                      className={`flex-1 py-2 rounded-lg font-medium ${
                        item.equipped
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {item.equipped ? 'Unequip' : 'Equip'}
                    </button>
                    {item.type === 'food' && (
                      <button
                        onClick={() => useItem(item.id)}
                        className="px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                      >
                        Use
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-xl font-bold">{inventory.length}</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-sm text-gray-600">Equipped</p>
              <p className="text-xl font-bold">{equippedItems.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}