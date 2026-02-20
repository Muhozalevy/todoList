import React from 'react';

export default function TaskForme({ formData, setFormData, onAdd }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, 
      [name]: value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(); 
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* CHAMP TITRE */}
        <input
          type="text"
          name="title"
          placeholder="Titre de la tâche..."
          value={formData.title}
          onChange={handleChange}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--card)',
            color: 'var(--text)'     
          }}
        />

        {/* CHAMP DESCRIPTION */}
        <textarea
          name="desc"
          placeholder="Ajouter une description..."
          value={formData.desc}
          onChange={handleChange}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--card)',
            color: 'var(--text)',
            minHeight: '80px',
            resize: 'vertical' 
          }}
        />

        {/* NOUVEAU : CHAMP DURÉE (Select) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
            Durée de la tâche :
          </label>
          <select 
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
          >
            <option value={30}>30 Minutes</option>
            <option value={60}>1 Heure</option>
            <option value={120}>2 Heures</option>
            <option value={180}>3 Heures</option>
          </select>
        </div>

        {/* BOUTON AJOUTER */}
        <button 
          type="submit"
          className="btn-add"
          style={{
            padding: '12px',
            background: 'var(--primary)', 
            color: 'white',               
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Ajouter la tâche
        </button>
      </div>
    </form>
  );
}