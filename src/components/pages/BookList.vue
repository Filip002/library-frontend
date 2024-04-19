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
        <h2 id="H2" class="text-center my-3">{{ text }}</h2>
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
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item">
                    <a @click="handlePageNavigation(pageNumber-1)" href="#H2" class="page-link" v-if="pageNumber-1>=1" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-if="pageNumber-1>1"><a @click="handlePageNavigation(1)" href="#H2" class="page-link">{{ 1 }}</a></li>
                <li class="page-item" v-if="pageNumber!=1"><a @click="handlePageNavigation(pageNumber-1)" href="#H2" class="page-link">{{ pageNumber-1 }}</a></li>
                <li class="page-item"><a href="#H2" class="page-link bg-primary text-white">{{ pageNumber }}</a></li>
                <li class="page-item" v-if="pageNumber+1<=totalPages"><a @click="handlePageNavigation(pageNumber+1)" href="#H2" class="page-link">{{ pageNumber + 1 }}</a></li>
                <li class="page-item" v-if="totalPages!=1 && totalPages!=pageNumber+1 && totalPages!=pageNumber"><a @click="handlePageNavigation(totalPages)" href="#H2" class="page-link">{{ totalPages }}</a></li>
                <li class="page-item" v-if="pageNumber+1<=totalPages">
                    <a @click="handlePageNavigation(pageNumber+1)" href="#H2" class="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
                </ul>
        </nav>
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
            text: "List of Books",
            pageNumber: 1,
            pageSize: 5,
            totalPages: 1,
            totalItemsCount: 1,
            itemFrom: 1,
            itemsTo: 1
        };
    },
    created() {
        this.fetchBookList();
    },
    methods: {
        fetchBookList() {
            axios.get(`/api/book?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`)
                .then(response => {
                    this.books = response.data.items;
                    this.totalPages = response.data.totalPages;
                    this.totalItemsCount = response.data.totalItemsCount;
                    this.itemFrom = response.data.itemFrom;
                    this.itemsTo = response.data.itemsTo;
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
        handlePageNavigation(nextPageNumber){
            this.pageNumber=nextPageNumber;
            this.fetchBookListPage(nextPageNumber);
        },
        handleSearch(){
            this.fetchBookListPage(1)
        },
        fetchBookListPage(page){
            if(this.searchPhrase != "")
                this.text = 'Results for "' + this.searchPhrase.toString() + '"'
            axios.get(`/api/book?searchPhrase=${this.searchPhrase}&pageNumber=${page}&pageSize=${this.pageSize}`)
                .then(response => {
                    this.books = response.data.items;
                    this.totalPages = response.data.totalPages;
                    this.totalItemsCount = response.data.totalItemsCount;
                    this.itemFrom = response.data.itemFrom;
                    this.itemsTo = response.data.itemsTo;
                    this.pageNumber=page;
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