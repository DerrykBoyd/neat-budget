<script>
  import { Router, Route } from "svelte-routing";
  import Nav from "components/Nav/Nav";
  import Home from "routes/Home";
  import About from "routes/About";
  import Settings from "routes/Settings";
  import Profile from "routes/Profile";
  import MyBudgets from "./routes/MyBudgets.svelte";
  import Budget from "./routes/Budget.svelte";
  import Alert from "./components/Base/Alert.svelte";
  import Banner from "./components/Base/Banner.svelte";
  export let url = "";
</script>

<style>
  .app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 48px 1fr;
    min-height: 100vh;
  }
</style>

<Router {url}>
  <div class="app">
    <Nav />
    <div class="main-content">
      <Route path="/">
        <Home />
      </Route>
      <Route path="about" component={About} />
      <Route path="settings" component={Settings} />
      <Route path="profile" component={Profile} />
      <Route path="my-budgets" component={MyBudgets} />
      <Route path="budget/:id" component={Budget} />
    </div>
    <Alert />
    <Banner />
  </div>
</Router>
