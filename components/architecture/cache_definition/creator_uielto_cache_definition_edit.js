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

  var uielto_cache_definition_form = {

    props:      {
                  id:                             { type: String, required: true }
                },

    data:       function () {
                  return {
                    cache_definition: ["", "", "", "", "", ""],

                    //Modals cache definition
                    show_modal: false,
                  }
                },

    methods:    {
                  //Check de cache definition changes
                  verify_edit_cache_definition(evt)
                  {
                    evt.preventDefault();

                    for(var i = 0; i < this.cache_definition.length; i++)
                    {
                      if (!this.cache_definition[i].value)
                      {
                        show_notification('Please complete all fields', 'danger') ;
                        return;
                      }

                      if(this.cache_definition[i].value != "" && this.cache_definition[i].value != null)
                      {
                        if(!isNaN(parseInt(this.cache_definition[i].value)))
                        {
                          if (parseInt(this.cache_definition[i].value) < 0) 
                          {
                            show_notification('The value can not be negative', 'danger') ;
                            return;
                          }
                        }
                        else 
                        {
                          show_notification('The value must be a number', 'danger') ;
                          return;
                        }
                      }

                      for (var j = i+1; j < this.cache_definition.length; j++)
                      {
                        if (parseInt(this.cache_definition[i].value) >= parseInt(this.cache_definition[j].value))
                        {
                          show_notification('The segment can not be overlap', 'danger') ;
                          return;
                        }
                      }
                    }

                    this.edit_cache_definition();
                  },

                  //Edit cache definition
                  edit_cache_definition()
                  {
                    this.show_modal = false;

                    architecture.cache_definition = structuredClone(this.cache_definition);

                    backup_stack_address = architecture.cache_definition[4].value;
                    backup_data_address = architecture.cache_definition[3].value;

                    show_notification('cache definition correctly modified', 'success') ;
                  },

                  //Form validator
                  valid(value)
                  {
                    if(parseInt(value) != 0)
                    {
                      if(!value){
                        return false;
                      }
                      else{
                        return true;
                      }
                    }
                    else{
                      return true;
                    }
                  },
                },

    template:   '<b-modal :id ="id" ' +
                '         title="Change cache definition" ' +
                '         ok-title="Change" ' +
                '         @ok="verify_edit_cache_definition($event)"' +
                '         v-model="show_modal"> ' +
                '  <b-form>' +
                '    <b-form-group label=".text Start:">' +
                '      <b-form-input type="text" ' +
                '                v-model="cache_definition[0].value" ' +
                '                :state="valid(cache_definition[0].value)" ' +
                '                required ' +
                '                size="sm" ' +
                '                class="cacheDefinitionForm">' +
                '      </b-form-input>' +
                '    </b-form-group>' +
                '' +
                '    <b-form-group label=".text End:">' +
                '      <b-form-input type="text" ' +
                '                v-model="cache_definition[1].value" ' +
                '                :state="valid(cache_definition[1].value)" ' +
                '                required ' +
                '                size="sm" ' +
                '                class="cacheDefinitionForm">' +
                '      </b-form-input>' +
                '    </b-form-group>' +
                '' +
                '    <b-form-group label=".data Start:">' +
                '      <b-form-input type="text" ' +
                '                v-model="cache_definition[2].value" ' +
                '                :state="valid(cache_definition[2].value)" ' +
                '                required ' +
                '                size="sm" ' +
                '                class="cacheDefinitionForm">' +
                '      </b-form-input>' +
                '    </b-form-group>' +
                '' +
                '    <b-form-group label=".data End:">' +
                '      <b-form-input type="text" ' +
                '                v-model="cache_definition[3].value" ' +
                '                :state="valid(cache_definition[3].value)" ' +
                '                required ' +
                '                size="sm" ' +
                '                class="cacheDefinitionForm">' +
                '      </b-form-input>' +
                '    </b-form-group>' +
                '' +
                '    <b-form-group label=".stack End:">' +
                '      <b-form-input type="text" ' +
                '                v-model="cache_definition[4].value" ' +
                '                :state="valid(cache_definition[4].value)" ' +
                '                required ' +
                '                size="sm" ' +
                '                class="cacheDefinitionForm">' +
                '      </b-form-input>' +
                '    </b-form-group>' +
                '' +
                '    <b-form-group label=".stack Start:">' +
                '      <b-form-input type="text" ' +
                '                v-model="cache_definition[5].value"' +
                '                :state="valid(cache_definition[5].value)" ' +
                '                required size="sm" ' +
                '                class="cacheDefinitionForm">' +
                '      </b-form-input>' +
                '    </b-form-group>' +
                '  </b-form>' +
                '</b-modal>'

  }

  Vue.component('cache-definition-edit', uielto_cache_definition_form) ;