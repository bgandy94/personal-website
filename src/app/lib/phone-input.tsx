import React, { useState } from 'react'

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void
}
const normalizeNanpDigits = (input: string): string => {
  let digits = input.replace(/[^0-9]/g, '')
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1)
  }
  return digits.slice(0, 10)
}

const formatPhoneNumber = (value: string): string => {
  const cleaned = normalizeNanpDigits(value)
  const match = cleaned.match(/^([0-9]{0,3})([0-9]{0,3})([0-9]{0,4})$/)

  if (!match) return cleaned

  const [, areaCode, centralOfficeCode, lineNumber] = match
  if (lineNumber) {
    return `(${areaCode})${centralOfficeCode}-${lineNumber}`
  } else if (centralOfficeCode) {
    return `(${areaCode})${centralOfficeCode}`
  } else if (areaCode) {
    return `(${areaCode}`
  }
  return ''
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(formatPhoneNumber(value))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = normalizeNanpDigits(event.target.value)
    const formattedValue = formatPhoneNumber(rawValue)

    setInputValue(formattedValue)
    if (onChange) {
      onChange(rawValue)
    }
  }

  return (
    <input
      {...rest}
      value={inputValue}
      onChange={handleInputChange}
      maxLength={13}
    />
  )
}

export default PhoneInput
