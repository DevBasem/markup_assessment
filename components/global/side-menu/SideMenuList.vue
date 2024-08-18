<template>
  <!-- Desktop Navigation Start -->
  <nav>
    <ul>
      <li
        v-for="(listItem, index) in listItems"
        :key="index"
      >
        <NuxtLink
          :to="listItem.path"
          class="block py-3 relative transition-colors"
          :class="{ 'bg-secondaryAccent': isActive(listItem.path) }"
        >
          <div
            class="flex items-center gap-4 px-12 text-secondaryText transition-colors"
            :class="{ 'text-primaryText': isActive(listItem.path) }"
          >
            <i
              :class="`pi ${listItem.icon} ${
                isActive(listItem.path) ? 'text-primaryAccent' : ''
              }`"
            ></i>
            <h2
              :class="`font-medium ${
                isActive(listItem.path) ? 'text-primaryText' : ''
              }`"
            >
              {{ listItem.name }}
            </h2>
          </div>
          <div
            class="absolute w-1 h-full left-0 top-0 bg-primaryAccent transition-opacity"
            :class="{
              'opacity-100': isActive(listItem.path),
              'opacity-0': !isActive(listItem.path),
            }"
          ></div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
  <!-- Desktop Navigation End -->
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const listItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'pi-chart-bar',
  },
  {
    name: 'Corporates',
    path: '/corporates',
    icon: 'pi-database',
  },
  {
    name: 'Assets',
    path: '/assets',
    icon: 'pi-plus-circle',
  },
  {
    name: 'Networks',
    path: '/networks',
    icon: 'pi-wifi',
  },
  {
    name: 'Markups',
    path: '/',
    icon: 'pi-calculator',
  },
  {
    name: 'Packages',
    path: '/packages',
    icon: 'pi-box',
  },
  {
    name: 'Users Managements',
    path: '/users',
    icon: 'pi-users',
  },
  {
    name: 'Support',
    path: '/support',
    icon: 'pi-question-circle',
  },
];

function isActive(path) {
  return route.path === path;
}
</script>

<style scoped></style>
