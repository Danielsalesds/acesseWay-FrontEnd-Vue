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
    .title {
    margin-top: 40px;
    text-align: center;
    font-size: 26px;
}

/* Container centralizando a tabela totalmente */
.table-request {
    display: flex;
    justify-content: center;
    padding: 30px;
    width: 100%;
}

/* Tabela mais elegante e larga */
table {
    width: 100%;
    max-width: 1300px; /* aumenta a largura real */
    border-collapse: collapse;
    background-color: #242526;
    border-radius: 10px;
    overflow: hidden; /* cantos arredondados reais */
    table-layout: auto; /* deixa as colunas se ajustarem automaticamente */
}

/* Cabeçalho */
th {
    padding: 18px 12px;
    background-color: #3a3b3c;
    color: #fff;
    font-weight: bold;
    border-bottom: 2px solid #555;
    text-align: left;
    white-space: nowrap; /* coluna mais limpa */
}

/* Linhas */
td {
    padding: 14px 12px;
    vertical-align: middle;
    border-bottom: 1px solid #444;
    color: #e4e6eb;
    max-width: 250px;           
    overflow: hidden;
    text-overflow: ellipsis;     /* evita textos quebrando */
    white-space: nowrap;         /* deixa em linha única elegante */
}

/* Cor das linhas alternadas */
tbody tr:nth-child(odd) {
    background-color: #1f1f1f;
}
tbody tr:nth-child(even) {
    background-color: #2a2b2c;
}

/* Hover bonito */
tbody tr:hover {
    background-color: #333;
    transition: 0.2s;
}

/* Imagens arredondadas */
td img {
    border-radius: 8px;
    object-fit: cover;
}

/* Botões */
.action-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn {
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

/* Aprovar */
.btn-approve {
    background-color: #198754;
    color: #fff;
}
.btn-approve:hover {
    background-color: #157347;
}
.btn-approve:active {
    transform: scale(0.97);
}

/* Negar */
.btn-deny {
    background-color: #952034;
    color: #fff;
}
.btn-deny:hover {
    background-color: #b7314c;
}
.btn-deny:active {
    transform: scale(0.97);
}

/* Responsividade */
@media (max-width: 900px) {
    table {
        max-width: 100%;
        font-size: 14px;
    }
    td, th {
        padding: 10px;
        white-space: normal;
    }
}

</style>