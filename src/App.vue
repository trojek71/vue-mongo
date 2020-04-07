<template>
  <div id="app">
    <table border='1' width='100%' style='border-collapse: collapse;'>
       <tr>
         <th>First Name</th>
         <th>Email</th>
         <th>City</th>
         <th>Street</th>
         <th>Actions</th>
       </tr>
    
       <tr v-for='user in users' :key="user.id">
         <td>{{ user.name }}</td>
         <td>{{ user.email }}</td>
         <td>{{ user.address.city }}</td>
          <td>{{ user.address.street }}</td>
         
         <td>
          <input type="button" @click="selectUser(user)" value="Select">
          <input type="button" @click="deleteUser(user.id)" value="Delete">
         </td> 
       </tr>
     </table>
     <br>
        <form>
          <label>First Name</label>
          <input type="text" name="Name" v-model="name">
          <br>
    
     
          <label>Email</label>
          <input type="email" name="email" v-model="email">
          <br>
          <label>City</label>
          <input type="text" name="City" v-model="city">
          <br>
          <label>Street</label>
          <input type="text" name="Street" v-model="street">
          <br>
          <input v-if="!id" type="button" @click="createUser(name, email)" value="Add">
          <input v-if="id" type="button" @click="updateUser(name, email)" value="Update">
          <input type="button" @click="clearForm()" value="Clear">
          
        </form>
  </div>
</template>

<script>

import gql from 'graphql-tag'

export default {
  name: 'App',
  data(){
        return {
          users:{},
          id: null,
          name: '',
          email: '',
          city:'',
          street:''
          }
      },
      apollo: {
        users: gql`query {
          users {
            name,
            email,
            address{
              city,
              street
            }
          }
        }`,
      },
 

methods: {
        createUser(name, email){
          console.log(`Create contact: ${email}`)
          this.$apollo.mutate({
              mutation: gql`mutation createContact($firstName: String!, $lastName: String!, $email: String!){
                createContact(firstName: $firstName, lastName: $lastName, email: $email) {
                  id,
                  firstName,
                  lastName,
                  email}
              }`,
              variables:{
                firstName: name,
               
                email: email
              }
            }
          )
          location.reload();
        },
        updateContact(id, firstName, lastName, email){
          console.log(`Update contact: # ${id}`)
          this.$apollo.mutate({
              mutation: gql`mutation updateContact($id: ID!, $firstName: String!, $lastName: String!, $email: String!){
                updateContact(id: $id, firstName: $firstName, lastName: $lastName, email: $email)
              `,
              variables:{
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email
              }
            }
          )
          location.reload();
        },
        deleteContact(id){
          console.log(`Delete contact: # ${id}`)
          this.$apollo.mutate({
              mutation: gql`mutation deleteContact($id: ID!){
                deleteContact(id: $id)
              }`,
              variables:{
                id: id,
              }
            }
          )
          location.reload();
        },  
        selectUser(user){
          this.id = user.id;
          this.name = user.name;
          this.email = user.email;
          this.city= user.address.city
          this.street= user.address.street
        },  
      }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
