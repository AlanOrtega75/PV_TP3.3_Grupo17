import React, { useEffect, useState } from 'react';
import { obtenerProyectos, agregarProyecto, eliminarProyecto, buscarProyecto } from '../services/proyectoService';
import ProyectoCard from './ProyectoCard';
import DetalleProyecto from './DetalleProyecto';
import FormularioProyecto from './FormularioProyecto';

const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleAgregarProyecto = (nuevoProyecto) => {
    setProyectos(agregarProyecto(nuevoProyecto));
    setBusqueda('');
  };

  return (
    <div className="contenedor-proyectos">
      <section className="project-panel" id="nuevo-proyecto">
        <div className="project-panel-header">
          <h2>Módulo de Proyectos</h2>
          <p>Registra, filtra y administra tus proyectos desde una sola interfaz.</p>
        </div>

        <FormularioProyecto onAgregar={handleAgregarProyecto} />
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