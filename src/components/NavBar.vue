<template>
    <nav class="navbar navbar-dark bg-dark">
        <router-link :to="`/`" class="navbar-brand m-2 p-2 bg-secondary rounded">Books</router-link>
        <router-link :to="`/sign-in`" class="navbar-brand m-2 p-2 bg-secondary rounded">Sign in</router-link>
        <router-link :to="`/register`" class="navbar-brand m-2 p-2 bg-secondary rounded">register</router-link>
    </nav>
</template>

<script>

export default {
    name: 'NavBar'
}

</script>