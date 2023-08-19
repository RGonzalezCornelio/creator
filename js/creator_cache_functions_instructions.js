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

//COMMON FUNCTIONS AND VARIABLES

var instruction_address = 0x0; //Esta variable es la direccion que se va a mostrar en el creator en la pestaña de memory


var cache_size = 1; //Este numero esta en KB, asi que en la funcion lo multiplicaremos por 1024 (2^10) y se dividira entre line_size
var line_size = 64;

var address_32_bits = '00000000000000000000000000000000';

var offset_size_address = Math.log2(line_size);
var line_size_address = Math.log2((cache_size*1024)/line_size);
var tag_size_address = 32 - line_size_address - offset_size_address;

var array_32_bits = 0;
var tag_array = 0;
var line_array = 0;
var offset_array = 0;

var tag = 0;
var line = 0;
var offset = 0;

var setToDecimal = 0;


var hit = 0;
var miss = 0;





//Esta funcion nos devuelve un array inicializado a -1
function array_length(cache_size, line_size)
{
  cache_size = cache_size * 1024;
  var array = new Array(cache_size/line_size).fill("-1");

  return array;
}


//--------------------------- DIRECT MAPPED --------------------------------------

// const tamaño_offset = Math.log2(line_size);
// const tamaño_linea = Math.log2((cache_size*1024)/line_size);
// const tamaño_tag = 32 - tamaño_linea - tamaño_offset;

