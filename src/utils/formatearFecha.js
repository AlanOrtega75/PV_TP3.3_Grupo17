const formatearFecha = (fecha) => {
  const d = new Date(fecha);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const anio = d.getFullYear();
  const horas = String(d.getHours()).padStart(2, '0');
  const minutos = String(d.getMinutes()).padStart(2, '0');

  return `Última actualización de la lista: ${dia}/${mes}/${anio} a las ${horas}:${minutos} hs.`;
};

export default formatearFecha;