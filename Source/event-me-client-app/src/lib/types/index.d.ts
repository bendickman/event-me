type AppEvent = {
  id: string
  title: string
  date: Date
  description: string
  category: string
  isCancelled: boolean
  city: string
  venue: string
  latitude: number
  longitude: number
}

type PaginatedResults<T> = {
  items: T[]
  cursoe: string
}