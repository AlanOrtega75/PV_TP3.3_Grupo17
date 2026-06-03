import React from 'react';

const DetalleProyecto = ({ proyecto, onCerrar }) => {
  if (!proyecto) return null;

  const {
    titulo,
    categoria,
    estado,
    id,
    descripcion,
    recursos = [],
    equipo = [],
  } = proyecto;

  return (
    <section className="project-detail-panel">
      <div className="detail-header">
        <div>
          <h2>Detalle de proyecto</h2>
          <p>{titulo}</p>
        </div>
        <button type="button" className="secondary-button" onClick={onCerrar}>
          Cerrar
        </button>
      </div>

      <div className="detail-section">
        <h4>Descripción</h4>
        <p>{descripcion}</p>
      </div>

      <div className="detail-section">
        <h4>Equipo</h4>
        <ul>
          {equipo.map((miembro) => (
            <li key={`${miembro.nombre}-${miembro.rol}`}>
              <strong>{miembro.nombre}</strong> — {miembro.rol}
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h4>Recursos</h4>
        <ul>
          {recursos.map((recurso) => (
            <li key={`${recurso.tipo}-${recurso.enlace}`}>
              <a href={recurso.enlace} target="_blank" rel="noreferrer">
                {recurso.tipo}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-meta">
        <p>ID: <strong>{id}</strong></p>
        <p>Categoría: <strong>{categoria}</strong></p>
        <p>Estado: <strong>{estado}</strong></p>
      </div>
    </section>
  );
};

export default DetalleProyecto;
