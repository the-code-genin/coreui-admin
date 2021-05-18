<template>
  <div class="c-app">
    <TheSidebar/>
    <CWrapper>
        <TheHeader/>
        <div class="c-body">
            <main class="c-main">
                <CContainer fluid>
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </CContainer>
            </main>
            <TheFooter/>
        </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from '@/components/layout/TheSidebar'
import TheHeader from '@/components/layout/TheHeader'
import TheFooter from '@/components/layout/TheFooter'

export default {
  name: 'Layout',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
