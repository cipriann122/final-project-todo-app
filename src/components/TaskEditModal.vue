<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <h3>Edit Task</h3>
        <form @submit.prevent="handleSubmit">
          <label>Title:</label>
          <input type="text" v-model="editedTask.title" required />
          <label>Description:</label>
          <textarea v-model="editedTask.description" required></textarea>
          <label>Time to Be Completed:</label>
          <input type="text" v-model="editedTask.timeToBeCompleted" required />
          <label>Extra Info Required (comma-separated):</label>
          <input type="text" v-model="editedTask.extraInfoRequired" required />
          <div class="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props
const props = defineProps(["task"]);

// Data
const editedTask = ref({
  id: props.task.id,
  title: props.task.task,
  description: props.task.description.title,
  timeToBeCompleted: props.task.description.timeToBeCompleted,
  extraInfoRequired: props.task.description.extraInfoRequired.join(", "),
});

// Emit events
const emit = defineEmits(["updateTask", "close"]);

// Methods
function handleSubmit() {
  // Prepare updated task object
  const updatedTask = {
    id: editedTask.value.id,
    task: editedTask.value.title,
    description: {
      title: editedTask.value.description,
      timeToBeCompleted: editedTask.value.timeToBeCompleted,
      extraInfoRequired: editedTask.value.extraInfoRequired
        .split(",")
        .map((item) => item.trim()),
    },
  };
  // Emit event to update task
  emit("updateTask", updatedTask);

  // Close modal
  closeModal();
}

function closeModal() {
  // Emit event to close modal
  emit("close");
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
}

.modal-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  width: 90%;
  max-width: 500px;
  animation: slideIn 0.3s ease-out;
}

.modal-container h3 {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.modal-container form {
  display: flex;
  flex-direction: column;
}

.modal-container label {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.modal-container input,
.modal-container textarea {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 2px solid var(--input-background);
  border-radius: var(--border-radius);
  background-color: var(--input-background);
  color: var(--text-color);
  transition: var(--transition);
}

.modal-container input:focus,
.modal-container textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(110, 226, 245, 0.2);
}

.modal-buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-buttons button {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border: none;
  border-radius: var(--border-radius);
  font-weight: bold;
  transition: var(--transition);
}

.modal-buttons button:first-child {
  background-color: var(--primary-color);
  color: var(--background-color);
}

.modal-buttons button:last-child {
  background-color: var(--input-background);
  color: var(--text-color);
}

.modal-buttons button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(110, 226, 245, 0.2);
}

.modal-buttons button:active {
  transform: translateY(0);
}
</style>
