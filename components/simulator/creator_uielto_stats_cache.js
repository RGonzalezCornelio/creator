/*
 *  Copyright 2018-2023 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos, Rodrigo González Cornelio
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

  var uielto_stats_cache = {

   
  
    props:      {
                  total_stats:             { type: Number, required: true },
                  memory_access_counter:   { type: Number, required: true },
                  memory_read_counter:     { type: Number, required: true },
                  memory_write_counter:    { type: Number, required: true },

                  hit_ratio:               { type: Number, required: true },
                  hit_ratio_data:          { type: Number, required: true }
                },
                
    data:       function () {
                  return {
                  }
                    
                },
  
    template:   ' <div >' +  //TODO: VER QUE PASA CON LAS VARIABLES, POR QUE NO SE PASAN LOS VALORES

                '   <table class="col-lg-12 col-sm-12 border" style="border:hidden">'+

                '     <tr>'+
                '       <td><h6>Instructions</h6></td>'+
                '     </tr>'+  

                '     <tr>'+
                '       <td></td>'+
                '       <td>Instruction Total Access: {{total_stats}}</td>'+ //TO DO queda pendiente de ver
                '     </tr>'+

                '     <tr>'+
                '       <td></td>'+
                '       <td>Hit Ratio: {{hit_ratio}} %</td>'+
                '     </tr>'+

                '   </table>'+

                '             '+
              
                

                '   <table class="col-lg-12 col-sm-12  border" style="border:hidden">'+

                '     <tr>'+
                '       <td><h6>Data</h6></td>'+
                '     </tr>'+    

                '     <tr>'+
                '       <td></td>'+
                '       <td>Data Total Access: {{memory_access_counter}}</td>'+
                '     </tr>'+

                '     <tr>'+
                '       <td></td>'+
                '       <td>Write accesses: {{memory_write_counter}}</td>'+
                '     </tr>'+

                '     <tr>'+
                '       <td></td>'+
                '       <td>Read accesses: {{memory_read_counter}}</td>'+
                '     </tr>'+

                '     <tr>'+
                '       <td></td>'+
                '       <td>Hit Ratio Data: {{hit_ratio_data}} %</td>'+
                '     </tr>'+

                '   </table>'+

                ' </div>' 
  
    }
  
    Vue.component('cache-stats', uielto_stats_cache) ;