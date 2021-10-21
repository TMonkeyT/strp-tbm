<template>

    <div class="card" style="min-width: 22rem; max-width:24rem; flex:1;">
        <img class="card-img-top" :src="car.imglink" alt="Card image" style="height: 13rem">
        <div class="card-body">
            <h5 class="card-title">{{car.name}}</h5>
            <p class="text-success" v-if="car.buyprice">${{Intl.NumberFormat('en-US').format(car.buyprice)}}</p>
            <p class="text-warning" v-if="car.currentbid > 0">${{Intl.NumberFormat('en-US').format(car.currentbid)}}</p>
            <hr>
            <p>{{ fromNow }}</p>
            <p>PDM Price: ${{Intl.NumberFormat('en-US').format(car.price)}} <span class="text-light">( Dif: ${{Intl.NumberFormat('en-US').format(car.buyprice - car.price)}} )</span>  </p>
            <p>Trunk: {{ Intl.NumberFormat('en-US').format(car.trunksize) }}</p>
        </div>
    </div>

</template>

<script>
export default {
    props: ['car'],
    computed: {
        fromNow : function() {
            return moment(this.car.listdate).fromNow()
        }
    }
}
</script>

<style scoped>
 p{
     margin: 0;
 }
</style>