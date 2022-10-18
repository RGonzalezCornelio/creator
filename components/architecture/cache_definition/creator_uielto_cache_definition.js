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
                '  <div class="col-lg-12 col-sm-12">' +
                '    <span class="h6">Cache Definition:</span>' +
                '    <div class="col-lg-12 col-sm-12 row">' +
                '      <div class="compMenu">' +
                '        <b-button class="btn btn-outline-secondary btn-sm buttonBackground h-100 w-100" ' +
                '                  @click.stop="edit_cache_definition_modal($event.target)">' +
                '          <span class="fas fa-exchange-alt"></span> ' +
                '          Change Cache Definition' +
                '        </b-button>' +
                '      </div>' +
                '      <div class="compMenu">' +
                '        <b-button class="btn btn-outline-danger btn-sm buttonBackground h-100 w-100" ' +
                '                  v-b-modal.reset_cache_definition> ' +
                '          <span class="fas fa-power-off"></span>' +
                '          Reset Cache Definition' +
                '        </b-button>' +
                '      </div>' +
                '    </div>' +
                '    <br>' +
                '  </div>' +
                '' +
                '  <div class="col-lg-3 col-sm-12 "></div>' +
                '' +
                '  <!-- Cache Definition sketch -->' +
                '  <div class="col-lg-6 col-sm-12 ">' +
                '    <b-list-group class="cacheDefinition">' +
                '      <b-list-group horizontal>' +
                '        <b-list-group-item variant="info" class="cacheDefinition">' +
                '          <br>' +
                '          .text' +
                '          <br>' +
                '          <br>' +
                '        </b-list-group-item>' +
                '        <b-list-group-item class="cacheDefinition noBorder left">' +
                '          <span class="h6" v-if="cache_definition.length > 0">' +
                '            {{cache_definition[0].value}}' +
                '          </span>' +
                '          <br>' +
                '          <br>' +
                '          <span class="h6" v-if="cache_definition.length > 0">' +
                '            {{cache_definition[1].value}}' +
                '          </span>' +
                '        </b-list-group-item>' +
                '      </b-list-group>' +
                '' +
                '      <b-list-group horizontal>' +
                '        <b-list-group-item variant="warning" class="cacheDefinition">' +
                '          <br>' +
                '          .data' +
                '          <br>' +
                '          <br>' +
                '        </b-list-group-item>' +
                '        <b-list-group-item class="cacheDefinition noBorder left">' +
                '          <span class="h6" v-if="cache_definition.length > 0">' +
                '            {{cache_definition[2].value}}' +
                '          </span>' +
                '          <br>' +
                '          <br>' +
                '          <span class="h6" v-if="cache_definition.length > 0">' +
                '            {{cache_definition[3].value}}' +
                '          </span>' +
                '        </b-list-group-item>' +
                '      </b-list-group>' +
                '' +
                '      <b-list-group horizontal>' +
                '        <b-list-group-item variant="secondary" class="cacheDefinition">' +
                '          <br>' +
                '          ...' +
                '          <br>' +
                '          <br>' +
                '        </b-list-group-item>' +
                '        <b-list-group-item class="cacheDefinition noBorder">' +
                '          ' +
                '        </b-list-group-item>' +
                '      </b-list-group>' +
                '' +
                '      <b-list-group horizontal>' +
                '        <b-list-group-item variant="success" class="cacheDefinition">' +
                '          <br>' +
                '          stack' +
                '          <br>' +
                '          <br>' +
                '        </b-list-group-item>' +
                '        <b-list-group-item class="cacheDefinition noBorder left">' +
                '          <span class="h6" v-if="cache_definition.length > 0">' +
                '            {{cache_definition[4].value}}' +
                '          </span>' +
                '          <br>' +
                '          <br>' +
                '          <span class="h6" v-if="cache_definition.length > 0">' +
                '            {{cache_definition[5].value}}' +
                '          </span>' +
                '        </b-list-group-item>' +
                '      </b-list-group>' +
                '    </b-list-group>' +
                '  </div>' +
                '' +
                '  <div class="col-lg-3 col-sm-12 "></div>' +
                '' +
                '</div>'

  }

  Vue.component('cache-definition', uielto_cache_definition) ;