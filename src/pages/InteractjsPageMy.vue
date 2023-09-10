<script setup>
import interact from 'interactjs';
import { ref, onMounted } from 'vue';

const noDrop = ref(null);
const yesDrop = ref(null);
const outerDropzone = ref(null);
const innerDropzone = ref(null);

const dragMoveListener = (event) => {
  const target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

onMounted(()=>{
  interact(outerDropzone.value)
    .dropzone({
      accept: '#yes-drop',
      overlap: 0.75,
      ondropactivate(event) {
        event.target.classList.add('drop-active')
      },
      ondragenter(event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        draggableElement.textContent = 'Dragged in'
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.textContent = 'Dragged out'
      },
      ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped'
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
      }
    })

  interact(yesDrop.value)
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,
      // dragMoveListener from the dragging demo above
      listeners: { move: dragMoveListener }
    })
})
</script>

<template>
  <q-page padding>
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
  </q-page>
</template>

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
