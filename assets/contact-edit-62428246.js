import{_ as r,k as s,o as i,c as d,w as p,d as u,a as c,f as l,e as m}from"./index-21b383b3.js";const f={data(){return{contact:null}},async created(){const t=this.$route.params._id;t?this.contact=await s.get(t):this.contact=s.getEmptyContact()},methods:{save(t){this.$store.dispatch({type:"save",contact:t}),this.$router.push("/contact")}}},h=c("button",null,"Save",-1);function v(t,e,_,x,o,n){return o.contact?(i(),d("form",{key:0,onSubmit:e[1]||(e[1]=l(a=>n.save(this.contact),["prevent"])),class:"contact-edit"},[p(c("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=a=>o.contact.name=a)},null,512),[[u,o.contact.name]]),h],32)):m("",!0)}const k=r(f,[["render",v]]);export{k as default};
