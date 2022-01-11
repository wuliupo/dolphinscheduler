/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
<template>
  <router-view v-if="$route.name === 'login'" />
  <m-layout v-else-if="isInit">
    <m-nav slot="top"></m-nav>
    <router-view slot="bottom" v-if="isRenderRouterView" />
  </m-layout>
</template>

<script>
  import visibility from '@/module/visibility'
  import mLayout from '@/module/components/layout/layout'
  import mNav from '@/module/components/nav/nav'

  export default {
    name: 'app',
    data () {
      return {
        isInit: false,
        isRenderRouterView: true
      }
    },
    methods: {
      reload () {
        this.isRenderRouterView = false
        this.$nextTick(() => {
          this.isRenderRouterView = true
        })
      }
    },
    async mounted () {
      setTimeout(() => this.isInit = true, 100);
      visibility.change((evt, hidden) => {
        if (hidden === false && this.$route.meta.refreshInSwitchedTab) {
          this.reload()
        }
      })
    },
    components: { mLayout, mNav }
  }
</script>
