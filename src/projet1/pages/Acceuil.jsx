import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForme';
import './Acceuil.css';

export default function Acceuil() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ title: "", desc: "", duration: 60 });
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todo_data')) || [];
    setTasks(saved);
    
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('todo_data', JSON.stringify(newTasks));
  };

  const handleAddTask = () => {
    if (!formData.title.trim()) return; 
    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    const newTask = {
      id: Date.now(), 
      title: formData.title,
      desc: formData.desc,
      duration: parseInt(formData.duration) || 60,
      progressTime: 0,
      completed: false,
      createdAt: now,
      completedAt: null
    };
    
    saveTasks([...tasks, newTask]);
    setFormData({ title: "", desc: "", duration: 60 });
  };

  const handleToggle = (id) => {
    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const updatedTasks = tasks.map(t => {
      if (t.id === id) {
        const isNowCompleted = !t.completed;
        return {
          ...t,
          completed: isNowCompleted,
          progressTime: isNowCompleted ? t.duration : t.progressTime,
          completedAt: isNowCompleted ? now : null 
        };
      }
      return t;
    });
    saveTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const totalMinPrevues = tasks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMinFaites = tasks.reduce((acc, t) => acc + (t.progressTime || 0), 0);
  const globalProgress = totalMinPrevues > 0 ? (totalMinFaites / totalMinPrevues) * 100 : 0;

  const filteredTasks = tasks.filter(t => {
    const matchesStatus = filter === 'all' || (filter === 'done' ? t.completed : !t.completed);
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    /* AJOUT DE DATA-THEME ICI AUSSI POUR SÉCURISER */
    <div className="main-container" data-theme={isDark ? 'dark' : 'light'}>
      <header className="home-header">
        <div className="branding">
          <h1>Todo List</h1>
          <p className="sub-date">Friday, 13 February 2026</p>
        </div>
        <SearchBar 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          filter={filter} setFilter={setFilter}
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
      </header>

      <div className="progress-section">
        <div className="progress-labels">
          <span>Progression manuelle totale</span>
          <span>{Math.round(globalProgress)}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${globalProgress}%` }}></div>
        </div>
      </div>

      <TaskList items={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} isDark={isDark} />
      <TaskForm formData={formData} setFormData={setFormData} onAdd={handleAddTask} />
    </div>
  );
}