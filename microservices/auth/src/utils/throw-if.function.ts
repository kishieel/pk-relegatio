export const throwIf = (condition: boolean, exception: Error): void => {
    if (condition) {
        throw exception;
    }
};
