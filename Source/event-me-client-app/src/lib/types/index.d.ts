type AppEvent = {
  id: string
  title: string
  date: Date
  description: string
  category: string
  isCancelled: boolean
  city: string
  venue: string
}

type PaginatedResults<T> = {
  items: T[]
  cursoe: string
}

type User = {
  id: string
  email: string
  displayName: string
  imageUrl?: string
}

type ChatComment = {
  id: string
  createdAt: Date
  body: string
  userId: string
  displayName: string
  imageUrl?: string
}