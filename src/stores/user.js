import { ref } from "vue";
import { defineStore } from "pinia";
import { useTaskStore } from "./taskStore";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Define a new store named 'useUserStore' using Pinia
export const useUserStore = defineStore("user", () => {
  // Reactive reference to store user information
  const user = ref(null);
  // Reactive reference to store user profile information
  const profile = ref(null);
  // Reactive reference to track if the user is logged in
  const isLoggedIn = ref(false);

  /**
   * Saves a key-value pair to local storage.
   * @param {string} key - The key under which the value will be stored.
   * @param {any} value - The value to be stored.
   */
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieves a value from local storage by key.
   * @param {string} key - The key of the value to retrieve.
   * @returns {any} - The parsed value from local storage or null if not found.
   */
  function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Fetches user and profile data from local storage and updates the state.
   */
  function fetchUser() {
    const storedUser = getFromLocalStorage("user");
    const storedProfile = getFromLocalStorage("profile");

    if (storedUser && storedProfile) {
      user.value = storedUser;
      profile.value = storedProfile;
      isLoggedIn.value = true;
    } else {
      user.value = null;
      profile.value = null;
      isLoggedIn.value = false;
    }
  }

  /**
   * Registers a new user and saves the user and profile data to local storage.
   * @param {string} email - The email of the new user.
   * @param {string} password - The password of the new user.
   */
  async function register(email, password) {
    const newUser = { id: Date.now(), email, password };
    user.value = newUser;
    saveToLocalStorage("user", newUser);
    const newProfile = { user_id: newUser.id, username: email };
    profile.value = newProfile;
    saveToLocalStorage("profile", newProfile);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      if(error) {
        console.log(error);
      },
    });
  }

  /**
   * Signs in a user by validating their credentials and updating the state.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @throws Will throw an error if the user is not found or the password is incorrect.
   */
  async function signIn(email, password) {
    // let storedUser = getFromLocalStorage("user");
    // if (
    //   storedUser &&
    //   storedUser.email === email &&
    //   storedUser.password === password
    // ) {
    //   user.value = storedUser;
    //   profile.value = getFromLocalStorage("profile");
    //   isLoggedIn.value = true;
    // } else {
    //   throw new Error("User not found or password incorrect");
    // }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error);
      throw new Error("Failed to sign in");
    }

    if (data && data.user) {
      user.value = {
        id: data.user.id,
        email: email,
        // Avoid storing the password in a real app for security reasons
      };
      saveToLocalStorage("user", user.value);

      profile.value = {
        user_id: data.user.id,
        username: email,
      };
      saveToLocalStorage("profile", profile.value);

      isLoggedIn.value = true;
    }
  }

  async function signOut() {
    await supabase.auth.signOut(); // Add this to sign out from Supabase
    user.value = null;
    profile.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
  }

  /**
   * Retrieves tasks for the current user by their user ID.
   * @returns {Array} - An array of tasks that belong to the current user.
   */
  function getTasksForUser() {
    const taskStore = useTaskStore();
    return taskStore.getTasksByUserId(user.value.id);
  }
  return {
    user,
    profile,
    isLoggedIn,
    fetchUser,
    register,
    signIn,
    signOut,
    getTasksForUser,
  };
});
