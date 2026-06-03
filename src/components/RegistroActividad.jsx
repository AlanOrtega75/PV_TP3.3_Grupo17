import formatearFecha from '../utils/formatearFecha';

const RegistroActividad = ({ fecha }) => {
  return (
    <div className="registro-actividad">
      <p>{formatearFecha(fecha)}</p>
    </div>
  );
};

export default RegistroActividad;