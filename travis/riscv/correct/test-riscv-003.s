
#
# Creator (https://creatorsim.github.io/creator/)
#

.data
    .align 2
    w1:     .word 14
    b1:     .byte 120
    h1:     .half 22
    w2:     .zero 4
    b2:     .zero 1
    h2:     .zero 2

.text
main:
    
    la x5 w1          # w1 address -> x5
    la x6 b1          # b1 address -> x6
    la x7 h1          # h1 address -> x7
    
    lw x8 0 (x5)      # Memory[x5] -> x8
    
    lb x10 0(x6)      # Memory[x6] -> x10
    
    lh x12 0 (x7)     # Memory[x7] -> x12
    
    la x14 w2         # w2 address -> x14
    sw x8  0(x14)     # x8 -> Memory[w2]

    la x14 b2         # b2 address -> x14
    sb x10 0(x14)     # x10 -> Memory[b2]

    la x14 h2         # h2 address -> x14
    sh x12 0(x14)     # x12 -> Memory[h2]


