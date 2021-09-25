import { readable } from 'svelte/store'

export default readable(null, set => {
  if (typeof(Pusher) == 'undefined') return

  const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    authEndpoint: "/pusher/auth"
  })

  const channel = pusher.subscribe('private-incoming-calls')

  channel.bind('start', data => {
    set(data)
  })

  channel.bind('end', data => {
    set(null)
  })

  return () => pusher.unsubscribe('private-incoming-calls')
})
