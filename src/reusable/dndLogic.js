export function onDragStart(event) {
  event.dataTransfer.setData("text/plain", "Dragged Content");
}

export function onDrop(event) {
  event.preventDefault();
  const droppedContent = event.dataTransfer.getData("text/plain");
  console.log("Dropped:", droppedContent);
  // You can handle the dropped content here
}
