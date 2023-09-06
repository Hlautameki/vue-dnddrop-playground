<template>
  <div id="no-drop" class="drag-drop" ref="noDrop">
    #no-drop
  </div>

  <div id="yes-drop" class="drag-drop" ref="yesDrop">
    #yes-drop
  </div>

  <div id="outer-dropzone" class="dropzone" ref="outerDropzone">
    #outer-dropzone
    <div id="inner-dropzone" class="dropzone" ref="innerDropzone">
      #inner-dropzone
    </div>
  </div>
</template>

<script setup>
import interact from 'interactjs';
import { ref, onMounted } from 'vue';

const noDrop = ref(null);
const yesDrop = ref(null);
const outerDropzone = ref(null);
const innerDropzone = ref(null);

// Function to handle the drag start event
const handleDragStart = (event) => {
  console.log("handleDragStart")
  const target = event.target;

  // Add a class to the dragged element for styling
  target.classList.add('dragging');
};

// Function to handle the drag move event
const handleDragMove = (event) => {
  const target = event.target;
  target.classList.remove('can-drop');
};

// Function to handle the drag end event
const handleDragEnd = (event) => {
  const target = event.target;

  // Remove the dragging class
  target.classList.remove('dragging');
};

// Initialize Interact.js
onMounted(() => {
  interact(noDrop.value)
    .draggable({
      listeners: {
        start: handleDragStart,
        move: handleDragMove,
        end: handleDragEnd,
      },
    });

  interact(yesDrop.value)
    .draggable({
      listeners: {
        start: handleDragStart,
        move: handleDragMove,
        end: handleDragEnd,
      },
    });

  interact(outerDropzone.value)
    .dropzone({
      accept: '.drag-drop',
      ondragenter(event) {
        event.target.classList.add('drop-active');
      },
      ondragleave(event) {
        event.target.classList.remove('drop-active');
      },
      ondrop(event) {
        event.target.classList.remove('drop-active');
        event.relatedTarget.classList.remove('can-drop');
      },
    });

  interact(innerDropzone.value)
    .dropzone({
      accept: '.drag-drop',
      ondragenter(event) {
        event.target.classList.add('drop-target');
      },
      ondragleave(event) {
        event.target.classList.remove('drop-target');
      },
      ondrop(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
      },
    });
});
</script>

<style scoped>
#outer-dropzone {
  height: 140px;
}

#inner-dropzone {
  height: 80px;
}

.dropzone {
  background-color: #bfe4ff;
  border: dashed 4px transparent;
  border-radius: 4px;
  margin: 10px auto 30px;
  padding: 10px;
  width: 80%;
  transition: background-color 0.3s;
}

.drop-active {
  border-color: #aaa;
}

.drop-target {
  background-color: #29e;
  border-color: #fff;
  border-style: solid;
}

.drag-drop {
  display: inline-block;
  min-width: 40px;
  padding: 2em 0.5em;
  margin: 1rem 0 0 1rem;
  color: #fff;
  background-color: #29e;
  border: solid 2px #fff;
  touch-action: none;
  transform: translate(0px, 0px);
  transition: background-color 0.3s;
}

.drag-drop.can-drop {
  color: #000;
  background-color: #4e4;
}

.dragging {
  opacity: 0.7;
}
</style>
