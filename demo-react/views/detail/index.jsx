import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const key = searchParams.get('key')
  return (
    <>
      <div>key:{key}</div>
    </>
  )
}

export default Detail
