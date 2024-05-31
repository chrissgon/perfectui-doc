<template>
  <div class="card">
    <header class="card-header flex justify-between items-center !px-6 !pt-6">
      <span class="text-base">July / 2024</span>
      <div class="flex items-center gap-2">
        <span class="badge badge-white">Pick Color</span>
        <AtomThemeColorPicker /> 
      </div>
    </header>
    <article class="card-content flex flex-col gap-1">
      <div class="flex">
        <span class="btn-calendar-item text-secondary">Mo</span>
        <span class="btn-calendar-item text-secondary">Tu</span>
        <span class="btn-calendar-item text-secondary">We</span>
        <span class="btn-calendar-item text-secondary">Th</span>
        <span class="btn-calendar-item text-secondary">Fr</span>
        <span class="btn-calendar-item text-secondary">Sa</span>
        <span class="btn-calendar-item text-secondary">Su</span>
      </div>
      <div class="flex">
        <span
          class="btn-calendar-item text-secondary"
          disabled
        >26</span>
        <span
          class="btn-calendar-item text-secondary"
          disabled
        >27</span>
        <span
          class="btn-calendar-item text-secondary"
          disabled
        >28</span>
        <span
          class="btn-calendar-item text-secondary"
          disabled
        >29</span>
        <span
          class="btn-calendar-item text-secondary"
          disabled
        >30</span>
        <span class="btn-calendar-item">1</span>
        <span class="btn-calendar-item">2</span>
      </div>
      <div class="flex">
        <span class="btn-calendar-item btn-white">3</span>
        <span class="btn-calendar-item btn-white">4</span>
        <span class="btn-calendar-item btn-solid-primary before:rounded-tl-full before:rounded-bl-full">5</span>
        <span class="btn-calendar-item btn-range">6</span>
        <span class="btn-calendar-item btn-range">7</span>
        <span class="btn-calendar-item btn-range">8</span>
        <span class="btn-calendar-item btn-range">9</span>
      </div>
      <div class="flex">
        <span class="btn-calendar-item btn-range">10</span>
        <span class="btn-calendar-item btn-range">11</span>
        <span class="btn-calendar-item btn-range">12</span>
        <span class="btn-calendar-item btn-range">13</span>
        <span class="btn-calendar-item btn-range">14</span>
        <span class="btn-calendar-item btn-range">15</span>
        <span class="btn-calendar-item btn-range">16</span>
      </div>
      <div class="flex">
        <span class="btn-calendar-item btn-range">17</span>
        <span class="btn-calendar-item btn-range">18</span>
        <span class="btn-calendar-item btn-range">19</span>
        <span class="btn-calendar-item btn-solid-primary before:rounded-tr-full before:rounded-br-full">20</span>
        <span class="btn-calendar-item btn-white">21</span>
        <span class="btn-calendar-item btn-white">22</span>
        <span class="btn-calendar-item btn-white">23</span>
      </div>
      <div class="flex">
        <span class="btn-calendar-item btn-white">24</span>
        <span class="btn-calendar-item btn-white">25</span>
        <span class="btn-calendar-item btn-white">26</span>
        <span class="btn-calendar-item btn-white">27</span>
        <span class="btn-calendar-item btn-white">28</span>
        <span class="btn-calendar-item btn-white">29</span>
        <span class="btn-calendar-item btn-white">30</span>
      </div>
      <div class="flex">
        <span class="btn-calendar-item btn-white">31</span>
        <span class="btn-calendar-item btn-white">1</span>
        <span class="btn-calendar-item btn-white">2</span>
        <span class="btn-calendar-item btn-white">3</span>
        <span class="btn-calendar-item btn-white">4</span>
        <span class="btn-calendar-item btn-white">5</span>
        <span class="btn-calendar-item btn-white">6</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.btn-calendar-item {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: pointer;
  padding: 0px !important;
}
.btn-solid-primary {
  position: relative;
  z-index: 1;
}
.btn-solid-primary::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(var(--theme500), 0.1);
}
.btn-range:first-child{
    border-top-left-radius: 100%;
    border-bottom-left-radius: 100%;
}
.btn-range:last-child{
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
}
.btn-range {
  background-color: rgba(var(--theme500), 0.1);
  border-radius: 0px;
}
</style>
