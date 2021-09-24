<script>
  import {fly} from 'svelte/transition'
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
<h1>Pusher test</h1>

<pre>
  {JSON.stringify($incomingCall, null, 2)}
</pre>



{#if $incomingCall}
  <div class="toast" transition:fly={{y: 100}}>
    <h2>Incoming call</h2>
    <nav>
      <a href="https://myshopifystore.shopify.com/admin/customers/{$incomingCall.customer.id}">{$incomingCall.customer.name}</a>
      <a href="https://myshopifystore.shopify.com/admin/customers/{$incomingCall.customer.id}">{$incomingCall.customer.phone}</a>
      <a href="https://myshopifystore.shopify.com/admin/orders/{$incomingCall.order.id}">#{$incomingCall.order.name}</a>
    </nav>
  </div>
{/if}



<button on:click={start}>
  Start call
</button>

<button on:click={end}>
  End call
</button>

<style>
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ccc;
    padding: 1rem;
    border-radius: 5px;
  }
  .toast h2 {
    margin: 0.5rem 0;
  }
  .toast nav {
    display: flex;
    flex-direction: column;
  }
</style>
