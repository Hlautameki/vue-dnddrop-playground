<template>
  <q-page padding>
    <div>
<q-btn>Draggable 0</q-btn>
      <Container  remove-on-drop-out @drop="onDrop">
        <Draggable style="overflow: unset" v-for="item in items" :key="item.id">
          <q-btn>{{ item.data }}</q-btn>
<!--          <div >-->
<!--            <q-btn >{{ item.data }}</q-btn>-->
<!--          </div>-->
        </Draggable>
      </Container>
      <Container>
        <div>drop area</div>
      </Container>
      <q-btn>test2</q-btn>
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
  // items.value = []
  // items.value.push({id: 2, data: "Draggable " + 2})
  console.log(`applyDrag result: ${items.value}`)
}
</script>
