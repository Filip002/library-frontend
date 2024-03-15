<template>
    <div class="container">
        <NavBar/>
        <h2 class="text-center mt-5 mb-3">List of Books</h2>
        <router-link :to="`/create-book`" v-if="isUserSignedIn()" class="btn btn-success mx-3">Add Book</router-link>
        <div class="shadow rounded row p-2 m-3" v-for="book in books" :key="book.id">
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
                <router-link :to="`/${book.id}`" class="btn btn-primary myButton m-3 col-8">Show details</router-link>
                <button v-if="isUserSignedIn()" @click="comingSoon()" class="btn btn-warning myButton m-3 col-8">Edit</button>
                <button v-if="isUserSignedIn()" @click="comingSoon()" class="btn btn-danger myButton m-3 col-8">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NavBar from '../NavBar.vue';

export default {
    name: 'BookList',
    components: {
        NavBar,
    },
    data() {
        return {
            books:[]
        };
    },
    created() {
        this.fetchBookList();
        
    },
    methods: {
        fetchBookList() {
            axios.get('/api/book')
                .then(response => {
                    this.books = response.data;
                    return response
                })
                .catch(error => {
                    return error
                })
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