import React, { useState } from 'react';

const FormularioProyecto = ({ onAgregar }) => {
  const [formValues, setFormValues] = useState({
    titulo: '',
    idProyecto: '',
    categoria: '',
    estado: 'Pendiente',
    descripcion: '',
    recursos: '',
    equipo: '',
  });

  const [error, setError] = useState('');

  const { titulo, idProyecto, categoria, estado, descripcion, recursos, equipo } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const parseRecursos = (texto) => {
    return texto
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [tipo, enlace] = item.split('|').map((parte) => parte.trim());

        return {
          tipo: tipo || 'Recurso',
          enlace: enlace || '#',
        };
      });
  };

  const parseEquipo = (texto) => {
    return texto
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [nombre, rol] = item.split('|').map((parte) => parte.trim());

        return {
          nombre: nombre || 'Miembro',
          rol: rol || 'Rol no definido',
        };
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError('El nombre del proyecto es obligatorio.');
      return;
    }

    const nuevoProyecto = {
      id: idProyecto.trim() || undefined,
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      estado,
      descripcion: descripcion.trim() || 'Descripción general del proyecto. Este proyecto busca aportar una solución educativa clara, organizada y funcional.',
      recursos: parseRecursos(recursos),
      equipo: parseEquipo(equipo),
    };

    onAgregar(nuevoProyecto);

    setFormValues({
      titulo: '',
      idProyecto: '',
      categoria: '',
      estado: 'Pendiente',
      descripcion: '',
      recursos: '',
      equipo: '',
    });

    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="project-form-row">
        <label htmlFor="tituloProyecto">Nombre del proyecto</label>
        <input
          id="tituloProyecto"
          name="titulo"
          type="text"
          placeholder="Ej. Plataforma de Exámenes"
          value={titulo}
          onChange={handleChange}
        />
      </div>

      <div className="project-form-row">
        <label htmlFor="descripcionProyecto">Descripción</label>
        <textarea
          id="descripcionProyecto"
          name="descripcion"
          placeholder="Describe brevemente el proyecto"
          value={descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="project-form-grid">
        <div className="project-form-row">
          <label htmlFor="idProyecto">ID</label>
          <input
            id="idProyecto"
            name="idProyecto"
            type="text"
            placeholder="Ej. 006"
            value={idProyecto}
            onChange={handleChange}
          />
        </div>

        <div className="project-form-row">
          <label htmlFor="categoriaProyecto">Categoría</label>
          <input
            id="categoriaProyecto"
            name="categoria"
            type="text"
            placeholder="Ej. Web, Mobile, Desktop"
            value={categoria}
            onChange={handleChange}
          />
        </div>

        <div className="project-form-row">
          <label htmlFor="estadoProyecto">Estado</label>
          <select
            id="estadoProyecto"
            name="estado"
            value={estado}
            onChange={handleChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completado">Completado</option>
          </select>
        </div>
      </div>

      <div className="project-form-row">
        <label htmlFor="recursosProyecto">Recursos</label>
        <input
          id="recursosProyecto"
          name="recursos"
          type="text"
          placeholder="GitHub|https://..., Drive|https://..., PDF|https://..."
          value={recursos}
          onChange={handleChange}
        />
      </div>

      <div className="project-form-row">
        <label htmlFor="equipoProyecto">Equipo</label>
        <input
          id="equipoProyecto"
          name="equipo"
          type="text"
          placeholder="Nombre|Rol, Nombre|Rol"
          value={equipo}
          onChange={handleChange}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="primary-button">
        Agregar proyecto
      </button>
    </form>
  );
};

export default FormularioProyecto;