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

  var uielto_cache_definition = {

    props:      {
                  number_cache_levels:               { type: Number, required: true}
                },

data:           function () {
                  return {
                    
                  }
                },

methods:    {

            },

    template:   '<div class="col-lg-12 col-sm-12 row cacheDefinitionDiv  mx-0 px-0">' +
                '' +
                ' <div class="col-lg-12 col-sm-12">' +
                '   <br>'+
                '   <span class="h6">Cache definition:</span>' +
                '   <div class="col-lg-12 col-sm-12 row">'+

                '     <div class="compMenu">'+
                '       <b-button class="btn btn-outline-danger btn-sm buttonBackground h-100 w-100"'+
                '             >'+
                '         <span class="fas fa-power-off"></span>'+
                '         Reset Cache Definition'+
                '       </b-button>'+
                '     </div>'+
                '   </div>'+
                '   <br>'+

                ' <span class="h6">Number of Cache Level: {{number_cache_levels}}</span>'+
                //TO DO: Hacer un input y que guarde el valor en la variable "number_cache_levels"
                '' +

                '<br>'+

                '     <div class="h6" v-if="number_cache_levels == 1">'+
                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="btn_one_lvl_cache" v-b-modal.cache_definition_one_level> ' +
                '        1 Cache Level' +
                '       </b-button>' +
                '     </div>'+

                '     <div class="h6" v-if="number_cache_levels == 2">'+
                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="btn_one_lvl_cache" v-b-modal.cache_definition_one_level> ' +
                '        1 Cache Level' +
                '       </b-button>' +

                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="btn_two_lvl_cache" v-b-modal.cache_definition_two_level> ' +
                '        2 Cache Level' +
                '       </b-button>' +
                '     </div>'+

                '     <div class="h6" v-if="number_cache_levels == 3">'+
                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="btn_one_lvl_cache" v-b-modal.cache_definition_one_level> ' +
                '        1 Cache Level' +
                '       </b-button>' +

                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="btn_two_lvl_cache" v-b-modal.cache_definition_two_level> ' +
                '        2 Cache Level' +
                '       </b-button>' +

                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="btn_three_lvl_cache" v-b-modal.cache_definition_three_level> ' +
                '        3 Cache Level' +
                '       </b-button>' +
                '     </div>'+

                ' </div>'+

                '</div>'

  }

  Vue.component('cache-definition', uielto_cache_definition) ;