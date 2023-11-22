"use client"
import { TypeAnimation } from 'react-type-animation';
const Autowriter = () => {
  return (
    <div>
      <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    `ارسال سریع به سراسر کشور`,
    1000,
    `صرفه جویی در زمان و هزینه`,
    1000,
  ]}
  cursor={false}
  speed={50}
  style={{ fontSize: '1.4em',  }}
  repeat={2}
/>
    </div>
  )
}

export default Autowriter
