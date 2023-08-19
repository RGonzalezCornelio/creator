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
var line_size_data = 32;

/*var etiqueta_data = 0;
var linea_data = 0;
var offset_data = 0;*/


var address_32_bits_data = '00000000000000000000000000000000';

var offset_size_address_data = Math.log2(line_size_data);
var line_size_address_data = Math.log2((cache_size_data*1024)/line_size_data);
var tag_size_address_data = 32 - line_size_address_data - offset_size_address_data;

var array_32_bits_data = 0;
var tag_array_data = 0;
var line_array_data = 0;
var offset_array_data = 0;

var tag_data = 0;
var line_data = 0;
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



var hit_data = 0;
var miss_data = -1;
//var L1_data = array_length_datos(cache_size_data, line_size_data);
var contador_LRU_data = -1;




//--------------------------- DIRECT MAPPED --------------------------------------
function DM_Data_PasarDireccionA32bits( dir )
{
  //El numero esta en decimal, lo pasamos a hexadecimal
  direc = pasarDireccionAHexadecimal(dir)

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

var DM_L1_data = array_length_datos(cache_size_data, line_size_data);

function DM_LRU_datos(direccion){

  var tag = DM_Data_PasarDireccionA32bits(direccion)
  if(contador_LRU_data == DM_L1_data.length){
    contador_LRU_data = 0;
  }
    
  if(DM_L1_data[contador_LRU_data] == tag)
  {
    hit_data++;
    contador_LRU_data++;
  }else{
    miss_data++;
    DM_L1_data[contador_LRU_data] = tag;
    contador_LRU_data++;
    
  }

  hit_ratio_data = address_hit_ratio_data(hit_data, miss_data);
  app._data.hit_data = hit_data;
  app._data.miss_data = miss_data;
  app._data.hit_ratio_data = hit_ratio_data;
      
  console.log("Contador DATA: " + contador_LRU_data);
  console.log("EXECUTION INDEX: " + execution_index);
  console.log("Hit DATA: " + hit_data);
  console.log("Miss DATA: " +miss_data);
  console.log("Hit Ratio DATA: " + hit_ratio_data);
  console.log("-----------------");
        
      
  return DM_L1_data;
}


//--------------------------- FULLY ASSOCIATIVE --------------------------------------


//Para este tipo de direciconamiento necesitamos introducir el tiempo en el que fue introducido la direccion
//Para ello, ademas del array, habrá otro en el que llevemos el tiempo. 
function FA_Data_pasarDireccionA32Bits ( dir ) 
{

  direc = pasarDireccionAHexadecimal(dir);

  tamaño_offset = Math.log2(line_size);
  tamaño_linea = Math.log2((cache_size*1024)/line_size);
  tamaño_tag = 32 - tamaño_linea - tamaño_offset;

  dirA32Bits = parseInt(direc, 16).toString(2).padStart(32, '0');

  //Para separar el String de 32 bits, lo paso a un array y voy cogiendo 1 a 1
  var array_bits = dirA32Bits.split("");

  var array_tag = array_bits.slice(0,tamaño_tag);
  var array_line = array_bits.slice(tamaño_tag,(tamaño_linea + tamaño_tag));
  var array_offset = array_bits.slice((tamaño_linea + tamaño_tag), array_bits.length);

  etiqueta = array_tag.join('');
  linea = array_line.join('');
  offset = array_offset.join('');


  return etiqueta;
}

function array_length_data_time(cache_size_data, line_size_data)
{
  cache_size_data = cache_size_data * 1024;
  const array_data_time = new Array(cache_size_data/line_size_data).fill(0);

  return array_data_time;
}
var L1_Data_time = array_length_data_time(cache_size_data, line_size_data);

var FA_Data_L1 = array_length_datos(cache_size_data, line_size_data);
var FA_Data_contador_LRU = 0;



function FA_LRU_Datos(direccion)
{
  var tag = FA_Data_pasarDireccionA32Bits(direccion);

  if(FA_Data_contador_LRU == FA_Data_L1.length){
    FA_Data_contador_LRU = 0;
  }

  if(FA_Data_L1[FA_Data_contador_LRU] == tag)
  {
    //Primero busca el que tengo el tiempo unix más bajo y lo guarda en minimo
    var minimo = L1_Data_time[0];
    var posicion = 0
    for(var i = 0; i < L1_Data_time.length; i++){
      if(L1_Data_time[i] < minimo){
        minimo = L1_Data_time[i];
        posicion = i;
      }
    }
    
    var fecha = new Date();
    //var tiempoUnix = Math.floor(fecha.getTime());
    var tiempoUnix = fecha.getTime();
    L1_Data_time[posicion] = tiempoUnix;
    FA_Data_L1[posicion] = tag;

    hit_data++;
    FA_Data_contador_LRU++;
  }else{
    miss_data++;
    FA_Data_L1[FA_Data_contador_LRU] = tag;
    var fecha = new Date();
    //var tiempoUnix = Math.floor(fecha.getTime() / 1000);
    var tiempoUnix = fecha.getTime();
    L1_Data_time[FA_Data_contador_LRU] = tiempoUnix;
    FA_Data_contador_LRU++;
    
  }

  hit_ratio_data = address_hit_ratio_data(hit_data, miss_data);
  app._data.hit_data = hit_data;
  app._data.miss_data = miss_data;
  app._data.hit_ratio_data = hit_ratio_data;
  
  console.log("Contador: " + FA_Data_contador_LRU);
  console.log("EXECUTION INDEX: " + execution_index);
  console.log("Posicion :" + posicion);
  console.log("Hit DATA: " + hit_data);
  console.log("Miss DATA: " +miss_data);
  console.log("Hit Ratio DATA: " + hit_ratio_data);
  console.log("-----------------");
    
  
  return FA_Data_L1;

}

//--------------------------- FULLY SET ASSOCIATIVE --------------------------------------

// | TAG | SET (set size) | OFFSET (offset_size_address)|



function FSA_Data_pasarDireccionA32Bits ( dir ) 
{

  direc = pasarDireccionAHexadecimal(dir);

  tamaño_offset = Math.log2(line_size);
  tamaño_set = Math.log2(numero_conjuntos);
  tamaño_tag = 32 - tamaño_set - tamaño_offset;

  dirA32Bits = parseInt(direc, 16).toString(2).padStart(32, '0');

  //Para separar el String de 32 bits, lo paso a un array y voy cogiendo 1 a 1
  var array_bits = dirA32Bits.split("");

  var array_tag = array_bits.slice(0,tamaño_tag);
  var array_set = array_bits.slice(tamaño_tag,(tamaño_set + tamaño_tag));
  var array_offset = array_bits.slice((tamaño_set + tamaño_tag), array_bits.length);

  etiqueta_data = array_tag.join('');
  set_data = array_set.join('');
  offset_data = array_offset.join('');


  return etiqueta_data;
}



//Ponemos el numero de conjuntos (esto sera un parametro que introducira el alumno)
var numero_conjuntos_datos = 4;
var set_data_size = Math.log2(numero_conjuntos_datos);

//Ahora sustituiremos el array que sacabamos de la funcion array_length y usaremos tantos arrays como necesitemos para la configuracion
//Habra que hace un array de arrays 

var FSA_Data_L1 = []

//Creamos los arrays para introducirlos en el array y crear asi un array de arrays

cache_size_data = cache_size_data * 1024;
var FSA_data_Length = cache_size_data/line_size_data;

var array_set_data_size = FSA_data_Length / numero_conjuntos_datos; 

for(var i = 0; i < array_set_data_size; i++){
  var array_data = [];
  for(var j = 0; j < numero_conjuntos_datos; j++){
    array_data.push("-1");
  }
  FSA_Data_L1.push(array_data);
}

//Para llevar la cuenta, usare un array de contadores, tendra tantas posiciones como "subarrays" se hayan creado
var FSA_counter_data_array = new Array(array_set_data_size).fill(0);
var FSA_contador_datos = 0;

//Para llevar la cuenta de los miss y los hits, hay que crear una estructura de tantas posiciones como subarrays hay, y dentro un array de 2 posiciones
//indicando los hit y los miss. Los hit seran la posicion 0 y los miss la posicion 1
var FSA_arrayHM_data = [];
for(var k = 0; k < array_set_data_size; k++){
  var arrayHM_posiciones_datos = [];
  for(var m = 0; m < 2; m++){
    arrayHM_posiciones_datos.push(0);
  }
  FSA_arrayHM_data.push(arrayHM_posiciones_datos);
}

//Como estamos usando aqui LRU, haremos otra estructura de datos igual a la del FSA pero para guardar el tiempo UNIX y
//ver cual es la instruccion que lleva mas tiempo en el array
var FSA_L1_time_data = []
for(var i = 0; i < array_set_data_size; i++){
  var array_time_data = [];
  for(var j = 0; j < numero_conjuntos_datos; j++){
    array_time_data.push(0);
  }
  FSA_L1_time_data.push(array_time_data);
}

var setToDecimal_data = 0;

//Aqui empieza el algoritmo
function FSA_LRU_datos(direccion){
  var tag = FSA_Data_pasarDireccionA32Bits(direccion);

  //Gracias a set sabemos a que conjunto va la instruccion
  setToDecimal_data = parseInt(set_data, 2);
 
  if(FSA_counter_data_array[setToDecimal_data] == FSA_L1[setToDecimal_data].length){
    FSA_counter_data_array[setToDecimal_data] = 0;
    //FSA_contador = 0;
  }
  console.log("SET TO DECIMAL: " + setToDecimal_data);
  console.log("SET : " + set_data);

  if(FSA_Data_L1[setToDecimal_data][FSA_counter_data_array[setToDecimal_data]] == tag){

    //Buscamos en el array_time el tiempo unix mas bajo 
    var minimo = FSA_L1_time_data[setToDecimal_data][0];
    var posicion = 0;
    for(var i = 0; i < FSA_L1_time_data[setToDecimal_data].length; i++){
      if(FSA_L1_time_data[setToDecimal_data][i] < minimo){
        minimo = FSA_L1_time_data[setToDecimal_data][i];
        posicion = i;
      }
    }

    var fecha = new Date();
    var tiempoUnix = Math.floor(fecha.getTime());
    FSA_L1_time_data[setToDecimal_data][posicion] = tiempoUnix;
    FSA_Data_L1[setToDecimal_data][posicion] = tag;



    //hit++;
    FSA_counter_data_array[setToDecimal_data]++;
    //hit = FSA_counter_array[setToDecimal];
    //FSA_contador ++;
    FSA_arrayHM_data[setToDecimal_data][0]++;
    
  }else{
    //miss++;
    FSA_Data_L1[setToDecimal_data][FSA_counter_data_array[setToDecimal_data]] = tag;
    FSA_counter_data_array[setToDecimal_data]++;

    FSA_arrayHM_data[setToDecimal_data][1]++;
    //miss = FSA_counter_array[setToDecimal];
    //FSA_contador ++;
  }
    
  
  console.log("Hit DATA: " + FSA_arrayHM_data[setToDecimal_data][0]);
  console.log("Miss DATA: " +FSA_arrayHM_data[setToDecimal_data][1]);
  //console.log("Set DATA: " + setToDecimal_data);
  console.log("Posicion: " + posicion);
  console.log("TiempoUnix: " + tiempoUnix);
  console.log("Minimo: " + minimo); 
  

  console.log("-----------------");
    
  
  return FSA_Data_L1;
}

/*function pasarDireccionA32Bits ( numero ) 
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
}*/
/*function LRU_datos(direccion){

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
}*/