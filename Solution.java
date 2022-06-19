
class WordFilter {

    private static final int NOT_FOUND = -1;
    private static final char SEPARATOR_SUFFIX_PREFIX = '#';
    private static final int SIZE_OF_TRIE_BRANCHES = 26 + 1;//alphabet + SEPARATOR_SUFFIX_PREFIX

    class TrieNode {
        int index;
        TrieNode[] branches = new TrieNode[SIZE_OF_TRIE_BRANCHES];
    }
    TrieNode root = new TrieNode();

    public WordFilter(String[] words) {
        addAllWords(words);
    }

    /*
      Obviously the method name 'f(...)' is not very telling what it is supposed to do
      but this is the in-built method given by leetcode.com, around which we have to write our code.
     */
    public int f(String prefix, String suffix) {
        return searchForWordsThatContainBothPrefixAndSuffix(prefix, suffix);
    }

    private int searchForWordsThatContainBothPrefixAndSuffix(String prefix, String suffix) {
        TrieNode current = root;
        String suffixPrefixCombination = suffix + SEPARATOR_SUFFIX_PREFIX + prefix;

        for (int i = 0; i < suffixPrefixCombination.length(); ++i) {
            int indexCharacter = getIndex(suffixPrefixCombination.charAt(i));
            if (current.branches[indexCharacter] == null) {
                return NOT_FOUND;
            }
            current = current.branches[indexCharacter];
        }
        return current.index;
    }

    private void addAllWords(String[] words) {
        for (int i = 0; i < words.length; ++i) {
            addWord(words[i], i);
        }
    }

    private void addWord(String word, int index) {
        final int initialWordSize = word.length();
        String suffixPrefixCombination = word + SEPARATOR_SUFFIX_PREFIX + word;
        int suffix = 0;

        while (suffix < initialWordSize) {

            TrieNode current = root;
            for (int i = suffix; i < suffixPrefixCombination.length(); ++i) {
                int indexCharacter = getIndex(suffixPrefixCombination.charAt(i));
                if (current.branches[indexCharacter] == null) {
                    current.branches[indexCharacter] = new TrieNode();
                }
                current.branches[indexCharacter].index = index;
                current = current.branches[indexCharacter];
            }
            ++suffix;
        }
    }

    private int getIndex(char character) {
        return character != SEPARATOR_SUFFIX_PREFIX ? character - 'a' : SIZE_OF_TRIE_BRANCHES - 1;
    }
}
