import { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { storeToken } from '@/store/auth/authSlice'
import Button from '../atoms/Button'
import { Col, Row } from 'react-bootstrap'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'

const LoginButton = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session, status } = useSession()

  useEffect(() => {
    const token = session?.accessToken
    if (token) {
      dispatch(storeToken({token}))
    }

  }, [session, dispatch])

  return (
    <Row className='mt-5 mb-5'>
      <Col>
        {
          (status === "authenticated")  ?
            <>
              <Button variant='light' className='' onClick={() => signOut()}>Sign out</Button>
            </> :
            <>
              <Button variant='light' className='ml-2' onClick={() => signIn()}>Sign in</Button>
            </>
        }
      </Col>
    </Row>
  )
}

export default LoginButton
