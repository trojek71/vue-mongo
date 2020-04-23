<template>
  <div id="app">
    <table border='1' width='100%' style='border-collapse: collapse;'>
       <tr>
         <th>User Id</th>
         <th>First Name</th>
         <th>Email</th>
         <th>City</th>
         <th>Street</th>
         <th>Actions</th>
       </tr>
    
       <tr v-for='user in users' :key="user.userId">
         <td>{{ user.userId }}</td>
         <td>{{ user.name }}</td>
         <td>{{ user.email }}</td>
         <td>{{ user.address.city }}</td>
          <td>{{ user.address.street }}</td>
         
         <td>
          <input type="button" @click="selectUser(user)" value="Select">
          <input type="button" @click="delUser(user.name)" value="Delete">
         </td> 
       </tr>
     </table>
     <br>
        <form>
           <label>User Id</label>
          <input type="text" userId="User Id" v-model="userId">
          <br>
          <label>First Name</label>
          <input type="text" name="name" v-model="name">
          <br>
    
     
          <label>Email</label>
          <input type="email" email="email" v-model="email">
          <br>
          <label>City</label>
          <input type="text" City="City" v-model="city">
          <br>
          <label>Street</label>
          <input type="text" street="Street" v-model="street">
          <br>
          <input v-if="!userId" type="button" @click="createUser(name, email)" value="Add">
          <input v-if="userId" type="button" @click="updateUser(name, email)" value="Update">
          <input type="button" @click="clearForm()" value="Clear">
          
        </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const DEL_USER = gql`
   mutation deleteUser($name: String!) {
     deleteUser(name:$name) {
       name,
       userId,
       email,
       address{
         city,
         street
       }
     }
       
      
     
   }
 `;


export default {
  name: 'App',
  data(){
        return {
          users:{},
          
          userId:'',
          name: '',
          email: '',
          city:'',
          street:'',
          }
      },
      apollo: {
        users: gql`query {
          users {
            userId,
            name,
            email,
            address{
              city,
              street,
            }
          }
        }`,
      },
 

methods: {
       // createUser(name, email){
       //   console.log(`Create contact: ${email}`)
       //   this.$apollo.mutate({
       //       mutation: gql`mutation createContact($firstName: String!, $lastName: String!, $email: String!){
       //         createContact(firstName: $firstName, lastName: $lastName, email: $email) {
       //           id,
       //           firstName,
       //           lastName,
       //           email}
       //       }`,
       //       variables:{
       //         firstName: name,
       //        
       //         email: email
       //       }
       //     }
     //     )
     //     location.reload();
     //   },
     //   updateContact(id, firstName, lastName, email){
     //     console.log(`Update contact: # ${id}`)
     //     this.$apollo.mutate({
     //         mutation: gql`mutation updateContact($id: ID!, $firstName: String!, $lastName: String!, $email: String!){
     //           updateContact(id: $id, firstName: $firstName, lastName: $lastName, email: $email)
     //         }`,
     //         variables:{
     //           id: id,
     //           firstName: firstName,
     //           lastName: lastName,
     //           email: email
     //         }
      //      }
     //     )
     //     location.reload();
     //   },
     //   deleteUser(name){
     //     console.log(`Delete user: # $name`)
     //     this.$apollo.mutate({
     //         mutation: gql`mutation deleteUser($name: String!){
     //           deleteUser(name: $name, userId: $userId, email:$email, city:$city, street:$street)
     //         }`,
     //         variables:{
     //           name: name,
     //         }
     //       }
     //     )
         //location.reload();
     //   },
     
      delUser(name){
         
          this.$apollo.mutate({
              mutation:  DEL_USER,
              variables:{
                name: name,
                

                
                },
            }
          )
     location.reload();
        },    
        selectUser(user){
          this.userId = user.userId;
          this.name = user.name;
          this.email = user.email;
          this.city= user.address.city;
          this.street= user.address.street;
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
