import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout title="トップページ | company-library">
      <div>
        <Link href="/Users/mongol/dev/company-library/src/pages/private">
          <a>private page</a>
        </Link>
      </div>
    </Layout>
  )
}

export default Home
