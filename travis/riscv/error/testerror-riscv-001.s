
#
# Creator (https://creatorsim.github.io/creator/)
#

# Error1: non-open string (..."")

.data
    str: .string Bad string"
	max: .byte 10

.text
main:
	lb x5 max
    li x6 0
    li a0 0
while:
	bge x6 x5 end_while
    add a0 a0 x6
    addi x6 x6 1
    b while
end_while:
	li a7 1
	syscall	#print_int
