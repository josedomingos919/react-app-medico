import { createDefaultMaskGenerator } from 'react-hook-mask'

export const getPhoneMask = () => createDefaultMaskGenerator('(99) 99999-9999')

export const isEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
}

export const isEmpty = (val) => {
  if (!val) return true

  if (
    typeof val === 'function' ||
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    Object.prototype.toString.call(val) === '[object Date]'
  )
    return false

  if (val === null || val.length === 0) return true

  if (typeof val === 'object') {
    var r = true

    for (var f in val) r = false

    return r
  }
}

export const formatDate = (stringDate = '') => {
  const date = new Date(stringDate).toLocaleDateString()

  return date === 'Invalid Date' ? '' : date
}

export const getPagination = ({ data = [], limit = 5, page = 1 }) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    data: data.slice(startIndex, endIndex),
    totalPage: Math.ceil(data.length / limit),
    totalData: data.length,
    currentPage: page,
  }
}

export const getSelectData = ({ data = [], labelKey = '', valueKey = 'id' }) =>
  data.map(({ [labelKey]: label, [valueKey]: value }) => ({ label, value }))

export const removeSpecialChar = (especialChar = '') => {
  especialChar = especialChar.replace('/[áàãâä]/ui', 'a')
  especialChar = especialChar.replace('/[éèêë]/ui', 'e')
  especialChar = especialChar.replace('/[íìîï]/ui', 'i')
  especialChar = especialChar.replace('/[óòõôö]/ui', 'o')
  especialChar = especialChar.replace('/[úùûü]/ui', 'u')
  especialChar = especialChar.replace('/[ç]/ui', 'c')
  especialChar = especialChar.replace('/[^a-z0-9]/i', '_')
  especialChar = especialChar.replace('/_+/', '_') //
  return especialChar.toLocaleLowerCase()
}

export const containWord = (word, key) =>
  removeSpecialChar(word).indexOf(removeSpecialChar(key)) >= 0
