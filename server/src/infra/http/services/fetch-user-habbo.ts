import axios from 'axios'

export async function fetchUserHabbo(username: string) {
  try {
    const { data } = await axios.get(
      `https://www.habbo.com.br/api/public/users?name=${username}`,
    )

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
