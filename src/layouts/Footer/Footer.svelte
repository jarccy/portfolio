<script lang="ts">
  import { inview, itemVariants, reveal } from "@/lib/functions";

  let visible = $state(false);
</script>

<section
  id="hobbie"
  use:inview={{ amount: 0.2, once: true, onenter: () => (visible = true) }}
  class="w-full max-w-2xl mx-auto pt-40 mb-40 px-4"
>
  <div style={reveal(visible, itemVariants, 0)} class="flex flex-col mt-6 h-[475px] justify-center items-center">
    <div>a</div>
  </div>
</section>
