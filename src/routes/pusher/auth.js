import { pusher } from '$lib/pusher.js'

export async function post({body}) {
  const socketId = body.get('socket_id')
  const channel = body.get('channel_name')
  const auth = pusher.authenticate(socketId, channel)

  console.log({auth})

  return {
    body: auth
  }
}
