<script lang="ts">
  import { navigate } from "astro:transitions/client";

  let { locale = "en" }: { locale?: string } = $props();

  const goBack = () => {
    const prevPath = sessionStorage.getItem("prev-path");

    // Came from another page of the site (home or /projects): go back in history
    // so the view transition plays in the "back" direction and the scroll is restored.
    if (prevPath && history.length > 1) {
      history.back();
      return;
    }

    navigate(locale === "es" ? "/es/#projects" : "/#projects");
  };
</script>

<button onclick={goBack} class="group/svg flex items-center gap-2 opacity-70 hover:opacity-100 cursor-pointer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-arrow-left transition-transform duration-500 translate-x-1 group-hover/svg:-translate-x-0.5"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    ></path>
  </svg>
  {locale === "es" ? "Atrás" : "Back"}
</button>
