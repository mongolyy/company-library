import BookTile from '@/components/bookTile'
import { render } from '@testing-library/react'
import { bookWithImage, bookWithoutImage } from '../__utils__/data/book'

jest.mock('next/image', () => ({
  __esModule: true,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  default: (props: any) => {
    // biome-ignore lint/a11y/useAltText: <explanation>
    return <img {...props} />
  },
}))

describe('book component', () => {
  it('本のタイトルと画像が表示される', () => {
    const { getByText, getByTestId } = render(<BookTile book={bookWithImage} />)

    expect(getByText(bookWithImage.title)).toBeInTheDocument()
    expect(getByTestId('bookImg')).toHaveAttribute('src', bookWithImage.imageUrl)
    expect(getByTestId('bookImg')).toHaveAttribute('alt', bookWithImage.title)
  })

  it('画像が無い場合はNoImageが表示される', () => {
    const { getByText, getByTestId } = render(<BookTile book={bookWithoutImage} />)

    expect(getByText(bookWithoutImage.title)).toBeInTheDocument()
    expect(getByTestId('bookImg')).toHaveAttribute('src', '/no_image.jpg')
    expect(getByTestId('bookImg')).toHaveAttribute('alt', bookWithoutImage.title)
  })

  it('idが設定されている場合、クリックすると詳細画面へ遷移する', () => {
    const { getByRole } = render(<BookTile book={bookWithImage} />)

    expect(getByRole('link')).toHaveAttribute('href', `/books/${bookWithImage.id}`)
  })
})
