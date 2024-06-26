import type { UserSummary } from '@/models/user'
import {
  lendingHistory1,
  lendingHistory2,
  lendingHistory3,
  lendingHistory4,
  lendingHistory5,
  lendingHistory6,
} from './lendingHistory'

export const user1: UserSummary = {
  id: 1,
  name: 'テスト太郎',
  email: 'test1@example.com',
  imageUrl: 'https://example.com/image/1',
  createdAt: new Date(),
  lendingHistories: [
    { ...lendingHistory1, returnHistory: null },
    { ...lendingHistory2, returnHistory: null },
    { ...lendingHistory3, returnHistory: null },
    {
      ...lendingHistory3,
      returnHistory: {
        lendingHistoryId: lendingHistory3.id,
        returnedAt: new Date('2021-02-03'),
      },
    },
    {
      ...lendingHistory4,
      returnHistory: {
        lendingHistoryId: lendingHistory4.id,
        returnedAt: new Date('2021-02-04'),
      },
    },
    {
      ...lendingHistory4,
      returnHistory: {
        lendingHistoryId: lendingHistory4.id,
        returnedAt: new Date('2021-04-04'),
      },
    },
    {
      ...lendingHistory5,
      returnHistory: {
        lendingHistoryId: lendingHistory5.id,
        returnedAt: new Date('2021-02-05'),
      },
    },
    {
      ...lendingHistory6,
      returnHistory: {
        lendingHistoryId: lendingHistory6.id,
        returnedAt: new Date('2021-02-06'),
      },
    },
  ],
}

export const user2: UserSummary = {
  id: 2,
  name: 'テスト二郎',
  email: 'test2@example.com',
  imageUrl: null,
  createdAt: new Date(),
  lendingHistories: [],
}
