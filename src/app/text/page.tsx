'use client'
import { useState } from 'react'
import PhoneInput from '../lib/phone-input'
const PhonePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="flex-col flex">
      <label htmlFor="number">
        Number to text:
        <PhoneInput
          className="ml-2 text-black"
          type="tel"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </label>
      {phoneNumber.length === 10 && (
        <a
          className="bg-primary mt-2 p-2 w-1/3"
          href={encodeURI(
            `mailto:mail@texts.anomalyok.com?subject=+1${phoneNumber} Text Thread`
          )}
        >
          Mailto Link
        </a>
      )}
    </div>
  )
}

export default PhonePage
