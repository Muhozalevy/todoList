import { RiDeleteBin7Line, RiDeleteBinLine } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr"; 
import { MdAccessTime, MdCheckCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router"; 
import './item.css';

export default function TaskItem({ task, onToggle, onDelete, isDark }) {
  const navigate = useNavigate();

  const calculateProgress = () => {
    // On utilise les données sauvegardées (progressTime) au lieu de l'heure actuelle
    const total = parseInt(task.duration) || 60;
    const current = parseInt(task.progressTime) || 0;
    const percent = (current / total) * 100;
    
    return Math.min(Math.max(percent, 0), 100);
  };

  const progress = calculateProgress();

  return (
    <div className="task-row">
      <div className="task-content">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggle(task.id)} 
        />
        
        <div className="task-info" style={{ flex: 1 }}>
          <Link 
            to={`/details/${task.id}`} 
            className={`task-title-link ${task.completed ? "completed-text" : ""}`}
          >
            {task.title}
          </Link>

          {/* BARRE DE PROGRESSION MANUELLE */}
          {/* Elle s'affiche même si complétée, ou on peut la cacher comme tu avais fait */}
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${progress}%`,
                // On utilise une couleur plus vive en mode sombre
                backgroundColor: progress >= 100 ? '#4CAF50' : (isDark ? '#818cf8' : '#6366f1'),
                transition: 'width 0.5s ease-in-out'
              }}
            ></div>
          </div>
          
          <div className="task-timestamps">
            <span className="time-badge">
              <MdAccessTime size={12} /> Créé à : {task.createdAt}
            </span>
            
            {task.completedAt && (
              <span className="time-badge completed-badge">
                <MdCheckCircle size={12} /> Fini à : {task.completedAt}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={() => navigate(`/details/${task.id}`)} 
          className="action-icon-btn update-btn"
          title="Modifier"
        >
          <GrUpdate />
        </button>
          
        <button 
          onClick={() => onDelete(task.id)} 
          className="action-icon-btn delete-btn"
          title="Supprimer"
        >
          {/* Ici isDark change bien l'icône */}
          {isDark ? <RiDeleteBin7Line size={20} /> : <RiDeleteBinLine size={20} />}
        </button>
      </div>
    </div>
  );
}