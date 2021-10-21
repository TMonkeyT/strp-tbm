<template>
    <div>
        <div class="w-100 p-2 pb-0 d-flex">
            <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-model="search">
            <select v-model="filters.auctions" class="form-select" style="width:14rem;margin-left:.5rem;">
                <option value="default">Auctions Shown</option>
                <option value="hidden">Auctions Hidden</option>
                <option value="only">Auctions Only</option>
            </select>
            <select v-model="sort" class="form-select" style="width:14rem;margin-left:.5rem;">
                <option value="listdate">Date Listed</option>
                <option value="buyprice">Price</option>
                <option value="trunksize">Trunk</option>
            </select>
            <div>
                <input v-model="reverse" type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
                <label class="btn btn-outline-primary" for="btncheck1" style="width: 6rem;margin-left:.5rem;">Invert</label>
            </div>
        </div>

        <div class="btn-group-toggle w-100 p-2 pb-0 text-center" data-toggle="buttons">
            <input type="checkbox" class="btn-check" id="importToggle" v-model="filters.categories['imports']">
            <label class="btn btn-outline-info" for="importToggle">Imports</label>

            <input type="checkbox" class="btn-check" id="pdmImportToggle" v-model="filters.categories['pdm imports']">
            <label class="btn btn-outline-info" for="pdmImportToggle">PDM Imports</label>

            <input type="checkbox" class="btn-check" id="ltdToggle" v-model="filters.categories['ltdedition']">
            <label class="btn btn-outline-info" for="ltdToggle">LTD Edition</label>

            <input type="checkbox" class="btn-check" id="boatsToggle" v-model="filters.categories['boats']">
            <label class="btn btn-outline-info" for="boatsToggle">Boats</label>

            <input type="checkbox" class="btn-check" id="superToggle" v-model="filters.categories['supers']">
            <label class="btn btn-outline-info" for="superToggle">Supers</label>

            <input type="checkbox" class="btn-check" id="sportsToggle" v-model="filters.categories['sports']">
            <label class="btn btn-outline-info" for="sportsToggle">Sports</label>

            <input type="checkbox" class="btn-check" id="sportsCToggle" v-model="filters.categories['sportsclassics']">
            <label class="btn btn-outline-info" for="sportsCToggle">Sports Classics</label>

            <input type="checkbox" class="btn-check" id="muscleToggle" v-model="filters.categories['muscle']">
            <label class="btn btn-outline-info" for="muscleToggle">Muscle</label>

            <input type="checkbox" class="btn-check" id="coupeToggle" v-model="filters.categories['coupes']">
            <label class="btn btn-outline-info" for="coupeToggle">Coupes</label>

            <input type="checkbox" class="btn-check" id="compactsToggle" v-model="filters.categories['compacts']">
            <label class="btn btn-outline-info" for="compactsToggle">Compacts</label>

            <input type="checkbox" class="btn-check" id="sedansToggle" v-model="filters.categories['sedans']">
            <label class="btn btn-outline-info" for="sedansToggle">Sedans</label>

            <input type="checkbox" class="btn-check" id="suvToggle" v-model="filters.categories['suvs']">
            <label class="btn btn-outline-info" for="suvToggle">SUVs</label>

            <input type="checkbox" class="btn-check" id="vanToggle" v-model="filters.categories['vans']">
            <label class="btn btn-outline-info" for="vanToggle">Vans</label>

            <input type="checkbox" class="btn-check" id="offroadToggle" v-model="filters.categories['offroad']">
            <label class="btn btn-outline-info" for="offroadToggle">Offroad</label>

            <input type="checkbox" class="btn-check" id="motoToggle" v-model="filters.categories['motorcycles']">
            <label class="btn btn-outline-info" for="motoToggle">Motorcycles</label>
        </div>

        <div class="d-flex flex-wrap justify-content-center w-100">
            <car class="m-2" v-for="car in filtered" :key="car.listdate.toString()" :car="car"></car>
        </div>
    </div>
</template>

<script>
import car from './car.vue'
export default {
    props: [],
    data: function() {
        return {
            cars: [],
            search: "",
            filters: {
                categories: {
                    "imports" : false,
                    "pdm imports" : false,
                    "ltdedition" : false,
                    "boats" : false,
                    "supers" : false,
                    "sports" : false,
                    "sportsclassics" : false,
                    "muscle" : false,
                    "coupes" : false,
                    "compacts" : false,
                    "sedans" : false,
                    "suvs" : false,
                    "vans" : false,
                    "offroad" : false,
                    "motorcycles" : false,
                },
                auctions: "default",
            },
            sort: "listdate",
            reverse: true,
        }
    },
    computed: {
        filtered: function() {
            let f = [...this.cars]
            if (this.search.length > 0) {
                f = f.filter(car => {
                    return car.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            
            let catFilter = false

            for (const k in this.filters.categories) {
                const element = this.filters.categories[k];
                if (element) catFilter = true;
            }

            if (catFilter) {
                f = f.filter(car => {
                    return this.filters.categories[car.category]
                })
            }

            if (this.filters.auctions == "hidden"){
                f = f.filter(car => {
                    return (car.buyprice)
                })
            } else if (this.filters.auctions == "only") {
                f = f.filter(car => {
                    return (car.currentbid)
                })
            }

            f.sort(this.dynamicSort(this.sort))
            if (this.reverse) {
                f = f.reverse()
            }

            return f;
        }
    },
    components: {
        car
    },
    methods: {
        formatCars : function() {
            for (let i = 0; i < this.cars.length; i++) {
                const car = this.cars[i];
                car.listdate = new Date(car.listdate);
                delete car.buyer;
                delete car.damages;
                delete car.garage_name;
                delete car.houseid;
                delete car.job;
                delete car.loaded;
                delete car.mid;
                delete car.owner;
                delete car.photo;
                delete car.model;
            }
        },
        dynamicSort : function(property) { // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                /* next line works with strings and numbers, 
                * and you may want to customize it to your needs
                */
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
    },
    mounted: function() {
        let _this = this;
        axios.get("https://stapi-proxy.alexr03.dev/v1/market/getlistings")
        .then(function(response) {
            _this.cars = response.data
        })
    }

}
</script>

<style>

</style>