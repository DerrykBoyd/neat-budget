<script>
  import { currentPath } from "store/currentPath";
  import Fa from "svelte-fa";
  import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
  currentPath.set("/about");
</script>

<style>
  a {
    text-decoration: underline;
    @apply text-green-800;
  }
</style>

<div class="about-content">
  <h1 class="text-2xl text-green-800">Todo write the about page</h1>
  <p class="font-bold text-green-800 pt-4">
    Thanks to the Authors of some the resources I used while building this site
  </p>
  <div>
    Icon credit:
    <a
      href="https://www.flaticon.com/authors/smashicons"
      title="Smashicons"
      target="_blank"
      rel="noopener noreferrer">Smashicons
      <Fa class="fa-icon ext-link" icon={faExternalLinkAlt} size="xs" /></a>
    from
    <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">
      www.flaticon.com
      <Fa class="fa-icon ext-link" icon={faExternalLinkAlt} size="xs" /></a>
  </div>
  <div>
    Icon credit:
    <a
      href="https://www.flaticon.com/authors/freepik"
      title="Freepik"
      target="_blank"
      rel="noopener noreferrer">Freepik
      <Fa class="fa-icon ext-link" icon={faExternalLinkAlt} size="xs" /></a>
    from
    <a
      href="https://www.flaticon.com/"
      title="Flaticon"
      target="_blank"
      rel="noopener noreferrer">www.flaticon.com
      <Fa class="fa-icon ext-link" icon={faExternalLinkAlt} size="xs" /></a>
  </div>
</div>
