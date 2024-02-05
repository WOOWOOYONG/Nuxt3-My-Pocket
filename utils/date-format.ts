export const formatDateString = (dateString: string) => {
  const date = new Date(dateString)
  return date
    .toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/\//g, '-')
}
