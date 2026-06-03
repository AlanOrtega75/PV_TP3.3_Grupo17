import React from 'react';

const ProyectoCard = ({ proyecto, onEliminar, onVerDetalle }) => {
  const { id, titulo, categoria, estado } = proyecto;
  return (
    <article className="project-card">
      <div className="project-card-header">
        <div>
          <h4>{titulo}</h4>
          <span className="project-badge">{categoria}</span>
        </div>
      </div>

      <div className="project-card-footer">
        <button type="button" className="secondary-button" onClick={() => onVerDetalle(proyecto)}>
          Ver detalle
        </button>
        <button type="button" className="secondary-button delete-button" onClick={() => onEliminar(id)}>
          Eliminar
        </button>
      </div>

      <div className="project-meta">
        <p className="meta-row">
          ID: <strong>{id}</strong>
        </p>
        <p className="meta-row">
          Categoría: <strong>{categoria}</strong>
        </p>
        <p className="meta-row">
          Estado:
          <span className={`project-status status-${estado.replace(/\s+/g, '-').toLowerCase()}`}>
            {estado}
          </span>
        </p>
      </div>
    </article>
  );
};

export default ProyectoCard;