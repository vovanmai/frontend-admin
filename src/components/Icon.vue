<script setup>
import {
  OrderedListOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
} from '@ant-design/icons-vue'

const props = defineProps({
  name: {
    type: String,
    required: false
  }
})

const name = props.name
let component = null
console.log('icon:' + name)

if (name == 'OrderedListOutlined') {
  component = OrderedListOutlined
} else if (name == 'MenuUnfoldOutlined') {
  component = MenuUnfoldOutlined
} else if (name == 'HomeOutlined') {
  component = HomeOutlined
} else if (name == 'UserOutlined') {
  component = UserOutlined
}
</script>

<template>
  <component :is="component"/>
</template>

<style scoped>

</style>
