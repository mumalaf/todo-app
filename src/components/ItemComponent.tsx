'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { Item } from '@/types/item';

interface ItemComponentProps {
  item: Item;
  onToggle: (id: number) => void;
}

const ItemComponent = memo(function ItemComponent({ item, onToggle }: ItemComponentProps) {
  const router = useRouter();

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(item.id);
  };

  const handleItemClick = () => {
    router.push(`/items/${item.id}`);
  };

  return (
    <div 
      className={`flex items-center rounded-full px-6 py-4 border-2 cursor-pointer transition-colors ${
        item.isCompleted 
          ? 'bg-purple-100 hover:bg-purple-200 border-gray-800' 
          : 'bg-white hover:bg-gray-50 border-gray-800'
      }`}
      onClick={handleItemClick}
    >
      <div className="flex items-center justify-center mr-4" onClick={handleCheckboxClick}>
        <img 
          src={item.isCompleted ? '/ic/checkbox/checked.png' : '/ic/checkbox/unchecked.png'}
          alt={item.isCompleted ? 'checked' : 'unchecked'}
          className="w-8 h-8"
        />
      </div>
      <span className={`flex-1 text-gray-800 font-medium ${item.isCompleted ? 'line-through opacity-70' : ''}`}>
        {item.name}
      </span>
    </div>
  );
});

export default ItemComponent;