const aeAllowedChars =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

const ethRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
const aeRegex = `^(ak_)([${aeAllowedChars}]+)$`
const nearRegex = /^([a-fA-F0-9]{5})+([a-fA-F0-9]{49})+([a-fA-F0-9]{10})$/
const algoRegex = /^([A-Z2-7]{6})+([A-Z2-7]{46})+([A-Z2-7]{6})$/
const icpRegex = `^[a-fA-F0-9]{64}$`

const validateRegex = (address, regex) => {
  const match = address.match(regex)
  return Boolean(match)
}

const truncateHandler = (address, regex, callback) => {
  const match = address.match(regex)
  if (!match) return address
  return callback(match)
}
export const truncateEthAddress = (address) => {
  return truncateHandler(
    address,
    ethRegex,
    (match) => `${match[1]}…${match[2]}`
  )
}

export const truncateAEAddress = (address) => {
  return truncateHandler(
    address,
    aeRegex,
    () =>
      `${address.slice(0, 8)}…${address.slice(
        address.length - 8,
        address.length
      )}`
  )
}

export const truncateNearAddress = (address) => {
  return truncateHandler(
    address,
    nearRegex,
    (match) => `${match[1]}…${match[3]}`
  )
}

export const truncateAlgoAddress = (address) => {
  return truncateHandler(
    address,
    algoRegex,
    (match) => `${match[1]}…${match[3]}`
  )
}

export const truncateAddress = (rawAddress, token = 'eth') => {
  if (!rawAddress) return

  const address = rawAddress.trim()

  switch (token.trim().toLowerCase()) {
    case 'near':
      return truncateNearAddress(address)
    case 'ae':
      return truncateAEAddress(address)
    case 'algo':
      return truncateAlgoAddress(address)
    default:
      return truncateEthAddress(address)
  }
}

export const validateAddress = (address, token) => {
  if (!address) return false

  const trimmedAddress = address.trim()
  const tokenLowerCase = token.toLowerCase()

  if (tokenLowerCase === 'near') {
    return validateRegex(trimmedAddress, nearRegex)
  }

  if (tokenLowerCase === 'ae') {
    return validateRegex(trimmedAddress, aeRegex)
  }

  if (['algo', 'usdc'].includes(tokenLowerCase)) {
    return validateRegex(trimmedAddress, algoRegex)
  }

  if (tokenLowerCase === 'icp') {
    return validateRegex(trimmedAddress, icpRegex)
  }


  return validateRegex(trimmedAddress, ethRegex)
}
