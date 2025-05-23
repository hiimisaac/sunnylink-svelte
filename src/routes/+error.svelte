<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';
</script>

<div class="error-container">
  <img src="{base}/../src/lib/images/smiling-astro.png" alt="Cute Error Image" />
  <h1>Oops! {$page.status}</h1>
  <p>{$page.error?.message}</p>
  <p>Sorry, the page you are looking for does not exist.</p>
  <a href="{base}/">Go back to Homepage</a>
</div>

<style>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    text-align: center;
  }
  img {
    max-width: 200px;
    margin-bottom: 20px;
  }
</style>
