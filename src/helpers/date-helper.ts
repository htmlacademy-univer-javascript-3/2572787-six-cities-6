export function formatDate(date: Date) {
  return {
    date: date.toISOString().split('T')[0],
    displayDate: date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  };
}
