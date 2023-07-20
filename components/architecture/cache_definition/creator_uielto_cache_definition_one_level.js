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

  var uielto_cache_definition_one_level = {

    props:      {
                  id:   {type: String, required: true},
                  cache_definition_L1: {type: Array, required: true}
                },

    data:       function () {
                  return {
                    //Default Types
                    cache_type: "unified",
                    cache_policy: "direct_mapped",

                    unified_cache_size: architecture.cache_definition_L1[0].value,
                    unified_lines_set: architecture.cache_definition_L1[1].value,
                    instruction_cache: architecture.cache_definition_L1[2].value,
                    data_cache: architecture.cache_definition_L1[3].value,
                    lines_set_instruction_cache: architecture.cache_definition_L1[4].value,
                    lines_set_data_cache: architecture.cache_definition_L1[5].value,
                    cache_line: architecture.cache_definition_L1[6].value,
                    
                    //Modal directives
                    show_modal: false,
                  }
                },

    methods:    {
        

                    //Confirm cache definition fields
                    confirm_cache_definition()
                    {
                        this.show_modal = false;

                        show_notification('Cache definition correctly saved!', 'success');
                    },

                    

                    //Form Validator
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
                    
                    //Verified all fields of Cache Definition
                    verify_cache_definition(evt)
                    {
                        evt.preventDefault();

                        if(!this.cache_line)
                        {
                        show_notification('Please complete all fields', 'danger');
                        }else
                        {
                        this.confirm_cache_definition();
                        }
                    
                        

                    },
                    //Clean cache definition, lo he quitado de @hidden y se me mantienen los datos
                    clean_form()
                    {
                    this.instruction_cache = '';
                    this.data_cache = '';
                    this.unified_cache_size = '';
                    this.cache_line = '';
                    this.lines_set_instruction_cache = '';
                    this.lines_set_data_cache = '';
                    this.unified_lines_set = '';
                        
                    
                    },
                },
  
    template:   '<b-modal    :id="id"'+
            '                title="Level One Cache Definition"'+
            '                ok-title="Save"'+
            '                @ok="verify_cache_definition($event)"'+
            '                v-model="show_modal"'+
            '                @hidden="">'+

                '         <span class="h6">Level 1</span>'+
                '         <b-form-radio-group v-model="cache_type" id="radio_group_tipo_cache">'+
                '           <b-form-radio name="cache_type" value="unified">Unified Cache</b-form-radio>'+
                '           <b-form-radio name="cache_type" value="split">Split Cache</b-form-radio>'+
                '         </b-form-radio-group>'+



                '         <b-form-group v-if="cache_type==\'unified\'">'+
                '           <b-col sm="auto">Cache Size</b-col>'+
                '           <b-col sm="auto">'+
                '             <b-form-input type="number" '+
                '                           v-model="unified_cache_size"'+
                '                           placeholder="KB"'+
                '                           :state=valid(unified_cache_size)'+
                '                           size="sm"'+
                '                           title="Unified Cache Size">'+
                '             </b-form-input>'+
                '           </b-col>'+
                '         </b-form-group>'+


                '         <b-form-group v-if="cache_type==\'split\'">'+
                '           <b-col sm="auto">Instruction Cache Size:</b-col>'+
                '           <b-col sm="auto">'+
                '             <b-form-input type="number" '+
                '                           v-model="instruction_cache"'+
                '                           placeholder="KB"'+
                '                           :state="valid(instruction_cache)"'+
                '                           size="sm"'+
                '                           title="Instruction Cache Size">'+
                '             </b-form-input>'+
                '           </b-col>'+

                '           <b-col sm="auto">Data Cache Size:</b-col>'+
                '           <b-col sm="auto">'+
                '             <b-form-input type="number"'+
                '                           v-model="data_cache"'+
                '                           placeholder="KB"'+
                '                           :state="valid(data_cache)"'+
                '                           size="sm"'+
                '                           title="Data Cache Size">'+
                '             </b-form-input>'+

                '           </b-col>'+

                '         </b-form-group>'+


                '         <b-col sm="auto">Cache Line Size:</b-col>'+
                '         <b-col sm="auto">'+
                '           <b-form-input type="number"'+
                '                         v-model="cache_line"'+
                '                         placeholder="KB"'+
                '                         :state="valid(cache_line)"'+
                '                         size="sm"'+
                '                         required '+
                '                         title="Cache Line">'+
                '           </b-form-input>'+
                '         </b-col>'+

                '         <br>'+

                '         </span class="h4">Cache Policy:</span>'+

                
                '         <b-form-radio v-model="cache_policy" name="cache_policy" value="direct_mapped">Direct Mapped</b-form-radio>'+
                '         <b-form-radio v-model="cache_policy" name="cache_policy" value="fully_associative">Fully Associative</b-form-radio>'+
                '         <b-form-radio v-model="cache_policy" name="cache_policy" value="set_associative">Set Associative'+

                '           <b-form-group v-if="cache_type==\'split\'">'+
                '             <b-col sm="auto">Blocks (lines) per Set (Instruction Cache):</b-col>'+
                '             <b-col sm="auto">'+
                '               <b-form-input type="number"'+
                '                             v-model="lines_set_instruction_cache"'+
                '                             :state="valid(lines_set_instruction_cache)"'+
                '                             size="sm"'+
                '                             title="Lines Set Instruction Cache">'+
                '               </b-form-input>'+

                '             </b-col>'+

                '             <b-col sm="auto">Blocks (lines) per Set (Data Cache):</b-col>'+
                '             <b-col sm="auto">'+
                '               <b-form-input type="number"'+
                '                             v-model="lines_set_data_cache"'+
                '                             :state="valid(lines_set_data_cache)"'+
                '                             size="sm"'+
                '                             title="Lines Set Data Cache">'+
                '               </b-form-input>'+
                '             </b-col>'+

                '           </b-form-group>'+

                '           <b-form-input-group v-if="cache_type==\'unified\'">'+
                '             <b-col sm="auto">Blocks (lines) per Set</b-col>'+
                '             <b-col sm="auto">'+
                '               <b-form-input type="number"'+
                '                             v-model="unified_lines_set"'+
                '                             :state="valid(unified_lines_set)"'+
                '                             size="sm"'+
                '                             title="Unified Lines Set">'+
                '               </b-form-input>'+
                '             </b-col>'+

                '         </b-form-radio>'+

                '</b-modal>'
 
  }

  Vue.component('cache-definition-one', uielto_cache_definition_one_level) ;