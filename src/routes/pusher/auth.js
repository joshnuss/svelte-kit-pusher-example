import { pusher } from '$lib/pusher.js'

// pusher calls this to authenticate the channel
export async function post({body}) {
  const socketId = body.get('socket_id')
  const channel = body.get('channel_name')
  const auth = pusher.authenticate(socketId, channel)

  // TODO: do real authentication here
  // to deny access:
  // return { status: 403 }
  
  console.log({auth})

  return {
    body: auth
  }
}
