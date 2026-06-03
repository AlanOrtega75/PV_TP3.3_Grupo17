// Contrato del objeto proyecto: { id, titulo, categoria, estado, descripcion, recursos[], equipo[] }
const proyectoService = (() => {
  let proyectos = [
    {
      id: 1,
      titulo: 'Aula Virtual Interactiva',
      categoria: 'Web',
      estado: 'En Progreso',
      descripcion:
        'Este proyecto es una plataforma de aprendizaje interactivo que permite a los estudiantes acceder a contenido multimedia, actividades y evaluaciones en línea. Incluye funcionalidades para monitorear el progreso, gestionar cursos y colaborar con tutores en tiempo real. Además, integra un sistema de notificaciones personalizadas y un tablero de análisis para medir el rendimiento académico.',
      recursos: [
        { tipo: 'GitHub', enlace: 'https://github.com/ejemplo/aula-virtual' },
        { tipo: 'Drive', enlace: 'https://drive.google.com/ejemplo/aula-virtual' },
        { tipo: 'PDF', enlace: 'https://example.com/aula-virtual.pdf' },
      ],
      equipo: [
        { nombre: 'María Pérez', rol: 'Líder de proyecto' },
        { nombre: 'Juan López', rol: 'Desarrollador Frontend' },
        { nombre: 'Carolina Díaz', rol: 'QA' },
      ],
    },
    {
      id: 2,
      titulo: 'App de Asistencia Escolar',
      categoria: 'Mobile',
      estado: 'Completado',
      descripcion:
        'Aplicación móvil diseñada para gestionar la asistencia, notificaciones y horarios de los estudiantes. Ofrece reportes automáticos y comunicación directa entre padres, profesores y el equipo administrativo. Además, cuenta con un módulo de seguimiento de ausencias y generación de estadísticas por curso.',
      recursos: [
        { tipo: 'GitHub', enlace: 'https://github.com/ejemplo/asistencia-escolar' },
        { tipo: 'Drive', enlace: 'https://drive.google.com/ejemplo/asistencia-escolar' },
        { tipo: 'PDF', enlace: 'https://example.com/asistencia-escolar.pdf' },
      ],
      equipo: [
        { nombre: 'Luis Gómez', rol: 'Product Owner' },
        { nombre: 'Ana Torres', rol: 'Diseñadora UI/UX' },
        { nombre: 'Pedro Ruiz', rol: 'Backend' },
      ],
    },
    {
      id: 3,
      titulo: 'Control de Equipamiento',
      categoria: 'Desktop',
      estado: 'Pendiente',
      descripcion:
        'Sistema de escritorio para el seguimiento de inventario, mantenimiento y ubicación de equipos en una institución. Incluye módulos de alertas, historial de reparaciones y administración de recursos técnicos. También ofrece reportes detallados sobre estado y disponibilidad de activos.',
      recursos: [
        { tipo: 'GitHub', enlace: 'https://github.com/ejemplo/control-equipamiento' },
        { tipo: 'Drive', enlace: 'https://drive.google.com/ejemplo/control-equipamiento' },
        { tipo: 'PDF', enlace: 'https://example.com/control-equipamiento.pdf' },
      ],
      equipo: [
        { nombre: 'Natalia Ruiz', rol: 'Analista' },
        { nombre: 'Carlos Menéndez', rol: 'Desarrollador Desktop' },
      ],
    },
    {
      id: 4,
      titulo: 'Biblioteca Digital',
      categoria: 'Web',
      estado: 'En Progreso',
      descripcion:
        'Plataforma digital para acceder a libros, artículos y recursos educativos desde cualquier dispositivo. Permite búsquedas avanzadas, selección de favoritos y acceso a contenidos multimedia asociados. Incluye un sistema de recomendaciones basado en intereses de los usuarios.',
      recursos: [
        { tipo: 'GitHub', enlace: 'https://github.com/ejemplo/biblioteca-digital' },
        { tipo: 'Drive', enlace: 'https://drive.google.com/ejemplo/biblioteca-digital' },
        { tipo: 'PDF', enlace: 'https://example.com/biblioteca-digital.pdf' },
      ],
      equipo: [
        { nombre: 'Daniela Fernández', rol: 'Community Manager' },
        { nombre: 'Alejandro Santos', rol: 'Desarrollador Backend' },
      ],
    },
    {
      id: 5,
      titulo: 'Plataforma de Exámenes',
      categoria: 'Web',
      estado: 'Completado',
      descripcion:
        'Herramienta para crear, programar y corregir exámenes en línea con seguridad y estadísticas avanzadas. Integra funciones de temporizador, acceso restringido y retroalimentación inmediata para el estudiante. Asimismo, permite generar informes de desempeño por alumno y por grupo.',
      recursos: [
        { tipo: 'GitHub', enlace: 'https://github.com/ejemplo/plataforma-examenes' },
        { tipo: 'Drive', enlace: 'https://drive.google.com/ejemplo/plataforma-examenes' },
        { tipo: 'PDF', enlace: 'https://example.com/plataforma-examenes.pdf' },
      ],
      equipo: [
        { nombre: 'Sofía Vargas', rol: 'Coordinadora' },
        { nombre: 'Ricardo Silva', rol: 'Fullstack Developer' },
      ],
    },
  ];

  const obtenerProyectos = () => {
    return [...proyectos];
  };

  const agregarProyecto = (nuevoProyecto) => {
    const id = nuevoProyecto.id ? nuevoProyecto.id : Date.now();

    const proyectoConId = {
      ...nuevoProyecto,
      id,
    };

    proyectos.push(proyectoConId);

    return [...proyectos];
  };

  const eliminarProyecto = (id) => {
    proyectos = proyectos.filter((proy) => proy.id !== id);

    return [...proyectos];
  };

  const buscarProyecto = (texto) => {
    const criterio = texto.trim().toLowerCase();

    if (!criterio) {
      return [...proyectos];
    }

    return proyectos.filter((proy) => {
      const textoProyecto = `${proy.titulo} ${proy.categoria} ${proy.estado}`.toLowerCase();
      return textoProyecto.includes(criterio);
    });
  };

  return {
    obtenerProyectos,
    agregarProyecto,
    eliminarProyecto,
    buscarProyecto,
  };
})();

export const {
  obtenerProyectos,
  agregarProyecto,
  eliminarProyecto,
  buscarProyecto,
} = proyectoService;

export default proyectoService;
