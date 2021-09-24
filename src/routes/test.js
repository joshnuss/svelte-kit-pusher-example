import Pusher from 'pusher'

const pusher = new Pusher({
  appId: process.env['VITE_PUSHER_APP_ID'],
  key: process.env['VITE_PUSHER_KEY'],
  secret: process.env['VITE_PUSHER_SECRET'],
  cluster: process.env['VITE_PUSHER_CLUSTER']
})

export async function post({query}) {
  const type = query.get('type')
  const data = {
    customer: {
      id: '1234566',
      name: "Josh Nussbaum",
      email: "joshnuss@gmail.com",
      phone: '+15145551212'
    },
    order: {
      id: '12343245345',
      name: '1234'
    }
  }
  pusher.trigger('incoming-calls', type, data)

  return {
    body: { message: 'sent' }
  }
}
