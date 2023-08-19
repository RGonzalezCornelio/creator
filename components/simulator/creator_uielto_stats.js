/*
 *  Copyright 2018-2022 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos
 *
 *  This file is part of CREATOR.
 *
 *  CREATOR is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  CREATOR is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with CREATOR.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


  /* jshint esversion: 6 */

  var uielto_stats = {

  props:      {
                stats:       { type: Array,  required: true },
                stats_value: { type: Number, required: true },

                total_stats:             { type: Number, required: true },
                memory_access_counter:   { type: Number, required: true },
                memory_read_counter:     { type: Number, required: true },
                memory_write_counter:    { type: Number, required: true },

                hit_ratio:               { type: Number, required: true },
                hit_ratio_data:               { type: Number, required: true }
              },

  data:       function () {
    return {
      stat_representation: 'graphic',
      stat_representation_options:  [
                                      { text: 'Graphic', value: 'graphic' },
                                      { text: 'Table', value: 'table' }
                                    ],
     
      stat_representation_options_cache: [
                                            {text: 'Cache', value: 'cache'}
                                         ]
    }
  },

  template:   ' <b-container fluid align-h="center" class="mx-0 my-3 px-2">' +
              '   <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '     <b-col align-h="center" class="px-2">' +
              '       <div class="border m-1 py-1 px-2">' +
              '         <b-badge variant="light" class="h6 groupLabelling border mx-2 my-0">Instruction Stats</b-badge>' +
              '         <b-form-group class="mb-2" v-slot="{ ariaDescribedby }">' +
              '           <b-form-radio-group' +
              '             id="btn-radios-1"' +
              '             class="w-100"' +
              '             v-model="stat_representation"' +
              '             :options="stat_representation_options"' +
              '             button-variant="outline-secondary"' +
              '             size="sm"' +
              '             :aria-describedby="ariaDescribedby"' +
              '             name="radios-btn-default"' +
              '             buttons' +
              '           ></b-form-radio-group>' +
              '         </b-form-group>' +
              '       </div >' +
              '     </b-col>' +
              '' +
              '     <b-col>' +
              '       <div class="border m-1 py-1 px-2">' +
              '         <b-badge variant="light" class="h6 groupLabelling border mx-2 my-0">Cache Stats</b-badge>' +
              '         <b-form-group class="mb-2" v-slot="{ ariaDescribedby }">' +
              '           <b-form-radio-group' +
              '             id="btn-radios-1"' +
              '             class="w-100"' +
              '             v-model="stat_representation"' +
              '             :options="stat_representation_options_cache"' +
              '             button-variant="outline-secondary"' +
              '             size="sm"' +
              '             :aria-describedby="ariaDescribedby"' +
              '             name="radios-btn-default"' +
              '             buttons' +
              '           ></b-form-radio-group>' +
              '         </b-form-group>' +
              '       </div >' +
              '     </b-col>' +
              '   </b-row>' +
              '' +
              '   <b-row cols="1">' +
              '     <b-col align-h="center" class="px-2 my-2">' +

              '       <plot-stats :stats_value="stats_value" v-if="stat_representation == \'graphic\'"></plot-stats>  ' +
              '       <table-stats :stats="stats" v-if="stat_representation == \'table\'"></table-stats> ' +
              '       <cache-stats :total_stats="total_stats" :memory_access_counter="memory_access_counter" :memory_read_counter="memory_read_counter" :memory_write_counter="memory_write_counter" :hit_ratio="hit_ratio" :hit_ratio_data="hit_ratio_data" v-if="stat_representation == \'cache\'"></cache-stats>'+
              
              '     </b-col>' +
              '   </b-row>' +
              ' </b-container>'

  }

  Vue.component('stats', uielto_stats) ;
