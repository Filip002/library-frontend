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
                <router-link :to="`/update-book/${book.id}`" v-if="isUserSignedIn()" class="btn btn-warning myButton m-3 col-8">Edit</router-link>
                <button v-if="isUserSignedIn()" @click="handleDelete(book.id)" class="btn btn-danger myButton m-3 col-8">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
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
        handleDelete(id){
            if(this.isUserSignedIn){
                Swal.fire({
                    title: 'Warning',
                    text: 'Do you want to delete that book?',
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#bbb',
                    confirmButtonText: 'Delete'
                }).then((result) => {
                    if(result.isConfirmed) {
                        axios.delete(`/api/book/${id}`)
                        .then(response => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Book deleted successfully',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            this.fetchBookList()
                            return response
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            return error
                        });
                    }
                })
            }
        },
        comingSoon() {
            alert("coming soon")
        }
    }
}

</script>