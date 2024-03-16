<template>
    <div class="container">
        <NavBar/>
        <div class="shadow rounded row p-2 m-3">
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
                    <label htmlFor="password">Password: </label>
                    <input
                        v-model="user.password"
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"/>
                </div>
                <div class="form-group">
                    <label htmlFor="confirmPassword">Confirm password: </label>
                    <input
                        v-model="user.confirmPassword"
                        type="password"
                        class="form-control"
                        id="confirmPassword"
                        name="confirmPassword"/>
                </div>
                <div class="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        v-model="user.name"
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"/>
                </div>
                <div class="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth: </label>
                    <input
                        v-model="user.dateOfBirth"
                        type="date"
                        class="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"/>
                </div>
                <button
                    @click="handleRegister()"
                    :disabled="processing"
                    type="button"
                    class="btn btn-primary mt-3">
                    Register
                </button>
            </form>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import Swal from 'sweetalert2'
import NavBar from '../NavBar.vue';

export default {
    name: 'user-register',
    components: {
        NavBar,
    },
    data() {
        return {
            user: {
                email: '',
                password: '',
                confirmPassword: '',
                name: '',
                dateOfBirth: ''
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
        handleRegister() {
            this.processing = true
            axios.post('/api/account/register', this.user)
                .then(response => {
                    this.processing = false
                    this.user.email = ""
                    this.user.password = ""
                    this.confirmPassword = ""
                    this.name = ""
                    this.dateOfBirth = ""
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully created account',
                        showConfirmButton: false,
                        timer: 1700
                    })
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