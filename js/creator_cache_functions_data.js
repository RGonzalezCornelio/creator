/*
 *  Copyright 2018-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Diego Camarmas Alonso
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

//Algoritmo LRU datos

var cache_size_data = 1; //Este numero esta en KB, asi que en la funcion lo multiplicaremos por 1024 (2^10) y se dividira entre line_size
var line_size_data = 64;

var etiqueta_data = 0;
var linea_data = 0;
var offset_data = 0;

//Esta funcion nos devuelve un array inicializado a -1
function array_length_datos(cache_size_data, line_size_data)
{
  cache_size_data = cache_size_data * 1024;
  const array = new Array(cache_size_data/line_size_data).fill("-1");

  return array;
}

function pasarDireccionAHexadecimal(numero){
  var hexadecimalNumber = numero.toString(16);
  return hexadecimalNumber;
}

function pasarDireccionA32Bits ( numero ) 
{

  //El numero esta en decimal, lo pasamos a hexadecimal
  direc = pasarDireccionAHexadecimal(numero)

  const tamaño_offset_data = Math.log2(line_size_data);
  const tamaño_linea_data = Math.log2((cache_size_data*1024)/line_size_data);
  const tamaño_tag_data = 32 - tamaño_linea_data - tamaño_offset_data;

  var dirA32Bits = parseInt(direc, 16).toString(2).padStart(32, '0');

  //Para separar el String de 32 bits, lo paso a un array y voy cogiendo 1 a 1
  var array_bits = dirA32Bits.split("");

  var array_tag = array_bits.slice(0,tamaño_tag_data);
  var array_line = array_bits.slice(tamaño_tag_data,(tamaño_linea_data + tamaño_tag_data));
  var array_offset = array_bits.slice((tamaño_linea_data + tamaño_tag_data), array_bits.length);

  etiqueta_data = array_tag.join('');
  linea_data = array_line.join('');
  offset_data = array_offset.join('');

  return etiqueta_data;
}

var hit_data = 0;
var miss_data = 0;
var L1_data = array_length_datos(cache_size_data, line_size_data);
var contador_LRU_data = 0;

function LRU_datos(direccion){

  var tag = pasarDireccionA32Bits(direccion)
  if(contador_LRU_data == L1_data.length){
    contador_LRU_data = 0;
  }
    
  if(L1_data[contador_LRU_data] == tag)
  {
    hit_data++;
    contador_LRU_data++;
  }else{
    miss_data++;
    L1_data[contador_LRU_data] = tag;
    contador_LRU_data++;
    
  }
      
  console.log("Contador DATA: " + contador_LRU_data);
  console.log("EXECUTION INDEX: " + execution_index);
  console.log("Hit DATA: " + hit_data);
  console.log("Miss DATA: " +miss_data);
  console.log("-----------------");
        
      
  return L1_data;
}