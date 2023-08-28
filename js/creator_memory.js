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


/********************
 * Global variables *
 ********************/

var memory_read_counter = 0;
var memory_write_counter = -1;

var memory_access_counter = 0;

var hit_ratio = 0;

function address_hit_ratio (hit, miss){

        var hit_rt = 0;

        if((hit + miss) == 0){
                hit_rt = 0;
        }else{
                hit_rt = (hit / (hit + miss)) * 100;
                hit_rt = hit_rt.toFixed(2);
        }
        

        return hit_rt;
}

var hit_ratio_data = 0;
function address_hit_ratio_data (hit_data, miss_data){

        var hit_rt_data = 0;

        if((hit_data + miss_data) == 0){
                hit_rt_data = 0;
        }else{
                hit_rt_data = (hit_data / (hit_data + miss_data)) * 100;
                hit_rt_data = hit_rt_data.toFixed(2);
        }
        

        return hit_rt_data;
}


var word_size_bits  = 32 ;
    // TODO: load from architecture

var word_size_bytes = word_size_bits / 8 ;
    // TODO: load from architecture

var main_memory = [] ;
    //  [
    //    { addr: address, bin: "00", def_bin: "00", tag: null, reset: true, break: false },
    //    ...
    //  ]

var main_memory_datatypes = {} ;
    //  {
    //    { "type": type, "address": addr, "value": value, "default": "00", "size": 0 },
    //    ...
    //  }

var memory_hash = [ "data_memory", "instructions_memory", "stack_memory" ] ;
    // main segments


/********************
 * Internal API     *
 ********************/

// Address

function main_memory_get_addresses ( )
{
        return Object.keys(main_memory)
                     .sort(function (a, b) {
                             ia = parseInt(a) ;
                             ib = parseInt(b) ;
                             if (ia > ib) return -1;
                             if (ib > ia) return  1;
                                          return  0;
                     }) ;
}

function main_memory_datatype_get_addresses ( )
{
        return Object.keys(main_memory_datatypes)
                     .sort(function (a, b) {
                             ia = parseInt(a) ;
                             ib = parseInt(b) ;
                             if (ia > ib) return -1;
                             if (ib > ia) return  1;
                                          return  0;
                     }) ;
}

// Full value (stored in address)

function main_memory_packs_forav ( addr, value )
{
        return { addr: addr,
                 bin: value,  def_bin: "00",
                 tag: null,
                 reset: true, break: false } ;
}

function main_memory_datatypes_packs_foravt ( addr, value, type, size )
{
  var default_value = "00"

  if (typeof(main_memory_datatypes[addr]) !== 'undefined')
  {
    default_value = main_memory_datatypes[addr].default_value;
  }

  return { address: addr,
           value: value, 
           default: default_value,
           type: type,
           size: size 
         } ;
}

// reset (set to defaults) and clear (remove all values)

function main_memory_reset ( )
{
        var i = 0;

        // reset memory
        var addrs = main_memory_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory[addrs[i]].bin = main_memory[addrs[i]].def_bin ;
        }

        // reset datatypes
        addrs = main_memory_datatype_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory_datatypes[addrs[i]].value = main_memory_datatypes[addrs[i]].default ;
        }
}

function main_memory_clear ( )
{
        // reset memory and datatypes
        main_memory = [] ;
        main_memory_datatypes = {} ;
}

//// Read/write (1/3): object level (compilation)

function main_memory_read ( addr )
{
        if (typeof main_memory[addr] !== "undefined") {
            return main_memory[addr] ;
        }

        return main_memory_packs_forav(addr, '00') ;
}

function main_memory_write ( addr, value )
{
        main_memory[addr] = value ;
}

function main_memory_zerofill ( addr, size )
{
        for (var i=0; i<size; i++)
        {
             var value = main_memory_packs_forav(addr+i, '00') ;
             main_memory_write(addr+i, value) ;
        }
}

//// Read/write (2/3): byte level (execution)

