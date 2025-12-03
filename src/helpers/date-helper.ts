export function formatDate(date: string) {
  const dateObj = new Date(date);
  return {
    date: dateObj.toISOString().split('T')[0],
    displayDate: dateObj.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  };
}
