import { readable } from 'svelte/store'

// this store keeps track of pusher state
// it's a `readable` store because only pusher can update it, read-only for all others
export default readable(null, set => {
  // we might be in SSR, so bail if global.Pusher is not defined
  if (typeof(Pusher) == 'undefined') return

  // create client
  const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    authEndpoint: "/pusher/auth"
  })

  // subscribe
  const channel = pusher.subscribe('private-incoming-calls')

  // handle "start" events
  channel.bind('start', data => {
    set(data)
  })

  // handle "end" events
  channel.bind('end', data => {
    set(null)
  })

  // cleanup when the store is no longer used
  return () => pusher.unsubscribe('private-incoming-calls')
})
