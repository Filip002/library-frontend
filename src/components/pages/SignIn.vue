<template>
    <div class="container">
        <NavBar/>
        <div class="shadow rounded row p-2 m-3">
            <h2 class="text-center">Sign in</h2>
            <form>
                <div class="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        v-model="user.email"
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"/>
                </div>
                <div class="form-group">
                    <label htmlFor="email">Password: </label>
                    <input
                        v-model="user.password"
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"/>
                </div>
                <button
                    @click="handleSignIn()"
                    :disabled="processing"
                    type="button"
                    class="btn btn-primary mt-3">
                    Sign in
                </button>
            </form>
        </div>
        <FooterC/>
    </div>
</template>

<script>

import axios from "axios";
import Swal from 'sweetalert2'
import NavBar from '../NavBar.vue';
import FooterC from '../Footer.vue';

export default {
    name: 'SignIn',
    components: {
        NavBar,
        FooterC,
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            processing: false,
        };
    },
    created() {
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
            this.$router.push('/')
        }
    },
    methods: {
        handleSignIn() {
            this.processing = true
            axios.post('/api/account/login', this.user)
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    this.$router.push('/')
                    this.processing = false
                    return response
                })
                .catch(error => {
                    this.processing = false
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1700
                    })
                    return error
                })
        },
    }
}
</script>