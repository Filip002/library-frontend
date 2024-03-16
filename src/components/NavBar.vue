<template>
    <nav class="navbar navbar-dark bg-dark">
        <router-link :to="`/`" class="navbar-brand m-2 p-2 bg-secondary rounded">Books</router-link>
        <span class="navbar-brand">{{ userName }}</span>
        <router-link :to="`/sign-in`" v-if="!isUserSignedIn()" class="navbar-brand m-2 p-2 bg-secondary rounded">Sign in</router-link>
        <router-link :to="`/sign-in`" v-if="isUserSignedIn()" @click="handleLogout()" class="navbar-brand m-2 p-2 bg-secondary rounded">Logout</router-link>
        <router-link :to="`/register`" v-if="!isUserSignedIn()" class="navbar-brand m-2 p-2 bg-secondary rounded">register</router-link>
    </nav>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'NavBar',
    methods: {
        isUserSignedIn() {
            if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
                return true;
            }
            return false;
        },
        handleLogout() {
            if(this.isUserSignedIn){
                localStorage.removeItem('token')
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully logout',
                    showConfirmButton: false,
                    timer: 1700
                })
            }
        },
    }
}

</script>