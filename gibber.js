"use strict";

// TODO: use require.js
$script([
    '../lib/jquery-1.7.2.min', 
], function() {
//

//console.log('have jQ', $);

$(document).ready(function() {
    var 
        hash = document.location.hash.slice(1),
        word =  hash || 'antidisestablishmentarianism',
        g = Gibber,
        sylls = g.split(word),
        shuffledSylls = g.gib(word);

    //console.log(g.gib('antidisestablishmentarianism'));

    //
    $('body').append(
        $('<style/>').text(
            'body { font-family: -webkit-small-control, arial, verdana, '
            + '    helvetica, sans-serif; }'
            + 'div { font-size: 1em; }'
            + 'input { '
            + '    font-size: 1em;'
            + '    font-family: arial, verdana, helvetica, sans-serif;'
            + '}'
            + ''
        )
    ).append(
        // TODO: textarea: enter issue sh +== submit or raw?
        //$('<textarea/>').attr({
        $('<input/>').attr({
            id: 'syllee'
        }).css({
            // 176 chars on mba11
            //width: '82%'
            // 134 chars on mba11
            width: '62%'
            // TODO: textarea, see above
            //, height: '28%'
        }).on('change', function() {
            $('#gibberee').text(g.split(this.value));
            $('#gibbered').text(g.gib(this.value));
            hash = this.value;
            document.location.hash = '#' + hash;
            $(this).select();
        }).val(word)
    ).append(
        $('<div/>').attr({
            id: 'gibberee'
        }).css({
            'margin-top': '11px'
        }).text(sylls)
    ).append(
        $('<div/>').attr({
            id: 'gibbered'
        }).css({
            'margin-top': '11px'
        }).text(shuffledSylls)
    );

    $('#syllee').select();

});


var Gibber = {
    gibber: function(text) {
        return this.shuffle(text);
    },
    gib: function(word) {
        return this.shuffle(word);
    },
    vowelList: ['a', 'e', 'i', 'o', 'u', 'y'],
    isVowel: function(char) {
        return char in vowelList;
    },
    vowelCount: function(str) {
        var vowels = 0;
        window.str = str
        str.split('').forEach(function(char, idx) {
            this.vowelList.every(function(vowel, idx) {
                if (char === vowel) {
                    vowels++;
                    return false;
                }
                return true;
            });
        }, this);
        return vowels;
    },
    vowelRatio: function(str) {
        var vowels = 0, consonants = 0;
        str.split('').forEach(function(char, idx) {
            var isVowel = false;
            this.vowelList.every(function(vowel, idx) {
                if (char === vowel) {
                    isVowel = true;
                    return false;
                }
                return true;
            });
            if (isVowel) {
                vowels++;
            } else {
                consonants++;
            }
            return true;
        }, this);
        if (! consonants) {
            return vowels;
        } else {
            return vowels / consonants;
        }
    },
    split: function(str) {
        var vowels = this.vowelCount(str);
        //console.log(str, vowels);
        //if (str == 'thing') console.lot(str, vowels);
        if (
            vowels < 2                  // Every syllable needs a vowel
            || str.length <= 2          // ???
            || str.length == vowels     // All chars being vowels connotes
                                        //   a complete syllabic 
        ) {
            return str;
        } else {
            var length = str.length,
                center = length / 2,
                leftHalf = str.slice(0, center),
                rightHalf = str.slice(center);
            var leftRatio = this.vowelRatio(leftHalf),
                rightRatio = this.vowelRatio(rightHalf);

            if (leftRatio < rightRatio) {
                center++;
                leftHalf = str.slice(0, center);
                rightHalf = str.slice(center);
            }
            return this.split(leftHalf) + ' ' + this.split(rightHalf);
        }
    },
    shuffle: function(textStruct, spec) {
         if (Object.prototype.toString.call(textStruct) == '[object String]') {
             //return this.split(textStruct);
             return this.shuffleArray(this.split(textStruct).split(' '));
         } else {
             var combinedSplit = '';
             textStruct.forEach(function(textStruct, idx) {
                combinedSplit += this.shuffle(textStruct);
             }, this);
             return combinedSplit;
         }
    },
    shuffleArray: function(inputList) {
        var unmovedList = inputList.slice(0),
            shuffledList = [];
        inputList.forEach(function(textStruct, idx) {
            var idxToMove = parseInt(Math.random() * unmovedList.length);
            var itemToMove = unmovedList.splice(idxToMove, 1)[0];
            shuffledList.push(itemToMove);    
        });
        //console.log(unmovedList, inputList, shuffledList);
        return shuffledList.join(' ');
        return inputList.join(' ');
    },
    
    extract: function(textStruct) {
        var splitText = '';
        textStruct.forEach(function(textStruct, idx) {
            //this.split(text);
        });
        return splitText;
    }
};

//
}); // $script([
