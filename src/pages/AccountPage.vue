<template>
  <div class="account-page">
    <h2>Account Details</h2>
    <div v-if="loading" class="loading">Loading user details...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <form v-if="!loading && !error" @submit.prevent="updateUserDetails">
      <!-- Profile Section -->
      <div class="section">
        <h3>Profile Information</h3>
        <div class="avatar-container">
          <img
            :src="userDetails.avatar_url || defaultAvatar"
            alt="Profile Avatar"
            class="avatar"
          />
        </div>
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" v-model="userDetails.username" />
        </div>
        <div>
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" v-model="userDetails.full_name" />
        </div>
        <div>
          <label for="avatarUrl">Avatar URL</label>
          <input type="text" id="avatarUrl" v-model="userDetails.avatar_url" />
        </div>
        <div>
          <label for="website">Website</label>
          <input type="text" id="website" v-model="userDetails.website" />
        </div>
      </div>

      <!-- Account Section -->
      <div class="section">
        <h3>Account Settings</h3>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="authDetails.email" />
        </div>
        <div>
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="authDetails.password"
            placeholder="Enter new password"
          />
        </div>
      </div>

      <button type="submit" class="update-button">Update Details</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const userDetails = ref({
  username: "",
  full_name: "",
  avatar_url: "",
  website: "",
});

const authDetails = ref({
  email: userStore.user.email, // Initial email value from userStore
  password: "", // New password input
});

const loading = ref(false);
const error = ref(null);
const defaultAvatar =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"; // Default avatar image URL

// Function to fetch user details from Supabase
async function fetchUserDetails() {
  loading.value = true;
  error.value = null;
  try {
    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("username, full_name, avatar_url, website")
      .eq("id", userStore.user.id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (data) {
      userDetails.value = { ...data };
    }
  } catch (err) {
    error.value = "Failed to fetch user details.";
    console.error("Error fetching user details:", err);
  } finally {
    loading.value = false;
  }
}

// Function to update user details in Supabase
async function updateUserDetails() {
  try {
    // Update profile details
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        username: userDetails.value.username,
        full_name: userDetails.value.full_name,
        avatar_url: userDetails.value.avatar_url,
        website: userDetails.value.website,
      })
      .eq("id", userStore.user.id);

    if (profileError) {
      throw profileError;
    }

    // Update email and password if changed
    const updates = {};
    if (authDetails.value.email !== userStore.user.email) {
      updates.email = authDetails.value.email;
    }
    if (authDetails.value.password) {
      updates.password = authDetails.value.password;
    }

    if (Object.keys(updates).length > 0) {
      const { error: authError } = await supabase.auth.updateUser(updates);

      if (authError) {
        throw authError;
      }
    }

    alert("User details updated successfully!");
  } catch (err) {
    error.value = "Failed to update user details.";
    console.error("Error updating user details:", err);
  }
}

// Fetch user details when component mounts
onMounted(() => {
  if (userStore.isLoggedIn) {
    fetchUserDetails();
  }
});
</script>

<style scoped>
.account-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  text-align: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: calc(100% - 10px);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.loading,
.error {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 14px;
  color: #ff0000;
}
</style>
