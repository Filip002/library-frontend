<template>
    <div class="container">
        <NavBar/>
        <div class="shadow rounded row p-2 m-3">
            <span class="align-top col m-2"><img src="book.png" alt="book image"></span>
            <div class="col-4">
                <h5 class="fw-bold border-bottom"><span class="fw-normal">Title: </span>{{ book.title }}</h5>
                <p class="border-bottom">Author: <b>{{ book.authorName }}</b></p>
                <p class="border-bottom">PageCount: <b>{{ book.pageCount }}</b></p>
                <p class="border-bottom">Available: <b v-if="book.isAvailable">Available</b><b v-if="!book.isAvailable">Unavailable</b></p>
                <p class="border-bottom"><small>ID: <b>{{ book.id }}</b></small></p>
            </div>
            <div class="col row justify-content-end">
                <router-link :to="`/sign-in`" v-if="!isUserSignedIn()" class="btn btn-primary myButton2 m-3 col-8">Sign in to check out</router-link>
                <button v-if="isUserSignedIn()" @click="comingSoon()" class="btn btn-primary myButton m-3 col-8">Check out</button>
                <router-link :to="`/update-book/${book.id}`" v-if="isUserSignedIn()" class="btn btn-warning myButton m-3 col-8">Edit</router-link>
                <button v-if="isUserSignedIn()" @click="handleDelete(book.id)" class="btn btn-danger myButton m-3 col-8">Delete</button>
            </div>
            <div class="ms-2">
                <p class="border-bottom">Description: </p>
                <p class="mt-1 pb-2 border-bottom">{{ book.description }}</p>
                <p class="border-bottom">Categories: </p>
                    <ul v-for="category in book.categories" :key="category.name">
                        <li><b>{{ category.name }}</b></li>
                    </ul>
            </div>
            <router-link :to="`/`" class="btn btn-secondary">Back to list</router-link>
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
    name: 'BookComponent',
    components: {
        NavBar,
        FooterC,
    },
    data() {
        return {
            book: {}
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
                            this.$router.push('/')
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