function main_memory_read_value ( addr )
{ // main_memory_read_value  ( addr: integer )
        return main_memory_read(addr).bin ;
}

function main_memory_write_value ( addr, value )
{ // main_memory_write_value ( addr: integer,  value: string (hexadecimal) )
        var value_obj = main_memory_read(addr) ;
        value_obj.bin = value ;
        main_memory_write (addr, value_obj) ;
}

function main_memory_write_tag ( addr, tag )
{ // main_memory_write_tag ( addr: integer,  tag: string )
        var value_obj = main_memory_read(addr) ;
        value_obj.tag = tag ;
        main_memory_write (addr, value_obj) ;
}

function main_memory_read_default_value ( addr )
{
        return main_memory_read(addr).def_bin ;
}

//// Read/write nbytes

function main_memory_read_nbytes ( addr, n )
{
        var value = "" ;
        for (var i = 0; i < n; i++) {
             value = value + main_memory_read_value(addr+i) ;
        }

        return value;
}

function main_memory_write_nbytes ( addr, value, n )
{
        var value_str = value.toString(16).padStart(2*n, "0") ;
        var chunks    = value_str.match(/.{1,2}/g) ;

        for (var i = 0; i < chunks.length; i++) {
             main_memory_write_value(addr+i, chunks[i]) ;
        }
}

//// Read/write (3/3): DATAtype level (byte, ..., integer, space, ...)

var string_length_limit = 4*1024 ;

function create_memory_read_string ( addr )
{
        var ch = '' ;
        var ret_msg = '' ;

        for (var i=0; i<string_length_limit; i++)
        {
             ch = main_memory_read_value(addr+i) ;
             if (ch == '00') {
                 return ret_msg ;
             }

             ret_msg += String.fromCharCode(parseInt(ch, 16));
        }

        return ret_msg + '... (string length greater than ' + string_length_limit + ' chars)' ;
}

function main_memory_read_bydatatype ( addr, type )
{
        var ret = 0x0 ;

        switch (type)
        {
                case 'b':
                case 'bu':
                case 'byte':
                     ret = "0x" + main_memory_read_value(addr) ;
                     break;

                case 'h':
                case 'hu':
                case 'half_word':
                     ret = "0x" + main_memory_read_nbytes(addr, word_size_bytes/2) ;
                     break;

                case 'w':
                case 'integer':
                case 'float':
                case 'word':
                     ret = "0x" + main_memory_read_nbytes(addr, word_size_bytes) ;
                     break;

                case 'd':
                case 'double':
                case 'double_word':
                     ret = "0x" + main_memory_read_nbytes(addr, word_size_bytes*2) ;
                     break;

                case 'asciiz':
                case 'string':
                case 'ascii_null_end':
                     ret = create_memory_read_string(addr) ;
                     break;

                case 'ascii':
                case 'ascii_not_null_end':
                     // TODO
                     break;

                case 'space':
                     // TODO
                     break;

                case 'instruction':
                     // TODO
                     break;
        }

        return ret ;
}

