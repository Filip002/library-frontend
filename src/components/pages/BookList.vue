<template>
    <div class="container">
        <NavBar/>
        <h2 class="text-center mt-5 mb-3">List of Books</h2>
        <button class="btn btn-success mx-3">Add Book</button>
        <div class="border border-secondary rounded row p-2 m-3" v-for="book in books" :key="book.id">
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
                <router-link :to="`/${book.id}`" class="btn btn-primary m-3 col-8">Show details</router-link>
                <button class="btn btn-warning m-3 col-8">Edit</button>
                <button class="btn btn-danger m-3 col-8">Delete</button>
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
                });
        }
    }
}

</script>