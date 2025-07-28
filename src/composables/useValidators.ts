import validator from 'validator'

export const useValidators = () => {
  const matchPassword = (getPassword) => {
    return (rule: string, value: string, callback: (error?: string | Error) => void) => {
      const password = getPassword()
      if (!value) {
        callback(new Error('Please confirm your password'))
      } else if (value !== password) {
        callback(new Error('Password and Confirm password must match'))
      } else {
        callback()
      }
    }
  }

  const normalValidator = (fieldName: string) => (rule: any, value: string, callback: (error?: string | Error) => void) => {
    const trimmedValue = (value || '').trim()
    if (!trimmedValue) {
      callback(new Error(`${fieldName} is required`))
    } else {
      callback()
    }
  }
  const validateStrongPassword = (rule: any, value: string, callback: (error?: string | Error) => void) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    const trimmedValue = (value || '').trim()
    if (!trimmedValue) {
      callback(new Error('Password is required'))
    } else if (!strongPasswordRegex.test(trimmedValue)) {
      callback(
        new Error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character'),
      )
    } else {
      callback()
    }
  }

  const emailValidator = (rule: any, value: string, callback: (error?: string | Error) => void) => {
    const trimmedValue = (value || '').trim()
    if (!trimmedValue) {
      callback(new Error('Email is required'))
    } else if (!validator.isEmail(trimmedValue)) {
      callback(new Error('Invalid Email'))
    } else {
      callback()
    }
  }

  const nameValidator = (rule: any, value: string, callback: (error?: string | Error) => void) => {
    const validCharsPattern = /^[A-Za-zÑñ\s-]+$/
    const cleanStructurePattern = /^[A-Za-zÑñ]+(?:[- ][A-Za-zÑñ]+)*$/

    const trimmedValue = (value || '').trim()

    if (!trimmedValue) {
      callback(new Error('This field is required.'))
    } else if (!validCharsPattern.test(trimmedValue)) {
      callback(new Error('Numbers and symbols are not allowed.'))
    } else if (!cleanStructurePattern.test(trimmedValue)) {
      callback(new Error('No leading/trailing or repeated hyphens/spaces allowed.'))
    } else if (trimmedValue.length <= 2) {
      callback(new Error('Invalid Name'))
    } else {
      callback()
    }
  }

  const addressValidator = (rule: any, value: string, callback: (error?: string | Error) => void) => {
    const trimmed = (value || '').trim()
    // Pattern: Only digits (pure number)
    const isOnlyNumbersPattern = /^\d+$/

    // Pattern: Valid characters only (letters, numbers, space, comma, period, hyphen)
    const validCharactersPattern = /^[A-Za-zÑñ0-9\s,.-]+$/

    // Pattern: Repeated spaces or hyphens
    const repeatedHyphenOrSpacePattern = /[\s-]{2,}/

    // Pattern: Starts or ends with punctuation or space
    const leadingOrTrailingPunctuationPattern = /^[,\-.\s]|[,\-.\s]$/

    //  Required field
    if (!trimmed) {
      return callback(new Error('Address is required'))
    }

    if (trimmed.length < 2) {
      return callback(new Error('Invalid Address'))
    }

    //  Should not be only numbers
    if (isOnlyNumbersPattern.test(trimmed)) {
      return callback(new Error('Address cannot be only numbers'))
    }

    //  Invalid characters
    if (!validCharactersPattern.test(trimmed)) {
      return callback(new Error('Only letters, numbers, commas, periods, and hyphens are allowed'))
    }

    //  Repeated hyphens or spaces
    if (repeatedHyphenOrSpacePattern.test(trimmed)) {
      return callback(new Error('No repeated spaces or hyphens allowed in the address'))
    }

    //  Starts or ends with space or punctuation
    if (leadingOrTrailingPunctuationPattern.test(trimmed)) {
      return callback(new Error('Address cannot start or end with punctuation or space'))
    }
    callback()
  }

  const contactValidator = (rule: any, value: string, callback: (error?: string | Error) => void) => {
    const trimmed = (value || '').trim()
    if (!trimmed) {
      return callback(new Error('Contact Number is required'))
    } else if (!validator.isMobilePhone(trimmed, 'en-PH')) {
      return callback(new Error('Invalid Contact Number'))
    } else {
      callback()
    }
  }

  const masterCardValiator = (rule: any, value: string, callback: (error?: string | Error) => void) => {
    const inputData = (value || '').trim()

    if (!inputData) {
      return callback(new Error('Contact Number is required'))
    } else if (!validator.isCreditCard(inputData)) {
      return callback(new Error('Invalid Credit Card/Debit Card'))
    } else {
      callback()
    }
  }

  const isValidMastercard = (rule: any, value: string, callback: (error?: string | Error) => void) => {
    if (!value) {
      return callback(new Error('Credit Card number is required'))
    }

    // Remove spaces or dashes
    const cleaned = value.replace(/[\s-]/g, '')

    // Check length = 16 digits and all digits
    if (!/^\d{16}$/.test(cleaned)) {
      return callback(new Error('Credit Card number must be 16 digits'))
    }

    // Check prefix
    const prefix2 = parseInt(cleaned.substring(0, 2), 10)
    const prefix4 = parseInt(cleaned.substring(0, 4), 10)
    const isMastercardPrefix = (prefix2 >= 51 && prefix2 <= 55) || (prefix4 >= 2221 && prefix4 <= 2720)

    if (!isMastercardPrefix) {
      return callback(new Error('Card is not a valid MasterCard'))
    }
    // Validate Luhn checksum
    if (!luhnCheck(cleaned)) {
      return callback(new Error('Invalid card number (failed checksum)'))
    }
    // If all checks pass
    callback()
  }

  // Luhn Algorithm Implementation
  function luhnCheck(cardNumber: string): boolean {
    let sum = 0
    let doubleDigit = false

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10)

      if (doubleDigit) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      doubleDigit = !doubleDigit
    }

    return sum % 10 === 0
  }

  return {
    nameValidator,
    addressValidator,
    emailValidator,
    contactValidator,
    isValidMastercard,
    validateStrongPassword,
    normalValidator,
    matchPassword,
  }
}
