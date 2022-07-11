export declare function proxyState<X extends {}>(data: X, onChange: (data: X) => void): {
    readable: X;
    writable: X;
};
