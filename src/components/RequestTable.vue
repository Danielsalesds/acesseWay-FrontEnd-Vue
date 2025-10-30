<template>
    <h1 class="title">Tabela de Solicitações</h1>
    <div v-if="loading"> Carregando dados</div>
    <div v-else-if="requests.length > 0" class="table-request">
        <table>
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>CNPJ</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="request in requests" :key="request.id">
                    <td>
                        <img v-if="request.imageUrl != ''" :src="request.imageUrl" alt="Imagem"
                        width="75" height="75">
                        <p v-else>Imagem não definida</p>
                    </td>
                    <td>{{ request.name }}</td>
                    <td>{{ request.cnpj }}</td>
                    <td>{{ request.email }}</td>
                    <td>{{ request.phone }}</td>
                    <td>{{ request.status }}</td>
                    <td>
                        <div class="action-buttons">
                            <button @click="$emit('approve', request)" class="btn btn-approve">Aprovar</button>
                            <button @click="$emit('deny', request)" class="btn btn-deny">Negar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <p v-else>Nenhuma solicitação pendente no momento.</p>
</template>
<script setup>
    import { defineProps } from 'vue'
    defineProps({
        requests:{
            type: Array,
            required: true
        },
        loading:{
            type: Boolean,
            default: false
        }
    })
</script>
<style scoped>
    .title{
        margin-top: 100px; 
    }
    .table-request{
        display: flex;
        justify-content: center;
        padding: 20px;
        /* align-items: center; */
    }
    table{
        table-layout: fixed;
        
        width: 100%;
        border-collapse: collapse;
        border: none;
    }
    td {
        padding: 10px;
        text-align: center;
        vertical-align: middle;
        padding: 12px 10px;
  
        border-bottom: 2px dotted #555; 
        
        border-left: none;
        border-right: none;
    }
    th{
        padding: 20px;
        background-color: #3a3b3c;
        text-align: left;
        border-bottom: 2px solid #555;
    }
    tbody tr td:nth-child(odd) {
        background-color: #242526; 
    }

    tbody tr td:nth-child(even) {
        background-color: #2a2b2c; 
    }

    .action-buttons{
        display: flex;
        justify-content: space-between;
    }
    .btn {
        background-color: #0d6efd; 
        color: #ffffff;             
        padding: 10px 20px;
        border: none;                
        border-radius: 5px;          
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out, transform 0.1s ease;
    }
    .btn:hover {
        background-color: #0b5ed7; 
    }
    .btn:active {
        background-color: #0a58ca;
        transform: scale(0.98); 
    }
    .btn:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.4); 
    }

    .btn-approve {
        background-color: #198754; /* Verde sucesso */
    }
    .btn-approve:hover {
        background-color: #157347;
    }
    .btn-approve:active {
        background-color: #146c43;
    }
    .btn-approve:focus {
        box-shadow: 0 0 0 4px rgba(25, 135, 84, 0.4);
    }

    .btn-deny {
        background-color: #952034; 
    }

    .btn-deny:hover {
        background-color: #b7314c; 
    }

    .btn-deny:active {
        background-color: #740f1c;
        border-color: #740f1c;
    }

    .btn-deny:focus {
        box-shadow: 0 0 0 4px rgba(149, 32, 52, 0.4);
    }
</style>