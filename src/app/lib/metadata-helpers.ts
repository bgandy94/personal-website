const siteName = 'Brandon Gandy'
export const generateFormattedTitle = (prependStr?: string) => {
  return `${prependStr ? prependStr + ' | ' : ''}${siteName}`
}
