import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ items, onToggle, onDelete, isDark }) => {
  // 1. On gère le cas où la recherche ne trouve rien
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucune tâche trouvée... 🔍</p>
      </div>
    );
  }

  return (
    <div className="tasks-list">
      {items.map((t) => (
        <TaskItem 
          key={t.id} 
          task={t} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          isDark={isDark} 
        />
      ))}
    </div>
  );
};

export default TaskList;