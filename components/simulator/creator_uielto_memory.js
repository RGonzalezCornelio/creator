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

  var uielto_memory = {

    props:    {
                main_memory:                  { type: Array,  required: true },
                memory_segment:               { type: String, required: true },
                track_stack_names:            { type: Array,  required: true }, // TODO: optional
                callee_subrutine:             { type: String, required: true }, // TODO: optional
                caller_subrutine:             { type: String, required: true },  // TODO: optional
  
                instruction_address:          { type: String, required: true },
                address_32_bits:              { type: String, required: true },
                tag_size_address:             { type: Number, required: true },
                line_size_address:            { type: Number, required: true },
                offset_size_address:          { type: Number, required: true },
                tag:                          { type: String, required: true },
                line:                         { type: String, required: true },
                offset:                       { type: String, required: true },

                FA_tag_size_address:          { type: Number, required: true },
                FA_tag:                       { type: String, required: true },

                FSA_tag_size_address:         { type: Number, required: true },
                set_size:                     { type: Number, required: true },
                FSA_tag:                      { type: String, required: true },
                FSA_set:                      { type: String, required: true },
                
                
                data_address:                 { type: String, required: true },
                address_32_bits_data:         { type: String, required: true },
                tag_size_address_data:        { type: Number, required: true },
                line_size_address_data:       { type: Number, required: true },
                offset_size_address_data:     { type: Number, required: true },
                tag_data:                     { type: String, required: true },
                line_data:                    { type: String, required: true },
                offset_data:                  { type: String, required: true },

                FA_tag_size_address_data:     { type: Number, required: true },
                FA_tag_data:                  { type: String, required: true },

                FSA_tag_size_address_data:    { type: Number, required: true },
                set_size_data:                { type: Number, required: true },
                FSA_tag_data:                 { type: String, required: true },
                FSA_set_data:                 { type: String, required: true },

                hit:                          { type: Number, required: true },
                miss:                         { type: Number, required: true },

                FSA_hit:                      { type: Number, required: true },
                FSA_miss:                      { type: Number, required: true },

                hit_data:                     { type: Number, required: true },
                miss_data:                    { type: Number, required: true }

              },
  
    data:     function () {
                return {

                  cache_type: architecture.cache_definition_L1[7].value,
                  cache_policy: architecture.cache_definition_L1[8].value,

                  //Memory view
                  mem_representation: "data_memory",
                  mem_representation_options: [
                    { text: 'Data', value: 'data_memory' },
                    { text: 'Text', value: 'instructions_memory' },
                    { text: 'Stack', value: 'stack_memory'}
     
                  ]
                }
              },
  
    methods:  {
                     
              },
  
    template: ' <b-container fluid align-h="center" class="mx-0 my-3 px-2">' +
              '   <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '     <b-col align-h="center" class="px-2">' +
              '       <div class="border m-1 py-1 px-2">' +
              '         <b-badge variant="light" class="h6 groupLabelling border mx-2 my-0">Main memory segment</b-badge>' +
              '         <b-form-group class="mb-2" v-slot="{ ariaDescribedby }" >' +
              '           <b-form-radio-group' +
              '             id="btn-radios-1"' +
              '             class="w-100"' +
              '             v-model="mem_representation"' +
              '             :options="mem_representation_options"' +
              '             button-variant="outline-secondary"' +
              '             size="sm"' +
              '             :aria-describedby="ariaDescribedby"' +
              '             name="radios-btn-default"' +
              '             buttons' +
              '           ></b-form-radio-group>' +
              '         </b-form-group>' +
              '       </div >' +
              '     </b-col>' +
  

              

              '     <b-col>'+

              '      <b-form-group v-if="cache_type==\'0\'">'+

              '       <b-form-group v-if="cache_policy==\'0\'">'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Direct Mapped</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{tag_size_address}} bits  ({{tag}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             LINE: {{line_size_address}} bits ({{line}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{miss}}'+
              '          </div>'+
              '        </b-form-group>'+

              '       <b-form-group v-if="cache_policy==\'1\'">'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Fully Associative</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FA_tag_size_address}} bits  ({{app._data.FA_tag}})'+
              '           </b-row>'+
              
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{miss}}'+
              '           </b-row>'+
              '          </div>'+
              '        </b-form-group>'+

              '       <b-form-group v-if="cache_policy==\'2\'">'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Set Associative</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FSA_tag_size_address}} bits  ({{app._data.FSA_tag}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             SET: {{set_size}} bits ({{app._data.FSA_set}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{app._data.FSA_hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{app._data.FSA_miss}}'+
              '           </b-row>'+
              '          </div>'+
              '        </b-form-group>'+

              '       </b-form-group>'+





              

              '      <b-form-group v-if="cache_type==\'1\'">'+

              '       <b-form-group v-if="cache_policy==\'0\'">'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Direct Mapped</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{tag_size_address}} bits  ({{tag}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             LINE: {{line_size_address}} bits ({{line}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{miss}}'+
              '          </div>'+
           
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Last Data Address: 0x0{{data_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS DATA: {{address_32_bits_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{tag_size_address_data}} bits  ({{tag_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             LINE: {{line_size_address_data}} bits ({{line_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address_data}} bits ({{offset_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit Data: {{hit_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss Data: {{miss_data}}'+
              '           </b-row>'+
              '         </div >' +
              '       </b-form-group>'+


              '       <b-form-group v-if="cache_policy==\'1\'">'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Fully Associative</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FA_tag_size_address}} bits  ({{app._data.FA_tag}})'+
              '           </b-row>'+
              
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{miss}}'+
              '           </b-row>'+
              '          </div>'+
           
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Last Data Address: 0x0{{data_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS DATA: {{address_32_bits_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FA_tag_size_address_data}} bits  ({{app._data.FA_tag_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address_data}} bits ({{offset_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit Data: {{hit_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss Data: {{miss_data}}'+
              '           </b-row>'+
              '         </div >' +
              '       </b-form-group>'+


              '       <b-form-group v-if="cache_policy==\'2\'">'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Set Associative</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FSA_tag_size_address}} bits  ({{app._data.FSA_tag}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             SET: {{set_size}} bits ({{app._data.FSA_set}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{FSA_hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{FSA_miss}}'+
              '           </b-row>'+
              '          </div>'+
           
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Last Data Address: 0x0{{data_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS DATA: {{address_32_bits_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FSA_tag_size_address_data}} bits  ({{app._data.FSA_tag_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             SET: {{app._data.set_size_data}} bits ({{app._data.FSA_set_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address_data}} bits ({{offset_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit Data: {{hit_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss Data: {{miss_data}}'+
              '           </b-row>'+
              '         </div >' +
              '       </b-form-group>'+


              '      </b-form-group>'+


              '     </b-col>'+

  
  
              '' +
              '     <b-col></b-col>' +
              '   </b-row>' +
              '' +
              '   <b-row cols="1">' +
              '     <b-col align-h="center" class="px-2">' +
              '       <table-mem class="my-2"' +
              '                  :main_memory="main_memory"' +
              '                  :memory_segment="mem_representation"' +
              '                  :track_stack_names="track_stack_names" ' +
              '                  :callee_subrutine="callee_subrutine" ' +
              '                  :caller_subrutine="caller_subrutine">' +
  
              '       </table-mem>' +
              '     </b-col>' +
              '   </b-row>' +
              '' +
              ' </b-container>'
    }
  
    Vue.component('memory', uielto_memory) ;
  
    /*
              
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Direct Mapped</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{tag_size_address}} bits  ({{tag}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             LINE: {{line_size_address}} bits ({{line}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{miss}}'+
              '          </div>'+
              
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Fully Associattive</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FA_tag_size_address}} bits  ({{app._data.FA_tag}})'+
              '           </b-row>'+
              
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{miss}}'+
              '           </b-row>'+
              '          </div>'+

              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             <b>Policy: Set Associative</b>'+
              '           </b-row>'+
              '         </div>'+
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">' +
              '             Last Instruction Address: {{instruction_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS: {{address_32_bits}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{app._data.FSA_tag_size_address}} bits  ({{app._data.FSA_tag}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             SET: {{set_size}} bits ({{app._data.FSA_set}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address}} bits ({{offset}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit: {{hit}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss: {{miss}}'+
              '           </b-row>'+
              '          </div>'+
              
           ---- DATOS ------
           DIRECT MAPPED   
              '         <div class="border m-1 py-1 px-4">'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Last Data Address: 0x0{{data_address}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             ADDRESS 32 BITS DATA: {{address_32_bits_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             TAG: {{tag_size_address_data}} bits  ({{tag_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             LINE: {{line_size_address_data}} bits ({{line_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             OFFSET: {{offset_size_address_data}} bits ({{offset_data}})'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Hit Data: {{hit_data}}'+
              '           </b-row>'+
              '           <b-row cols-xl="2" cols-lg="1" cols-md="2" cols-sm="1" cols-xs="1" cols="1">'+
              '             Miss Data: {{miss_data}}'+
              '           </b-row>'+
              '         </div >' +

            FULLY ASSOCIATIVE
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              */


