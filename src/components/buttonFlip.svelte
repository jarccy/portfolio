<script lang="ts">
  import type { Snippet } from "svelte";

  interface ButtonFlipModalProps {
    buttonText?: string;
    modalTitle?: string;
    modalContent?: Snippet;
  }

  interface Position {
    top: number;
    left: number;
    width: number;
    height: number;
  }

  let {
    buttonText = "Abrir Modal",
    modalTitle = "Modal Expandido",
    modalContent,
  }: ButtonFlipModalProps = $props();

  let isExpanded = $state(false);
  let isAnimating = $state(false);
  let buttonPosition = $state<Position | null>(null);
  let buttonRef: HTMLDivElement;

  const measure = () => {
    const rect = buttonRef.getBoundingClientRect();
    buttonPosition = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  $effect.pre(() => {
    if (buttonRef && !isExpanded) measure();
  });

  const handleOpen = () => {
    if (isAnimating || !buttonRef) return;
    measure();
    isAnimating = true;
    requestAnimationFrame(() => {
      isExpanded = true;
    });
  };

  const handleClose = () => {
    if (isAnimating) return;
    isAnimating = true;
    isExpanded = false;
  };

  const handleTransitionEnd = () => {
    isAnimating = false;
  };

  const getModalDimensions = () => {
    if (typeof window === "undefined") return { width: 512, height: 320, left: 0, top: 0 };
    const width = Math.min(window.innerWidth * 0.9, 512);
    const height = 420;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    return { width, height, left, top };
  };

  const modal = $derived.by(() => {
    void isExpanded;
    return getModalDimensions();
  });
</script>

<!-- Placeholder to maintain layout -->
<div bind:this={buttonRef} class="px-6 py-3 rounded-full inline-block">
  <span class="invisible">{buttonText}</span>
</div>

<!-- Overlay -->
<div
  role="presentation"
  class="fixed inset-0 bg-foreground/60 backdrop-blur-sm transition-opacity duration-300 {isExpanded
    ? 'opacity-100 z-40'
    : 'opacity-0 pointer-events-none -z-10'}"
  onclick={handleClose}
></div>

<!-- Button / Modal -->
{#if buttonPosition}
  <div
    role="button"
    tabindex="0"
    onclick={!isExpanded ? handleOpen : undefined}
    onkeydown={(e) => !isExpanded && (e.key === "Enter" || e.key === " ") && handleOpen()}
    ontransitionend={handleTransitionEnd}
    class="
      fixed overflow-hidden z-50
      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
      bg-primary text-primary-foreground font-medium shadow-lg
      {isExpanded ? 'cursor-default' : 'cursor-pointer hover:scale-105 active:scale-95'}
    "
    style="
      top: {isExpanded ? modal.top : buttonPosition.top}px;
      left: {isExpanded ? modal.left : buttonPosition.left}px;
      width: {isExpanded ? modal.width : buttonPosition.width}px;
      height: {isExpanded ? modal.height : buttonPosition.height}px;
      border-radius: {isExpanded ? 16 : buttonPosition.height / 2}px;
    "
  >
    <!-- Button Text - fades out -->
    <span
      class="
        absolute inset-0 flex items-center justify-center
        transition-all duration-200
        {isExpanded ? 'opacity-0 scale-110 blur-md' : 'opacity-100 duration-500 scale-100 blur-none'}
      "
    >
      {buttonText}
    </span>

    <!-- Modal Content - fades in -->
    <div
      class="
        absolute inset-0 p-6 flex flex-col
        transition-all duration-500
        {isExpanded ? 'opacity-100 blur-none scale-100' : 'opacity-0 blur-md scale-95 pointer-events-none'}
      "
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">{modalTitle}</h2>
        <button
          onclick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          class="p-2 rounded-full hover:bg-primary-foreground/20 transition-colors"
          aria-label="Cerrar modal"
        >
          <span class="w-5 h-5">X </span>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="flex-1 text-left">
        {#if modalContent}
          {@render modalContent()}
        {:else}
          <div class="space-y-4">
            <p class="text-primary-foreground/80">
              Este es un modal que se expande desde un botón con una animación suave.
            </p>
            <p class="text-primary-foreground/80">
              Puedes personalizar el contenido pasando la prop <code class="bg-primary-foreground/20 px-1 rounded"
                >modalContent</code
              >.
            </p>
          </div>
        {/if}
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-primary-foreground/20">
        <button
          onclick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          class="px-4 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm font-medium"
        >
          Cancelar
        </button>
        <button
          onclick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          class="px-4 py-2 rounded-lg bg-primary-foreground text-primary hover:opacity-90 transition-opacity text-sm font-medium"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
{/if}
