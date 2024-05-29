export const getFormattedDate = (date: Date) => {
  const month = date.getMonth() + 1
  return `${month < 10 ? `0${month}` : month}/${date.getDate()}/${date.getFullYear()}`
}
