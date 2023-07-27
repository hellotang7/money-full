import { defineComponent } from 'vue';
export const One = defineComponent({
  setup:(props,context) => {
     return () => (
       <div>one</div>
    )
  }
 })