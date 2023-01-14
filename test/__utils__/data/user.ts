import { UserSummary } from '@/models/user'

export const user1: UserSummary = {
  id: 1,
  name: 'テスト太郎',
  email: 'test1@example.com',
  imageUrl: 'https://example.com/image/1',
  lendingHistories: [
    { returnHistories_aggregate: { aggregate: { count: 1 } } },
    { returnHistories_aggregate: { aggregate: { count: 1 } } },
    { returnHistories_aggregate: { aggregate: { count: 0 } } },
  ],
}

export const user2: UserSummary = {
  id: 2,
  name: 'テスト二郎',
  email: 'test2@example.com',
  lendingHistories: [],
}