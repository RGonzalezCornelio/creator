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

  var uielto_preload_architecture = {

  props:      {
                arch_available: { type: Array,   required: true },
                back_card:      { type: Array,   required: true },
                item:           { type: Object,  required: true },
                index:          { type: Number,  required: true }
              },

  data:       function () {
                return {
                  architecture_name: '',
                  example_loaded: ''
                }
              },

  methods:    {
                load_arch_select(e)
                {
                  var i = -1;

                  show_loading();
                  for (i = 0; i < load_architectures.length; i++) {
                       if (e.name == load_architectures[i].id) {
                           var auxArchitecture = JSON.parse(load_architectures[i].architecture);
                           uielto_preload_architecture.methods.load_arch_select_aux(e.name, auxArchitecture, true, e) ;
                           hide_loading();
                           show_notification('The selected architecture has been loaded correctly', 'success') ;

                           // Google Analytics
                           creator_ga('architecture', 'architecture.loading', 'architectures.loading.customized' + e.name);

                           return;
                       }
                  }

                  //Synchronous json read
                  $.ajaxSetup({
                      async: false
                  });

                  $.getJSON('architecture/'+e.name+'.json' + "?v=" + new Date().getTime(), function(cfg) {
                    uielto_preload_architecture.methods.load_arch_select_aux(e.name, cfg, true, e) ;
                    hide_loading();
                    show_notification('The selected architecture has been loaded correctly', 'success') ;

                    // Google Analytics
                    creator_ga('architecture', 'architecture.loading', 'architectures.loading.customized');

                    }).fail(function() {
                      hide_loading();
                      show_notification('The selected architecture is not currently available', 'info') ;
                    });
                },

                load_arch_select_aux(ename, cfg, load_associated_examples, e)
                {
                  var auxArchitecture = cfg;
                  architecture = register_value_deserialize(auxArchitecture);
                  app._data.architecture = architecture; //TODO: bidirectional

                  architecture_hash = [];
                  for (i = 0; i < architecture.components.length; i++){
                       architecture_hash.push({name: architecture.components[i].name, index: i});
                       app._data.architecture_hash = architecture_hash; //TODO: bidirectional
                  }

                  backup_stack_address = architecture.memory_layout[4].value;
                  backup_data_address  = architecture.memory_layout[3].value;

                  uielto_preload_architecture.data.architecture_name = ename;
                  app._data.architecture_name = ename; //TODO: bidirectional

                  if (load_associated_examples && typeof e.examples !== "undefined"){
                    uielto_preload_architecture.methods.load_examples_available();
                  }

                  app.change_UI_mode('simulator');
                  app.change_data_view('registers', 'int');
                  app.$forceUpdate();
                },

                //Load the available examples
                load_examples_available( set_name ) {

                  example_set_available = [];
                  example_available = [];

                  uielto_preload_architecture.data.example_loaded = new Promise(function(resolve, reject) {

                    //Synchronous json read
                    $.ajaxSetup({
                        async: false
                    });

                    $.getJSON('examples/example_set.json' + "?v=" + new Date().getTime(), function(set) {

                      // current architecture in upperCase
                      var current_architecture = uielto_preload_architecture.data.architecture_name.toUpperCase() ;

                      // search for architecture name in the example set 'set'
                      for (var i=0; i<set.length; i++)
                      {

                        // if current_architecture active but not the associated with set, skip
                        if  ( (current_architecture != '') &&
                            (set[i].architecture.toUpperCase() != current_architecture) )
                            {
                              continue ;
                            }

                        //Default example set
                        if (typeof set_name !== 'undefined' && set_name == set[i].id) {
                          uielto_examples.methods.change_example_set ( example_set_available.length ) ;
                        }

                        example_set_available.push({text: set[i].id, value: example_set_available.length}) ;
                        
                        //Synchronous json read
                        $.ajaxSetup({
                            async: false
                        }); 

                        // if no current_architecture loaded then load the associated
                        if (current_architecture == '') {
                          $.getJSON('architecture/'+ set[i].architecture +'.json', function(cfg) {
                            uielto_preload_architecture.methods.load_arch_select_aux(set[i].architecture,cfg, false, null);
                          }) ;
                        }

                        // load the associate example list
                        $.getJSON(set[i].url, function(cfg){
                          example_available[example_available.length] = cfg
                          resolve('Example list loaded.') ;
                        });

                      }

                      app._data.example_set_available = example_set_available
                      app._data.example_available = example_available ; //TODO: bidirectional

                      if (example_set_available.length == 0)
                      {
                        reject('Unavailable example list.') ;
                      }

                    });
                  }) ;
                },

                //Change the background of selected achitecture card
                change_background(name, type){
                  if(type == 1){
                    for (var i = 0; i < this._props.back_card.length; i++){
                      if(name == this._props.back_card[i].name){
                        this._props.back_card[i].background = "secondary";
                      }
                      else{
                        this._props.back_card[i].background = "default";
                      }
                    }
                  }
                  if(type == 0){
                    for (var i = 0; i < back_card.length; i++){
                      this._props.back_card[i].background = "default";
                    }
                  }
                },

                //Show remove architecture modal
                modal_remove_cache_arch(index, elem, button){
                  app._data.modalDeletArchIndex = index;
                  this.$root.$emit('bv::show::modal', 'modalDeletArch', button);
                },

                //Check if it is a new architecture
                default_arch(item){
                  for (var i = 0; i < load_architectures_available.length; i++) {
                    if(load_architectures_available[i].name == item){
                      return true;
                    }
                  }
                  return false;
                }
              },

  template:   
              '<b-card no-body class="overflow-hidden arch_card architectureCard" ' +
              '                @mouseover="change_background(item.name, 1)"' +
              '                @mouseout="change_background(item.name, 0)" ' +
              '                :border-variant=back_card[index].background>' +
              '  <b-row no-gutters>' +
              '    <b-col sm="12" @click="load_arch_select(item)" class="w-100">' +
              '      <b-card-img :src=item.img :alt=item.alt thumbnail fluid class="rounded-0"></b-card-img>' +
              '    </b-col>' +
              ' ' + 
              '    <b-col sm="12" @click="load_arch_select(item)" v-if="default_arch(item.name) == false">' +
              '      <b-card-body :title=item.name title-tag="h2">' +
              '        <b-card-text class="justify">' +
              '          {{item.description}}' +
              '        </b-card-text>' +
              '      </b-card-body>' +
              '    </b-col>' +
              ' ' +
              '    <b-col sm="12" @click="load_arch_select(item)" v-if="default_arch(item.name) == true">' +
              '      <b-card-body :title=item.name title-tag="h2">' +
              '        <b-card-text class="justify">' +
              '          {{item.description}}' +
              '        </b-card-text>' +
              '      </b-card-body>' +
              '    </b-col>' +
              ' ' +
              '    <b-col sm="12" v-if="default_arch(item.name) == true" class="center">' +
              '      <b-button class="m-2 w-75 btn btn-outline-danger btn-sm buttonBackground arch_delete" ' +
              '                @click.stop="modal_remove_cache_arch(index, item.name, $event.target)"' +
              '                v-if="default_arch(item.name) == true" ' +
              '                :id="\'delete_\'+item.name">' +
              '        <span class="far fa-trash-alt"></span>' +
              '        Delete' +
              '      </b-button>' +
              '    </b-col>' +
              '  </b-row>' +
              '</b-card>'

  }

  Vue.component('preload-architecture', uielto_preload_architecture) ;