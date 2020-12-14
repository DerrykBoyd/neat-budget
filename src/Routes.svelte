<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Nav from "./components/Nav/Nav.svelte";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Settings from "./routes/Settings.svelte";
  import { auth } from "./utils/firebase";
  export let url = "";
</script>

<Router {url}>
  <Nav />
  <div class="main-content p-2 sm:p-4">
    <Route path="/">
      <Home />
    </Route>
    <Route path="about" component={About} />
    <Route path="settings" component={Settings} />
  </div>
</Router>
