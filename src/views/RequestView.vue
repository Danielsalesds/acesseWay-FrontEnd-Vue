<template>
    <TheHeader/>
    <body>
        <RequestTable
            :requests="requests"
            :loading="loading"
            @approve="approveRequest"
            @deny="denyRequest"
        />
    </body>
</template>

<script setup>
    import RequestTable from '@/components/RequestTable.vue'
    import TheHeader from '@/components/TheHeader.vue'
    import { ref, onMounted } from 'vue'
    const requests = ref([])
    const loading = ref(false)

    async function getRequests() {
        loading.value = true
        try{
            const response = await fetch("https://acessway.onrender.com/establishment-request");
            const data = await response.json()
            requests.value = data.content
            console.log(requests.value)
        }catch(error){
            console.error("Falha ao buscar solicitações:", error)
        }finally{
            loading.value = false
        }
    }
    async function approveRequest(request){
        try{
            request.status = "APPROVED"
            await fetch(`https://establishment-ms.onrender.com/establishment-request/${request.id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            await getRequests()
        }catch(error){
            console.error("Falha ao aprovar solicitações:", error)
        }
    }
    async function denyRequest(request){
        try{
            request.status = "REJECTED"
            await fetch(`https://establishment-ms.onrender.com/establishment-request/${request.id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            await getRequests()
        }catch(error){
            console.error("Falha ao negar solicitações:", error)
        }
    }
    onMounted(getRequests)
</script>
<style>
    body{
        background-color: #18191a;
        color: white;
    }
</style>