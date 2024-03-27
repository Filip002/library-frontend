<template>
    <div class="container">
        <NavBar/>
        <div class="shadow rounded row p-2 m-3">
            <form>
                <div class="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        v-model="book.title"
                        type="text"
                        class="form-control"
                        id="title"
                        name="title"/>
                </div>
                <div class="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea
                        v-model="book.description"
                        type="textarea"
                        class="form-control"
                        id="description"
                        name="description"
                        rows="4"></textarea>
                </div>
                <div class="form-row row">
                    <div class="form-group col">
                        <label htmlFor="pageCount">Page count: </label>
                        <input
                            v-model="book.pageCount"
                            type="number"
                            class="form-control"
                            id="pageCount"
                            name="pageCount"
                            min="1"
                            max="2000"/>
                    </div>
                    <div class="form-group col mt-4">
                        <label htmlFor="isAvailable">Available: </label>
                        <input
                            v-model="book.isAvailable"
                            type="checkbox"
                            class="form-check-input mx-2"
                            id="isAvailable"
                            name="isAvailable"/>
                    </div>
                </div>
                <div class="form-group">
                    <label htmlFor="authorName">Author: </label>
                    <input
                        v-model="book.authorName"
                        type="text"
                        class="form-control"
                        id="authorName"
                        name="authorName"/>
                </div>
                <div class="form-group">
                    <label htmlFor="categories">Category: </label>
                    <input
                        v-model="book.categories[0].name"
                        type="text"
                        class="form-control"
                        id="categories"
                        name="categories"/>
                </div>
                <button
                    @click="handleCreateBook()"
                    :disabled="processing"
                    type="button"
                    class="btn btn-primary mt-3">
                    Add new Book
                </button>
                <router-link :to="`/`" class="btn btn-secondary mt-3 ms-3">Back to list</router-link>
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
    name: 'CreateBook',
    components: {
        NavBar,
        FooterC,
    },
    data() {
        return {
            book: {
                title: '',
                description: '',
                pageCount: 1,
                isAvailable: false,
                authorName: '',
                categories: [
                    {
                        name: ''
                    },
                ],
            },
            processing: false,
        };
    },
    methods: {
        handleCreateBook() {
            this.processing = true
            axios.post('api/book', this.book)
                .then(response => {
                    this.processing = false
                    this.book.title = ''
                    this.book.description = ''
                    this.book.pageCount = 1
                    this.book.isAvailable = false
                    this.book.authorName = ''
                    this.book.categories[0].name = ''
                    Swal.fire({
                        icon: 'success',
                        title: 'Book created successfully',
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
                        text: error,
                        showConfirmButton: false,
                        timer: 1700
                    })
                    return error
                });
        }
    }
}
</script>