function main_memory_write_bydatatype ( addr, value, type, value_human )
{
        var ret  = 0x0 ;
        var size = 0 ;

        // store byte to byte...
        switch (type)
        {
                case 'b':
                case 'byte':
                     size = 1 ;
                     var value2 = creator_memory_value_by_type(value, type) ;
                     ret = main_memory_write_nbytes(addr, value2, size) ;
                     break;

                case 'h':
                case 'half':
                case 'half_word':
                     size = word_size_bytes / 2 ;
                     var value2 = creator_memory_value_by_type(value, type) ;
                     ret = main_memory_write_nbytes(addr, value2, size) ;
                     break;

                case 'w':
                case 'integer':
                case 'float':
                case 'word':
                     size = word_size_bytes ;
                     ret = main_memory_write_nbytes(addr, value, size) ;
                     break;

                case 'd':
                case 'double':
                case 'double_word':
                     size = word_size_bytes * 2 ;
                     ret = main_memory_write_nbytes(addr, value, size) ;
                     break;

                case 'string':
                case 'ascii_null_end':
                case 'asciiz':
                case 'ascii_not_null_end':
                case 'ascii':
                     var ch = 0 ;
                     for (var i=0; i<value.length; i++) {
                          ch = value.charCodeAt(i);
                          main_memory_write_value(addr+i, ch.toString(16)) ;
                          size++ ;
                     }

                     if ( (type != 'ascii') && (type != 'ascii_not_null_end') ) {
                           main_memory_write_value(addr+value.length, '00') ;
                           size++ ;
                     }
                     break;

                case 'space':
                     for (var i=0; i<parseInt(value); i++) {
                          main_memory_write_value(addr+i, '00') ;
                          size++ ;
                     }
                     break;

                case 'instruction':
                     size = Math.ceil(value.toString().length / 2) ;
                     ret = main_memory_write_nbytes(addr, value, size) ;
                     break;
        }

        // datatype
        main_memory_datatypes[addr] = main_memory_datatypes_packs_foravt(addr, value_human, type, size) ;

        // update view
        creator_memory_updateall();

        return ret ;
}


/********************
 * Public API (1/3) *
 ********************/

// Type, size and address...

function creator_memory_type2size ( type )
{
        var size = 4;

        switch (type)
        {
                case 'b':
                case 'bu':
                case 'byte':
                         size = 1 ;
                         break;

                case 'h':
                case 'hu':
                case 'half':
                case 'half_word':
                         size = word_size_bytes / 2 ;
                         break;

                case 'w':
                case 'wu':
                case 'word':
                case 'float':
                case 'integer':
                case 'instruction':
                         size = word_size_bytes ;
                         break;

                case 'd':
                case 'du':
                case 'double':
                case 'double_word':
                         size = word_size_bytes * 2 ;
                         break;
        }

        return size ;
}

function creator_memory_value_by_type ( val, type )
{
        switch (type)
        {
                case 'b':
                 val = val & 0xFF ;
                 if (val & 0x80)
                         val = 0xFFFFFF00 | val ;
                 break;

                case 'bu':
                 val = ((val << 24) >>> 24) ;
                 break;

                case 'h':
                 val = val & 0xFFFF ;
                 if (val & 0x8000)
                         val = 0xFFFF0000 | val ;
                 break;

                case 'hu':
                 val = ((val << 16) >>> 16) ;
                 break;

                default:
                 break;
        }

        return val ;
}

function creator_memory_alignelto ( new_addr, new_size )
{
        var ret = {
                    new_addr: new_addr,
                    new_size: new_size
                  } ;

        // get align address and size
        for (var i=0; i<align; i++)
        {
             if (((new_addr + i) % align) == 0) {
                 ret.new_addr = new_addr + i ;
             }
             if (((new_size + i) % align) == 0) {
                 ret.new_size = new_size + i ;
             }
        }

        return ret ;
}

// set default content for main_memory and main_memory_datatype

function creator_memory_prereset ( )
{
        var i = 0;

        // prereset main memory
        var addrs = main_memory_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory[addrs[i]].def_bin = main_memory[addrs[i]].bin ;
        }

        // prereset datatypes
        addrs = main_memory_datatype_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory_datatypes[addrs[i]].default = main_memory_datatypes[addrs[i]].value ;
        }
}

// find address by tag

function creator_memory_findaddress_bytag ( tag )
{
        var ret = {
                     exit:  0,
                     value: 0
                  } ;

        // find main memory by tag
        var addrs = main_memory_get_addresses() ;
        for (var i=0; i<addrs.length; i++)
        {
             if (main_memory[addrs[i]].tag == tag)
             {
                 ret.exit  = 1 ;
                 ret.value = parseInt(addrs[i]) ;
             }
        }

        return ret ;
}

// memory zerofill and alloc ...

