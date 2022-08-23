import axios from 'axios'

export const Translate = async ({ currentLocale, newLocale, text }) => {
  const API_KEY = process.env.NUXT_ENV_GOOGLE_TRANSLATE_API_KEY

  if (currentLocale === newLocale) return text

  if (!API_KEY) throw new Error('Invalid google translate api key')

  const { data } = await axios.post(
    `https://translation.googleapis.com/language/translate/v2`,
    {
      q: [text],
      source: currentLocale,
      target: newLocale,
      format: 'text',
      prettyPrint: true,
    },
    {
      params: {
        key: API_KEY,
      },
    }
  )
  return data?.data?.translations[0]?.translatedText || ''
}
