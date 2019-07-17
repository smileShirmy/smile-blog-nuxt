import filters from '@/services/filter'
import Vue from 'vue'

// 全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
