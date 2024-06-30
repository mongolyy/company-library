'use client'

import { returnBook } from '@/app/books/[id]/actions'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, type FC, startTransition, useRef, useState } from 'react'

type ReturnButtonProps = {
  bookId: number
  userId: number
  lendingHistoryId: number
  disabled: boolean
}

const ReturnButton: FC<ReturnButtonProps> = ({ bookId, userId, lendingHistoryId, disabled }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openModal = () => dialogRef.current && dialogRef.current.showModal()
  const closeModal = () => dialogRef.current && dialogRef.current.close()

  const [impression, setImpression] = useState('')
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setImpression(e.target.value)
  }

  const router = useRouter()
  const onClick = () => {
    startTransition(async () => {
      const result = await returnBook({
        bookId,
        userId,
        lendingHistoryId,
        impression,
      })
      if (result instanceof Error) {
        window.alert('返却に失敗しました。もう一度試してみてください。')
        return
      }

      closeModal()
      router.refresh()
    })
  }

  return (
    <>
      <button type="button" className="btn" disabled={disabled} onClick={openModal}>
        返却する
      </button>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">返却しますか？</h3>

          <div className="mt-4">
            <textarea
              className="
               textarea textarea-bordered textarea-md
               w-full
              "
              placeholder="感想を書いてください"
              value={impression}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" onClick={onClick}>
              Ok
            </button>

            <button type="button" className="btn ml-5" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default ReturnButton
