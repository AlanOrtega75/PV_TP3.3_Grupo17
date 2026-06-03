import React, { useEffect, useState } from 'react';
import { obtenerProyectos, agregarProyecto, eliminarProyecto, buscarProyecto } from '../services/proyectoService';
import ProyectoCard from './ProyectoCard';
import DetalleProyecto from './DetalleProyecto';

const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [formValues, setFormValues] = useState({
    titulo: '',
    idProyecto: '',
    categoria: '',
    estadoProyecto: 'Pendiente',
    descripcion: '',
    recursos: '',
    equipo: '',
  });
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const { titulo, idProyecto, categoria, estadoProyecto, descripcion, recursos, equipo } = formValues;

  useEffect(() => {
    setProyectos(obtenerProyectos());
  }, []);

  const handleBuscar = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (!texto.trim()) {
      setProyectos(obtenerProyectos());
      return;
    }

    setProyectos(buscarProyecto(texto));
  };

  const handleEliminar = (id) => {
    setProyectos(eliminarProyecto(id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

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
        const [nombre, url] = item.split('|').map((part) => part.trim());
        return {
          nombre: nombre || 'Recurso',
          url: url || item,
        };
      });
  };

  const parseEquipo = (texto) => {
    return texto
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [nombre, rol] = item.split('|').map((part) => part.trim());
        return {
          nombre: nombre || 'Miembro',
          rol: rol || 'Rol',
        };
      });
  };

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError('El nombre del proyecto es obligatorio.');
      return;
    }

    const nuevoProyecto = {
      id: idProyecto.trim() || undefined,
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      estado: estadoProyecto,
      descripcion: descripcion.trim()
        ? [descripcion.trim(), 'Esta descripción complementaria ayuda a entender el alcance y la estructura del proyecto.']
        : [
            'Descripción genérica del proyecto que proporciona contexto y objetivos principales.',
            'Segunda descripción que amplía detalles del desarrollo, funcionalidades y beneficios esperados.',
          ],
      recursos: parseRecursos(recursos),
      equipo: parseEquipo(equipo),
    };

    setProyectos(agregarProyecto(nuevoProyecto));

    setFormValues({
      titulo: '',
      idProyecto: '',
      categoria: '',
      estadoProyecto: 'Pendiente',
      descripcion: '',
      recursos: '',
      equipo: '',
    });
    setBusqueda('');
    setError('');
  };

  return (
    <div className="contenedor-proyectos">
      <section className="project-panel" id="nuevo-proyecto">
        <div className="project-panel-header">
          <h2>Módulo de Proyectos</h2>
          <p>Registra, filtra y administra tus proyectos desde una sola interfaz.</p>
        </div>

        <form onSubmit={handleAgregar} className="project-form">
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
                name="estadoProyecto"
                value={estadoProyecto}
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
      </section>

      <section className="project-search-panel">
        <label htmlFor="buscarProyectos">Buscar proyectos</label>
        <input
          id="buscarProyectos"
          type="text"
          placeholder="Buscar por título, categoría o estado"
          value={busqueda}
          onChange={handleBuscar}
        />
      </section>

      <section className="project-database" id="lista-proyectos">
        <div className="project-database-header">
          <h3>Base de datos de proyectos</h3>
          <p>Revisa los proyectos guardados y elimina los que ya no necesites.</p>
        </div>

        {proyectos.length > 0 ? (
          <div className="project-list">
            {proyectos.map((proy) => (
              <ProyectoCard
                key={proy.id}
                proyecto={proy}
                onEliminar={handleEliminar}
                onVerDetalle={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">No hay proyectos registrados en este momento.</p>
        )}
      </section>

      {selectedProject && (
        <DetalleProyecto proyecto={selectedProject} onCerrar={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default ListaProyectos;
