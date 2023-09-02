<template>
  <q-page padding>
    <div>
      <Container remove-on-drop-out @drop="onDrop">
        <Draggable v-for="item in items" :key="item.id">
          <button>{{ item.data }}</button>
        </Draggable>
      </Container>
      <Container>
        <div>drop area</div>
      </Container>
    </div>
  </q-page>
</template>

<script setup>
import {Container, Draggable} from "vue-dndrop";
import {applyDrag, generateItems} from "../utils/helpers";
import { ref } from 'vue'

let items = ref(generateItems(1, (i) => ({id: i, data: "Draggable " + i})))

function onDrop(dropResult) {
  console.log("drop result ", dropResult);
  // items.value = applyDrag(items.value, dropResult);
  items.value = []
  // items.value.push({id: 2, data: "Draggable " + 2})
  console.log(`applyDrag result: ${items.value}`)
}
</script>
