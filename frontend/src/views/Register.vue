<template>
    <div className="w-full max-w-md space-y-8">
        <div>
            <img className="mx-auto h-12 w-auto"
                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register For Free</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                {{' '}}
                <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Login To Your Account
                </router-link>
            </p>
        </div>
        <form className="mt-8 space-y-6" @submit="register">
            <input type="hidden" name="remember" value="true"/>
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label htmlFor="fullname" className="sr-only">Full Name</label>
                    <input
                        id="fullname"
                        name="email"
                        type="text"
                        v-model = "user.name"
                        autoComplete="name"
                        required=""
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                       placeholder="Full Name"/>
                </div>
                <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required=""
                        v-model = "user.email"
                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           placeholder="Email address"/>
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required=""
                        v-model = "user.password"
                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           placeholder="Password"/>
                </div>
                <div>
                    <label htmlFor="password_confirmation" className="sr-only">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        autoComplete="current-password"
                        required=""
                        v-model = "user.password_confirmation"
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                           placeholder="Confirm Password"/>
                </div>
            </div>

            <div>
                <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import store from "../store/index.js";
import {useRouter} from "vue-router";

const router = useRouter();

const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
};

function register(ev) {
    ev.preventDefault()
    store
        .dispatch('register', user)
        .then((res) => {
            router.push({name: 'Dashboard'})
        })
}

</script>
