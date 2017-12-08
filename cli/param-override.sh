#!/bin/bash
#
# Demo script to show a way to override default params in a bash script

set -e

function print_usage() {
  printf "Demo script showing param reading and variable overrides\n\n"
  echo "Usage: $0[ <foo>[ <bar>]]"
}

# Help and invalid param count handler
if [ $# -eq 1 -a $1 = "help" ] || [ $# -gt 2 ] ; then
  print_usage

  if [ $# -eq 1 -a $1 = "help" ]
  then
    exit 0
  else
    exit 1
  fi
fi

foo="defaultFoo"
bar="defaultBar"

if [ $# -ge 1 ] ; then
  # Exit if the param is empty
  if [ -z $1 ] ; then
    print_usage
    exit 1
  fi

  foo=$1
fi

if [ $# -eq 2 ] ; then
  # Exit if the param is empty
  if [ -z $2 ] ; then
    print_usage
    exit 1
  fi

  bar=$2
fi

echo "Num Params: $#; Foo: $foo; Bar: $bar"

exit 0

