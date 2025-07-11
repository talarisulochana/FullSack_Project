



import React from 'react'

const Image = ({path,alt,styling}) => {
  return (
    <img src={path} alt={alt} className={styling} />
  )
}

export default Image;