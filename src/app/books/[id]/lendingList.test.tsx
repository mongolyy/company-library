import { render, screen } from '@testing-library/react'
import { DateTime, Settings } from 'luxon'
import { Suspense } from 'react'
import LendingList from '@/app/books/[id]/lendingList'
import { lendableBook } from '../../../../test/__utils__/data/book'
import { prismaMock } from '../../../../test/__utils__/libs/prisma/singleton'

describe('LendingList Component', async () => {
  const { UserAvatarMock } = vi.hoisted(() => {
    return {
      UserAvatarMock: vi.fn().mockImplementation(({ user }) => <div>{user.name}</div>),
    }
  })
  vi.mock('@/components/userAvatar', () => ({
    default: (...args: unknown[]) => UserAvatarMock(...args),
  }))

  const expectedLendingHistories = [
    {
      id: 2,
      dueDate: new Date('2022-10-30'),
      lentAt: new Date('2022-10-01'),
      user: { id: 2, name: 'user02' },
      location: { id: 1, name: '図書館' },
    },
    {
      id: 3,
      dueDate: new Date('2022-10-31'),
      lentAt: new Date('2022-10-01'),
      user: { id: 3, name: 'user03' },
      location: { id: 2, name: 'オフィス' },
    },
    {
      id: 1,
      dueDate: new Date('2022-11-01'),
      lentAt: new Date('2022-10-01'),
      user: { id: 1, name: 'user01' },
      location: null,
    },
  ]

  const prismaLendingHistoryMock = prismaMock.lendingHistory.findMany

  it('貸出中のユーザーがいる場合、その一覧が返却予定日の昇順で表示される', async () => {
    // @ts-ignore
    prismaLendingHistoryMock.mockResolvedValue(expectedLendingHistories)

    render(
      <Suspense>
        <LendingList bookId={lendableBook.id} />
      </Suspense>,
    )

    // Suspenseの解決を待つために、最初のテスト項目のみawaitを使う
    expect((await screen.findByTestId(`dueDate-${0}`)).textContent).toBe('2022/10/30')
    expect(screen.getByTestId(`lendingUser-${0}`).textContent).toBe(
      expectedLendingHistories[0].user.name,
    )
    expect(screen.getByTestId(`dueDate-${1}`).textContent).toBe('2022/10/31')
    expect(screen.getByTestId(`lendingUser-${1}`).textContent).toBe(
      expectedLendingHistories[1].user.name,
    )
    expect(screen.getByTestId(`dueDate-${2}`).textContent).toBe('2022/11/01')
    expect(screen.getByTestId(`lendingUser-${2}`).textContent).toBe(
      expectedLendingHistories[2].user.name,
    )
    expect(screen.getByTestId(`location-${0}`).textContent).toBe('図書館')
    expect(screen.getByTestId(`location-${1}`).textContent).toBe('オフィス')
    expect(screen.getByTestId(`location-${2}`).textContent).toBe('場所不明')
    expect(prismaLendingHistoryMock.mock.calls[0][0]?.orderBy).toStrictEqual([{ lentAt: 'asc' }])
  })

  it('返却予定日は、表示した日を過ぎていた場合、赤太字になる', async () => {
    const expectedNow = DateTime.local(2022, 10, 31, 10, 0, 0)
    Settings.now = () => expectedNow.toMillis()
    // @ts-ignore
    prismaLendingHistoryMock.mockResolvedValue(expectedLendingHistories)

    render(
      <Suspense>
        <LendingList bookId={lendableBook.id} />
      </Suspense>,
    )

    // Suspenseの解決を待つために、最初のテスト項目のみawaitを使う
    expect((await screen.findByTestId(`dueDate-${0}`)).textContent).toBe('2022/10/30')
    expect(screen.getByTestId(`dueDate-${0}`)).toHaveClass('text-red-400', 'font-bold')
    expect(screen.getByTestId(`dueDate-${1}`).textContent).toBe('2022/10/31')
    expect(screen.getByTestId(`dueDate-${1}`)).not.toHaveClass('text-red-400')
    expect(screen.getByTestId(`dueDate-${1}`)).not.toHaveClass('font-bold')
    expect(screen.getByTestId(`dueDate-${2}`).textContent).toBe('2022/11/01')
    expect(screen.getByTestId(`dueDate-${2}`)).not.toHaveClass('text-red-400')
    expect(screen.getByTestId(`dueDate-${2}`)).not.toHaveClass('font-bold')
  })

  it('貸出中のユーザーがいない場合、その旨のメッセージが表示される', async () => {
    // @ts-ignore
    prismaLendingHistoryMock.mockResolvedValue([])

    render(
      <Suspense>
        <LendingList bookId={lendableBook.id} />
      </Suspense>,
    )

    // Suspenseの解決を待つために、最初のテスト項目のみawaitを使う
    expect(await screen.findByText('現在借りているユーザーはいません')).toBeInTheDocument()
  })

  it('返却履歴の取得時にエラーが発生した場合、エラーメッセージが表示される', async () => {
    const expectedError = new Error('DBエラー')
    prismaLendingHistoryMock.mockRejectedValue(expectedError)
    console.error = vi.fn()

    render(
      <Suspense>
        <LendingList bookId={lendableBook.id} />
      </Suspense>,
    )

    // Suspenseの解決を待つために、最初のテスト項目のみawaitを使う
    expect(
      await screen.findByText('貸出履歴の取得に失敗しました。再読み込みしてみてください。'),
    ).toBeInTheDocument()
    expect(console.error).toBeCalledWith(expectedError)
  })

  it('貸し出し場所が正しく表示される', async () => {
    const lendingHistoriesWithLocation = [
      {
        id: 1,
        dueDate: new Date('2022-11-01'),
        lentAt: new Date('2022-10-01'),
        user: { id: 1, name: 'user01' },
        location: { id: 1, name: '図書館' },
      },
      {
        id: 2,
        dueDate: new Date('2022-11-02'),
        lentAt: new Date('2022-10-02'),
        user: { id: 2, name: 'user02' },
        location: null,
      },
    ]

    // @ts-ignore
    prismaLendingHistoryMock.mockResolvedValue(lendingHistoriesWithLocation)

    render(
      <Suspense>
        <LendingList bookId={lendableBook.id} />
      </Suspense>,
    )

    // Suspenseの解決を待つために、最初のテスト項目のみawaitを使う
    expect(await screen.findByTestId('location-0')).toHaveTextContent('図書館')
    expect(screen.getByTestId('location-1')).toHaveTextContent('場所不明')
  })
})
