<script>
  import {fly, fade} from 'svelte/transition'
  import {elasticOut} from 'svelte/easing'
  import incomingCall from '$lib/incomingCall.js'

  async function send(type) {
    // send to pusher
    const response = await fetch(`/test?type=${type}`, { method: 'POST' })
    const json = await response.json()

    console.log(json)
  }

  async function start() {
    await send('start')
  }

  async function end() {
    await send('end')
  }
</script>
<h1>Pusher + SvelteKit example</h1>

<pre>
  {JSON.stringify({call: $incomingCall}, null, 2)}
</pre>

{#if $incomingCall}
  <div class="toast" in:fly={{y: 300, easing: elasticOut, duration: 500}} out:fade>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
    </svg>
    <div class="content">
      <h2>Incoming call</h2>
      <nav>
        <label>
          <span>Customer</span>
          <a href="https://myshopifystore.shopify.com/admin/customers/{$incomingCall.customer.id}">{$incomingCall.customer.name}</a>
        </label>

        <label>
          <span>Phone</span>
          <a href="https://myshopifystore.shopify.com/admin/customers/{$incomingCall.customer.id}">{$incomingCall.customer.phone}</a>
        </label>

        <label>
          <span>Order</span>
          <a href="https://myshopifystore.shopify.com/admin/orders/{$incomingCall.order.id}">#{$incomingCall.order.name}</a>
        </label>
      </nav>
    </div>
  </div>
{/if}

<button on:click={start}>
  Start call
</button>

<button on:click={end}>
  End call
</button>

<style>
  :global(body) {
    font-family: Inter, sans-serif;
  }
  a {
    color: #444;
  }
  label span {
    color: #555;
    font-weight: bold;
  }
  .toast {
    min-width: 400px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ddd;
    box-shadow: 2px 2px 3px #aaad;
    padding: 1rem;
    border-radius: 5px;
    display: flex;
    gap: 2rem;
  }
  .toast svg {
    align-self: flex-start;
    margin-top: 10px;
    width: 50px;
    color: indigo;
  }
  .toast h2 {
    color: indigo;
    margin: 0.5rem 0;
  }
  .toast nav {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
