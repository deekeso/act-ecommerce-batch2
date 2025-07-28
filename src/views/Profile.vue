<template> 
    <main class="profile-container">
        <div v-if="visible">
            <profile-form @on-submit="handleSubmit" @on-cancel="handleCancel"/>
        </div>
        <div v-else>
            <h1>{{  authStore.user?.firstname }}</h1>
            <h1>{{  authStore.user?.lastname }}</h1>
            <button @click="visible = true">Edit Profile</button>
        </div>
    </main>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ProfileForm } from '@/components';
import { useAuth } from '@/stores/auth';

const authStore = useAuth();
const visible = ref(false);

function handleSubmit(formData: {firstname: string, lastname: string}){
    authStore.setProfile(formData)
    visible.value = false;
}

function handleCancel(){
    visible.value = false;
}

</script>

<style scoped>

.profile-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
}
</style>    