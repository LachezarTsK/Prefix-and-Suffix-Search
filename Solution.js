
/**
 * @param {string[]} words
 */
var WordFilter = function (words) {
    this.NOT_FOUND = -1;
    this.SEPARATOR_SUFFIX_PREFIX = '#';
    this.SIZE_OF_TRIE_BRANCHES = 26 + 1;//alphabet + SEPARATOR_SUFFIX_PREFIX
    this.ASCII_SMALL_CASE_A = 97;
    this.root = new TrieNode(this.SIZE_OF_TRIE_BRANCHES);
    this.addAllWords(words);
};

/*
 Obviously the method name 'f(...)' is not very telling what it is supposed to do
 but this is the in-built method given by leetcode.com, around which we have to write our code.
 */
/** 
 * @param {string} prefix 
 * @param {string} suffix
 * @return {number}
 */
WordFilter.prototype.f = function (prefix, suffix) {
    return this.searchForWordsThatContainBothPrefixAndSuffix(prefix, suffix);
};

/** 
 * @param {number} SIZE_OF_TRIE_BRANCHES 
 */
function TrieNode(SIZE_OF_TRIE_BRANCHES) {
    this.index = 0;
    this.branches = new Array(SIZE_OF_TRIE_BRANCHES).fill(null);
}

/** 
 * @param {string} prefix 
 * @param {string} suffix
 * @return {number}
 */
WordFilter.prototype.searchForWordsThatContainBothPrefixAndSuffix = function (prefix, suffix) {
    let current = this.root;
    const suffixPrefixCombination = suffix + this.SEPARATOR_SUFFIX_PREFIX + prefix;

    for (let i = 0; i < suffixPrefixCombination.length; ++i) {
        let indexCharacter = this.getIndex(suffixPrefixCombination.charAt(i));
        if (current.branches[indexCharacter] === null) {
            return this.NOT_FOUND;
        }
        current = current.branches[indexCharacter];
    }
    return current.index;
};

/** 
 * @param {string[]} words 
 * @return {void}
 */
WordFilter.prototype.addAllWords = function (words) {
    for (let i = 0; i < words.length; ++i) {
        this.addWord(words[i], i);
    }
};

/** 
 * @param {string} word 
 * @param {number} index
 * @return {void}
 */
WordFilter.prototype.addWord = function (word, index) {
    const initialWordSize = word.length;
    const suffixPrefixCombination = word + this.SEPARATOR_SUFFIX_PREFIX + word;
    let suffix = 0;

    while (suffix < initialWordSize) {

        let current = this.root;
        for (let i = suffix; i < suffixPrefixCombination.length; ++i) {
            let indexCharacter = this.getIndex(suffixPrefixCombination.charAt(i));
            if (current.branches[indexCharacter] === null) {
                current.branches[indexCharacter] = new TrieNode(this.SIZE_OF_TRIE_BRANCHES);
            }
            current.branches[indexCharacter].index = index;
            current = current.branches[indexCharacter];
        }
        ++suffix;
    }
};

/** 
 * @param {string} character 
 * @return {number}
 */
WordFilter.prototype.getIndex = function (character) {
    return character !== this.SEPARATOR_SUFFIX_PREFIX ?
            character.codePointAt(0) - this.ASCII_SMALL_CASE_A :
            this.SIZE_OF_TRIE_BRANCHES - 1;
};
