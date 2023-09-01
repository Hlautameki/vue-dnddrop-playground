<template>
  <q-page padding>
    <div :style="appStyles">
      <div :style="dragSourceStyles" @dragstart="onDragStart" draggable="true">
        Drag Me
      </div>
      <div :style="dropTargetStyles" @dragover.prevent @drop="onDrop">
        Drop Here
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onDragStart, onDrop } from "../reusable/dndLogic"; // Separate logic to another file for cleaner setup
// Styling
const appStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const dragSourceStyles = {
  padding: "10px",
  backgroundColor: "#2196f3",
  color: "white",
  cursor: "grab",
};

const dropTargetStyles = {
  marginTop: "20px",
  padding: "20px",
  backgroundColor: "#f44336",
  color: "white",
  textAlign: "center",
};
</script>

