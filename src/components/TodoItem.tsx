'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

const TodoItem = memo(function TodoItem({ todo, onToggle }: TodoItemProps) {
  const router = useRouter();

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(todo.id);
  };

  const handleItemClick = () => {
    router.push(`/todo/${todo.id}`);
  };

  return (
    <div 
      className={`flex items-center rounded-full px-6 py-4 border-2 cursor-pointer transition-colors ${
        todo.isCompleted 
          ? 'bg-purple-100 hover:bg-purple-200 border-gray-800' 
          : 'bg-white hover:bg-gray-50 border-gray-800'
      }`}
      onClick={handleItemClick}
    >
      <div className="flex items-center justify-center mr-4" onClick={handleCheckboxClick}>
        <img 
          src={todo.isCompleted ? '/ic/checkbox/checked.png' : '/ic/checkbox/unchecked.png'}
          alt={todo.isCompleted ? 'checked' : 'unchecked'}
          className="w-8 h-8"
        />
      </div>
      <span className={`flex-1 text-gray-800 font-medium ${todo.isCompleted ? 'line-through opacity-70' : ''}`}>
        {todo.name}
      </span>
    </div>
  );
});

export default TodoItem;