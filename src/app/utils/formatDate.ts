const formatDate = (date: Date) => {
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
};

export default formatDate;
