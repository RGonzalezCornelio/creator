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
                  },

                  //Show level 1 cache definition modal
                  level_1_cache_modal(index, button)
                  {

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

                '   <span class="h6">Number of Cache Level:</span>'+
                '' +
                '   <div class="col-lg-12 col-sm-12">' +
                '     <div class="compMenu">' +
                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="newComponentBtn" v-b-modal.modal_cache_definition_level_one> ' +
                '        1 Cache Level' +
                '       </b-button>' +

                '       <b-modal id="modal_cache_definition_level_one" title="Level One Cache Configuration">'+
                '         <span class="h6">Level 1</span>'+
                '         <b-form-radio-group id="radio_group_tipo_cache">'+
                '           <b-form-radio name="tipo_cache" value="unificada">Unificada</b-form-radio>'+
                '           <b-form-radio name="tipo_cache" value="no_unificada">No unificada</b-form-radio>'+
                '         </b-form-radio-group>'+

                '         <b-form-input-group>'+
                '           <b-col sm="auto">Tamaño de la Cache de Instrucciones:</b-col>'+
                '           <b-col sm="auto">'+
                '             <b-form-input type="number" id="cache_instrucciones" placeholder="KB" size="sm"></b-form-input>'+
                '           </b-col>'+

                '           <b-col sm="auto">Tamaño de la Cache de Datos:</b-col>'+
                '           <b-col sm="auto">'+
                '             <b-form-input type="number" id="cache_datos" placeholder="KB" size="sm"></b-form-input>'+
                '           </b-col>'+

                '           <b-col sm="auto">Tamaño de la Linea:</b-col>'+
                '           <b-col sm="auto">'+
                '             <b-form-input type="number" id="tamaño_linea" placeholder="KB" size="sm"></b-form-input>'+
                '           </b-col>'+
                '         </b-form-input-group>'+

                '         </span class="h4">Politica de Correspondencia:</span>'+
                '         <b-form-radio name="politica_correspondencia" value="correspondencia_directa">Correspondencia Directa</b-form-radio>'+
                '         <b-form-radio name="politica_correspondencia" value="correspondencia_asociativa">Correspondencia Asociativa</b-form-radio>'+
                '         <b-form-radio name="politica_correspondencia" value="asociativa_conjuntos">Asociativa por Conjuntos'+

                '           <b-form-input-group>'+
                '             <b-col sm="auto">Lineas por Conjunto (Cache Instrucciones):</b-col>'+
                '             <b-col sm="auto">'+
                '               <b-form-input type="number" id="linea_conjunto_cache_instrucciones" size="sm"></b-form-input>'+
                '             </b-col>'+

                '             <b-col sm="auto">Lineas por Conjunto (Cache de Datos):</b-col>'+
                '             <b-col sm="auto">'+
                '               <b-form-input type="number" id="linea_conjunto_cache_datos" size="sm"></b-form-input>'+
                '             </b-col>'+

                '           </b-form-input-group>'+
                '         </b-form-radio>'+


                '       </b-modal>'+
 




                '' +
                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="newComponentBtn" ' +
                '                v-b-modal.new_register_file> ' +
                '        2 Cache Levels' +
                '       </b-button>' +
                '' +
                '       <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100" ' +
                '                id="newComponentBtn" ' +
                '                v-b-modal.new_register_file> ' +
                '        3 Cache Levels' +
                '       </b-button>' +
                '     </div>' +

                ' </div>'+

                '</div>'

  }

  Vue.component('cache-definition', uielto_cache_definition) ;