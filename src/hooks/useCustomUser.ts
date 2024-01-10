import { OldUser } from '@/models/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useCustomUser = () => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<OldUser | undefined>(undefined)

  useEffect(() => {
    switch (status) {
      case 'authenticated':
        if (session) {
          setUser(session.customUser)
        }
        break
    }
  }, [status, session])

  return { user }
}
