<script lang="ts">
  import { cn } from "@/lib/utils";
  import { inview } from "@/lib/functions";

  let {
    words,
    class: className,
    duration = 0.5,
  }: {
    words: {
      text: string;
      class?: string;
    }[];
    class?: string;
    duration?: number;
  } = $props();

  const wordsArray = $derived(
    words.map((word) => ({
      ...word,
      text: word.text.split(""),
    })),
  );

  let outer: HTMLDivElement;
  let inner: HTMLDivElement;
  let width = $state("0px");

  // Replaces framer-motion `whileInView={{ width: "fit-content" }}` (replays every time it enters).
  const onenter = () => {
    width = `${inner.scrollWidth}px`;
  };

  const onleave = () => {
    width = `${outer.offsetWidth}px`;
    void outer.offsetWidth; // force reflow so the transition runs from the current width
    width = "0px";
  };

  const ontransitionend = () => {
    if (width !== "0px") width = "fit-content";
  };
</script>

<div class={cn(className)}>
  <div
    bind:this={outer}
    use:inview={{ onenter, onleave }}
    {ontransitionend}
    class="overflow-hidden"
    style="width: {width}; transition: width {duration}s linear;"
  >
    <div bind:this={inner} style="white-space: nowrap;">
      <div>
        {#each wordsArray as word, idx (`word-${idx}`)}
          <div class="inline-block">
            {#each word.text as char, index (`char-${index}`)}
              <span class={cn(word.class)}>{char}</span>
            {/each}
            &nbsp;
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
