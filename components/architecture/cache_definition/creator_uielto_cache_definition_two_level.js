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

  var uielto_cache_definition_two_level = {

    props:      {
                  id:   {type: String, required: true}
                },

    data:       function () {
                  return {
                    //Default Types
                    cache_type: "unified",
                    cache_policy_level_two: "direct_mapped",

                    instruction_cache: '',
                    data_cache: '',
                    unified_cache_size: '',
                    cache_line: '',
                    lines_set_instruction_cache: '',
                    lines_set_data_cache: '',
                    unified_lines_set: '',
                    
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
                    //Clean cache definition
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
            '                title="Level Two Cache Definition"'+
            '                ok-title="Save"'+
            '                @ok="verify_cache_definition($event)"'+
            '                v-model="show_modal"'+
            '                @hidden="clean_form">'+

            '         <span class="h6">Level 2</span>'+
            '         <b-form-group>'+
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

            '         <b-form-radio v-model="cache_policy_level_two" name="cache_policy_level_two" value="direct_mapped">Direct Mapped</b-form-radio>'+
            '         <b-form-radio v-model="cache_policy_level_two" name="cache_policy_level_two" value="fully_associative">Fully Associative</b-form-radio>'+
            '         <b-form-radio v-model="cache_policy_level_two" name="cache_policy_level_two" value="set_associative">Set Associative'+

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

  Vue.component('cache-definition-two', uielto_cache_definition_two_level) ;