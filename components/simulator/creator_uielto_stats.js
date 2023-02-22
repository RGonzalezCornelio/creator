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

                totalStats:              { type: Number, required: true },
                memory_access_counter:   { type: Number, required: true },
                memory_read_counter:     { type: Number, required: true },
                memory_write_counter:    { type: Number, required: true }
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
              '       <cache-stats v-if="stat_representation == \'cache\'" >'+

              //Esto hay que meterlo en creator_uielto_stats_cache

              '         <div class="col-lg-12 col-sm-12 row mx-0 px-2 border">' + // TODO: only in stack' +

              '           <table style="border:hidden">'+
              '             <tr>'+
              '               <td><h6>Instructions</h6></td>'+
              '             </tr>'+  

              '             <tr>'+
              '               <td></td>'+
              '               <td>Instruction Total Access: {{app._data.totalStats}}</td>'+ //TO DO queda pendiente de ver
              '             </tr>'+

              '             <tr>'+
              '               <td></td>'+
              '               <td>Hit Ratio:</td>'+
              '             </tr>'+

              '           </table>'+

              '             '+
             
              '         </div>'+

              '         <div class="col-lg-12 col-sm-12 row mx-0 px-2 border">'+
              '           <table style="border:hidden">'+
              '             <tr>'+
              '               <td><h6>Data</h6></td>'+
              '             </tr>'+              
              '             <tr>'+
              '               <td></td>'+
              '               <td>Data Total Access: {{memory_access_counter}}</td>'+
              '             </tr>'+
              '             <tr>'+
              '               <td></td>'+
              '               <td>Write accesses: {{memory_write_counter}}</td>'+
              '             </tr>'+
              '             <tr>'+
              '               <td></td>'+
              '               <td>Read accesses: {{memory_read_counter}}</td>'+
              '             </tr>'+

              '             <tr>'+
              '               <td></td>'+
              '               <td>Hit Ratio:</td>'+
              '             </tr>'+

              '           </table>'+

              '         </div>' +

              '       </cache-stats>'+
              '     </b-col>' +
              '   </b-row>' +
              ' </b-container>'

  }

  Vue.component('stats', uielto_stats) ;
