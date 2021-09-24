import { readable } from 'svelte/store'

export default readable(null, set => {
  if (typeof(Pusher) == 'undefined') return

  const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  })

  const channel = pusher.subscribe('incoming-calls')

  channel.bind('start', (data) => {
    console.log('start', data)
    set(data)
  })

  channel.bind('end', (data) => {
    console.log('end', data)
    set(null)
  })

  return () => pusher.unsubscribe(channel)
})