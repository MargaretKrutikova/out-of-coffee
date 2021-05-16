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

const getNextWeekDates = (date: Date) => {
  const nextMonday = getNextDayOfWeek(date, 1)
  const nextFriday = addDays(nextMonday, 5)
  return { nextMonday, nextFriday }
}

export const getOrderDeliveryDate = (orderDateStr: string) => {
  const orderDate = new Date(orderDateStr)
  const { nextMonday } = getNextWeekDates(orderDate)
  return nextMonday
}

export const formatDateStr = (orderDateStr: string | Date) =>
  new Date(orderDateStr).toLocaleDateString()

export const formatWithMonthStr = (dateStr: string | Date) =>
  new Date(dateStr).toDateString().split(" ").slice(1).join(" ")
