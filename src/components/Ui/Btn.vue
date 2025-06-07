<template>
  <button class="modal-btn">
    <slot />
  </button>
</template>

<style scoped>
.modal-btn {
  background-color: var(--bgInputModal);
  color: var(--text);
  font-size: inherit;
  font-family: inherit;
  border: none;
  padding: 10px 15px;
  width: 100%;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--smooth);
}

.modal-btn:active {
  transform: scale(0.97);
}

.modal-btn:hover {
  background-image: linear-gradient(
    90deg,
    rgba(33, 33, 33, 0) 0%,
    rgba(33, 33, 33, 1) 100%
  );
  animation: slidebg 5s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 100vw;
  }
}
</style>
