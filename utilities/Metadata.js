export const getMetadataTitle = (...args) => {
  const elements = args.filter(n => n)
  if (!elements.length) return 'Dacade';
  return `${elements.join(' - ')} | Dacade`;
}

export const getMetadataDescription = (description) => {
  if (!description) return []
  // hid is used as unique identifier. Do not use `vmid` for it as it will not work
  return [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      name: 'og:description',
      content: description,
    }
  ]
}
