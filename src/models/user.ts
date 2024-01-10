import { LendingHistory } from '@/models/lendingHistory'
import { ReturnHistory } from '@/models/returnHistory'
import { User as PrismaUser } from '@prisma/client'

export type User = PrismaUser

export type OldUser = {
  id: number
  name: string
  email: string
}

export type OldUserSummary = {
  id: number
  name: string
  email: string
  imageUrl?: string | null
  lendingHistories: Array<{
    bookId: number
    returnHistories_aggregate: { aggregate?: { count: number } | null }
  }>
}

export type UserSummary = {
  id: number
  name: string
  email: string
  imageUrl: string | null
  createdAt: Date
  lendingHistories: Array<
    LendingHistory & {
      returnHistory: ReturnHistory | null
    }
  >
}