function creator_memory_zerofill ( new_addr, new_size )
{
        // fill memory
        main_memory_zerofill(new_addr, new_size) ;

        // update view
        creator_memory_updateall();

        // return initial address used
        return new_addr ;
}

function creator_memory_alloc ( new_size )
{
        // get align address
        var new_addr = parseInt(architecture.memory_layout[3].value) + 1 ;
        var algn = creator_memory_alignelto(new_addr, new_size) ;

        // fill memory
        creator_memory_zerofill(algn.new_addr, algn.new_size) ;

        // new segment limit
        architecture.memory_layout[3].value ="0x" + ((algn.new_addr + new_size).toString(16)).padStart(8, "0").toUpperCase();
        if (typeof app !== "undefined") {
            app.architecture.memory_layout[3].value = "0x" + ((algn.new_addr + new_size).toString(16)).padStart(8, "0").toUpperCase();
        }

        return algn.new_addr ;
}

function main_memory_storedata ( data_address, value, size, dataLabel, value_human, DefValue, type )
{
        var algn = creator_memory_alignelto(data_address, size) ;

        main_memory_write_bydatatype(algn.new_addr, value, type, value_human) ;
        creator_memory_zerofill((algn.new_addr + size), (algn.new_size - size)) ;

        if (dataLabel != '') {
            main_memory_write_tag(algn.new_addr, dataLabel) ;
        }

        return parseInt(algn.new_addr) + parseInt(size) ;
}

// for debugging...

function creator_memory_consolelog ( )
{
        var i = 0;

        // show main memory
        console.log(' ~~~ main memory ~~~~~~~~~~~~~~') ;
        var addrs = main_memory_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             console.log(JSON.stringify(main_memory[addrs[i]])) ;
        }

        // show datatypes
        console.log(' ~~~ datatypes ~~~~~~~~~~~~~~') ;
        addrs = main_memory_datatype_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             console.log(JSON.stringify(main_memory_datatypes[addrs[i]])) ;
        }
}


/************************
 * Public API (2/3): UI *
 ************************/

// update an app._data.main_memory row:
//  "000": { addr: 2003, addr_begin: "0x200", addr_end: "0x2003", 
//           hex:[{byte: "1A", tag: "main"},...], 
//           value: "1000", size: 4, eye: true, hex_packed: "1A000000" },
//  ...

function creator_memory_updaterow ( addr )
{
    // skip if app.data does not exit...
    if ((typeof app == "undefined") || (typeof app._data.main_memory == "undefined") ) {
        return ;
    }

    // base address
    var addr_base = parseInt(addr) ;
        addr_base = addr_base - (addr_base % word_size_bytes) ; // get word aligned address

    // get_or_create...
    var elto = { addr:0, addr_begin:'', addr_end:'', value:'', size:0, hex:[], eye:false } ;
    if (typeof app._data.main_memory[addr_base] != "undefined")
    { // reuse the existing element...
        elto = app._data.main_memory[addr_base] ;
    }
    else
    { // set a new element, and set the initial values...
        Vue.set(app._data.main_memory, addr_base, elto) ;

        for (var i=0; i<word_size_bytes; i++) {
             elto.hex[i] = { byte: "00", tag: null } ;
        }
    }

    // addr_begin
    elto.addr_begin = "0x" + addr_base.toString(16).padStart(word_size_bytes * 2, "0").toUpperCase() ;

    // addr_end
    var addr_end  = addr_base + word_size_bytes - 1 ;
    elto.addr_end = "0x" + addr_end.toString(16).padStart(word_size_bytes * 2, "0").toUpperCase() ;

    // addr
    elto.addr = addr_end ;

    // hex, hex_packed
    var v1 = {} ;
    elto.hex_packed = '' ;
    for (var i=0; i<word_size_bytes; i++)
    {
         v1 = main_memory_read(addr_base + i) ;

         elto.hex[i].byte = v1.bin;
         elto.hex[i].tag  = v1.tag;
         if (v1.tag == "") {
             elto.hex[i].tag  = null;
         }

         elto.hex_packed += v1.bin ;
    }

    // value, size and eye
    elto.value = '' ;
    elto.size  = 0 ;
    for (var i=0; i<word_size_bytes; i++)
    {
         if (typeof main_memory_datatypes[addr_base+i] == "undefined") {
             continue ;
         }

         elto.size = elto.size + main_memory_datatypes[addr_base+i].size ;
         if (main_memory_datatypes[addr_base+i].type != "space")
         {
             if (elto.value != '')
                 elto.value += ', ' ;
             elto.value += main_memory_datatypes[addr_base+i].value ;
         }
         else { // (main_memory_datatypes[addr_base+i].type == "space")
             elto.eye   = true ;
         }
    }
}

