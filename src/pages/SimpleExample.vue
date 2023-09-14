<script setup>
import {Container, Draggable} from "vue-dndrop";
import { applyDrag, generateItems } from "../utils/helpers";
import {ref} from "vue";

let items = ref(generateItems(10, (i) => ({ id: i, data: "Draggable " + i })))

function onDrop(dropResult) {
  console.log("drop result ", dropResult);
  //items.value = applyDrag(items.value, dropResult);
}
function getGhostParent() {
  return document.body;
}
function onDropReady(dropResult) {
  console.log("drop ready", dropResult);
}
function dropNotAllowed({ payload, container }) {
  console.log("drop not allowed");
}
function getChildPayload(index) {
  return items.value[index];
}
</script>

<template>
  <q-page padding>
    <div class="simple-page">
      <Container

        @drop="onDrop"
        @drop-ready="onDropReady"
        @drop-not-allowed="dropNotAllowed"
      >
        <Draggable v-for="item in items" :key="item.id">
          {{ item.data }}
        </Draggable>
      </Container>
    </div>
  </q-page>
</template>
