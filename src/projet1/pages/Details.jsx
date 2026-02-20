// src/pages/Details.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import './Details.css'

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', desc: '' });
  const [isDark] = useState(localStorage.getItem('theme') === 'dark');
  
  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const saved = JSON.parse(localStorage.getItem('todo_data')) || []
    const found = saved.find(t => t.id === parseInt(id));
    if (found) setTask(found);
  }, [id, isDark]); 



  const handleUpdate = () => {
   
    const saved = JSON.parse(localStorage.getItem('todo_data')) || [];
    

    const updatedTasks = saved.map(t => t.id === task.id ? task : t);
    
    
    localStorage.setItem('todo_data', JSON.stringify(updatedTasks));
    
    // 4. On retourne à l'accueil
    navigate('/'); 
  };

 

  return (
    <div className="main-container">
      <h2 className="section-title">Modifier la tâche</h2>
      
      <div className="edit-card">
       
        <input 
          type="text" 
          value={task.title} 
          
          onChange={(e) => setTask({...task, title: e.target.value})}
          placeholder="Titre de la tâche"
        />

       
        <textarea 
          value={task.desc} 
          onChange={(e) => setTask({...task, desc: e.target.value})}
          placeholder="Ajouter une description détaillée..."
        />

      
        <div className="details-buttons">
           
            <button onClick={() => navigate('/')} className="secondary-btn">
              Annuler
            </button>

            {/* Enregistrer : déclenche la fonction handleUpdate */}
            <button onClick={handleUpdate} className="primary-btn">
              Enregistrer
            </button>
        </div>
      </div>
    </div>
  );
}