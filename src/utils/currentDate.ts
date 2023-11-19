export function currentDate(modifyYear = 0, modifyMonth = 0, modifyDay = 0) {
  const today = new Date();

  // Get the current date components
  const year = today.getFullYear() + modifyYear;

  today.setMonth(today.getMonth() + modifyMonth);
  const month = String(today.getMonth() + 1).padStart(2, "0");

  today.setDate(today.getDate() + modifyDay);
  const day = String(today.getDate() + modifyDay).padStart(2, "0");

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
