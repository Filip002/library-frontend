<template>
    <div class="container">
        <NavBar/>
        <div class="row justify-content-center bg-dark py-3 mx-4">
            <div class="col-10">
                <input type="text" v-model="searchPhrase" class="form-control" placeholder="search for books" v-on:keyup.enter="handleSearch()"/>
            </div>
            <div class="col-auto">
                <button @click="handleSearch()" class="btn btn-primary">Search</button>
            </div>
        </div>
        <h2 class="text-center my-3">{{ text }}</h2>
        <router-link :to="`/create-book`" v-if="isUserSignedIn()" class="btn btn-success mx-3">Add Book</router-link>
        <div class="shadow rounded row p-2 m-3" v-for="book in books" :key="book.id">
            <span class="align-top col m-2"><img src="book.png" alt="book image"></span>
            <div class="col-4">
                <h5 class="fw-bold border-bottom"><span class="fw-normal">Title: </span>{{ book.title }}</h5>
                <p class="border-bottom">Author: <b>{{ book.authorName }}</b></p>
                <p class="border-bottom">PageCount: <b>{{ book.pageCount }}</b></p>
                <p class="border-bottom">Available: <b v-if="book.isAvailable">Available</b><b v-if="!book.isAvailable">Unavailable</b></p>
                <p class="border-bottom"><small>ID: <b>{{ book.id }}</b></small></p>
            </div>
            <div class="col row justify-content-end">
                <router-link :to="`/${book.id}`" class="btn btn-primary myButton m-3 col-8">Show details</router-link>
                <router-link :to="`/update-book/${book.id}`" v-if="isUserSignedIn()" class="btn btn-warning myButton m-3 col-8">Edit</router-link>
                <button v-if="isUserSignedIn()" @click="handleDelete(book.id)" class="btn btn-danger myButton m-3 col-8">Delete</button>
            </div>
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
    name: 'BookList',
    components: {
        NavBar,
        FooterC,
    },
    data() {
        return {
            books:[],
            searchPhrase: "",
            text: "List of Books"
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
        handleSearch(){
            if(this.searchPhrase != "")
                this.text = 'Results for "' + this.searchPhrase.toString() + '"'
            axios.get(`/api/book?searchPhrase=${this.searchPhrase}`)
                .then(response => {
                    this.books = response.data;
                    return response
                })
                .catch(error => {
                    return error
                })
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
                                timer: 1700
                            })
                            this.fetchBookList()
                            return response
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                showConfirmButton: false,
                                timer: 1700
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