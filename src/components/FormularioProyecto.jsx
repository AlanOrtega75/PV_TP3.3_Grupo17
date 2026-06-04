import { useState } from 'react';

const FormularioProyecto = ({ onAgregar }) => {
  const [formValues, setFormValues] = useState({
    titulo: '',
    idProyecto: '',
    categoria: '',
    estado: 'Pendiente',
    descripcion: '',
  });

  // listas que se van armando con los botones "Agregar"
  const [recursos, setRecursos] = useState([]);
  const [equipo, setEquipo] = useState([]);

  // inputs temporales: lo que se esta cargando antes de sumarlo a la lista
  const [recursoActual, setRecursoActual] = useState({ tipo: 'GitHub', enlace: '' });
  const [miembroActual, setMiembroActual] = useState({ nombre: '', rol: '' });

  const [error, setError] = useState('');

  const { titulo, idProyecto, categoria, estado, descripcion } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // suma el recurso cargado en los inputs temporales a la lista
  const agregarRecurso = () => {
    if (!recursoActual.enlace.trim()) {
      return;
    }

    setRecursos((prev) => [...prev, { tipo: recursoActual.tipo, enlace: recursoActual.enlace.trim() }]);
    setRecursoActual({ tipo: 'GitHub', enlace: '' });
  };

  const quitarRecurso = (indice) => {
    setRecursos((prev) => prev.filter((_, i) => i !== indice));
  };

  // suma el miembro cargado en los inputs temporales a la lista
  const agregarMiembro = () => {
    if (!miembroActual.nombre.trim()) {
      return;
    }

    setEquipo((prev) => [...prev, {
      nombre: miembroActual.nombre.trim(),
      rol: miembroActual.rol.trim() || 'Rol no definido',
    }]);
    setMiembroActual({ nombre: '', rol: '' });
  };

  const quitarMiembro = (indice) => {
    setEquipo((prev) => prev.filter((_, i) => i !== indice));
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
      recursos,
      equipo,
    };

    onAgregar(nuevoProyecto);

    // limpio todo el formulario
    setFormValues({
      titulo: '',
      idProyecto: '',
      categoria: '',
      estado: 'Pendiente',
      descripcion: '',
    });
    setRecursos([]);
    setEquipo([]);
    setRecursoActual({ tipo: 'GitHub', enlace: '' });
    setMiembroActual({ nombre: '', rol: '' });
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
        <label htmlFor="enlaceRecurso">Recursos</label>
        <div className="project-form-inline">
          <select
            id="tipoRecurso"
            name="tipoRecurso"
            value={recursoActual.tipo}
            onChange={(e) => setRecursoActual((prev) => ({ ...prev, tipo: e.target.value }))}
          >
            <option value="GitHub">GitHub</option>
            <option value="Drive">Drive</option>
            <option value="PDF">PDF</option>
          </select>
          <input
            id="enlaceRecurso"
            type="text"
            placeholder="https://..."
            value={recursoActual.enlace}
            onChange={(e) => setRecursoActual((prev) => ({ ...prev, enlace: e.target.value }))}
          />
          <button type="button" className="secondary-button" onClick={agregarRecurso}>
            Agregar
          </button>
        </div>

        {recursos.length > 0 && (
          <ul className="form-chips">
            {recursos.map((recurso, indice) => (
              <li key={`${recurso.tipo}-${indice}`}>
                <span>{recurso.tipo} — {recurso.enlace}</span>
                <button type="button" onClick={() => quitarRecurso(indice)}>
                  quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="project-form-row">
        <label htmlFor="nombreMiembro">Equipo</label>
        <div className="project-form-inline">
          <input
            id="nombreMiembro"
            type="text"
            placeholder="Nombre"
            value={miembroActual.nombre}
            onChange={(e) => setMiembroActual((prev) => ({ ...prev, nombre: e.target.value }))}
          />
          <input
            id="rolMiembro"
            name="rolMiembro"
            type="text"
            placeholder="Rol"
            value={miembroActual.rol}
            onChange={(e) => setMiembroActual((prev) => ({ ...prev, rol: e.target.value }))}
          />
          <button type="button" className="secondary-button" onClick={agregarMiembro}>
            Agregar
          </button>
        </div>

        {equipo.length > 0 && (
          <ul className="form-chips">
            {equipo.map((miembro, indice) => (
              <li key={`${miembro.nombre}-${indice}`}>
                <span>{miembro.nombre} — {miembro.rol}</span>
                <button type="button" onClick={() => quitarMiembro(indice)}>
                  quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="primary-button">
        Agregar proyecto
      </button>
    </form>
  );
};

export default FormularioProyecto;
