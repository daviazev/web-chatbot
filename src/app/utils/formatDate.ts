const formatDateToString = (date: Date) => {
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
};

export function formatDate(data: string): string {
  const dateObj = new Date(data);
  const day = padZero(dateObj.getDate());
  const month = padZero(dateObj.getMonth() + 1);
  const year = dateObj.getFullYear();
  const hour = padZero(dateObj.getHours());
  const minute = padZero(dateObj.getMinutes());

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

function padZero(number: number): string {
  return number.toString().padStart(2, "0");
}

export default formatDateToString;
