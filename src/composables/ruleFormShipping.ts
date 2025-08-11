import type { FormRules } from 'element-plus'

const namePattern = /^(?!.*([-'"()])\1)[A-Za-zÑñ\s'"()-]+$/
const phonePattern = /^(09|\+639)\d{9}$/
const addressRegex = /^(?!.*([,.\-])\1)(?=.*[A-Za-zÑñ])[A-Za-zÑñ0-9\s,.\-]+$/
const postalRegex = /^\d{4}$/

const validateName = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!namePattern.test(value.trim())) {
      return callback(new Error(`Please enter a valid ${fieldName}`))
    }
    if (value.trim().length < 2 || value.trim().length > 100) {
      return callback(new Error('Minimum of 2 characters'))
    }
    callback()
  }
}

const validatePhone = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!phonePattern.test(value.trim())) {
      return callback(new Error('Invalid phone number!'))
    }
    callback()
  }
}

const validateAddressField = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }

    if (!addressRegex.test(value.trim())) {
      return callback(new Error(`Please enter a valid ${fieldName}`))
    }

    callback()
  }
}

const validatePostal = (fieldName: string) => {
  return (_rule: unknown, value: string, callback: (error?: Error) => void) => {
    if (!value || value.trim() === '') {
      return callback(new Error(`Please input ${fieldName}`))
    }
    if (!postalRegex.test(value.trim())) {
      return callback(new Error(`Please enter a valid ${fieldName}`))
    }
    callback()
  }
}

export const shippingDetailsRules = (form: any): FormRules => ({
  firstName: [
    {
      required: true,
      validator: validateName('first name'),
      trigger: 'blur',
    },
  ],
  lastName: [
    {
      required: true,
      validator: validateName('last name'),
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      validator: validatePhone('phone'),
      trigger: 'blur',
    },
  ],
  street: [
    {
      required: true,
      validator: validateAddressField('street address'),
      trigger: 'blur',
    },
  ],
  city: [
    {
      required: true,
      validator: validateAddressField('city address'),
      trigger: 'blur',
    },
  ],
  country: [
    {
      required: true,
      validator: validateAddressField('country address'),
      trigger: 'blur',
    },
  ],
  postalCode: [
    {
      required: true,
      validator: validatePostal('postal code'),
      trigger: 'blur',
    },
  ],
})
