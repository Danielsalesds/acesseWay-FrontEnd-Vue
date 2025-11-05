import { defineStore } from "pinia";
export const useEstablishmentStore = defineStore('establishment', {
  state: () => ({     // guarda o usuário criado (opcional)
    establishments: [],
    loading: false,
    error: null,
  }),
  actions:{
    async getEstablishment() {
        this.loading = true
        try{
            const response = await fetch("https://establishment-ms.onrender.com/establishment");
            const data = await response.json()
            this.establishments = data.content
            console.log(data.content)
        }catch(error){
            console.error("Falha ao buscar estabelecimentos:", error)
        }finally{
            this.loading = false
        }
    },
    async getReview(id){
        this.loading = true
        try{
            const response = await fetch(`https://establishment-ms.onrender.com/review/${id}`);
            const data = await response.json()
            console.log(data.content)
            return data
        }catch(error){
            console.error("Falha ao buscar avaliações:", error)
        }finally{
            this.loading = false
        }
    }
  }
});