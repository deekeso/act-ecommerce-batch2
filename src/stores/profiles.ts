import { defineStore } from "pinia"
import { ElMessage } from "element-plus"
import { v4 as uuidv4 } from "uuid"
import type { Profile } from "@/types"

export const useProfile = defineStore('profile', {
    state: () => ({
        profiles: JSON.parse(localStorage.getItem('profiles') || `[]`),
    }),

    getters: {
        getUserProfile: (state) => (userId?: string) => 
            state.profiles.find((profile: Profile) => profile.id === userId),

    },

    actions: {
        setProfile(profileData: {userId?: string, firstname: string, lastname: string}){
            const index = this.checkExistingProfile(profileData.userId ?? '')
            if(index != -1){
                this.profiles[index] = {...profileData}
                ElMessage.success('User Profile Updated')
            } else {
                ElMessage.success('User Profile Added')
                this.profiles.push({ id: uuidv4().toString(), ...profileData })
            }
            this.saveProfileOnLocalStorage();
        },

        checkExistingProfile(id: string){
            return this.profiles.findIndex((profile: any) => profile.id === id )
        },

        saveProfileOnLocalStorage(){
            localStorage.setItem('profiles', JSON.stringify(this.profiles))
        }
    }
})