export const getNextDayOfWeek = (date: Date, dayOfWeek: number) => {
  const resultDate = new Date(date.getTime())
  resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7))
  return resultDate
}

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const getNextWeekDates = (date: Date) => {
  const nextMonday = getNextDayOfWeek(date, 1)
  const nextFriday = addDays(nextMonday, 5)
  return { nextMonday, nextFriday }
}
