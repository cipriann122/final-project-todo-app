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
const emit = defineEmits(["updateTask"]);

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
/* Modal styles */
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
}

.modal-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: rgb(37, 37, 37);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.modal-container h3 {
  margin-bottom: 10px;
}

.modal-container form {
  display: flex;
  flex-direction: column;
}

.modal-container label {
  margin-bottom: 5px;
}

.modal-container input,
.modal-container textarea {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.modal-buttons button {
  padding: 8px 16px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background-color: #007bff;
  color: white;
  border: none;
}

.modal-buttons button:last-child {
  background-color: #ccc;
  color: #333;
  border: none;
}
</style>
