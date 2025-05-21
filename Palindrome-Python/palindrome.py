# Written by Rabia Ghafoor for GlobalNOC Software Engineering Intern Screening

def palindrome_problem(p):
    
    p = p.replace(" ", "")
    length = len(p)
    #compares the characters
    for i in range(length // 2):
        if p[i] != p[length - 1 - i]:
            return False # logic for detecting not a palindrome
    return True # logic for palindrome

def main():
    # declaring an empty for holding the palindrome inputs provided by the user
    palindrome_inputs = [] 
    # using while loop to iterate thorught the array
    while True:
        try:
            line = input()
            #edge case
            if line == "":
                break
            palindrome_inputs.append(line)
        except EOFError:
            break

    # print statement to prompt user to enter a word to check if palindrome or not
    print("Palindrome Output:")
    # using for loop to iterate through the array
    for item in palindrome_inputs:
        #if statement validates if the input is palindrome.
        if palindrome_problem(item):
            #
            print(item)

if __name__ == "__main__":
    main()

