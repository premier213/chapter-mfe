import React from 'react'

export default function HelloWorld({ count }) {
  console.log(count)
  return <h1>Counter, {count}!!!</h1>
}
