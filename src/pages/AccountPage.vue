<template>
  <div class="account-page">
    <h2>Account Details</h2>
    <div v-if="loading" class="loading">Loading user details...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error" class="form-container">
      <!-- Profile Section -->
      <div class="profile-section">
        <h3>Profile Information</h3>
        <div class="avatar-container">
          <img
            :src="userDetails.avatar_url || defaultAvatar"
            alt="Profile Avatar"
            class="avatar"
          />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="userDetails.username" />
        </div>
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" v-model="userDetails.full_name" />
        </div>
        <div class="form-group">
          <label for="avatarUrl">Avatar URL</label>
          <input type="text" id="avatarUrl" v-model="userDetails.avatar_url" />
        </div>
        <div class="form-group">
          <label for="website">Website</label>
          <input type="text" id="website" v-model="userDetails.website" />
        </div>
      </div>

      <!-- Account Section -->
      <div class="account-section">
        <h3>Account Settings</h3>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="authDetails.email" />
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            id="password"
            v-model="authDetails.password"
            placeholder="Enter new password"
          />
        </div>
        <button type="button" class="update-button" @click="updateUserDetails">
          Update Details
        </button>
      </div>
    </div>
    <Toast position="bottom-right" />
    <!-- Add the Toast component here -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast"; // Import the Toast component

const userStore = useUserStore();
const toast = useToast(); // Initialize Toast

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

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "User details updated successfully!",
      life: 3000,
    });
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update user details.",
      life: 3000,
    });
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
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.profile-section,
.account-section {
  flex: 1;
  min-width: 320px; /* Minimum width for smaller screens */
  max-width: 45%; /* Adjust width to ensure both sections fit side-by-side */
  background-color: #3a3a3a;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  transition: max-width 0.3s ease-in-out;
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
  border: 2px solid #444;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #fff;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: var(--input-background);
  border: 1px solid #5a5a5a;
  border-radius: var(--border-radius);
  color: #fff;
}

input::placeholder {
  color: #666;
}

.update-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s;
}

.update-button:hover {
  background-color: #2980b9;
}

.loading,
.error {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 14px;
}

.error {
  color: #ff4d4f;
}

@media (max-width: 768px) {
  .form-container {
    flex-direction: column;
  }

  .profile-section,
  .account-section {
    max-width: 100%;
    flex: 1 1 100%;
  }
}
</style>
