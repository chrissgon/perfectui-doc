<template>
  <section
    ref="resizableContainerRef"
    class="resize-container flex"
    :class="{ 'flex-col': horizontal }"
  >
    <article class="slot w-full h-full overflow-auto relative">
      <slot />
    </article>

    <aside
      class="max-lg:hidden resize-bar cursor-ew-resize flex justify-center items-center relative"
      :class="{ '!cursor-ns-resize': horizontal }"
    >
      <div
        v-if="!horizontal"
        class="ml-2 w-2 h-8 bg-tertiary rounded-full"
      ></div>
      <i
        v-if="horizontal"
        class="mt-2 w-8 h-2 bg-tertiary rounded-full"
      ></i>
    </aside>
  </section>
</template>

<script setup lang="ts">
// props
interface IProps {
  horizontal?: boolean;
}
const props = defineProps<IProps>();

// data
const resizableContainerRef = ref<HTMLElement>();
const bar = ref<HTMLElement | null>(null);
const slot = ref<HTMLElement | null>(null);
const moveX = ref<number>(0);
const moveY = ref<number>(0);
const drag = ref<boolean>(false);

// methods
function init(): void {
  if (!resizableContainerRef.value) return;

  bar.value = resizableContainerRef.value.querySelector(".resize-bar");
  slot.value = resizableContainerRef.value.querySelector(".slot");

  if (!bar.value || !slot.value) return;

  moveX.value =
    slot.value.getBoundingClientRect().width +
    bar.value.getBoundingClientRect().width / 2;

  moveY.value =
    slot.value.getBoundingClientRect().height +
    bar.value.getBoundingClientRect().height / 2;

  bar.value.addEventListener("mousedown", function (e) {
    drag.value = true;

    moveX.value = e.x;
    moveY.value = e.y;

    document.body.classList.add("select-none");
  });

  setMouseMove(document.body);
  setMouseUp(document.body);
}
function setMouseMove(container: HTMLElement): void {
  if (!bar.value || !slot.value) return;
  
  container.addEventListener("mousemove", function (e: MouseEvent) {
    if (!bar.value || !slot.value) return;
    if (!drag.value) return;

    moveX.value = e.x;
    moveY.value = e.y;

    if (props.horizontal) {
      slot.value.style.height =
        moveY.value - slot.value.offsetTop - bar.value.getBoundingClientRect().height / 2 + "px";
      return;
    }

    slot.value.style.width =
      moveX.value -
      slot.value.offsetLeft -
      bar.value.getBoundingClientRect().width / 2 +
      "px";
  });
}
function setMouseUp(container: HTMLElement): void {
  container.addEventListener("mouseup", function () {
    if (!bar.value || !slot.value) return;
    drag.value = false;
    document.body.classList.remove("select-none");
  });
}

// setup
if (process.client) {
  setTimeout(() => {
    init();
  }, 1000);
}
</script>

<style scoped></style>
