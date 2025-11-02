type CustomErrorProps = {
    message: string;
    code: number;
}

class CustomError extends Error {
    public message: string = ''
    public code: number = 0

    constructor({ message, code }: CustomErrorProps) {
        super(message)
        this.code = code
    }
}

export { CustomError }