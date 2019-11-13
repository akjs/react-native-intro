import React, { useEffect, useState } from 'react'

export const DelayedImage = ({ src }) => {
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setImgSrc(src)
    }, 3000)
  }, [src])
  return <img src={imgSrc} />
}
