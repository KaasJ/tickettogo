const parseJwt = jwt => {
  var base64Url = jwt.split('.')[1]
  var base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

export const isExpired = jwt => parseJwt(jwt).exp < (Date.now()/1000)

export const userId = jwt => parseJwt(jwt).id


