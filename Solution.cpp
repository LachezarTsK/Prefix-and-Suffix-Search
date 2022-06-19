
#include <array>
#include <string>
#include <vector>
#include <memory>
using namespace std;

class WordFilter {
    
    inline static const int NOT_FOUND = -1;
    inline static const char SEPARATOR_SUFFIX_PREFIX = '#';
    inline static const int SIZE_OF_TRIE_BRANCHES = 26 + 1; //alphabet + SEPARATOR_SUFFIX_PREFIX

    struct TrieNode {
        int index{};
        array<shared_ptr<TrieNode>, SIZE_OF_TRIE_BRANCHES> branches{};
    };
    shared_ptr<TrieNode> root{ make_shared<TrieNode>()};

public:
    WordFilter(vector<string>& words) {
        addAllWords(words);
    }

    /*
     Obviously the method name 'f(...)' is not very telling what it is supposed to do
     but this is the in-built method given by leetcode.com, around which we have to write our code.
     */
    int f(string prefix, string suffix) {
        return searchForWordsThatContainBothPrefixAndSuffix(prefix, suffix);
    }

private:
    int searchForWordsThatContainBothPrefixAndSuffix(const string& prefix, const string& suffix) {
        shared_ptr<TrieNode> current = root;
        string suffixPrefixCombination = suffix + SEPARATOR_SUFFIX_PREFIX + prefix;

        for (const auto& character : suffixPrefixCombination) {
            int indexCharacter = getIndex(character);
            if (current->branches[indexCharacter] == nullptr) {
                return NOT_FOUND;
            }
            current = current->branches[indexCharacter];
        }
        return current->index;
    }

    void addAllWords(const vector<string>& words) {
        for (int i = 0; i < words.size(); ++i) {
            addWord(words[i], i);
        }
    }

    void addWord(const string& word, int index) {
        const size_t initialWordSize = word.length();
        string suffixPrefixCombination = word + SEPARATOR_SUFFIX_PREFIX + word;
        int suffix = 0;

        while (suffix < initialWordSize) {

            shared_ptr<TrieNode> current = root;
            for (int i = suffix; i < suffixPrefixCombination.length(); ++i) {
                int indexCharacter = getIndex(suffixPrefixCombination[i]);
                if (current->branches[indexCharacter] == nullptr) {
                    current->branches[indexCharacter] = make_shared<TrieNode>();
                }
                current->branches[indexCharacter]->index = index;
                current = current->branches[indexCharacter];
            }
            ++suffix;
        }
    }

    int getIndex(char character) {
        return character != SEPARATOR_SUFFIX_PREFIX ? character - 'a' : SIZE_OF_TRIE_BRANCHES - 1;
    }
};