function creator_memory_updateall ( )
{
    // skip if app.data does not exit...
    if ((typeof app == "undefined") || (typeof app._data.main_memory == "undefined") ) {
        return ;
    }

    // update all rows in app._data.main_memory...
    var addrs = main_memory_get_addresses() ;

    var last_addr = -1;
    var curr_addr = -1;
    for (var i=0; i<addrs.length; i++)
    {
        curr_addr = parseInt(addrs[i]) ;
        if (Math.abs(curr_addr - last_addr) > (word_size_bytes - 1)) // if (|curr - last| > 3)
        {
            creator_memory_updaterow(addrs[i]);
            last_addr = curr_addr ;
        }
    }
}

function creator_memory_clearall ( )
{
    // skip if app.data does not exit...
    if ((typeof app == "undefined") || (typeof app._data.main_memory == "undefined") ) {
        return ;
    }

    // clear all
    app._data.main_memory = {} ;
}

function creator_memory_update_row_view ( selected_view, segment_name, row_info )
{
        if (typeof app._data.main_memory[row_info.addr] == "undefined") {
            return ;
        }

        var hex_packed = app._data.main_memory[row_info.addr].hex_packed ;
        var new_value  = app._data.main_memory[row_info.addr].value ;

        switch (selected_view)
        {
                case "sig_int":
                     new_value = parseInt(hex_packed, 16)  >> 0 ;
                     break ;
                case "unsig_int":
                     new_value = parseInt(hex_packed, 16) >>> 0 ;
                     break ;
                case "float":
                     new_value = hex2float("0x" + hex_packed) ;
                     break ;
                case "char":
                     new_value = hex2char8(hex_packed) ;
                     break ;
        }

        app._data.main_memory[row_info.addr].value = new_value ;
}

function creator_memory_update_space_view ( selected_view, segment_name, row_info )
{
        for (var i=0; i<row_info.size; i++) {
             creator_memory_update_row_view(selected_view, segment_name, row_info) ;
             row_info.addr ++ ;
        }
}


/********************
 * Public API (3/3) *
 ********************/

