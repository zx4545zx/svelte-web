<script>
  import { Router, Route, link } from "svelte-navigator";
  import Home from "./lib/Home/Home.svelte";
  import About from "./lib/About/About.svelte";
  import { onMount, onDestroy } from "svelte";

  let show = false;

  onMount(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        show = true;
      } else {
        show = false;
      }
    };
  });

  onDestroy(() => {
    window.onscroll = () => {};
  });
</script>

<Router>
  <header>
    <nav
      class:scrolled={show}
      class="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top"
    >
      <div class="container">
        <a class="navbar-brand" href="/" use:link
          ><i class="bi bi-house-fill" /> Zoo</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/" use:link>Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about" use:link>About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/" use:link>Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/" use:link>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </main>

  <div class="container">
    <footer
      class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
    >
      <div class="col-md-4 d-flex align-items-center">
        <span class="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a class="text-muted" href="/"><i class="bi bi-telephone-fill" /></a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="/"><i class="bi bi-envelope-fill" /></a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="/"><i class="bi bi-line" /></a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="/"><i class="bi bi-facebook" /></a>
        </li>
      </ul>
    </footer>
  </div>
</Router>

<style>
  .scrolled {
    transform: translate(0, calc(-100% - 1rem));
  }
  main {
    padding-top: 3.25rem;
  }
</style>
