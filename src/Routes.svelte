<script>
  import { Router, Link, Route } from "svelte-routing";
  import Nav from "./components/Nav/Nav.svelte";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  export let url = "";
</script>

<Router {url}>
  <Nav {location} />
  <div class="main-content p-2 sm:p-4">
    <Route path="/">
      <Home />
    </Route>
    <Route path="about" component={About} />
  </div>
</Router>