function writeMemory ( value, addr, type )
{
        main_memory_write_bydatatype(addr, value, type, value) ;

        // update view
        creator_memory_updaterow(addr);

        //console.log("Write -->  value: " + value + " addr: " + addr + " type: " + type);

        data_address = pasarDireccionAHexadecimal(addr);
        app._data.data_address = data_address;

        address_32_bits_data = addr.toString(2).padStart(32, '0');

        array_32_bits_data = address_32_bits_data.split("");
        tag_array_data = array_32_bits_data.slice(0, tag_size_address_data);
        line_array_data = array_32_bits_data.slice(tag_size_address_data, (line_size_address_data + tag_size_address_data));
        offset_array_data = array_32_bits_data.slice((line_size_address_data + tag_size_address_data), (array_32_bits_data.length));
    
        tag_data = tag_array_data.join('');
        line_data = line_array_data.join('');
        offset_data = offset_array_data.join('');
    
        
        app._data.address_32_bits_data = address_32_bits_data;
    
    
        app._data.offset_size_address_data = offset_size_address_data;
        app._data.line_size_address_data = line_size_address_data;
        app._data.tag_size_address_data = tag_size_address_data;
    
        app._data.tag_data = tag_data;
        app._data.line_data = line_data;
        app._data.offset_data = offset_data;

        //FA ---- TAG = TAG + LINE; el offset es el mismo

        FA_tag_array_data = array_32_bits_data.slice(0, FA_tag_size_address_data);
        
        FA_tag_data = FA_tag_array_data.join('');
        
        app._data.FA_tag_size_address_data = FA_tag_size_address_data;
        app._data.FA_tag_data = FA_tag_data;

        //FSA
        FSA_tag_array_data = array_32_bits_data.slice(0, FSA_tag_size_address_data)
        FSA_set_array_data = array_32_bits_data.slice(FSA_tag_size_address_data, (set_size_data + FSA_tag_size_address_data));
        
        FSA_tag_data = FSA_tag_array_data.join('');
        FSA_set_data = FSA_set_array_data.join('');


        app._data.set_size_data = set_size_data;
        app._data.FSA_tag_data = FSA_tag_data;
        app._data.FSA_set_data = FSA_set_data;


        //DM_LRU_datos(addr);
        //FA_LRU_Datos(addr);
        //FSA_LRU_datos(addr);
        if(architecture.cache_definition_L1[7].value == 1){
                switch(architecture.cache_definition_L1[8].value) {
                        case 0: 
                            DM_LRU_datos(addr);
                            console.log("DIRECT MAPPED");
                            break;
                        case 1: 
                            FA_LRU_Datos(addr);
                            console.log("FULLY ASSOCIATIVE");
                            break;
                        case 2:
                            FSA_LRU_datos(addr);
                            console.log("FULLY SET ASSOCIATIVE");
                            break;
                }
        }
        
        //Counter access
        memory_write_counter++;
        memory_access_counter++;

        app._data.memory_write_counter++;
        app._data.memory_access_counter++;
}

function readMemory ( addr, type )
{
        //Counter access
        memory_read_counter++;
        memory_access_counter++;

        var ret = main_memory_read_bydatatype ( addr, type )

        //console.log("Read -->  addr: " + addr + " type: " + type + " ret: " + ret);
        data_address = pasarDireccionAHexadecimal(addr);
        app._data.data_address = data_address;

        //Pasar esa direccion de numero a binario

        address_32_bits_data = addr.toString(2).padStart(32, '0');
        console.log("addr: " + addr + "data_addres: " + data_address + "address_32_bit: " + address_32_bits_data);

        array_32_bits_data = address_32_bits_data.split("");
        tag_array_data = array_32_bits_data.slice(0, tag_size_address_data);
        line_array_data = array_32_bits_data.slice(tag_size_address_data, (line_size_address_data + tag_size_address_data));
        offset_array_data = array_32_bits_data.slice((line_size_address_data + tag_size_address_data), (array_32_bits_data.length));
    
        tag_data = tag_array_data.join('');
        line_data = line_array_data.join('');
        offset_data = offset_array_data.join('');
    
        
        app._data.address_32_bits_data = address_32_bits_data;
    
    
        app._data.offset_size_address_data = offset_size_address_data;
        app._data.line_size_address_data = line_size_address_data;
        app._data.tag_size_address_data = tag_size_address_data;
    
        app._data.tag_data = tag_data;
        app._data.line_data = line_data;
        app._data.offset_data = offset_data;

        //FA ---- TAG = TAG + LINE; el offset es el mismo

        FA_tag_array_data = array_32_bits_data.slice(0, FA_tag_size_address_data);
        
        FA_tag_data = FA_tag_array_data.join('');
        
        app._data.FA_tag_size_address_data = FA_tag_size_address_data;
        app._data.FA_tag_data = FA_tag_data;

        //FSA
        FSA_tag_array_data = array_32_bits_data.slice(0, FSA_tag_size_address_data)
        FSA_set_array_data = array_32_bits_data.slice(FSA_tag_size_address_data, (set_size_data + FSA_tag_size_address_data));
        
        FSA_tag_data = FSA_tag_array_data.join('');
        FSA_set_data = FSA_set_array_data.join('');


        app._data.set_size_data = set_size_data;
        app._data.FSA_tag_data = FSA_tag_data;
        app._data.FSA_set_data = FSA_set_data;





        //DM_LRU_datos(addr);
        //FA_LRU_Datos(addr);
        //FSA_LRU_datos(addr);
        if(architecture.cache_definition_L1[7].value == 1){
                switch(architecture.cache_definition_L1[8].value) {
                        case 0: 
                            DM_LRU_datos(addr);
                            console.log("DIRECT MAPPED");
                            break;
                        case 1: 
                            FA_LRU_Datos(addr);
                            console.log("FULLY ASSOCIATIVE");
                            break;
                        case 2:
                            FSA_LRU_datos(addr);
                            console.log("FULLY SET ASSOCIATIVE");
                            break;
                }
        }
        
        
        

        app._data.memory_read_counter++;
        app._data.memory_access_counter++;

        return main_memory_read_bydatatype(addr, type) ;

        
}


