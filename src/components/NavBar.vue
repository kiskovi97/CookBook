<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { getRedirectResult, signOut, signInWithPopup, type UserCredential } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { onMounted, ref } from 'vue'
import profile from '@/logos/profile-user.png'

defineProps<{
  search?: boolean
}>()

const auth = useFirebaseAuth()!
const user = useCurrentUser()
const error = ref(null)
const router = useRouter()

const googleAuthProvider = new GoogleAuthProvider()
function signOutLocal() {
  signOut(auth).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}
function signinPopup() {
  error.value = null
  signInWithPopup(auth, googleAuthProvider)
    .catch((reason) => {
      console.error('Failed sign', reason)
      error.value = reason
    })
    .then((user: void | UserCredential) => {
      if (user && user.user.email !== 'kiskovi97@gmail.com') {
        alert('You have no permission to enter this page')
        signOutLocal()
      }
    })
}
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})
const onSearchBlur = (event: FocusEvent) => {
  const input = event.target as HTMLInputElement
  const query = input.value.trim()
  if (query.length > 0) {
    router.push(`/search?search=${encodeURIComponent(query)}`)
  }
}

const onHandleProfileClick = () => {
  if (user.value) {
    signOutLocal()
  } else {
    signinPopup()
  }
}
</script>

<template>
  <div class="main">
    <div class="hamburger">

    </div>
    <div class="title">
      <RouterLink to="/">Husband Material</RouterLink>
    </div>
    <div class="tabs">
      <div> <RouterLink to="/desserts" >Desserts</RouterLink></div>
      <div> <RouterLink to="/dishes" >Main dishes</RouterLink></div>
      <div> <RouterLink to="/search" >All</RouterLink></div>
      <template v-if="user">
        <div> <RouterLink to="/upload" >Upload</RouterLink></div>
        <div> <RouterLink to="/inspection" >Inspection</RouterLink></div>
      </template>
    </div>

    <div v-if="search" className={styles.search}>
      <input
      type="text"
      placeholder="Search..."
      @blur="onSearchBlur"
    />
    </div>
      <div class="profile">
        <img class="profileImage" :src="user?.photoURL || profile" alt=""
        width="24" height="24" @click="onHandleProfileClick"/>
    </div>

  </div>
</template>

<style scoped>
.main
{
    margin-left: 2rem;
    margin-right: 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    line-height: 1.2rem;
}

.title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    color: var(--darkestColor);
    overflow: hidden;
}

.search {
    overflow: hidden;
}

.tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    flex-grow: 1;
    font-size: 14px;
}

.tabs_hamburger {
    position: absolute;
    top: 4rem;
    left: 2rem;
    width: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    gap: 2rem;
    font-size: 14px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    z-index: 1000;
    padding: 1.5rem 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
}

.main a
{
    color: var(--darkestColor);
    text-decoration: none;
}

.main a:hover
{
    color: var(--mainColor);
}

.hamburger {
    width: 0;
    height: 0;
    overflow: hidden;
}


@media only screen and (max-width: 60em) {
    .tabs {
        gap: 0.5rem;
        justify-content: space-between;
        flex-grow: unset;
    }
    .title
    {
        max-width: 6rem;
    }
    .main
    {
        margin-left: 0rem;
        margin-right: 0rem;
        justify-content: start;
        gap: 1rem;
    }

    .profile {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .search {
        width: 0px;
    }
}

@media only screen and (max-width: 40em) {
    .tabs {
        width: 0;
        height: 0;
        overflow: hidden;
    }
    .hamburger {
        width: 24px;
        height: 24px;
        overflow: visible;
    }
}
</style>
