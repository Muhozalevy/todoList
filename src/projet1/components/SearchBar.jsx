import { MdSearch, MdDarkMode, MdLightMode } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import './search.css'

// Ce composant reçoit ses données et ses fonctions depuis Accueil.jsx via les "props"
export default function SearchBar({ 
  searchQuery,   
  setSearchQuery,
  filter,        
  setFilter,    
  isDark,        
  toggleTheme  
}) {
  
  return (
    <div className="top-controls">
      
      {/* 1. BOUTON DE CHANGEMENT DE THÈME */}
      <button onClick={toggleTheme} className="theme-btn-round">
        {/* Condition : Si isDark est vrai, on montre le soleil, sinon la lune */}
        {isDark ? <MdLightMode /> : <MdDarkMode />}
      </button>
      
      {/* 2. BARRE DE RECHERCHE (Le "Pill") */}
      <div className="search-pill">
        <MdSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          // Dès qu'on tape une lettre, on met à jour l'état dans Accueil.jsx
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 3. MENU DÉROULANT DE FILTRAGE */}
      <div className="filter-pill">
        <FiFilter />
        <select 
          value={filter} 
          // Change l'affichage des tâches (Toutes / À faire / Terminées)
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="done">Done</option>
        </select>
      </div>
      
    </div>
  );
}