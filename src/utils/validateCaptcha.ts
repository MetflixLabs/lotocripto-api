import axios from 'axios'

export const validateCaptcha = async (captcha: string): Promise<boolean> => {
  return axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${captcha}`
    )
    .then(res => {
      const { success } = res.data
      return success
    })
    .catch(err => {
      console.log(`[CATCH on captcha]: ${err}`)

      return false
    })
}