function DM_pasarDireccionA32Bits ( direc ) 
{
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

//var DM_L1 = array_length(cache_size, line_size);
//var DM_L1 = new Array(16).fill("-1");

var DM_L1 = array_length(cache_size, line_size);


var DM_contador_LRU = 0;

function DM_LRU_instrucciones(direccion) //212
{
  var tag = DM_pasarDireccionA32Bits(direccion);

  if(DM_contador_LRU == DM_L1.length){
    DM_contador_LRU = 0;
  }

  if(DM_L1[DM_contador_LRU] == tag)
  {
    hit++;
    DM_contador_LRU++;
  }else{
    miss++;
    DM_L1[DM_contador_LRU] = tag;
    DM_contador_LRU++;
    
  }

  hit_ratio = address_hit_ratio(hit, miss);
  app._data.hit = hit;
  app._data.miss = miss;
  app._data.hit_ratio = hit_ratio;

  console.log("Contador: " + DM_contador_LRU);
  console.log("EXECUTION INDEX: " + execution_index);
  console.log("Hit: " + hit);
  console.log("Miss: " +miss);
  console.log("Hit Ratio: " + hit_ratio);
  console.log("-----------------");
    
  
  return DM_L1;
} 


//--------------------------- FULLY ASSOCIATIVE --------------------------------------


//Para este tipo de direciconamiento necesitamos introducir el tiempo en el que fue introducido la direccion
//Para ello, ademas del array, habrá otro en el que llevemos el tiempo. 
function FA_pasarDireccionA32Bits ( direc ) 
{
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

function array_length_time(cache_size, line_size)
{
  cache_size = cache_size * 1024;
  const array_time = new Array(cache_size/line_size).fill(0);

  return array_time;
}
var L1_time = array_length_time(cache_size, line_size);

var FA_L1 = array_length(cache_size, line_size);
var FA_contador_LRU = 0;



function FA_LRU_instrucciones(direccion)
{
  var tag = FA_pasarDireccionA32Bits(direccion);

  if(FA_contador_LRU == FA_L1.length){
    FA_contador_LRU = 0;
  }

  if(FA_L1[FA_contador_LRU] == tag)
  {
    //Primero busca el que tengo el tiempo unix más bajo y lo guarda en minimo
    var minimo = L1_time[0];
    var posicion = 0
    for(var i = 0; i < L1_time.length; i++){
      if(L1_time[i] < minimo){
        minimo = L1_time[i];
        posicion = i;
      }
    }
    
    var fecha = new Date();
    //var tiempoUnix = Math.floor(fecha.getTime());
    var tiempoUnix = fecha.getTime();
    L1_time[posicion] = tiempoUnix;
    FA_L1[posicion] = tag;

    hit++;
    FA_contador_LRU++;
  }else{
    miss++;
    FA_L1[FA_contador_LRU] = tag;
    var fecha = new Date();
    //var tiempoUnix = Math.floor(fecha.getTime() / 1000);
    var tiempoUnix = fecha.getTime();
    L1_time[FA_contador_LRU] = tiempoUnix;
    FA_contador_LRU++;
    
  }

  hit_ratio = address_hit_ratio(hit, miss);
  app._data.hit = hit;
  app._data.miss = miss;
  app._data.hit_ratio = hit_ratio;
  
  console.log("Contador: " + FA_contador_LRU);
  console.log("EXECUTION INDEX: " + execution_index);
  console.log("Posicion :" + posicion);
  console.log("Hit: " + hit);
  console.log("Miss: " +miss);
  console.log("Hit Ratio: " + hit_ratio);
  console.log("-----------------");
    
  
  return FA_L1;

}



//--------------------------- FULLY SET ASSOCIATIVE --------------------------------------

// | TAG | SET (set size) | OFFSET (offset_size_address)|

function FSA_pasarDireccionA32Bits ( direc ) 
{
  tamaño_offset = Math.log2(line_size);
  tamaño_set = Math.log2(numero_conjuntos);
  tamaño_tag = 32 - tamaño_set - tamaño_offset;

  dirA32Bits = parseInt(direc, 16).toString(2).padStart(32, '0');

  //Para separar el String de 32 bits, lo paso a un array y voy cogiendo 1 a 1
  var array_bits = dirA32Bits.split("");

  var array_tag = array_bits.slice(0,tamaño_tag);
  var array_set = array_bits.slice(tamaño_tag,(tamaño_set + tamaño_tag));
  var array_offset = array_bits.slice((tamaño_set + tamaño_tag), array_bits.length);

  etiqueta = array_tag.join('');
  set = array_set.join('');
  offset = array_offset.join('');


  return etiqueta;
}



//Ponemos el numero de conjuntos (esto sera un parametro que introducira el alumno)
var numero_conjuntos = 4;
var set_size = Math.log2(numero_conjuntos);

//Ahora sustituiremos el array que sacabamos de la funcion array_length y usaremos tantos arrays como necesitemos para la configuracion
//Habra que hace un array de arrays 

var FSA_L1 = []

//Creamos los arrays para introducirlos en el array y crear asi un array de arrays

cache_size = cache_size * 1024;
var FSA_Length = cache_size/line_size;

var array_set_size = FSA_Length / numero_conjuntos; 



for(var i = 0; i < array_set_size; i++){
  var array = [];
  for(var j = 0; j < numero_conjuntos; j++){
    array.push("-1");
  }
  FSA_L1.push(array);
}



//Para llevar la cuenta, usare un array de contadores, tendra tantas posiciones como "subarrays" se hayan creado
var FSA_counter_array = new Array(array_set_size).fill(0);
var FSA_contador = 0;

//Para llevar la cuenta de los miss y los hits, hay que crear una estructura de tantas posiciones como subarrays hay, y dentro un array de 2 posiciones
//indicando los hit y los miss. Los hit seran la posicion 0 y los miss la posicion 1
var FSA_arrayHM = [];
for(var k = 0; k < array_set_size; k++){
  var arrayHM_posiciones = [];
  for(var m = 0; m < 2; m++){
    arrayHM_posiciones.push(0);
  }
  FSA_arrayHM.push(arrayHM_posiciones);
}

//Como estamos usando aqui LRU, haremos otra estructura de datos igual a la del FSA pero para guardar el tiempo UNIX y
//ver cual es la instruccion que lleva mas tiempo en el array
var FSA_L1_time = []
for(var i = 0; i < array_set_size; i++){
  var array_time = [];
  for(var j = 0; j < numero_conjuntos; j++){
    array_time.push(0);
  }
  FSA_L1_time.push(array_time);
}

//Aqui empieza el algoritmo
function FSA_LRU_instrucciones(direccion){
  var tag = FSA_pasarDireccionA32Bits(direccion);

  //Gracias a set sabemos a que conjunto va la instruccion
  setToDecimal = parseInt(set, 2);
 
  if(FSA_counter_array[setToDecimal] == FSA_L1[setToDecimal].length){
    FSA_counter_array[setToDecimal] = 0;
    //FSA_contador = 0;
  }
  console.log("SET TO DECIMAL: " + setToDecimal);
  console.log("SET : " + set);

  if(FSA_L1[setToDecimal][FSA_counter_array[setToDecimal]] == tag){

    //Buscamos en el array_time el tiempo unix mas bajo 
    var minimo = FSA_L1_time[setToDecimal][0];
    var posicion = 0;
    for(var i = 0; i < FSA_L1_time[setToDecimal].length; i++){
      if(FSA_L1_time[setToDecimal][i] < minimo){
        minimo = FSA_L1_time[setToDecimal][i];
        posicion = i;
      }
    }

    var fecha = new Date();
    var tiempoUnix = Math.floor(fecha.getTime());
    FSA_L1_time[setToDecimal][posicion] = tiempoUnix;
    FSA_L1[setToDecimal][posicion] = tag;



    //hit++;
    FSA_counter_array[setToDecimal]++;
    //hit = FSA_counter_array[setToDecimal];
    //FSA_contador ++;
    FSA_arrayHM[setToDecimal][0]++;
    
  }else{
    //miss++;
    FSA_L1[setToDecimal][FSA_counter_array[setToDecimal]] = tag;
    FSA_counter_array[setToDecimal]++;

    FSA_arrayHM[setToDecimal][1]++;
    //miss = FSA_counter_array[setToDecimal];
    //FSA_contador ++;
  }
    
  
  console.log("Hit: " + FSA_arrayHM[setToDecimal][0]);
  console.log("Miss: " +FSA_arrayHM[setToDecimal][1]);
  console.log("Posicion: " + posicion);
  console.log("TiempoUnix: " + tiempoUnix);
  console.log("Minimo: " + minimo); 
  

  console.log("-----------------");
    
  
  return FSA_L1;
}





/*function printAddress( direc )
{
  var dirA32Bits = parseInt(direc, 16).toString(2).padStart(32, '0');
  //var address_32_bits = parseInt(dirA32Bits);

  

  const tamaño_offset = Math.log2(line_size);
  const tamaño_linea = Math.log2((cache_size*1024)/line_size);
  const tamaño_tag = 32 - tamaño_linea - tamaño_offset;

  var array_bits = dirA32Bits.split("");

  var array_tag = array_bits.slice(0,tamaño_tag);
  var array_line = array_bits.slice(tamaño_tag,(tamaño_linea + tamaño_tag));
  var array_offset = array_bits.slice((tamaño_linea + tamaño_tag), array_bits.length);

  etiqueta = array_tag.join('');
  linea = array_line.join('');
  offset = array_offset.join('');

  //Vamos a pasar las variables a app._data para mostrarlas en el simulador


  console.log("DIRECCION DE 32 BITS: " + dirA32Bits);
  console.log("TAG: " + etiqueta);
  console.log("LINEA: " + linea);
  console.log("OFFSET: " + offset); 
  console.log(" ");
  
}*/
