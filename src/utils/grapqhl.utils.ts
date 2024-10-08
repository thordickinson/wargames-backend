
export function wrapResolver(resolverFn: (...args: any[]) => any) {
    return (prev: any, args: any, context: any) => {
        try {
            return resolverFn(args, context);
        } catch (error) {
            //convert error as string
            console.error(error);
            throw new Error(`error: ${error}`);
        }
    }
}

