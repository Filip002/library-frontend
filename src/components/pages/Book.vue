<template>
    <div class="container">
        <NavBar/>
        <div class="border border-secondary rounded row p-2 m-3">
            <span class="align-top col m-2"><img src="book.png" alt="book image"></span>
            <div class="col-4">
                <h5>{{ book.title }}</h5>
                <p>Author: {{ book.authorName }}</p>
                <p>PageCount: {{ book.pageCount }}</p>
                <p>Available: {{ book.isAvailable }}</p>
                <p>Description: {{ book.description }}</p>
                <p><small>ID: {{ book.id }}</small></p>
            </div>
            <div class="col row justify-content-end">
                <router-link :to="`/sign-in`" v-if="!isUserSignedIn()" class="btn btn-primary myButton2 m-3 col-8">Sign in to check out</router-link>
                <button v-if="isUserSignedIn()" @click="comingSoon()" class="btn btn-primary myButton m-3 col-8">Check out</button>
                <button v-if="isUserSignedIn()" @click="comingSoon()" class="btn btn-warning myButton m-3 col-8">Edit</button>
                <button  v-if="isUserSignedIn()" @click="comingSoon()" class="btn btn-danger myButton m-3 col-8">Delete</button>
            </div>
            <router-link :to="`/`" class="btn btn-secondary">Back to list</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NavBar from '../NavBar.vue';

export default {
    name: 'BookComponent',
    components: {
        NavBar,
    },
    data() {
        return {
            book: {
                id: '',
                title: '',
                description: '',
                authorName: '',
                pageCount: '',
                isAvailable: ''
            }
        };
    },
    created() {
        this.fetchBook();
    },
    methods: {
        fetchBook() {
            const id = this.$route.params.id;
            axios.get(`/api/book/${id}`)
                .then(response => {
                    this.book = response.data;
                    return response
                })
                .catch(error => {
                    return error
                });
        },
        isUserSignedIn() {
            if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
                return true;
            }
            return false;
        },
        comingSoon() {
            alert("coming soon")
        }
    }
}

</script>