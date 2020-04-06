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
          <input type="button" @click="selectContact(user)" value="Select">
          <input type="button" @click="deleteContact(contact.id)" value="Delete">
         </td> 
       </tr>
     </table>
     <br>
        <form>
          <label>First Name</label>
          <input type="text" name="firstName" v-model="firstName">
          <br>
    
          <label>Last Name</label>
          <input type="text" name="lastName" v-model="lastName">
          <br>
    
          <label>Email</label>
          <input type="email" name="email" v-model="email">
          <br>
          
          <input v-if="!id" type="button" @click="createContact(firstName, lastName, email)" value="Add">
          <input v-if="id" type="button" @click="updateContact(id, firstName, lastName, email)" value="Update">
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
