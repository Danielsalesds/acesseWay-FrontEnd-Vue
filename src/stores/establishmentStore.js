import { defineStore } from "pinia";
export const useEstablishmentStore = defineStore('establishment', {
  state: () => ({     // guarda o usuário criado (opcional)
    establishments: [],
    reviews: [],
    loading: false,
    error: null,
    url: "https://acessway.onrender.com",
    focusedEstablishmentId: null
  }),
  actions:{
    focusOnEstablishment(id){
        this.focusedEstablishmentId = id 
    },
    async getEstablishment() {
        this.loading = true
        try{
            const response = await fetch(`${this.url}/establishment`);
            const data = await response.json()
            this.establishments = data.content
            console.log(data.content)
        }catch(error){
            console.error("Falha ao buscar estabelecimentos:", error)
        }finally{
            this.loading = false
        }
    },
        async getEstablishmentById(id) {
        this.loading = true
        try{
            const response = await fetch(`${this.url}/establishment/${id}`);
            const data = await response.json()
            return data
        }catch(error){
            console.error("Falha ao buscar estabelecimento:", error)
        }finally{
            this.loading = false
        }
    },
    async sendReview(id, review){
        this.loading = true
        try{
            const response = await fetch(`${this.url}/review/${id}`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review)
            });
            const data = await response.json()
            return data
        }catch(error){
            console.error("Falha ao salvar avaliação", error)
        }finally{
            this.loading = false
        }
    },
    async getReview(id){
        this.loading = true
        try{
            const response = await fetch(`${this.url}/review/${id}`);
            const data = await response.json()
            this.reviews = data.content || []
            console.log("Reviews: "+this.reviews)
            return data
        }catch(error){
            console.error("Falha ao buscar avaliações:", error)
        }finally{
            this.loading = false
        }
    }
  }
});