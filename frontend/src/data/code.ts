const python = `print("Hello, World!");`;
const javascript = `console.log("Hello, World!");`;
const bash = `echo "Hello, World!"`;
const java = `public class HelloWorld {
    public static void main(String[] args) {
    System.out.println("Hello, World!");
}
}`;
const c = `
    #include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}
`;
const cPlusPlus = `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;

const codeData = {
    javascript,
    python,
    bash,
    java,
    c,
    cPlusPlus,
};

export { codeData };