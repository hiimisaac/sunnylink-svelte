<script>
  import { base } from '$app/paths';
</script>

<div class="coming-soon-container">
  <img src="{base}/../src/lib/images/astronaut.png" alt="Cute Coming Soon Image" />
  <h1>Coming Soon!</h1>
  <p>We're working hard to bring this page to you.</p>
  <p>Please check back later!</p>
  <a href="{base}/">Go back to Homepage</a>
</div>

<style>
  .coming-soon-container {
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
