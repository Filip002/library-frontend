<template>
    <div class="container">
        <NavBar/>
        <div class="border border-secondary rounded row p-2 m-3">
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
                    @click="handleRegister()"
                    :disabled="processing"
                    type="button"
                    class="btn btn-primary mt-2">
                    Register
                </button>
            </form>
        </div>
    </div>
</template>

<script>

import axios from "axios";
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
                password: ''
            },
            processing: false,
        };
    },
    methods: {
        handleRegister() {
            this.processing = true
            axios.post('/api/account/register', this.user)
                .then(response => {
                    this.processing = false
                    this.user.email = ""
                    this.user.password = ""
                    return response
                })
                .catch(error => {
                    this.processing = false
                    return error
                })
        },
    }
}
</script>