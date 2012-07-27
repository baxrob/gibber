#!/bin/bash

vowel_list="a e i o u y"

function vowel_count {
    vowels=0
    for char in $(echo $1 | fold -w1); do
        for v in $vowel_list; do
            if [ $char == $v ]; then
                vowels=$((vowels+1))
                break
            fi 
        done
    done
    echo $vowels
}

function vowel_ratio {
    vowels=0; consonants=0
    for char in $(echo $1 | fold -w1); do
        is_vowel=0
        for v in $vowel_list; do
            if [ $char == $v ]; then
                is_vowel=1
                break
            fi 
        done
        if [ $is_vowel -eq 1 ]; then
            vowels=$((vowels+1))
        else
            consonants=$((consonants+1)) 
        fi
    done
    
    if [ $consonants -eq 0 ]; then
        echo $vowels
    else
        echo "scale=3; $vowels / $consonants" | bc
    fi

}

recur=0
function split {

    recur=$((recur + 1))
    if [ $recur -gt 100 ]; then
        return
    fi
    if [ $(vowel_count $1) -lt 2 ]; then
        echo "$1"
        return
    else
        len=${#1}
        center=$((len/2))
        left_half="${1:0:center}"
        right_half="${1:center}"

        left_ratio=$(vowel_ratio $left_half 2)
        right_ratio=$(vowel_ratio $right_half 2)

        left_light=$(echo "scale=3; $left_ratio < $right_ratio" | bc)
        if [ $left_light -eq 1 ]; then
            center=$((center+1))
            left_half=${1:0:center} 
            right_half=${1:center}
        fi        

        echo "$(split $left_half) $(split $right_half)"
    fi

}

count=0
for word in $@; do
    split_word="$(split $word)"
    #syl_counts="$syl_counts $(echo $split_word | wc -w)" 
    syl_counts[count]=$(echo $split_word | wc -w)
    syl_list="$syl_list $split_word"
    count=$((count+1))
done
#echo $@
#echo $syl_list
shuffled_syls=$(shuf -e $syl_list)
#echo $shuffled_syls
#echo ${syl_counts[@]}

current_word=0
word_syls=${syl_counts[$current_word]}
for syl in $shuffled_syls; do
    shuffled="${shuffled}${syl}"
    word_syls=$((word_syls-1))
    if [ $word_syls -eq 0 ]; then
        shuffled="$shuffled "
        current_word=$((current_word+1))
        word_syls=${syl_counts[$current_word]}
    fi
done
echo $@
echo
echo $shuffled
echo

