<script lang="ts">
  interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    class?: string;
    color?: string;
    shineColor?: string;
    spread?: number;
    yoyo?: boolean;
    pauseOnHover?: boolean;
  }

  let {
    text,
    disabled = false,
    speed = 2,
    class: className = "",
    color = "#b5b5b5",
    shineColor = "#ffffff",
    spread = 120,
    pauseOnHover = false,
  }: ShinyTextProps = $props();
</script>

<span
  class={[
    "shiny-text inline-flex items-center justify-center",
    disabled && "disabled",
    pauseOnHover && "pause-on-hover",
    className,
  ]}
  style="--shiny-speed: {speed}s; --shiny-color: {color}; --shiny-shine-color: {shineColor}; --shiny-spread: {spread}deg;"
>
  {text}
</span>

<style>
  :global(.shiny-text) {
    color: var(--shiny-color);
    background: linear-gradient(
      var(--shiny-spread),
      var(--shiny-color) 0%,
      var(--shiny-color) 35%,
      var(--shiny-shine-color) 50%,
      var(--shiny-color) 65%,
      var(--shiny-color) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shiny-text-left var(--shiny-speed) linear infinite;
    padding: 14px 0px;
  }

  :global(.shiny-text.disabled) {
    animation: none !important;
  }

  :global(.shiny-text.pause-on-hover:hover) {
    animation-play-state: paused;
  }

  @keyframes -global-shiny-text-left {
    from {
      background-position: 150% center;
    }
    to {
      background-position: -50% center;
    }
  }

  @keyframes -global-shiny-text-right {
    from {
      background-position: -50% center;
    }
    to {
      background-position: 150% center;
    }
  }
</style>
