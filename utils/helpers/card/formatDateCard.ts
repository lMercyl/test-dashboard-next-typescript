export const formatDateCard = (date: Date) => {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return (
    days[date.getDay()] +
    ' ' +
    new Date(date).toLocaleDateString() +
    ' | ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
};
