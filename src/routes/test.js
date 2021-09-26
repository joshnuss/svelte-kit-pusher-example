import { pusher } from '$lib/pusher.js'

// an endpoint to create fake events (for testing)
export async function post({query}) {
  const type = query.get('type')
  const data = {
    customer: {
      id: '1234566',
      name: "John Smith",
      email: "jsmith@acme.co",
      phone: '+15145551212'
    },
    order: {
      id: '12343245345',
      name: '1234'
    }
  }

  // fire the event
  // note: channel names prefixed with "private-" require authentication to access
  await pusher.trigger('private-incoming-calls', type, data)

  return {
    body: { message: 'sent' }
  }
}
