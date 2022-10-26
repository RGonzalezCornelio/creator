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
                  cache_definition:                  { type: Array,  required: true }
                },

    data:       function () {
                  return {
                    
                  }
                },

    methods:    {
                  //Show edit cache definition modal
                  edit_cache_definition_modal(button)
                  {
                    app.$refs.cache_definition_edit.cache_definition = structuredClone(this._props.cache_definition);
                    
                    this.$root.$emit('bv::show::modal', 'cache_definition_edit', button);
                  }
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

                '   <span class="h6">Número de niveles de caché:</span>'+
                '     <b-container fluid align-h="center" class="mx-0 px-0">'+
                '       <b-row>'+
                '         <b-col class="menu" id="cacheLevels">'+
                '           <b-tabs>'+
                '             <b-tab title="1 Nivel de Cache" active>'+

                '             </b-tab>'+
                '             <b-tab title="2 Niveles de Cache" active>'+

                '             </b-tab>'+
                '             <b-tab title="3 Niveles de Cache" active>'+

                '             </b-tab>'+
                '           </b-tabs>'+
                '         </b-col>'+
                '       </b-row>'+
                '     </b-container>'+

                ' </div>' +

                '</div>'

  }

  Vue.component('cache-definition', uielto_cache_definition) ;