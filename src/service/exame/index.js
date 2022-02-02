import { api } from './../api'

export function add(data = {}) {
  try {
    return api()
      .post('exame', data)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function update(data = {}) {
  try {
    return api()
      .post('exame/update', data)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function upload(data = {}) {
  const form = new FormData()

  Object.keys(data).forEach((key) => form.set(key, data[key]))

  try {
    return api()
      .post('exame/upload', form, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data`,
        },
      })
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function schedule(data = {}) {
  try {
    return api()
      .post('exame/schedule', data)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function getStatus() {
  try {
    return api()
      .get('exame/list-status')
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function get() {
  try {
    return api()
      .get('exame/list')
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function getUploadDocumentType() {
  try {
    return api()
      .get(`exame/upload/document-type`)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}
