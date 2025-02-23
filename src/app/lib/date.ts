export const getFormattedDate = (date: Date, ignoreTz: boolean = false) => {
  const offset = date.getTimezoneOffset() * 60000
  const adjustedDate = new Date(date.getTime() - (ignoreTz ? offset : 0))
  const month = adjustedDate.getUTCMonth() + 1
  return `${String(month).padStart(2, '0')}/${String(adjustedDate.getUTCDate()).padStart(2, '0')}/${adjustedDate.getUTCFullYear()}`
}
