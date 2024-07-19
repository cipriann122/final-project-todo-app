import { reactive } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { supabase } from "./user";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = reactive([]);

  /**
   * Adds a new task to the tasks array.
   * @param {Object} task - The task object to be added.
   */
  async function addTask(task) {
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert(task)
        .single();

      if (error) {
        alert(error.message);
        console.error("There was an error inserting", error);
        return null;
      }

      tasks.push(task);
      return data;
    } catch (err) {
      alert("Error");
      console.error("Unknown problem inserting to db", err);
      return null;
    }
  }

  /**
   * Marks a specific task as completed.
   * @param {number} taskId - The ID of the task to be marked as completed.
   */
  async function markTaskCompleted(taskId) {
    // Find the task in the local reactive array
    let task = tasks.find((task) => task.id === taskId);
    if (task) {
      try {
        // Update the task's is_complete status in Supabase
        const { error } = await supabase
          .from("todos")
          .update({ is_complete: true }) // Correct the property name to match your database schema
          .eq("id", taskId)
          .single();

        if (error) {
          alert(error.message);
          console.error("There was an error updating the task:", error);
          return;
        }

        // Update the task locally
        task.is_complete = true;
        console.log("Task marked as completed:", taskId);
      } catch (err) {
        alert("Error");
        console.error("Unknown problem updating record", err);
      }
    }
  }

  /**
   * Deletes a specific task from the tasks array.
   * @param {number} taskId - The ID of the task to be deleted.
   */
  async function deleteTask(taskId) {
    // Find the index of the task to be deleted by its ID
    let index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      try {
        // Delete the task from Supabase
        const { error } = await supabase
          .from("todos")
          .delete()
          .eq("id", taskId);

        if (error) {
          alert(error.message);
          console.error("There was an error deleting the task:", error);
          return;
        }

        // Remove the task from the local array
        tasks.splice(index, 1);
        console.log("Task deleted:", taskId);
      } catch (err) {
        alert("Error");
        console.error("Unknown problem deleting the task", err);
      }
    }
  }

  async function editTask(taskId, updatedTask) {
    try {
      // Find the task in the local reactive array
      let task = tasks.find((task) => task.id === taskId);
      if (task) {
        // Update the task in Supabase
        const { error } = await supabase
          .from("todos")
          .update(updatedTask) // Update with the new task object
          .eq("id", taskId)
          .single();

        if (error) {
          alert(error.message);
          console.error("There was an error updating the task:", error);
          return;
        }

        // Update the task locally
        Object.assign(task, updatedTask); // Update properties of the task object
        console.log("Task updated:", taskId);
      }
    } catch (err) {
      alert("Error");
      console.error("Unknown problem updating record", err);
    }
  }

  /**
   * Retrieves tasks that belong to a specific user.
   * @param {number} userId - The ID of the user whose tasks are to be retrieved.
   * @returns {Array} - An array of tasks that belong to the specified user.
   */
  async function getTasksByUserId(userId) {
    try {
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userId)
        .order("id");
      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }
      tasks.length = 0; // Clear the array
      todos.forEach((todo) => {
        // No need to parse description, it's already an object
        tasks.push(todo);
      });
      return tasks;
    } catch (err) {
      console.error("Error retrieving data from db", err);
    }
  }

  function generateTaskForCurrentUser(taskTitle, taskDescription) {
    let userStore = useUserStore();
    if (userStore.isLoggedIn) {
      const newTask = {
        id: Date.now(),
        task: taskTitle,
        description: taskDescription,
        is_complete: false,
        user_id: userStore.user.id,
        inserted_at: new Date().toISOString(),
      };
      addTask(newTask);
    } else {
      throw new Error("User is not logged in");
    }
  }

  return {
    tasks,
    addTask,
    markTaskCompleted,
    editTask,
    deleteTask,
    getTasksByUserId,
    generateTaskForCurrentUser,
  };
});
