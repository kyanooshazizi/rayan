"use client"

const error = (error,reset) => {
  return (
    <div>
      خطایی رخ داده است
      <button onClick={reset}>دوباره امتحان کنید!</button>
    </div>
  )
}

export default error
