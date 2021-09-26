import Pusher from 'pusher'

// reusable pusher client
export const pusher = new Pusher({
  appId: process.env['VITE_PUSHER_APP_ID'],
  key: process.env['VITE_PUSHER_KEY'],
  secret: process.env['PUSHER_SECRET'],
  cluster: process.env['VITE_PUSHER_CLUSTER']
})
