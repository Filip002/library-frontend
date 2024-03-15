<template>
    <div class="container">
        <NavBar/>
        <div class="shadow rounded row p-2 m-3">
            <form>
                <div class="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        v-model="updatedBook.title"
                        type="text"
                        class="form-control"
                        id="title"
                        name="title"/>
                </div>
                <div class="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea
                        v-model="updatedBook.description"
                        type="textarea"
                        class="form-control"
                        id="description"
                        name="description"
                        rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label htmlFor="isAvailable">Available: </label>
                    <input
                        v-model="updatedBook.isAvailable"
                        type="checkbox"
                        class="form-check-input mx-2"
                        id="isAvailable"
                        name="isAvailable"/>
                </div>
                <button
                    @click="handleUpdateBook(book.id)"
                    :disabled="processing"
                    type="button"
                    class="btn btn-primary mt-3">
                    Save changes
                </button>
                <router-link :to="`/`" class="btn btn-secondary mt-3 ms-3">Back to list</router-link>
            </form>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import NavBar from '../NavBar.vue';

export default {
    name: 'UpdateBook',
    components: {
        NavBar,
    },
    data() {
        return {
            book: {},
            updatedBook: {
                title: '',
                description: '',
                isAvailable: false,
            },
            processing: false,
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
                    this.updatedBook.title = this.book.title
                    this.updatedBook.description = this.book.description
                    this.updatedBook.isAvailable = this.book.isAvailable
                    return response
                })
                .catch(error => {
                    return error
                });
        },
        handleUpdateBook(id) {
            this.processing = true
            axios.put(`api/book/${id}`, this.updatedBook)
                .then(response => {
                    this.processing = false
                    this.$router.push(`/${id}`)
                    return response
                })
                .catch(error => {
                    this.processing = false
                    return error
                });
        }
    }
}
</script>