import { api } from './../api'

export function getAddress(userId = '') {
  try {
    return api()
      .get(`user/${userId}/addresslist`)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function addAddress(data = {}) {
  try {
    return api()
      .post('user/address/add', data)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function getPlan(userId = '') {
  try {
    return api()
      .get(`user/${userId}/plan`)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}

export function addAddPlan(data = {}) {
  try {
    return api()
      .post('user/plan', data)
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error=> ', error)
    return error
  }
}