function creator_memory_reset ( )
{
        main_memory_reset() ;

        // update view
        creator_memory_updateall() ;

        // reset memory access counter
        app._data.memory_access_counter = 0;
        app._data.memory_read_counter = 0;
        app._data.memory_write_counter = 0;
}

function creator_memory_clear ( )
{
        main_memory_clear() ;
        creator_memory_clearall() ;
}


function creator_memory_is_address_inside_segment ( segment_name, addr )
{
         var elto_inside_segment = false ;

         if (segment_name == "instructions_memory") {
             elto_inside_segment = ((addr >= parseInt(architecture.memory_layout[0].value)) && (addr <= parseInt(architecture.memory_layout[1].value))) ;
         }
         if (segment_name == "data_memory") {
             elto_inside_segment = ((addr >= parseInt(architecture.memory_layout[2].value)) && (addr <= parseInt(architecture.memory_layout[3].value))) ;
         }
         if (segment_name == "stack_memory") {
             elto_inside_segment = (addr >= parseInt(architecture.memory_layout[3].value)) ;
         }

         return elto_inside_segment ;
}

function creator_memory_is_segment_empty ( segment_name )
{
          var addrs    = main_memory_get_addresses() ;
          var insiders = addrs.filter(function(elto) {
                                         return creator_memory_is_address_inside_segment(segment_name, elto) ;
                                      }); 

          return (insiders.length == 0) ;
}


function creator_memory_data_compiler ( data_address, value, size, dataLabel, DefValue, type )
{
	var ret = {
		     msg: '',
		     data_address: 0
		  } ;

        // If align changes then zerofill first...
	if ((data_address % align) > 0)
	{
             var to_be_filled = align - (data_address % align) ;
             creator_memory_zerofill(data_address, to_be_filled);
             data_address = data_address + to_be_filled;
	}

        if ((data_address % size != 0) && (data_address % word_size_bytes != 0)) {
            ret.msg = 'm21' ;
            ret.data_address = data_address ;
            return ret ;
        }

        if (dataLabel != null) {
            data_tag.push({tag: dataLabel, addr: data_address});
        }

        ret.msg = '' ;
        ret.data_address = main_memory_storedata(data_address, value, size, dataLabel, DefValue, DefValue, type) ;

        return ret ;
}

function creator_insert_instruction ( auxAddr, value, def_value, hide, hex, fill_hex, label )
{
        var size = Math.ceil(hex.toString().length / 2) ;
        return main_memory_storedata(auxAddr, hex, size, label, def_value, def_value, "instruction") ;
}

function creator_memory_storestring ( string, string_length, data_address, label, type, align )
{
        if (label != null) {
            data_tag.push({tag: label, addr: data_address});
        }

        return main_memory_storedata(data_address, string, string_length, label, string, string, type) + 1;
}

