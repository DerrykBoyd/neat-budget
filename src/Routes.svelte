<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Nav from "components/Nav/Nav";
  import Home from "routes/Home";
  import About from "routes/About";
  import Settings from "routes/Settings";
  import { auth } from "utils/firebase";
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
